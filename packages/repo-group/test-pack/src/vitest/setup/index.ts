/**
 * vitest 설정 셋업 인덱스 모듈
 *
 * @author RWB
 * @since 2026.10.15 목 19:50:28
 */

import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// jsdom에는 ResizeObserver가 없다. OpenLayers Map 등 뷰포트 크기를 관찰하는 라이브러리가
// 이를 요구하므로, 테스트 환경에 no-op 스텁을 주입한다.
if (!globalThis.ResizeObserver) {
	globalThis.ResizeObserver = class {
		public observe(): void {
			// mocked
		}
		public unobserve(): void {
			// mocked
		}
		public disconnect(): void {
			// mocked
		}
	};
}

// next/font는 Next 컴파일러가 처리하는 모듈이라 vitest에서는 어떤 폰트든 빈 폰트 객체를 반환하도록 대체한다.
vi.mock(
	'next/font/google',
	() =>
		new Proxy(
			{},
			{
				get: (_, key) => (key === 'then' ? undefined : () => ({ className: '', style: {}, variable: '' })),
				has: () => true
			}
		)
);

vi.mock('next/navigation', () => ({
	usePathname: vi.fn(),
	useRouter: vi.fn(),
	useSearchParams: vi.fn()
}));

afterEach(() => {
	cleanup();
});
