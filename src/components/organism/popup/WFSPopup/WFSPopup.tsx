/**
 * WFS 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 15:59:04
 */

import BasicPopup, { BasicPopupBody } from '@gis-dev/components/molecule/BasicPopup';
import { dateConvert } from '@gis-dev/script/common/util';
import { MapContext } from '@gis-dev/script/context/map';
import { Overlay } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const POPUP_ID = 'popup';

/**
 * WFS 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function WFSPopup(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ featureState, setFeatureState ] = useState<FeatureLike | undefined>();

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
			map.on('singleclick', (e) =>
			{
				// 해당 픽셀에 객체가 있을 경우
				if (map.hasFeatureAtPixel(e.pixel))
				{
					map.forEachFeatureAtPixel(e.pixel, (feature) =>
					{
						// 해당 객체의 아이디가 buld_sejong으로 시작할 경우
						if (feature.getId()?.toString().startsWith('buld_sejong'))
						{
							setFeatureState(feature);
						}
					});
				}

				// 없을 경우
				else
				{
					setFeatureState(undefined);
				}
			});
		}
	}, [ map ]);

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