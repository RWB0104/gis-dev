/**
 * 팝업 컴포넌트
 *
 * @author RWB
 * @since 2022.02.19 Sat 13:27:34
 */

import { Map } from 'ol';
import { MdClose, MdDelete, MdEdit } from 'react-icons/md';
import './Popup.scss';

interface Props
{
	map?: Map
	children?: JSX.Element | JSX.Element[],
	onUpdateClick?: () => void,
	onDeleteClick?: () => void
}

/**
 * 팝업 JSX 반환 메서드
 *
 * @param {Props} props: 프로퍼티
 *
 * @returns {JSX.Element} JSX
 */
export default function Popup({ map, children, onUpdateClick, onDeleteClick }: Props)
{
	return (
		<div className='map-popup'>
			<div className='map-popup-header'>
				<div className='map-popup-header-left'>
					{onUpdateClick && <button data-action='update' onClick={onUpdateClick}><MdEdit color='dodgerblue' /></button>}
					{onDeleteClick && <button data-action='delete' onClick={onDeleteClick}><MdDelete color='crimson' /></button>}
				</div>

				<div className='map-popup-header-right'>
					<button onClick={() => map && map.getOverlayById('popup').setPosition(undefined)}><MdClose color='inherit' /></button>
				</div>
			</div>

			<div className='map-popup-body'>
				{children}
			</div>
		</div>
	);
}