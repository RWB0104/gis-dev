/**
 * Google page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 18:18:15
 */

import type React from 'react';

import { seoulView } from '@gis-dev/openlayers-service-pack/func/view';

import GoogleLayer from '#/atom/GoogleLayer';
import MapProvider from '#/organism/map/MapProvider';

/**
 * Google page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GooglePage(): React.JSX.Element {
	return (
		<MapProvider
			options={{
				view: seoulView
			}}
		>
			<GoogleLayer />
		</MapProvider>
	);
}
