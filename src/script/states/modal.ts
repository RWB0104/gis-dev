/**
 * 모달 상태관리 모듈
 *
 * @author RWB
 * @since 2023.11.11 Sat 12:31:47
 */

import { MouseEventHandler, ReactNode } from 'react';
import { create } from 'zustand';

export type ModalType = 'info' | 'error';

export interface ModalProps
{
	/**
	 * 타입
	 */
	type: ModalType;

	/**
	 * 타이틀
	 */
	title: string;

	/**
	 * 내용
	 */
	body: ReactNode;

	/**
	 * 확인 메서드
	 */
	onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

export type ModalStoreSetModalHandler = (modal?: ModalProps) => void;

export interface ModalStoreProps
{
	/**
	 * 모달
	 */
	modal?: ModalProps;

	/**
	 * 모달 할당 메서드
	 */
	setModal: ModalStoreSetModalHandler;
}

export const modalStore = create<ModalStoreProps>((set) => ({
	setModal: (modal): void =>
	{
		set({ modal });
	}
}));