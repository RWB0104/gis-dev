/**
 * OSM 레이어 모듈
 *
 * @author RWB
 * @since 2026.10.19 월 17:07:32
 */

import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';

export const osmLayer = new TileLayer({
	properties: { name: 'base-osm' },
	source: new OSM({ attributions: '<p>Developed by <a href="https://itcode.dev" target="_blank">RWB</a></p>' }),
	zIndex: 1
});
