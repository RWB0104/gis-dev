/**
 * 지오로케이션 버튼 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.12 Sun 19:51:06
 */

'use client';

import BasicIconButton from '@gis-dev/components/atom/BasicIconButton';
import { MapContext } from '@gis-dev/script/context/map';
import { modalStore } from '@gis-dev/script/states/modal';

import LocationSearching from '@mui/icons-material/LocationSearching';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import proj4 from 'proj4';
import { MouseEventHandler, ReactNode, useCallback, useContext, useState } from 'react';

import styles from './GeolocationButton.module.scss';

const cn = classNames.bind(styles);

/**
 * 지오로케이션 버튼 organism 컴포넌트 반환 메서드
 *
 * @returns {ReactNode} ReactNode
 */
export default function GeolocationButton(): ReactNode
{
	const { map } = useContext(MapContext);

	const { setModal } = modalStore();

	const [ disabledState, setDisabledState ] = useState(false);

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		// 맵이 유효할 경우
		if (map)
		{
			setDisabledState(true);

			navigator.geolocation.getCurrentPosition((position) =>
			{
				const { latitude, longitude } = position.coords;
				const epsg = map.getView().getProjection().getCode();
				const zoom = map.getView().getZoom() || 0;

				const coord = proj4('EPSG:4326', epsg, [ longitude, latitude ]);

				map.getView().animate(
					{
						center: coord,
						duration: 2000
					}
				);

				map.getView().animate(
					{
						duration: 1000,
						zoom: zoom - 3
					},
					{
						duration: 1000,
						zoom
					},
					() =>
					{
						setDisabledState(false);
					}
				);
			}, () =>
			{
				setModal({
					body: <Typography variant='caption'>지오로케이션 호출에 실패했습니다.</Typography>,
					title: '지오로케이션 실패',
					type: 'error'
				});

				setDisabledState(false);
			}, { enableHighAccuracy: true });
		}
	}, [ map, setDisabledState, setModal ]);

	return (
		<BasicIconButton bgcolor='limegreen' data-component='GeolocationButton' disabled={disabledState} onClick={handleClick}>
			<LocationSearching className={cn({ icon: disabledState })} htmlColor='white' />
		</BasicIconButton>
	);
}