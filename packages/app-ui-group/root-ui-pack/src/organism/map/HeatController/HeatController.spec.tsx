/**
 * 히트 컨트롤러 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.29 목 18:50:00
 */

import { fireEvent, render, screen } from '@testing-library/react';
import { Map as OlMap } from 'ol';
import { Heatmap } from 'ol/layer';
import VectorLayer from 'ol/layer/Vector';
import { useCallback } from 'react';
import type { MockInstance } from 'vitest';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';

import HeatController from '.';

interface SliderMockProps {
	name: string;
	onValueChange: (value: number | number[]) => void;
	value: number;
}

/**
 * 숫자 값과 범위 값을 모두 흘려보낼 수 있는 슬라이더 대역
 */
function SliderMock({ name, onValueChange, value }: SliderMockProps): React.JSX.Element {
	const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(e) => onValueChange(Number(e.target.value)),
		[onValueChange]
	);
	const handleRange = useCallback(() => onValueChange([1, 2]), [onValueChange]);

	return (
		<div>
			<input data-testid={`slider-${name}`} onChange={handleChange} type="range" value={value} />
			<button data-testid={`range-${name}`} onClick={handleRange} type="button" />
		</div>
	);
}

vi.mock('@gis-dev/shadcn-ui-pack/components/ui/slider', () => ({
	// biome-ignore lint/style/useNamingConvention: 모킹 대상 모듈의 export 이름을 따른다
	Slider: SliderMock
}));

/**
 * 블러, 반지름 setter를 감시하는 실제 히트맵 레이어를 만드는 메서드
 */
function createHeatmap(): { layer: Heatmap; setBlur: MockInstance; setRadius: MockInstance } {
	const layer = new Heatmap({ properties: { name: 'wfs' } });

	return {
		layer,
		setBlur: vi.spyOn(layer, 'setBlur'),
		setRadius: vi.spyOn(layer, 'setRadius')
	};
}

/**
 * 맵 컨텍스트로 감싸 HeatController를 렌더링하는 메서드
 */
function renderController(map?: OlMap): void {
	render(
		<MapContext value={map === undefined ? {} : { map }}>
			<HeatController />
		</MapContext>
	);
}

describe('[@gis-dev/root-ui-pack] HeatController', () => {
	// jsdom은 canvas 2d 컨텍스트가 없어 Heatmap 그라디언트 생성이 실패하므로 최소한의 컨텍스트로 대체한다
	beforeEach(() => {
		vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
			createLinearGradient: () => ({ addColorStop: vi.fn() }),
			fillRect: vi.fn(),
			getImageData: () => ({ data: new Uint8ClampedArray(4 * 256) })
		} as unknown as CanvasRenderingContext2D);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('블러, 반지름 슬라이더를 기본값 20으로 렌더링한다', () => {
		renderController();

		expect(screen.getByTestId('slider-blur')).toHaveValue('20');
		expect(screen.getByTestId('slider-radius')).toHaveValue('20');
		expect(screen.getByText('블러')).toBeInTheDocument();
		expect(screen.getByText('반지름')).toBeInTheDocument();
		expect(screen.getAllByText('20')).toHaveLength(2);
	});

	it('맵이 없어도 에러 없이 렌더링하고 값을 바꿀 수 있다', () => {
		renderController();

		fireEvent.change(screen.getByTestId('slider-blur'), { target: { value: '40' } });

		expect(screen.getByText('40')).toBeInTheDocument();
	});

	it('마운트 시 현재 값을 wfs 레이어에 반영한다', () => {
		const { layer, setBlur, setRadius } = createHeatmap();
		const map = new OlMap({ layers: [layer] });

		renderController(map);

		expect(setBlur).toHaveBeenCalledWith(20);
		expect(setRadius).toHaveBeenCalledWith(20);
	});

	it('블러 슬라이더를 움직이면 블러만 레이어에 반영한다', () => {
		const { layer, setBlur, setRadius } = createHeatmap();

		renderController(new OlMap({ layers: [layer] }));
		setBlur.mockClear();
		setRadius.mockClear();

		fireEvent.change(screen.getByTestId('slider-blur'), { target: { value: '55' } });

		expect(setBlur).toHaveBeenCalledWith(55);
		expect(setRadius).not.toHaveBeenCalled();
		expect(screen.getByText('55')).toBeInTheDocument();
	});

	it('반지름 슬라이더를 움직이면 반지름만 레이어에 반영한다', () => {
		const { layer, setBlur, setRadius } = createHeatmap();

		renderController(new OlMap({ layers: [layer] }));
		setBlur.mockClear();
		setRadius.mockClear();

		fireEvent.change(screen.getByTestId('slider-radius'), { target: { value: '70' } });

		expect(setRadius).toHaveBeenCalledWith(70);
		expect(setBlur).not.toHaveBeenCalled();
		expect(screen.getByText('70')).toBeInTheDocument();
	});

	it('숫자가 아닌 값(범위)은 무시한다', () => {
		const { layer, setBlur, setRadius } = createHeatmap();

		renderController(new OlMap({ layers: [layer] }));
		setBlur.mockClear();
		setRadius.mockClear();

		fireEvent.click(screen.getByTestId('range-blur'));
		fireEvent.click(screen.getByTestId('range-radius'));

		expect(setBlur).not.toHaveBeenCalled();
		expect(setRadius).not.toHaveBeenCalled();
		expect(screen.getAllByText('20')).toHaveLength(2);
	});

	it('wfs 레이어가 Heatmap이 아니면 setter를 호출하지 않고 넘어간다', () => {
		const vector = new VectorLayer({ properties: { name: 'wfs' } });
		const spy = vi.fn();

		Object.assign(vector, { setBlur: spy, setRadius: spy });

		renderController(new OlMap({ layers: [vector] }));
		fireEvent.change(screen.getByTestId('slider-blur'), { target: { value: '30' } });

		expect(spy).not.toHaveBeenCalled();
	});

	it('wfs 레이어가 없으면 에러 없이 넘어간다', () => {
		const other = new VectorLayer({ properties: { name: 'other' } });

		renderController(new OlMap({ layers: [other] }));

		expect(() => fireEvent.change(screen.getByTestId('slider-blur'), { target: { value: '30' } })).not.toThrow();
	});
});
