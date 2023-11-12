/**
 * 맵 컨텍스트 모듈
 *
 * @author RWB
 * @since 2023.11.11 Sat 11:45:40
 */

import { Map } from 'ol';
import { Dispatch, SetStateAction, createContext } from 'react';

export interface MapContextProps
{
	/**
	 * 맵
	 */
	map?: Map;

	/**
	 * 맵 할당 메서드
	 */
	setMap?: Dispatch<SetStateAction<Map | undefined>>;
}

export const MapContext = createContext<MapContextProps>({});