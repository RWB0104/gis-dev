/**
 * WebGL 타입 버튼 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.30 금 18:30:00
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { Map as OlMap } from 'ol';
import type { ComponentProps } from 'react';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import { baseLayer, wfsLayer } from '@gis-dev/openlayers-service-pack/func/layer';

import WebglTypeButtons from '.';

/**
 * 맵 컨텍스트로 감싸 WebglTypeButtons를 렌더링하는 메서드
 */
function renderButtons(map?: OlMap, props?: ComponentProps<typeof WebglTypeButtons>): void {
	render(
		<MapContext value={map === undefined ? {} : { map }}>
			<WebglTypeButtons {...props} />
		</MapContext>
	);
}

/**
 * 맵에 올라간 도시 레이어 종류를 반환하는 메서드
 */
function cityLayers(map: OlMap): string[] {
	const layers = map.getLayers().getArray();

	return [
		layers.includes(wfsLayer.wfsCityWebglLayer) ? 'webgl' : '',
		layers.includes(wfsLayer.wfsCityVectorLayer) ? 'vector' : ''
	].filter(Boolean);
}

describe('[@gis-dev/root-ui-pack] WebglTypeButtons', () => {
	let map: OlMap;

	beforeEach(() => {
		map = new OlMap({ layers: [baseLayer.googleRoadLayer] });
	});

	afterEach(() => {
		map.getLayers().clear();
	});

	it('tile mode, image mode 버튼을 렌더링한다', () => {
		renderButtons(map);

		expect(screen.getByRole('button', { name: 'tile mode' })).toHaveAttribute('value', 'webgl');
		expect(screen.getByRole('button', { name: 'image mode' })).toHaveAttribute('value', 'vector');
	});

	it('기본값은 webgl이라 tile mode가 눌린 상태다', () => {
		renderButtons(map);

		expect(screen.getByRole('button', { name: 'tile mode' })).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('button', { name: 'image mode' })).toHaveAttribute('aria-pressed', 'false');
	});

	it('활성 버튼에만 강조 클래스를 적용한다', () => {
		renderButtons(map);

		expect(screen.getByRole('button', { name: 'tile mode' })).toHaveClass('bg-sky-400');
		expect(screen.getByRole('button', { name: 'image mode' })).not.toHaveClass('bg-sky-400');
	});

	it('마운트 시 WebGL 레이어만 맵에 추가한다', () => {
		renderButtons(map);

		expect(cityLayers(map)).toEqual(['webgl']);
	});

	it('image mode를 누르면 벡터 레이어로 교체한다', () => {
		renderButtons(map);

		fireEvent.click(screen.getByRole('button', { name: 'image mode' }));

		expect(cityLayers(map)).toEqual(['vector']);
		expect(screen.getByRole('button', { name: 'image mode' })).toHaveAttribute('aria-pressed', 'true');
		expect(screen.getByRole('button', { name: 'image mode' })).toHaveClass('bg-sky-400');
		expect(screen.getByRole('button', { name: 'tile mode' })).toHaveAttribute('aria-pressed', 'false');
	});

	it('tile mode를 다시 누르면 WebGL 레이어로 되돌린다', () => {
		renderButtons(map);

		fireEvent.click(screen.getByRole('button', { name: 'image mode' }));
		fireEvent.click(screen.getByRole('button', { name: 'tile mode' }));

		expect(cityLayers(map)).toEqual(['webgl']);
	});

	it('이미 선택된 모드를 눌러도 레이어가 중복되지 않는다', () => {
		renderButtons(map);

		fireEvent.click(screen.getByRole('button', { name: 'tile mode' }));

		expect(cityLayers(map)).toEqual(['webgl']);
		expect(map.getLayers().getLength()).toBe(2);
	});

	it('베이스 레이어는 건드리지 않는다', () => {
		renderButtons(map);

		fireEvent.click(screen.getByRole('button', { name: 'image mode' }));

		expect(map.getLayers().getArray()).toContain(baseLayer.googleRoadLayer);
	});

	it('onButtonClick을 클릭한 버튼의 값과 함께 호출한다', () => {
		// currentTarget은 이벤트 처리가 끝나면 null이 되므로 호출 시점에 값을 캡처한다
		const values: string[] = [];
		const onButtonClick = vi.fn<NonNullable<ComponentProps<typeof WebglTypeButtons>['onButtonClick']>>((e) => {
			values.push(e.currentTarget.value);
		});

		renderButtons(map, { onButtonClick });

		fireEvent.click(screen.getByRole('button', { name: 'image mode' }));

		expect(onButtonClick).toHaveBeenCalledTimes(1);
		expect(values).toEqual(['vector']);
	});

	it('onButtonClick이 없어도 동작한다', () => {
		renderButtons(map);

		expect(() => fireEvent.click(screen.getByRole('button', { name: 'image mode' }))).not.toThrow();
	});

	it('buttonClassName을 두 버튼 모두에 적용한다', () => {
		renderButtons(map, { buttonClassName: 'custom-btn' });

		expect(screen.getByRole('button', { name: 'tile mode' })).toHaveClass('custom-btn');
		expect(screen.getByRole('button', { name: 'image mode' })).toHaveClass('custom-btn');
	});

	it('나머지 props를 버튼 그룹에 전달한다', () => {
		renderButtons(map, { 'data-testid': 'group' } as ComponentProps<typeof WebglTypeButtons>);

		expect(screen.getByTestId('group')).toContainElement(screen.getByRole('button', { name: 'tile mode' }));
	});

	it('맵이 없으면 레이어를 건드리지 않고 에러 없이 전환된다', () => {
		renderButtons();

		fireEvent.click(screen.getByRole('button', { name: 'image mode' }));

		expect(screen.getByRole('button', { name: 'image mode' })).toHaveAttribute('aria-pressed', 'true');
		expect(map.getLayers().getLength()).toBe(1);
	});
});
