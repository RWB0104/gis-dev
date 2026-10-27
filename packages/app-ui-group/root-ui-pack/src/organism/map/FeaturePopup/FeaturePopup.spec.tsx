/**
 * 피쳐 팝업 organism 컴포넌트 테스트
 *
 * @author RWB
 * @since 2026.10.27 화 09:20:00
 */

import { fireEvent, render, within } from '@testing-library/react';
// biome-ignore lint/suspicious/noShadowRestrictedNames: for dependencies
import { Feature, Map } from 'ol';
import type { Coordinate } from 'ol/coordinate';
import type { FeatureLike } from 'ol/Feature';

import { MapContext } from '@gis-dev/openlayers-service-pack/context/map';
import type { FeatureDescription } from '@gis-dev/openlayers-service-pack/func/feature';

import FeaturePopup from '.';

/**
 * 피쳐 id를 제목으로 쓰는 표시 내용을 만드는 메서드
 */
function describeFeature(feature: FeatureLike): FeatureDescription {
	return {
		items: [{ label: '이름', value: `${feature.get('name')}` }],
		title: `${feature.getId()}`
	};
}

/**
 * 맵 컨텍스트로 감싸 FeaturePopup을 렌더링하는 메서드
 */
function createTree(
	map: Map | undefined,
	props: { feature?: Feature; getDescription?: typeof describeFeature; onClose?: () => void; position?: Coordinate } = {}
): React.JSX.Element {
	return (
		<MapContext value={map === undefined ? {} : { map }}>
			<FeaturePopup getDescription={props.getDescription ?? describeFeature} {...props} />
		</MapContext>
	);
}

/**
 * 오버레이 요소 안의 정보 카드를 반환하는 메서드
 *
 * 맵에 target이 없어 오버레이 요소가 document에 붙지 않으므로, screen이 아니라 오버레이 요소 기준으로 조회한다.
 */
function queryCard(map: Map): HTMLElement | null {
	return within(map.getOverlays().item(0).getElement() as HTMLElement).queryByTestId('FeatureInfoCard');
}

/**
 * id와 이름이 있는 피쳐를 생성하는 메서드
 */
function createFeature(id: string, name: string): Feature {
	const feature = new Feature({ name });

	feature.setId(id);

	return feature;
}

describe('[@gis-dev/root-ui-pack] FeaturePopup', () => {
	it('맵이 없으면 아무것도 렌더링하지 않는다', () => {
		const { container } = render(createTree(undefined, { feature: createFeature('a', '청사') }));

		expect(container).toBeEmptyDOMElement();
	});

	it('피쳐가 없으면 오버레이는 추가하되 카드는 보여주지 않는다', () => {
		const map = new Map();

		render(createTree(map, { position: [5, 10] }));

		expect(map.getOverlays().getLength()).toBe(1);
		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('피쳐가 있으면 오버레이 요소 안에 설명 내용을 카드로 보여준다', () => {
		const map = new Map();

		render(createTree(map, { feature: createFeature('buld.1', '청사'), position: [5, 10] }));

		const card = queryCard(map) as HTMLElement;

		expect(card).not.toBeNull();
		expect(within(card).getByText('buld.1').tagName).toBe('H3');
		expect(card).toHaveTextContent('이름');
		expect(card).toHaveTextContent('청사');
	});

	it('피쳐를 설명 메서드에 전달한다', () => {
		const map = new Map();
		const feature = createFeature('buld.1', '청사');
		const getDescription = vi.fn(describeFeature);

		render(createTree(map, { feature, getDescription, position: [5, 10] }));

		expect(getDescription).toHaveBeenCalledWith(feature);
	});

	it('지정한 위치에 오버레이를 표시한다', () => {
		const map = new Map();

		render(createTree(map, { feature: createFeature('buld.1', '청사'), position: [5, 10] }));

		expect(map.getOverlays().item(0).getPosition()).toEqual([5, 10]);
	});

	it('피쳐가 없으면 위치가 있어도 오버레이를 숨긴다', () => {
		const map = new Map();

		const { rerender } = render(createTree(map, { feature: createFeature('buld.1', '청사'), position: [5, 10] }));

		rerender(createTree(map, { position: [5, 10] }));

		expect(queryCard(map)).toBeNull();
		expect(map.getOverlays().item(0).getPosition()).toBeUndefined();
	});

	it('다른 피쳐로 바뀌면 카드 내용과 위치를 갱신한다', () => {
		const map = new Map();

		const { rerender } = render(createTree(map, { feature: createFeature('buld.1', '청사'), position: [5, 10] }));

		rerender(createTree(map, { feature: createFeature('buld.2', '시청'), position: [50, 100] }));

		const card = queryCard(map) as HTMLElement;

		expect(within(card).getByText('buld.2')).toBeTruthy();
		expect(card).toHaveTextContent('시청');
		expect(map.getOverlays().item(0).getPosition()).toEqual([50, 100]);
	});

	it('닫기 버튼을 누르면 onClose를 호출한다', () => {
		const map = new Map();
		const onClose = vi.fn();

		render(createTree(map, { feature: createFeature('buld.1', '청사'), onClose, position: [5, 10] }));

		fireEvent.click(within(queryCard(map) as HTMLElement).getByLabelText('닫기'));

		expect(onClose).toHaveBeenCalledOnce();
	});

	it('onClose가 없어도 닫기 버튼이 에러 없이 동작한다', () => {
		const map = new Map();

		render(createTree(map, { feature: createFeature('buld.1', '청사'), position: [5, 10] }));

		expect(() => fireEvent.click(within(queryCard(map) as HTMLElement).getByLabelText('닫기'))).not.toThrow();
	});

	it('언마운트하면 오버레이를 제거한다', () => {
		const map = new Map();

		const { unmount } = render(createTree(map, { feature: createFeature('buld.1', '청사'), position: [5, 10] }));

		unmount();

		expect(map.getOverlays().getLength()).toBe(0);
	});
});
