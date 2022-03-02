/**
 * 이 컴포넌트가 궁금한가?
 *
 * @author 작성자는 RWB라고 한다!
 * @since 생성일은 2022.02.27 Sun 20:42:43이라고 하는군!
 */

import { BiHeart } from 'react-icons/bi';
import './SpeedWagon.scss';

interface Props
{
	children: JSX.Element | JSX.Element[]
}

/**
 * 이 메서드가 궁금한가?
 *
 * @param {Props} param0: 반갑네 친구! 난 프로퍼티라고 하네!
 * @returns {JSX.Element} 이 몸이 바로 Element다!
 */
export default function SpeedWagon({ children }: Props)
{
	return (
		<div id='speed-wagon' data-show='true'>
			<div className='wrap'>
				<div className='help'>
					<h3>도와줘요! 스피드왜건!</h3>
				</div>

				<div className='he-said'>
					<p><b>그럼 설명해주지!!!</b></p>
					<br />

					{children}

					<br />
					<p><b>그럼 이만 쿨하게 떠나주지!</b></p>
				</div>

				<div className='i-said'>
					<button onClick={(e) =>
					{
						const target = e.target as HTMLButtonElement;
						const popup = target.offsetParent;
						popup?.setAttribute('data-show', 'false');
					}}><BiHeart /> 고마워요 스피드웨건!</button>
				</div>
			</div>
		</div>
	);
}