/**
 * 트랜잭션 수정 맵 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 18:38:41
 */

'use client';

import MapProvider from '@gis-dev/components/organism/global/MapProvider';
import { modifys, selects, snaps } from '@gis-dev/script/map/interactions';
import { wfsLayer } from '@gis-dev/script/map/layers';
import { position3857 } from '@gis-dev/script/map/positions';
import { View } from 'ol';
import { defaults } from 'ol/interaction/defaults';
import { MapOptions } from 'ol/Map';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

/**
 * 트랜잭션 수정 맵 organism 컴포넌트 반환 메서드
 *
 * @param {PropsWithChildren} param0: PropsWithChildren 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionUpdateMap({ children }: PropsWithChildren): ReactNode
{
	const interactions = useMemo(() =>
	{
		const { getWfsSnap } = snaps;
		const { getWfsModify } = modifys;
		const { getWfsClickSelect } = selects;

		const clickSelect = getWfsClickSelect('name');
		const wfsSnap = getWfsSnap(clickSelect.getFeatures());
		const wfsModify = getWfsModify(clickSelect.getFeatures());

		wfsSnap.setActive(false);
		wfsModify.setActive(false);

		return [ clickSelect, wfsSnap, wfsModify ];
	}, []);

	const options: MapOptions = useMemo(() =>
	{
		wfsLayer.wfsTransactionLayer.getSource()?.refresh();

		return {
			interactions: defaults().extend(interactions),
			layers: [ wfsLayer.wfsTransactionLayer ],
			view: new View({
				center: position3857.seoulPosition,
				projection: 'EPSG:3857',
				zoom: 17
			})
		};
	}, [ children ]);

	return (
		<MapProvider options={options} hasCursor>
			{children}
		</MapProvider>
	);
}