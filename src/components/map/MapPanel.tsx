/**
 * 맵 패널 컴포넌트
 *
 * @author RWB
 * @since 2022.03.01 Tue 01:12:41
 */

import { Map } from 'ol';
import { useState } from 'react';
import { FaRegWindowMinimize } from 'react-icons/fa';
import { FiMaximize } from 'react-icons/fi';
import './MapPanel.scss';

interface Props
{
	map?: Map,
	children?: JSX.Element | JSX.Element[]
}

export default function MapPanel({ map, children }: Props)
{
	const [ show, setShow ] = useState(true);

	const sizeClick = () =>
	{
		setShow(!show);
	};

	return map ? (
		<div className='map-panel' data-show={show}>
			<div className='item' data-name='header'>
				<button onClick={sizeClick}>{show ? <FaRegWindowMinimize /> : <FiMaximize />}</button>
			</div>

			{children}
		</div>
	) : null;
}