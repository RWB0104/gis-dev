/**
 * 루트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:49:03
 */

import { Link } from 'react-router-dom';
import { BiCurrentLocation, BiMessageSquareDetail } from 'react-icons/bi';
import { FaInfoCircle, FaMap, FaMapMarkedAlt, FaMapMarkerAlt, FaMinusSquare, FaPenSquare, FaPlusSquare } from 'react-icons/fa';
import './ROOT.scss';
import Meta from '../components/global/Meta';

/**
 * 루트 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ROOT()
{
	return (
		<section id='root' className='page'>
			<Meta title='Home' description='OpenLayers6 예제 모음' url='/' />

			<video src='/gis-dev/background.mp4' muted autoPlay loop ref={(ref) =>
			{
				// ref가 유효할 경우
				if (ref)
				{
					ref.muted = true;
					ref.play();
				}
			}} />

			<article>
				<h3>List</h3>
				<Link to='/osm' title='OSM'><FaMapMarkedAlt /> OSM</Link>
				<Link to='/map-info' title='MapInfo'><FaInfoCircle /> MapInfo</Link>
				<Link to='/geolocation' title='Geolocation'><BiCurrentLocation /> Geolocation</Link>
				<Link to='/feature' title='feature'><FaMapMarkerAlt /> Feature</Link>
				<Link to='/wfs' title='WFS'><FaMap /> WFS</Link>
				<Link to='/wms' title='WMS'><FaMap /> WMS</Link>
				<Link to='/feature-click' title='Feature Click'><FaMap /> Feature Click</Link>
				<Link to='/wfs-popup' title='WFS Popup'><BiMessageSquareDetail /> WFS Popup</Link>
				<Link to='/wms-popup' title='WMS Popup'><BiMessageSquareDetail /> WMS Popup</Link>
				<Link to='/transaction-insert' title='WFS Transaction Insert'><FaPlusSquare /> WFS-T Insert</Link>
				<Link to='/transaction-update' title='WFS Transaction Update'><FaPenSquare /> WFS-T Update</Link>
				<Link to='/transaction-delete' title='WFS Transaction Delete'><FaMinusSquare /> WFS-T Delete</Link>
				<Link to='/advanced' title='Advanced Map'><FaMinusSquare /> Advanced Map</Link>
			</article>
		</section>
	);
}