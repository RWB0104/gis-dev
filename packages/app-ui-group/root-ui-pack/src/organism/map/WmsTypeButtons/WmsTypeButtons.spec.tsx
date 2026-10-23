/**
 * WMS 타입 버튼 그룹 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.23 금 12:40:00
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { Map as OlMap } from 'ol';
import type { ComponentProps } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { wmsLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import WmsTypeButtons from '.';

const ACTIVE_CLS = 'bg-sky-400';

/**
 * 맵 컨텍스트로 감싸 WmsTypeButtons를 렌더링하는 메서드
 */
function renderButtons(map?: OlMap, props?: ComponentProps<typeof WmsTypeButtons>): void {
	render(
		<MapContext value={map === undefined ? {} : { map }}>
			<WmsTypeButtons {...props} />
		</MapContext>
	);
}

/**
 * 타일, 이미지 버튼을 반환하는 메서드
 */
function getButtons(): { image: HTMLElement; tile: HTMLElement } {
	const [tile, image] = screen.getAllByRole('button') as [HTMLElement, HTMLElement];

	return { image, tile };
}

describe('[@gis-dev/root-ui-pack] WmsTypeButtons', () => {
	let map: OlMap;

	beforeEach(() => {
		map = new OlMap();
	});

	afterEach(() => {
		map.getLayers().clear();
	});

	it('타일, 이미지 버튼 두 개를 그룹으로 렌더링한다', () => {
		renderButtons();

		expect(screen.getByRole('group')).toBeInTheDocument();
		expect(screen.getAllByRole('button')).toHaveLength(2);
	});

	it('각 버튼에 타입 값을 지정한다', () => {
		renderButtons();

		const { image, tile } = getButtons();

		expect(tile).toHaveAttribute('value', 'tile');
		expect(image).toHaveAttribute('value', 'image');
	});

	it('처음에는 타일 버튼이 활성화되어 있다', () => {
		renderButtons();

		const { image, tile } = getButtons();

		expect(tile).toHaveClass(ACTIVE_CLS);
		expect(image).not.toHaveClass(ACTIVE_CLS);
	});

	it('이미지 버튼을 클릭하면 이미지 버튼이 활성화된다', () => {
		renderButtons();

		const { image, tile } = getButtons();

		fireEvent.click(image);

		expect(image).toHaveClass(ACTIVE_CLS);
		expect(tile).not.toHaveClass(ACTIVE_CLS);
	});

	it('다시 타일 버튼을 클릭하면 타일 버튼이 활성화된다', () => {
		renderButtons();

		const { image, tile } = getButtons();

		fireEvent.click(image);
		fireEvent.click(tile);

		expect(tile).toHaveClass(ACTIVE_CLS);
		expect(image).not.toHaveClass(ACTIVE_CLS);
	});

	it('클릭하면 전달된 onButtonClick을 호출한다', () => {
		const onButtonClick = vi.fn();

		renderButtons(undefined, { onButtonClick });

		fireEvent.click(getButtons().image);

		expect(onButtonClick).toHaveBeenCalledOnce();
	});

	it('onButtonClick이 없어도 클릭이 동작한다', () => {
		renderButtons();

		const { image } = getButtons();

		fireEvent.click(image);

		expect(image).toHaveClass(ACTIVE_CLS);
	});

	it('buttonClassName을 두 버튼 모두에 적용한다', () => {
		renderButtons(undefined, { buttonClassName: 'custom' });

		const { image, tile } = getButtons();

		expect(tile).toHaveClass('custom');
		expect(image).toHaveClass('custom');
	});

	it('나머지 속성을 버튼 그룹에 전달한다', () => {
		renderButtons(undefined, { id: 'wms-type' });

		expect(screen.getByRole('group')).toHaveAttribute('id', 'wms-type');
	});

	it('맵이 있으면 마운트 시 타일 레이어만 추가한다', () => {
		renderButtons(map);

		const layers = map.getAllLayers();

		expect(layers).toContain(wmsLayer.sejongTileWmsLayer);
		expect(layers).not.toContain(wmsLayer.sejongImageWmsLayer);
	});

	it('이미지 버튼을 클릭하면 타일 레이어를 제거하고 이미지 레이어를 추가한다', () => {
		renderButtons(map);

		fireEvent.click(getButtons().image);

		const layers = map.getAllLayers();

		expect(layers).toContain(wmsLayer.sejongImageWmsLayer);
		expect(layers).not.toContain(wmsLayer.sejongTileWmsLayer);
	});

	it('다시 타일 버튼을 클릭하면 이미지 레이어를 제거하고 타일 레이어를 추가한다', () => {
		renderButtons(map);

		fireEvent.click(getButtons().image);
		fireEvent.click(getButtons().tile);

		const layers = map.getAllLayers();

		expect(layers).toContain(wmsLayer.sejongTileWmsLayer);
		expect(layers).not.toContain(wmsLayer.sejongImageWmsLayer);
	});

	it('같은 버튼을 반복해서 눌러도 레이어는 하나만 유지한다', () => {
		renderButtons(map);

		fireEvent.click(getButtons().tile);
		fireEvent.click(getButtons().tile);

		expect(map.getAllLayers()).toHaveLength(1);
	});

	it('맵이 없어도 에러 없이 동작한다', () => {
		renderButtons();

		expect(() => fireEvent.click(getButtons().image)).not.toThrow();
	});
});
