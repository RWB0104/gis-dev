/**
 * 팝업 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 13:27:34
 */

import { Map } from 'ol';
import { GrClose } from 'react-icons/gr';
import './Popup.scss';

interface Props
{
	map?: Map
	children?: JSX.Element | JSX.Element[]
}

/**
 * 팝업 JSX 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function Popup({ map, children }: Props)
{
	return (
		<div className='map-popup'>
			<div className='map-popup-header'>
				<button onClick={() => map && map.getOverlayById('popup').setPosition(undefined)}><GrClose color='inherit' /></button>
			</div>

			<div className='map-popup-body'>
				{children}
			</div>
		</div>
	);
}