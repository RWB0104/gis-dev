/**
 * 트랜잭션 삭제 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.28 수 18:02:17
 */

import { TrashIcon } from 'lucide-react';
import { use } from 'react';

import { useWfsTransaction } from '@gis-dev/api-pack/generated/react-query/api/wfs/wfs';
import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { getBuildingDeleteXml, refreshWfsLayer } from '@gis-dev/openlayers-service-pack/func/transaction';
import { useSelectedFeature } from '@gis-dev/openlayers-service-pack/hooks/selectedFeature';
import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { toast } from '@gis-dev/shadcn-ui-pack/components/ui/toast';

/**
 * 트랜잭션 삭제 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionDeleteButton(): React.JSX.Element {
	const { map } = use(MapContext);

	const { clear, feature } = useSelectedFeature();

	const { isPending, mutate } = useWfsTransaction({
		axios: {
			headers: {
				'Content-Type': 'text/plain;charset=UTF-8'
			}
		},
		mutation: {
			onError: () => {
				toast.add({ description: '요청에 실패했습니다. 잠시 후 다시 시도해주세요.', title: 'Delete failed' });
			},
			onSuccess: ({ data }) => {
				if (data.includes('ExceptionReport')) {
					toast.add({ description: '서버가 요청을 처리하지 못했습니다.', title: 'Delete failed' });

					return;
				}

				toast.add({ description: '삭제했습니다.', title: 'Delete success' });

				refreshWfsLayer(map);
				clear();
			}
		}
	});

	const handleClick = () => {
		const id = feature?.getId();
		if (id === undefined) {
			return;
		}

		mutate({
			data: getBuildingDeleteXml(`${id}`)
		});
	};

	return (
		<Button
			aria-label="도형 삭제"
			className="bg-red-500 text-white hover:bg-red-500/90 focus-visible:ring-red-500/40"
			data-testid="TransactionDeleteButton"
			disabled={feature === undefined || isPending}
			onClick={handleClick}
		>
			<TrashIcon />
		</Button>
	);
}
