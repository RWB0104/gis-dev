/**
 * 홈 page 컴포넌트
 *
 * @author RWB
 * @since 2026.11.04 수 19:12:00
 */

import { PAGE_LINK_GROUPS } from '@gis-dev/util-pack/const';

import PageLinkSection from '#/molecule/PageLinkSection';

/**
 * 홈 page 컴포넌트 반환 메서드
 *
 * @returns {React.JSX.Element} JSX
 */
export default function HomePage(): React.JSX.Element {
	return (
		<main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8" data-testid="HomePage">
			<header>
				<h1 className="m-0 font-bold text-2xl">gis-dev</h1>

				<p className="m-0 mt-1 text-muted-foreground text-sm">OpenLayers 기반 GIS 기능 예제 모음</p>
			</header>

			{PAGE_LINK_GROUPS.map((group) => (
				<PageLinkSection key={group.title} {...group} />
			))}
		</main>
	);
}
