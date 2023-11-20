/**
 * 이미지 뷰어 molecule 컴포넌트
 *
 * @author RWB
 * @since 2023.11.20 Mon 10:49:36
 */

import Backdrop, { BackdropProps } from '@mui/material/Backdrop';
import classNames from 'classnames/bind';
import { ReactNode } from 'react';

import styles from './ImageViewer.module.scss';

const cn = classNames.bind(styles);

export interface ImageViewerProps extends Omit<BackdropProps, 'open'>
{
	/**
	 * 이미지
	 */
	image?: string;
}

/**
 * 이미지 뷰어 molecule 컴포넌트 반환 메서드
 *
 * @param {ImageViewerProps} param0: ImageViewerProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function ImageViewer({ image, className, ...props }: ImageViewerProps): ReactNode
{
	return (
		<Backdrop className={cn('backdrop', className)} data-component='ImageViewer' open={image !== undefined} {...props}>
			<img alt={image} className={cn('image', { close: image === undefined })} height='80%' src={image} width='80%' />
		</Backdrop>
	);
}