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
	default: undefined as Feature<Geometry> | RenderFeature | undefined,
	key: 'feature'
});

export const featuresAtom = atom({
	default: undefined as Collection<Feature<Geometry>> | undefined,
	key: 'features'
});

export const featureIdAtom = atom({
	default: undefined as string | number | undefined,
	key: 'featureId'
});

export const showAtom = atom({
	default: false,
	key: 'show'
});