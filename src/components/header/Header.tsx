/**
 * 헤더 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:34:00
 */

import { FaArrowLeft } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { TITLE } from '../../common/env';
import './Header.scss';

interface SubProps
{
	isRoot: boolean
}

/**
 * 헤더 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function Header(): JSX.Element
{
	const { pathname } = useLocation();

	return (
		<header>
			<GoHome isRoot={pathname === '/'} />

			<img alt='logo' src='/gis-dev/logo.png' />

			<h1>{TITLE}</h1>
		</header>
	);
}

/**
 * 홈 버튼
 *
 * @param {SubProps} param0: 프로퍼티
 *
 * @returns {JSX.Element | null} JSX
 */
function GoHome({ isRoot }: SubProps): JSX.Element | null
{
	return isRoot ? null : (<Link to='/'><FaArrowLeft /></Link>);
}