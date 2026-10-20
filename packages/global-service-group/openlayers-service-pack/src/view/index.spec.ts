/**
 * 뷰 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { View } from 'ol';

import { sejongView, seoulHighView, seoulMiddleView, seoulView } from '.';

describe('[@gis-dev/openlayers-service-pack] view', () => {
	describe('seoulView 테스트', () => {
		it('EPSG:3857 투영에 zoom 17인 View다', () => {
			expect(seoulView).toBeInstanceOf(View);
			expect(seoulView.getProjection().getCode()).toBe('EPSG:3857');
			expect(seoulView.getZoom()).toBe(17);
		});
	});

	describe('seoulMiddleView 테스트', () => {
		it('zoom 10인 View다', () => {
			expect(seoulMiddleView.getZoom()).toBe(10);
		});
	});

	describe('seoulHighView 테스트', () => {
		it('zoom 5인 View다', () => {
			expect(seoulHighView.getZoom()).toBe(5);
		});
	});

	describe('sejongView 테스트', () => {
		it('zoom 17인 View다', () => {
			expect(sejongView.getZoom()).toBe(17);
		});
	});
});
