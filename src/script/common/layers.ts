/**
 * 레이어 모듈
 *
 * @author RWB
 * @since 2023.11.11 Sat 03:09:30
 */

import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export const osmLayer = new TileLayer({
	properties: { name: 'base-osm' },
	source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
	zIndex: 1
});