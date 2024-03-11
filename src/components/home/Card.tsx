/**
 * 카드 컴포넌트
 *
 * @author RWB
 * @since 2022.06.03 Fri 00:26:15
 */

import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import './Card.scss';

interface Props extends LinkProps
{
	to: string
	src: string
}

export default function Card({ to, src, className, title, children, ...props }: Props): JSX.Element
{
	return (
		<Link className={`card-root ${className}`} title={title} to={to} {...props}>
			<div className='header'>
				<div />
				<div />
				<div />
			</div>

			<div className='main'>
				<img alt={title} src={src} />
			</div>

			<div className='footer'>
				{children}
			</div>
		</Link>
	);
}