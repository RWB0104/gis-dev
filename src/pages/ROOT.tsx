/**
 * 루트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:49:03
 */

import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import './ROOT.scss';

/**
 * 루트 페이지 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
export default function ROOT(): ReactElement
{
	return (
		<section id='root' className='page'>
			<video src='./background.mp4' muted autoPlay loop />

			<article>
				<h3>List</h3>
				<Link to='/osm' title='OSM'>🌍 OSM</Link>
				<Link to='/map-info' title='MapInfo'>🌍 MapInfo</Link>
				<Link to='/geolocation' title='Geolocation'>🌍 Geolocation</Link>
				<Link to='/wfs' title='WFS'>🌍 WFS</Link>
				<Link to='/wms' title='WMS'>🌍 WMS</Link>
			</article>
		</section>
	);
}