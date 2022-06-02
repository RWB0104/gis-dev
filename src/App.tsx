/**
 * 애플리케이션 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:45:23
 */

import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';

import Header from './components/header/Header';
import ClusterMap from './pages/ClusterMap';
import Feature from './pages/Feature';
import FeatureClick from './pages/FeatureClick';
import Geolocation from './pages/Geolocation';
import HeatMap from './pages/HeatMap';
import MapInfo from './pages/MapInfo';
import OSM from './pages/OSM';
import ROOT from './pages/ROOT';
import VWorld from './pages/VWorld';
import WebGL from './pages/WebGL';
import WFS from './pages/WFS';
import WFSPopup from './pages/WFSPopup';
import WFSTransactionDelete from './pages/WFSTransactionDelete';
import WFSTransactionInsert from './pages/WFSTransactionInsert';
import WFSTransactionUpdate from './pages/WFSTransactionUpdate';
import WMS from './pages/WMS';
import WMSPopup from './pages/WMSPopup';

/**
 * 애플리케이션 JSX 반환 메서드
 *
 * @returns {JSX.Element} JSX
 */
export default function App(): JSX.Element
{
	useEffect(() =>
	{
		document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01).toString());

		window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01).toString()));
	}, []);

	return (
		<HelmetProvider>
			<BrowserRouter basename='gis-dev'>
				<Header />

				<Switch>
					<Route component={ROOT} path='/' exact />
					<Route component={OSM} path='/osm/' />
					<Route component={VWorld} path='/vworld/' />
					<Route component={MapInfo} path='/map-info/' />
					<Route component={Geolocation} path='/geolocation/' />
					<Route component={Feature} path='/feature/' />
					<Route component={WFS} path='/wfs/' />
					<Route component={WMS} path='/wms/' />
					<Route component={FeatureClick} path='/feature-click/' />
					<Route component={WFSPopup} path='/wfs-popup/' />
					<Route component={WMSPopup} path='/wms-popup/' />
					<Route component={WFSTransactionInsert} path='/transaction-insert/' />
					<Route component={WFSTransactionUpdate} path='/transaction-update/' />
					<Route component={WFSTransactionDelete} path='/transaction-delete/' />
					<Route component={ClusterMap} path='/cluster-map/' />
					<Route component={HeatMap} path='/heat-map/' />
					<Route component={WebGL} path='/webgl/' />
				</Switch>
			</BrowserRouter>
		</HelmetProvider>
	);
}