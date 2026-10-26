/**
 * 트랜잭션 폼 organism 컴포넌트
 *
 * @author RWB
 * @since 2026.10.26 월 11:28:08
 */

import type { ComponentProps, SubmitEventHandler } from 'react';

import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from '@gis-dev/shadcn-ui-pack/components/ui/dialog';
import { Input } from '@gis-dev/shadcn-ui-pack/components/ui/input';
import { Label } from '@gis-dev/shadcn-ui-pack/components/ui/label';

export interface TransactionFormParams {
	/**
	 * 빌딩 주소
	 */
	address: string;

	/**
	 * 빌딩명
	 */
	name: string;
}

export interface TransactionFormDialogProps extends ComponentProps<typeof Dialog> {
	/**
	 * CTA 텍스트
	 */
	cta?: string;

	/**
	 * 기본값
	 */
	defaultValue?: TransactionFormParams;

	/**
	 * 설명
	 */
	description?: string;

	/**
	 * 로딩 여부
	 */
	loading?: boolean;

	/**
	 * 제출 이벤트 메서드
	 */
	onSubmit?: Func<TransactionFormParams>;

	/**
	 * 제목
	 */
	title: string;
}

/**
 * 트랜잭션 폼 organism 컴포넌트 반환 메서드
 *
 * @param {TransactionFormDialogProps} param0 TransactionFormDialogProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function TransactionFormDialog({
	cta = '제출',
	defaultValue,
	description,
	loading,
	onSubmit,
	title,
	...props
}: TransactionFormDialogProps): React.JSX.Element {
	const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		const data = new FormData(e.currentTarget);

		onSubmit?.({ address: `${data.get('address')}`, name: `${data.get('name')}` });
	};

	return (
		<Dialog data-testid="TransactionFormDialog" {...props}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>

					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<form className="grid gap-4" onSubmit={handleSubmit}>
					<div className="grid gap-1.5">
						<Label htmlFor="name">빌딩명</Label>

						<Input defaultValue={defaultValue?.name} id="name" maxLength={100} name="name" required />
					</div>

					<div className="grid gap-1.5">
						<Label htmlFor="address">빌딩 주소</Label>

						<Input defaultValue={defaultValue?.address} id="address" maxLength={200} name="address" required />
					</div>

					<Button disabled={loading} type="submit">
						{cta}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
