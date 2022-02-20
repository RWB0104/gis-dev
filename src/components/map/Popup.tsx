/**
 * 팝업 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 13:27:34
 */

import './Popup.scss';

interface Props
{
	children?: JSX.Element | JSX.Element[]
}

/**
 * 팝업 Element 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {JSX.Element} Element
 */
export default function Popup({ children }: Props)
{
	return (
		<div className='map-popup'>
			{children}
		</div>
	);
}