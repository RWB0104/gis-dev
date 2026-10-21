/**
 * 가이드 다이얼로그 molecule 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 19:43:08
 */

import { InfoIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@gis-dev/shadcn-ui-pack/components/ui/dialog';

export interface GuideDialogProps extends PropsWithChildren {
	/**
	 * 설명
	 */
	description?: string;

	/**
	 * 타이틀
	 */
	title: string;
}

/**
 * 가이드 다이얼로그 molecule 컴포넌트 반환 메서드
 *
 * @param {GuideDialogProps} param0 GuideDialogProps
 *
 * @returns {React.JSX.Element} JSX
 */
export default function GuideDialog({ title, description, children }: GuideDialogProps): React.JSX.Element {
	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button className="bg-pink-600 text-white hover:bg-pink-600/90 focus-visible:ring-pink-600/40">
						<InfoIcon />
					</Button>
				}
			/>

			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>

					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>

				<div>{children}</div>
			</DialogContent>
		</Dialog>
	);
}
