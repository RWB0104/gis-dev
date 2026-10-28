/**
 * 맵 옵션 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.28 수 19:30:00
 */

import { baseLayer, transactionLayer, wfsLayer } from '#/func/layer';
import { seoulView } from '#/func/view';

import { getTransactionDeleteOptions, getTransactionUpdateOptions } from '.';

/**
 * 옵션의 인터렉션 이름 목록을 반환하는 메서드
 */
function getInteractionNames(interactions: unknown): string[] {
	return (interactions as { get: (key: string) => string }[]).map((interaction) => interaction.get('name'));
}

describe('[@gis-dev/openlayers-service-pack] options', () => {
	describe('getTransactionUpdateOptions 테스트', () => {
		it('편집용 인터렉션을 hover, click, snap, modify 순서로 구성한다', () => {
			expect(getInteractionNames(getTransactionUpdateOptions().interactions)).toEqual([
				'hoverSelect',
				'clickSelect',
				'snap',
				'modify'
			]);
		});

		it('베이스 지도와 수정 대상인 buld_test 레이어만 올린다', () => {
			const { layers } = getTransactionUpdateOptions();

			expect(layers).toEqual([baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer]);
			expect(layers).not.toContain(wfsLayer.sejongWfsLayer);
		});

		it('seoulView를 사용한다', () => {
			expect(getTransactionUpdateOptions().view).toBe(seoulView);
		});

		it('호출할 때마다 인터렉션을 새로 만든다', () => {
			expect(getTransactionUpdateOptions().interactions).not.toBe(getTransactionUpdateOptions().interactions);
		});
	});

	describe('getTransactionDeleteOptions 테스트', () => {
		it('선택용 인터렉션(hover, click)만 구성한다', () => {
			expect(getInteractionNames(getTransactionDeleteOptions().interactions)).toEqual(['hoverSelect', 'clickSelect']);
		});

		it('베이스 지도, 삭제 대상인 buld_test 레이어, draw 레이어를 올린다', () => {
			const { layers } = getTransactionDeleteOptions();

			expect(layers).toEqual([baseLayer.googleRoadLayer, wfsLayer.wfsTransactionLayer, transactionLayer.drawLayer]);
			expect(layers).not.toContain(wfsLayer.sejongWfsLayer);
		});

		it('seoulView를 사용한다', () => {
			expect(getTransactionDeleteOptions().view).toBe(seoulView);
		});

		it('호출할 때마다 인터렉션을 새로 만든다', () => {
			expect(getTransactionDeleteOptions().interactions).not.toBe(getTransactionDeleteOptions().interactions);
		});
	});
});
