/**
 * 맵 컨텍스트 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.20 화 12:59:13
 */

import type { Map as OlMap } from 'ol';
import { createContext } from 'react';

export interface MapContextProps {
	/**
	 * 맵
	 */
	map?: OlMap;
}

export const MapContext = createContext<MapContextProps>({});
