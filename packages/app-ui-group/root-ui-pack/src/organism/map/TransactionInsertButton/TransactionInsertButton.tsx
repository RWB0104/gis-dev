/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.26 월 12:36:52
 */

import { PlusIcon } from 'lucide-react';
import { Polygon } from 'ol/geom';
import { use, useEffect, useEffectEvent, useState } from 'react';

import { useWfsTransaction } from '@gis-dev/api-pack/generated/react-query/api/wfs/wfs';
import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { drawInteraction } from '@gis-dev/openlayers-service-pack/func/interaction';
import { transactionLayer } from '@gis-dev/openlayers-service-pack/func/layer';
import { getBuildingInsertXml } from '@gis-dev/openlayers-service-pack/func/transaction';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

import TransactionFormDialog, { type TransactionFormParams } from '../TransactionFormDialog';

/**
 * 트랜잭션 삽입 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionInsertButton(): React.JSX.Element {
	const { map } = use(MapContext);

	const [isOpenState, setIsOpenState] = useState(false);
	const [isDrawingState, setIsDrawingState] = useState(false);

	const { isPending, mutate } = useWfsTransaction({
		axios: {
			headers: {
				'Content-Type': 'text/plain;charset=UTF-8'
			}
		},
		mutation: {
			onError: () => {
				toast.add({ description: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.', title: 'Insert failed' });
			},
			onSuccess: ({ data }) => {
				if (data.includes('ExceptionReport')) {
					toast.add({ description: '서버가 요청을 처리하지 못했습니다.', title: 'Insert failed' });

					return;
				}

				map?.getAllLayers()
					.find((layer) => layer.get('name') === 'wfs')
					?.getSource()
					?.refresh();

				transactionLayer.drawLayer.getSource()?.clear();

				setIsDrawingState(false);
				setIsOpenState(false);
			}
		}
	});

	const handleClick = () => {
		if (map === undefined) {
			return;
		}

		setIsDrawingState(true);

		transactionLayer.drawLayer.getSource()?.clear();

		drawInteraction.set('name', 'draw');
		map.addInteraction(drawInteraction);
	};

	const handleDrawEnd = useEffectEvent(() => {
		if (map === undefined) {
			return;
		}

		map.removeInteraction(drawInteraction);

		const source = transactionLayer.drawLayer.getSource();
		const features = source?.getFeatures();

		setIsDrawingState(false);

		// 그려진 피쳐가 있을 경우
		if (features && features.length > 0) {
			setIsOpenState(true);
		}
	});

	const handleSubmit: Func<TransactionFormParams> = ({ address, name }) => {
		const features = transactionLayer.drawLayer.getSource()?.getFeatures() ?? [];

		if (map === undefined || features.length === 0) {
			return;
		}

		const polygons = features
			.map((feature) => feature.getGeometry())
			.filter((geometry): geometry is Polygon => geometry instanceof Polygon);

		if (polygons.length === 0) {
			return;
		}

		mutate({
			data: getBuildingInsertXml({ address, name, polygons, srsName: map.getView().getProjection().getCode() })
		});
	};

	const handleOpenChange: Func<boolean> = (isOpen) => {
		if (!isOpen) {
			transactionLayer.drawLayer.getSource()?.clear();
		}

		setIsOpenState(isOpen);
	};

	useEffect(() => {
		if (!isDrawingState) {
			return;
		}

		const handleKeyUp = (e: KeyboardEvent): void => {
			if (e.code === 'Escape') {
				handleDrawEnd();
			}
		};

		const handleContextMenu = (e: MouseEvent): void => {
			e.preventDefault();

			handleDrawEnd();
		};

		document.addEventListener('keyup', handleKeyUp);
		document.addEventListener('contextmenu', handleContextMenu);

		return () => {
			document.removeEventListener('keyup', handleKeyUp);
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, [isDrawingState]);

	useEffect(
		() => () => {
			map?.removeInteraction(drawInteraction);
		},
		[map]
	);

	return (
		<>
			<Button data-testid="TransactionInsertButton" disabled={isDrawingState} onClick={handleClick}>
				<PlusIcon />
			</Button>

			<TransactionFormDialog
				cta="추가"
				description="그린 도형에 연결할 건물 정보를 입력해 주세요."
				loading={isPending}
				onOpenChange={handleOpenChange}
				onSubmit={handleSubmit}
				open={isOpenState}
				title="트랜잭션 삽입"
			/>

			{isDrawingState ? (
				<div className="pointer-events-none fixed top-14 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black px-2.5 py-0.5 text-white text-xs">
					ESC 또는 오른쪽 마우스 버튼을 눌러 종료하세요.
				</div>
			) : null}
		</>
	);
}
