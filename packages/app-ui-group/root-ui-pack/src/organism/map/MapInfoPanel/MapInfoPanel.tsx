/**
 * 맵 정보 패널 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 14:45:03
 */

'use client';

import { useRef } from 'react';

import { useMapInfo } from '@gis-dev/openlayers-service-pack/hooks/map';

import MapInfoList from '#/molecule/MapInfoList';

/**
 * 맵 정보 패널 organism 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function MapInfoPanel(): React.JSX.Element {
	const bboxRef = useRef<HTMLParagraphElement>(null);
	const centerRef = useRef<HTMLParagraphElement>(null);
	const cursorRef = useRef<HTMLParagraphElement>(null);
	const srsRef = useRef<HTMLParagraphElement>(null);
	const zoomRef = useRef<HTMLParagraphElement>(null);

	useMapInfo({ bbox: bboxRef, center: centerRef, cursor: cursorRef, srs: srsRef, zoom: zoomRef });

	return (
		<MapInfoList
			items={[
				{
					label: '범위 (최소 x y | 최대 x y)',
					ref: bboxRef
				},
				{
					label: '중심 좌표 (x y)',
					ref: centerRef
				},
				{
					label: 'SRS',
					ref: srsRef
				},
				{
					label: '커서 (x y)',
					ref: cursorRef
				},
				{
					label: '줌 레벨',
					ref: zoomRef
				}
			]}
		/>
	);
}
