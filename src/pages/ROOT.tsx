/**
 * 루트 페이지 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:49:03
 */

import { useState } from 'react';
import { BiCurrentLocation, BiMessageSquareDetail } from 'react-icons/bi';
import { FaInfoCircle, FaMap, FaMapMarkedAlt, FaMapMarkerAlt, FaMinusSquare, FaPenSquare, FaPlusSquare, FaTemperatureHigh } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';
import { GiSouthKorea } from 'react-icons/gi';
import { MdAdsClick, MdOutlineGroupWork, MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

import './ROOT.scss';

import Meta from '../components/global/Meta';
import Card from '../components/home/Card';

/**
 * 루트 페이지 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function ROOT(): JSX.Element
{
	const [ pageState, setPageState ] = useState(1);

	return (
		<section className='page' id='root'>
			<Meta description='OpenLayers6 예제 모음' title='Home' url='/' />

			<video
				src='/gis-dev/background.mp4'
				autoPlay
				loop
				muted
				onCanPlay={(e) =>
				{
					const target = e.target as HTMLVideoElement;
					target.muted = true;
					target.play();
				}}
			/>

			<article>
				<div className='left remote'>
					<button disabled={pageState === 1} onClick={() => setPageState(pageState - 1)}><MdOutlineArrowBackIos /></button>
				</div>

				<div className='middle'>
					<div data-show={pageState === 1}>
						<Card src='https://user-images.githubusercontent.com/50317129/171675095-54c8c18a-2bd4-4979-928d-e55c4184105d.png' title='OSM' to='/osm'>
							<FaMapMarkedAlt /> OSM
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171675864-9d886ca4-da97-4041-8854-8b2fa7593f61.png' title='VWorld' to='/vworld'>
							<GiSouthKorea /> VWorld
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171676198-449a45b9-b2d3-4105-ba28-420fc96f7bc1.png' title='MapInfo' to='/map-info'>
							<FaInfoCircle /> MapInfo
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171676793-fa995885-32d7-4f0a-bb36-0475516ac19d.png' title='Geolocation' to='/geolocation'>
							<BiCurrentLocation /> Geolocation
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171676976-63577e9d-26d5-49ab-8826-7d571c2ee169.png' title='Feature' to='/feature'>
							<FaMapMarkerAlt /> Feature
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171677267-71a2d78a-bf5f-437e-b00d-81fa9af3ea58.png' title='WFS' to='/wfs'>
							<FaMap /> WFS
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171677419-bbf52eac-e3f5-4d71-b171-a28c961dd820.png' title='WMS' to='/wms'>
							<FaMap /> WMS
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171677600-44136c02-a35b-4c3f-ab70-fb8fe313ae2b.png' title='Feature Click' to='/feature-click'>
							<MdAdsClick /> Feature Click
						</Card>
					</div>

					<div data-show={pageState === 2}>
						<Card src='https://user-images.githubusercontent.com/50317129/171677734-451d4297-c7cf-4821-89d6-35edc84252b9.png' title='WFS Popup' to='/wfs-popup'>
							<BiMessageSquareDetail /> WFS Popup
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171677876-7307d8a6-3442-4d15-b44a-574eee85947b.png' title='WMS Popup' to='/wms-popup'>
							<BiMessageSquareDetail /> WMS Popup
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171678036-b7810925-d0a0-4144-aa8e-e77f37e78d18.png' title='WFS Transaction Insert' to='/transaction-insert'>
							<FaPlusSquare /> WFS-T Insert
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171678295-5bf7fedb-9e78-49b8-8519-8a0afc37dac4.png' title='WFS Transaction Update' to='/transaction-update'>
							<FaPenSquare /> WFS-T Update
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171678189-b3e5262c-5670-42c9-8f95-51145ec395ec.png' title='WFS Transaction Delete' to='/transaction-delete'>
							<FaMinusSquare /> WFS-T Delete
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171678364-6b66062f-143b-4076-a2ee-573d0f438172.png' title='Cluster Map' to='/cluster-map'>
							<MdOutlineGroupWork /> Cluster Map
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171678468-c495473f-1f23-4dd6-a7df-efeec8adc9bc.png' title='Heat Map' to='/heat-map'>
							<FaTemperatureHigh /> Heat Map
						</Card>

						<Card src='https://user-images.githubusercontent.com/50317129/171678561-4f173439-cf86-48e6-89be-d01b839b8762.png' title='WebGL' to='/webgl'>
							<FiZap /> WebGL
						</Card>
					</div>
				</div>

				<div className='right remote'>
					<button disabled={pageState === 2} onClick={() => setPageState(pageState + 1)}><MdOutlineArrowForwardIos /></button>
				</div>
			</article>
		</section>
	);
}