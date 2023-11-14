/**
 * 맵 팝업 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.14 Tue 15:59:04
 */

import { MapContext } from '@gis-dev/script/context/map';
import Close from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Overlay } from 'ol';
import { FeatureLike } from 'ol/Feature';
import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';

const POPUP_ID = 'popup';

/**
 * 맵 팝업 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function MapPopup(): ReactNode
{
	const { map } = useContext(MapContext);

	const [ featureState, setFeatureState ] = useState<FeatureLike | undefined>();

	const handleClick = useCallback(() =>
	{
		setFeatureState(undefined);
	}, [ setFeatureState ]);

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
		<Paper data-component='MapPopup' id={POPUP_ID}>
			<Stack gap={1} maxWidth={200} padding={1}>
				<Stack alignItems='center' direction='row' gap={1} justifyContent='space-between'>
					<Typography color='primary' fontWeight='bold'>{featureState?.get('buld_nm') || '-'}</Typography>

					<IconButton size='small' onClick={handleClick}>
						<Close fontSize='inherit' />
					</IconButton>
				</Stack>

				<Stack>
					<Stack alignItems='center' direction='row' gap={1}>
						<Typography fontWeight='bold' variant='caption' width={70}>ID</Typography>
						<Typography variant='caption'>{featureState?.getId() || '-'}</Typography>
					</Stack>

					<Stack alignItems='center' direction='row' gap={1}>
						<Typography fontWeight='bold' variant='caption' width={70}>건물일련번호</Typography>
						<Typography variant='caption'>{featureState?.get('bul_man_no') || '-'}</Typography>
					</Stack>

					<Stack alignItems='center' direction='row' gap={1}>
						<Typography fontWeight='bold' variant='caption' width={70}>고시일자</Typography>
						<Typography variant='caption'>{featureState?.get('ntfc_de') || '-'}</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	);
}