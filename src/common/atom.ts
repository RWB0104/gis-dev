/**
 * 상태 관리 모듈
 *
 * @author RWB
 * @since 2022.02.27 Sun 02:32:21
 */

import { Collection, Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import RenderFeature from 'ol/render/Feature';
import { atom } from 'recoil';

export const featureAtom = atom({
	key: 'feature',
	default: undefined as Feature<Geometry> | RenderFeature | undefined
});

export const featuresAtom = atom({
	key: 'features',
	default: undefined as Collection<Feature<Geometry>> | undefined
});

export const featureIdAtom = atom({
	key: 'featureId',
	default: undefined as string | number | undefined
});

export const showAtom = atom({
	key: 'show',
	default: false
});