/**
 * 트랜잭션 삽입 모달 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.18 Sat 01:43:40
 */

import BasicModal, { BasicModalProps } from '@gis-dev/components/molecule/BasicModal';
import Apartment from '@mui/icons-material/Apartment';
import ContactPage from '@mui/icons-material/ContactPage';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FeatureLike } from 'ol/Feature';
import { ChangeEventHandler, MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';

interface TransactionInsertProps
{
	/**
	 * 빌딩명
	 */
	name: string;

	/**
	 * 빌딩 주소
	 */
	address: string;

	/**
	 * 피쳐
	 */
	features: FeatureLike[];
}

export type TransactionInsertModalConfirmHandler = (data: TransactionInsertProps) => void;

export interface TransactionInsertModalProps extends Pick<BasicModalProps, 'onClose'>
{
	/**
	 * 피쳐
	 */
	features?: FeatureLike[];

	/**
	 * 확인 메서드
	 */
	onConfirm: TransactionInsertModalConfirmHandler;
}

/**
 * 트랜잭션 삽입 모달 organism 컴포넌트 반환 메서드
 *
 * @param {TransactionInsertModalProps} param0: TransactionInsertModalProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionInsertModal({ features, onConfirm, ...props }: TransactionInsertModalProps): ReactNode
{
	const [ formState, setFormState ] = useState<TransactionInsertProps>({
		address: '',
		features: features || [],
		name: ''
	});

	const handleConfirm: MouseEventHandler<HTMLButtonElement> = useCallback(() =>
	{
		onConfirm(formState);
	}, [ formState, features, onConfirm ]);

	const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(({ currentTarget }) =>
	{
		const { name, value } = currentTarget;

		setFormState((state) => ({
			...state,
			[name]: value
		}));
	}, [ setFormState ]);

	useEffect(() =>
	{
		setFormState({
			address: '',
			features: features || [],
			name: ''
		});
	}, [ features, setFormState ]);

	return (
		<BasicModal header='트랜잭션 삽입' open={features !== undefined} onConfirm={handleConfirm} {...props}>
			<Stack component='form' gap={2} marginTop={1}>
				<TextField
					label='빌딩명'
					name='name'
					size='small'
					value={formState.name}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Apartment fontSize='inherit' />
							</InputAdornment>
						)
					}}
					required
					onChange={handleChange}
				/>

				<TextField
					label='빌딩 주소'
					name='address'
					size='small'
					value={formState.address}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<ContactPage fontSize='inherit' />
							</InputAdornment>
						)
					}}
					required
					onChange={handleChange}
				/>
			</Stack>
		</BasicModal>
	);
}