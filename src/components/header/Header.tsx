/**
 * 헤더 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:34:00
 */

import { ReactElement } from 'react';
import './Header.scss';

/**
 * 헤더 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function Header(): ReactElement
{
	return (
		<header>
			<img src="/gis-dev/logo.png" />

			<h1>TITLE</h1>
		</header>
	);
}