/**
 * 포지션 인덱스 모듈 테스트
 *
 * @author RWB
 * @since 2026.10.20 Tue 10:51:49
 */

import { position } from '.';

describe('[@gis-dev/openlayers-service-pack] position', () => {
	describe('position 테스트', () => {
		it('서울 4326 좌표를 그대로 보유한다', () => {
			expect(position.seoul[4326]).toEqual([126.97836930289438, 37.56664507000858]);
		});

		it('세종 4326 좌표를 그대로 보유한다', () => {
			expect(position.sejong[4326]).toEqual([127.28923267492068, 36.48024986578043]);
		});

		it('서울 3857 좌표를 proj4로 변환한다', () => {
			const [x, y] = position.seoul[3857];

			expect(x).toBeCloseTo(14135167.41, 1);
			expect(y).toBeCloseTo(4518386.88, 1);
		});

		it('세종 3857 좌표를 proj4로 변환한다', () => {
			expect(position.sejong[3857]).toHaveLength(2);
			expect(position.sejong[3857][0]).toBeGreaterThan(0);
		});
	});
});
