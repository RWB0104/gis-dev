/**
 * 루트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:49:03
 */

import { Link } from 'react-router-dom';
import { BiCurrentLocation, BiMessageSquareDetail } from 'react-icons/bi';
import { FaInfoCircle, FaMap, FaMapMarkedAlt, FaMapMarkerAlt, FaMinusSquare, FaPenSquare, FaPlusSquare, FaTemperatureHigh } from 'react-icons/fa';
import './ROOT.scss';
import Meta from '../components/global/Meta';
import { MdAdsClick, MdOutlineGroupWork } from 'react-icons/md';
import { GiSouthKorea } from 'react-icons/gi';
import { FiZap } from 'react-icons/fi';

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

			<video src='/gis-dev/background.mp4' muted autoPlay loop onCanPlay={(e) =>
			{
				const target = e.target as HTMLVideoElement;
				target.muted = true;
				target.play();
			}} />

			<article>
				<h3>List</h3>

				<Link to='/osm' title='OSM'><FaMapMarkedAlt /> OSM</Link>
				<Link to='/vworld' title='VWorld'><GiSouthKorea /> VWorld</Link>
				<Link to='/map-info' title='MapInfo'><FaInfoCircle /> MapInfo</Link>
				<Link to='/geolocation' title='Geolocation'><BiCurrentLocation /> Geolocation</Link>
				<Link to='/feature' title='feature'><FaMapMarkerAlt /> Feature</Link>
				<Link to='/wfs' title='WFS'><FaMap /> WFS</Link>
				<Link to='/wms' title='WMS'><FaMap /> WMS</Link>
				<Link to='/feature-click' title='Feature Click'><MdAdsClick /> Feature Click</Link>
				<Link to='/wfs-popup' title='WFS Popup'><BiMessageSquareDetail /> WFS Popup</Link>
				<Link to='/wms-popup' title='WMS Popup'><BiMessageSquareDetail /> WMS Popup</Link>
				<Link to='/transaction-insert' title='WFS Transaction Insert'><FaPlusSquare /> WFS-T Insert</Link>
				<Link to='/transaction-update' title='WFS Transaction Update'><FaPenSquare /> WFS-T Update</Link>
				<Link to='/transaction-delete' title='WFS Transaction Delete'><FaMinusSquare /> WFS-T Delete</Link>
				<Link to='/cluster-map' title='Cluster Map'><MdOutlineGroupWork /> Cluster Map</Link>
				<Link to='/heat-map' title='Heat Map'><FaTemperatureHigh /> Heat Map</Link>
				<Link to='/webgl' title='WebGL'><FiZap /> WebGL</Link>
			</article>
		</section>
	);
}