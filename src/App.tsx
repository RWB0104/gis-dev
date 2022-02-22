/**
 * 애플리케이션 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:45:23
 */

import { ReactElement, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import ROOT from './pages/ROOT';
import OSM from './pages/OSM';
import MapInfo from './pages/MapInfo';
import Geolocation from './pages/Geolocation';
import Feature from './pages/Feature';
import WFS from './pages/WFS';
import WMS from './pages/WMS';
import WFSPopup from './pages/WFSPopup';
import WMSPopup from './pages/WMSPopup';
import WFSTransactionInsert from './pages/WFSTransactionInsert';
import './App.scss';

/**
 * 애플리케이션 ReactElement 반환 메서드
 *
 * @returns {ReactElement} ReactElement
 */
function App(): ReactElement
{
	useEffect(() =>
	{
		document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01).toString());

		window.addEventListener('resize', () => document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01).toString()));
	}, []);

	return (
		<HelmetProvider>
			<BrowserRouter>
				<Header />

				<Routes>
					<Route path='/' element={<ROOT />} />
					<Route path='/osm/' element={<OSM />} />
					<Route path='/map-info/' element={<MapInfo />} />
					<Route path='/geolocation/' element={<Geolocation />} />
					<Route path='/feature/' element={<Feature />} />
					<Route path='/wfs/' element={<WFS />} />
					<Route path='/wms/' element={<WMS />} />
					<Route path='/wfs-popup/' element={<WFSPopup />} />
					<Route path='/wms-popup/' element={<WMSPopup />} />
					<Route path='/transaction-insert/' element={<WFSTransactionInsert />} />
				</Routes>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;
