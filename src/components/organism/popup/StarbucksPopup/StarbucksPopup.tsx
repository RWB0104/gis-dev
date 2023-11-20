/**
 * 스타벅스 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 01:54:45
 */

'use client';

import BasicPopup, { BasicPopupBody } from '@gis-dev/components/molecule/BasicPopup';
import ImageViewer from '@gis-dev/components/molecule/ImageViewer';
import { MapContext } from '@gis-dev/script/context/map';
import { Overlay } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { MouseEventHandler, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const POPUP_ID = 'popup';

/**
 * 스타벅스 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function StarbucksPopup(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ featureState, setFeatureState ] = useState<FeatureLike | undefined>();
	const [ imageState, setImageState ] = useState<string | undefined>();

	const handleClick = useCallback(() =>
	{
		setFeatureState(undefined);
	}, [ setFeatureState ]);

	const handleThumbClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		setImageState(`https://www.starbucks.co.kr/${featureState?.get('thumbnail')}`);
	}, [ featureState, setImageState ]);

	const handleClose = useCallback(() =>
	{
		setImageState(undefined);
	}, [ setImageState ]);

	const list: BasicPopupBody[] | undefined = useMemo(() =>
	{
		// 피쳐가 유효할 경우
		if (featureState)
		{
			const doroAddr = featureState.get('doro_addr') || '-';
			const addr = featureState.get('addr') || '-';
			const tel = featureState.get('tel') || '-';

			return [
				{
					key: 'ID',
					value: featureState.getId() || '-'
				},
				{
					color: 'primary',
					key: '도로명주소',
					link: `https://map.naver.com/p/search/${encodeURIComponent(doroAddr)}`,
					value: doroAddr
				},
				{
					color: 'primary',
					key: '지번주소',
					link: `https://map.naver.com/p/search/${encodeURIComponent(addr)}`,
					value: addr
				},
				{
					color: 'green',
					key: '연락처',
					link: `tel:${tel}`,
					value: tel
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
					map.forEachFeatureAtPixel(e.pixel, (cluster) =>
					{
						const features: FeatureLike[] = cluster.get('features');
						const feature = features[0];

						// 클러스터 피쳐 갯수가 하나가 아닐 경우
						if (features.length !== 1)
						{
							setFeatureState(undefined);
						}

						// 해당 객체의 아이디가 point_starbucks으로 시작할 경우
						else if (feature.getId()?.toString().startsWith('point_starbucks'))
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
		<>
			<BasicPopup
				header={featureState?.get('name') || '-'}
				id={POPUP_ID}
				list={list}
				thumb={`https://www.starbucks.co.kr/${featureState?.get('thumbnail')}`}
				onClose={handleClick}
				onThumbClick={handleThumbClick}
			/>

			<ImageViewer image={imageState} onClick={handleClose} />
		</>
	);
}