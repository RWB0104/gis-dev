/**
 * 트랜잭션 수정 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.26 월 21:30:00
 */

'use client';

import { PencilIcon } from 'lucide-react';
import type { Feature } from 'ol';
import { Modify } from 'ol/interaction';
import { use, useEffect, useEffectEvent, useRef, useState } from 'react';

import { useWfsTransaction } from '@gis-dev/api-pack/generated/react-query/api/wfs/wfs';
import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { setEditInteractionsActive } from '@gis-dev/openlayers-service-pack/func/interaction';
import { getBuildingUpdateXml, refreshWfsLayer, toPolygons } from '@gis-dev/openlayers-service-pack/func/transaction';
import { useSelectedFeature } from '@gis-dev/openlayers-service-pack/hooks/selectedFeature';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import TransactionFormDialog, { type TransactionFormParams } from '../TransactionFormDialog';

interface EditSession {
	/**
	 * 도형이 실제로 수정되었는지 여부
	 */
	dirty: boolean;

	/**
	 * 편집 중인 피쳐
	 */
	feature: Feature;
}

/**
 * 트랜잭션 수정 버튼 organism 컴포넌트 반환 메서드
 *
 * 흐름: 피쳐 선택 → 버튼 클릭(snap, modify 활성화) → 도형 수정 → 도형 바깥 클릭 또는 ESC(편집 종료)
 * → 정보 확인 다이얼로그(기존 값으로 채움) → WFS-T Update
 *
 * 도형을 수정하지 않고 편집을 끝내면 다이얼로그를 열지 않는다.
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionUpdateButton(): React.JSX.Element {
	const { map } = use(MapContext);

	const { clear, feature } = useSelectedFeature();

	const [isEditingState, setIsEditingState] = useState(false);
	const [targetState, setTargetState] = useState<Feature | undefined>();

	const sessionRef = useRef<EditSession | undefined>(undefined);

	const { isPending, mutate } = useWfsTransaction({
		axios: {
			headers: {
				'Content-Type': 'text/plain;charset=UTF-8'
			}
		},
		mutation: {
			onError: () => {
				toast.add({ description: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.', title: 'Update failed' });
			},
			onSuccess: ({ data }) => {
				if (data.includes('ExceptionReport')) {
					toast.add({ description: '서버가 요청을 처리하지 못했습니다.', title: 'Update failed' });

					return;
				}

				refreshWfsLayer(map);

				clear();
				setTargetState(undefined);
			}
		}
	});

	const finishEdit = useEffectEvent(() => {
		const session = sessionRef.current;

		if (session === undefined) {
			return;
		}

		sessionRef.current = undefined;

		setEditInteractionsActive(map, false);
		setIsEditingState(false);

		// 도형이 수정된 경우에만 정보 확인을 받는다
		if (session.dirty) {
			setTargetState(session.feature);
		}
	});

	const handleClick = (): void => {
		/* v8 ignore next 3 -- 선택된 피쳐가 없으면 버튼이 비활성화되므로 도달 불가능한 방어 분기 */
		if (feature === undefined) {
			return;
		}

		sessionRef.current = { dirty: false, feature };

		setEditInteractionsActive(map, true);
		setIsEditingState(true);
	};

	const handleSubmit = ({ address, name }: TransactionFormParams): void => {
		const id = targetState?.getId();
		const polygons = toPolygons(targetState?.getGeometry());

		if (map === undefined || id === undefined || polygons.length === 0) {
			return;
		}

		mutate({
			data: getBuildingUpdateXml({
				address,
				id: `${id}`,
				name,
				polygons,
				srsName: map.getView().getProjection().getCode()
			})
		});
	};

	const handleOpenChange = (isOpen: boolean): void => {
		if (isOpen) {
			return;
		}

		// 취소하면 지도 위에서 바뀐 도형을 서버 값으로 되돌린다
		refreshWfsLayer(map);

		clear();
		setTargetState(undefined);
	};

	// 수정이 한 번이라도 일어나면 표시해 둔다
	useEffect(() => {
		const modify = map
			?.getInteractions()
			.getArray()
			.find((i): i is Modify => i instanceof Modify && i.get('name') === 'modify');

		const handleModifyEnd = (): void => {
			if (sessionRef.current) {
				sessionRef.current.dirty = true;
			}
		};

		modify?.on('modifyend', handleModifyEnd);

		return () => {
			modify?.un('modifyend', handleModifyEnd);
		};
	}, [map]);

	// 도형 바깥을 눌러 선택이 바뀌면 편집을 종료한다
	useEffect(() => {
		if (sessionRef.current && sessionRef.current.feature !== feature) {
			finishEdit();
		}
	}, [feature]);

	// ESC로 편집을 종료한다(편집하는 동안에만 등록)
	useEffect(() => {
		if (!isEditingState) {
			return;
		}

		const handleKeyUp = (e: KeyboardEvent): void => {
			if (e.code === 'Escape') {
				finishEdit();
			}
		};

		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [isEditingState]);

	// 편집 중 언마운트되면 편집용 인터렉션을 끈다
	useEffect(
		() => () => {
			setEditInteractionsActive(map, false);
		},
		[map]
	);

	return (
		<>
			<Button
				aria-label="도형 수정"
				className="bg-amber-500 text-white hover:bg-amber-500/90 focus-visible:ring-amber-500/40"
				data-testid="TransactionUpdateButton"
				disabled={feature === undefined || isEditingState}
				onClick={handleClick}
			>
				<PencilIcon />
			</Button>

			<TransactionFormDialog
				cta="수정"
				defaultValue={{ address: `${targetState?.get('address') ?? ''}`, name: `${targetState?.get('name') ?? ''}` }}
				description={`대상 빌딩: ${targetState?.getId() ?? ''}`}
				key={`${targetState?.getId() ?? ''}`}
				loading={isPending}
				onOpenChange={handleOpenChange}
				onSubmit={handleSubmit}
				open={targetState !== undefined}
				title="트랜잭션 수정"
			/>

			{isEditingState ? (
				<div className="pointer-events-none fixed top-14 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black px-2.5 py-0.5 text-white text-xs">
					도형 바깥을 누르거나 ESC로 종료하세요.
				</div>
			) : null}
		</>
	);
}
