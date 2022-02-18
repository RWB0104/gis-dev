/**
 * 루트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:49:03
 */

import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { BiCurrentLocation, BiMessageSquareDetail } from 'react-icons/bi';
import { FaInfoCircle, FaMap, FaMapMarkedAlt, FaMapMarkerAlt, FaMinusSquare, FaPenSquare, FaPlusSquare } from 'react-icons/fa';
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
				<Link to='/osm' title='OSM'><FaMapMarkedAlt /> OSM</Link>
				<Link to='/map-info' title='MapInfo'><FaInfoCircle /> MapInfo</Link>
				<Link to='/geolocation' title='Geolocation'><BiCurrentLocation /> Geolocation</Link>
				<Link to='/feature' title='feature'><FaMapMarkerAlt /> Feature</Link>
				<Link to='/wfs' title='WFS'><FaMap /> WFS</Link>
				<Link to='/wms' title='WMS'><FaMap /> WMS</Link>
				<Link to='/wfs-popup' title='WMS Popup'><BiMessageSquareDetail /> WFS Popup</Link>
				<Link to='/wms-popup' title='WMS Popup'><BiMessageSquareDetail /> WMS Popup</Link>
				<Link to='/transaction-insert' title='WFS Transaction Insert'><FaPlusSquare /> WFS-T Insert</Link>
				<Link to='/transaction-update' title='WFS Transaction Update'><FaPenSquare /> WFS-T Update</Link>
				<Link to='/transaction-delete' title='WFS Transaction Delete'><FaMinusSquare /> WFS-T Delete</Link>
			</article>
		</section>
	);
}