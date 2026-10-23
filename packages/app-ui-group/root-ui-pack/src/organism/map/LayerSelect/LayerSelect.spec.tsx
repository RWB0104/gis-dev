/**
 * 레이어 셀렉트 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.21 수 18:50:00
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { Map as OlMap } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import type { ComponentProps } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { baseLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import LayerSelect from '.';

const OVERLAY_NAME = 'overlay-test';

/**
 * 베이스 레이어가 아닌 오버레이 레이어를 생성하는 메서드
 */
function createOverlay(): VectorLayer {
	return new VectorLayer({ properties: { name: OVERLAY_NAME } });
}

/**
 * 맵 컨텍스트로 감싸 LayerSelect를 렌더링하는 메서드
 */
function renderSelect(map?: OlMap, props?: ComponentProps<typeof LayerSelect>): void {
	render(
		<MapContext value={map === undefined ? {} : { map }}>
			<LayerSelect defaultValue="base-google-road" {...props} />
		</MapContext>
	);
}

/**
 * 맵에 올라간 레이어 이름 배열을 반환하는 메서드
 */
function layerNames(map: OlMap): string[] {
	return map.getAllLayers().map((layer) => `${layer.get('name')}`);
}

/**
 * 셀렉트를 열고 라벨에 해당하는 옵션을 선택하는 메서드
 *
 * Base UI Select는 옵션이 hover(활성화)된 뒤에 클릭된 경우에만 선택으로 처리하므로,
 * 실제 사용자 동작처럼 포인터를 옵션 위로 먼저 이동시킨 뒤 클릭한다.
 */
async function chooseOption(label: string): Promise<void> {
	fireEvent.click(screen.getByRole('combobox', { name: '베이스 레이어' }));

	const option = await screen.findByRole('option', { name: label });

	fireEvent.mouseMove(option);
	fireEvent.pointerMove(option);
	fireEvent.click(option);
}

describe('[@gis-dev/root-ui-pack] LayerSelect', () => {
	let map: OlMap;

	beforeEach(() => {
		map = new OlMap({ layers: [baseLayer.googleRoadLayer, createOverlay()] });
	});

	afterEach(() => {
		vi.restoreAllMocks();

		map.getLayers().clear();
	});

	it('LayerSelect 컨테이너를 렌더링한다', () => {
		renderSelect();

		expect(screen.getByTestId('LayerSelect')).toBeInTheDocument();
	});

	it('기본값에 해당하는 라벨을 트리거에 표시한다', () => {
		renderSelect();

		expect(screen.getByRole('combobox', { name: '베이스 레이어' })).toHaveTextContent('Google 로드맵');
	});

	it('열면 베이스 레이어 옵션 여섯 개를 보여준다', async () => {
		renderSelect();

		fireEvent.click(screen.getByRole('combobox', { name: '베이스 레이어' }));

		expect(await screen.findAllByRole('option')).toHaveLength(6);
	});

	it('옵션을 선택하면 전달된 onValueChange를 호출한다', async () => {
		const onValueChange = vi.fn();

		renderSelect(map, { onValueChange });

		await chooseOption('OSM');

		expect(onValueChange).toHaveBeenCalledExactlyOnceWith('base-osm', expect.anything());
	});

	it('옵션을 선택하면 트리거에 선택한 라벨을 표시한다', async () => {
		renderSelect(map);

		await chooseOption('Google 위성지도');

		expect(screen.getByRole('combobox', { name: '베이스 레이어' })).toHaveTextContent('Google 위성지도');
	});

	it('옵션을 선택하면 기존 베이스 레이어를 제거하고 선택한 레이어를 추가한다', async () => {
		renderSelect(map);

		await chooseOption('Google 위성지도');

		expect(layerNames(map)).toEqual([OVERLAY_NAME, 'base-google-satellite']);
	});

	it('OSM을 선택하면 OSM 레이어를 추가한다', async () => {
		renderSelect(map);

		await chooseOption('OSM');

		expect(layerNames(map)).toEqual([OVERLAY_NAME, 'base-osm']);
	});

	it('베이스 레이어가 아닌 레이어는 유지한다', async () => {
		renderSelect(map);

		await chooseOption('Google 하이브리드 맵');

		expect(layerNames(map)).toContain(OVERLAY_NAME);
	});

	it('일치하는 레이어가 없으면 기존 베이스 레이어만 제거한다', async () => {
		vi.spyOn(baseLayer.osmLayer, 'get').mockReturnValue(undefined);

		renderSelect(map);

		await chooseOption('OSM');

		expect(layerNames(map)).toEqual([OVERLAY_NAME]);
	});

	it('맵이 없어도 에러 없이 onValueChange만 호출한다', async () => {
		const onValueChange = vi.fn();

		renderSelect(undefined, { onValueChange });

		await chooseOption('OSM');

		expect(onValueChange).toHaveBeenCalledOnce();
	});
});
