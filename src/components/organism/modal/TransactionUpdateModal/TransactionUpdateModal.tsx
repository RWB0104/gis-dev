/**
 * 트랜잭션 수정 organism 컴포넌트
 *
 * @author RWB
 * @since 2023.11.19 Sun 02:15:33
 */

import BasicModal, { BasicModalProps } from '@gis-dev/components/molecule/BasicModal';
import Apartment from '@mui/icons-material/Apartment';
import ContactPage from '@mui/icons-material/ContactPage';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FeatureLike } from 'ol/Feature';
import { ChangeEventHandler, MouseEventHandler, ReactNode, useCallback, useEffect, useState } from 'react';

interface TransactionUpdateProps
{
	/**
	 * 아이디
	 */
	id: string | number;

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

export type TransactionUpdateModalConfirmHandler = (data: TransactionUpdateProps) => void;

export interface TransactionUpdateModalProps extends Pick<BasicModalProps, 'onClose'>
{
	/**
	 * 피쳐
	 */
	features?: FeatureLike[];

	/**
	 * 확인 메서드
	 */
	onConfirm: TransactionUpdateModalConfirmHandler;
}

/**
 * 트랜잭션 수정 모달 organism 컴포넌트 반환 메서드
 *
 * @param {TransactionUpdateModalProps} param0: TransactionUpdateModalProps 객체
 *
 * @returns {ReactNode} ReactNode
 */
export default function TransactionUpdateModal({ features, onConfirm, ...props }: TransactionUpdateModalProps): ReactNode
{
	const [ formState, setFormState ] = useState<TransactionUpdateProps>({
		address: '',
		features: features || [],
		id: '',
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
		// 피쳐가 유효할 경우
		if (features)
		{
			setFormState({
				address: features[0].get('address'),
				features,
				id: features[0].getId() || '',
				name: features[0].get('name')
			});
		}

		// 아닐 경우
		else
		{
			setFormState({
				address: '',
				features: features || [],
				id: '',
				name: ''
			});
		}
	}, [ features, setFormState ]);

	return (
		<BasicModal header='트랜잭션 수정' open={features !== undefined} onConfirm={handleConfirm} {...props}>
			<Stack component='form' gap={2} marginTop={1}>
				<Stack direction='row' gap={1} marginBottom={2}>
					<Typography fontWeight='bold' variant='caption'>대상 빌딩</Typography>
					<Typography variant='caption'>{formState.id}</Typography>
				</Stack>

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
					onChange={handleChange}
				/>
			</Stack>
		</BasicModal>
	);
}