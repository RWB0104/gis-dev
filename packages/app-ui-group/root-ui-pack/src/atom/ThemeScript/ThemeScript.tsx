/**
 * 테마 스크립트 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.20 화 11:07:17
 */

import Script, { type ScriptProps } from 'next/script';

const themeScript = `(function () {
	try {
		const theme = localStorage.getItem('theme');
		const isDark = theme === 'dark' || (theme !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches);

		if (isDark) {
			document.documentElement.classList.toggle('dark', isDark);
		}
	} catch (error) {}
})();`;

export type ThemeScriptProps = ScriptProps;

/**
 * 테마 스크립트 atom 컴포넌트 반환 메서드
 *
 * @param {ThemeScriptProps} props ThemeScriptProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function ThemeScript(props: ThemeScriptProps): React.JSX.Element {
	return (
		<Script
			{...props}
			// biome-ignore lint/security/noDangerouslySetInnerHtml: for scripting
			dangerouslySetInnerHTML={{ __html: themeScript }}
			data-testid="ThemeScript"
		/>
	);
}
