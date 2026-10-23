/**
 * Google page 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 18:18:15
 */

import type React from 'react';

import GoogleMap from '#/organism/extended-map/GoogleMap';

/**
 * Google page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GooglePage(): React.JSX.Element {
	return (
		<main data-testid="GooglePage">
			<GoogleMap />
		</main>
	);
}
