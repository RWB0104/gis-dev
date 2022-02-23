/**
 * 애플리케이션 컴포넌트
 *
 * @author RWB
 * @since 2022.02.13 Sun 21:45:23
 */

import { ReactElement, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
			<BrowserRouter basename='gis-dev'>
				<Header />

				<Switch>
					<Route exact path='/' component={ROOT} />
					<Route path='/osm/' component={OSM} />
					<Route path='/map-info/' component={MapInfo} />
					<Route path='/geolocation/' component={Geolocation} />
					<Route path='/feature/' component={Feature} />
					<Route path='/wfs/' component={WFS} />
					<Route path='/wms/' component={WMS} />
					<Route path='/wfs-popup/' component={WFSPopup} />
					<Route path='/wms-popup/' component={WMSPopup} />
					<Route path='/transaction-insert/' component={WFSTransactionInsert} />
				</Switch>
			</BrowserRouter>
		</HelmetProvider>
	);
}

export default App;