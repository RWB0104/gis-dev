/**
 * WMS 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 17:18:39
 */

'use client';

import { useGetFeatureInfo } from '@gis-dev/api/wfs';
import BasicPopup, { BasicPopupBody } from '@gis-dev/components/molecule/BasicPopup';
import { dateConvert } from '@gis-dev/script/common/util';
import { MapContext } from '@gis-dev/script/context/map';
import { Overlay } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { GeoJSON } from 'ol/format';
import { ImageWMS, TileWMS } from 'ol/source';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const POPUP_ID = 'popup';

/**
 * WMS 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WMSPopup(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ urlState, setUrlState ] = useState<string | undefined>();
	const [ featureState, setFeatureState ] = useState<FeatureLike | undefined>();

	const { data } = useGetFeatureInfo(urlState || '', { enabled: urlState !== undefined });

	const handleClick = useCallback(() =>
	{
		setFeatureState(undefined);
	}, [ setFeatureState ]);

	const list: BasicPopupBody[] | undefined = useMemo(() =>
	{
		// 피쳐가 유효할 경우
		if (featureState)
		{
			return [
				{
					key: 'ID',
					value: featureState.getId() || '-'
				},
				{
					key: '고유일련변호',
					value: featureState.get('bul_man_no') || '-'
				},
				{
					key: '고시일자',
					value: dateConvert(featureState.get('ntfc_de') || '-')
				}
			];
		}

		return undefined;
	}, [ featureState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const overlay = new Overlay({
				autoPan: { animation: { duration: 250 } },
				element: document.getElementById(POPUP_ID) || undefined,
				id: 'popup',
				offset: [ 0, -20 ],
				positioning: 'bottom-center'
			});

			map.addOverlay(overlay);
		}
	}, [ map, setFeatureState ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			map.on('singleclick', async (e) =>
			{
				const wmsLayer = map.getAllLayers().find((layer) => layer.get('name') === 'wms');

				const source = wmsLayer?.getSource() as TileWMS | ImageWMS | null;

				const url = source?.getFeatureInfoUrl(e.coordinate, map.getView().getResolution() || 0, 'EPSG:3857', {
					INFO_FORMAT: 'application/json',
					QUERY_LAYERS: 'buld_sejong'
				});

				// url이 유효할 경우
				if (url)
				{
					setUrlState(url);
				}

				else
				{
					setUrlState(undefined);
				}
			});
		}
	}, [ map, setUrlState ]);

	useEffect(() =>
	{
		// 응답이 유효할 경우
		if (data)
		{
			// 피쳐가 하나도 없을 경우
			if (data.features.length === 0)
			{
				setFeatureState(undefined);
			}

			// 피쳐가 있을 경우
			else
			{
				const feature = new GeoJSON().readFeature(data.features[0]);

				setFeatureState(feature);
			}
		}
	}, [ data ]);

	useEffect(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			const overlay = map.getOverlayById('popup');

			// 피쳐가 유효할 경우
			if (featureState)
			{
				const geom = featureState.getGeometry();

				// 공간정보가 유효할 경우
				if (geom)
				{
					const [ minX, minY, maxX, maxY ] = geom.getExtent();

					overlay.setPosition([ (maxX + minX) / 2, (maxY + minY) / 2 ]);
				}

				// 아닐 경우
				else
				{
					overlay.setPosition(undefined);
				}
			}

			// 아닐 경우
			else
			{
				overlay.setPosition(undefined);
			}
		}
	}, [ map, featureState ]);

	return (
		<BasicPopup header={featureState?.get('buld_nm')} id={POPUP_ID} list={list} onClose={handleClick} />
	);
}