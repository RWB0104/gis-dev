/**
 * 복사 버튼 atom 컴포넌트
 *
 * @author RWB
 * @since 2026.10.21 수 14:36:54
 */

import { CheckIcon, CopyIcon } from 'lucide-react';
import {
	type ButtonHTMLAttributes,
	type DetailedHTMLProps,
	type MouseEventHandler,
	useCallback,
	useRef,
	useState
} from 'react';

import { Button } from '@gis-dev/shadcn-ui-pack/components/ui/button';
import { cn } from '@gis-dev/shadcn-ui-pack/lib/utils';

const COPIED_DURATION = 1200;

const BUTTON_CLS = cn('-translate-1/2 absolute top-1/2 left-1/2 transition-[scale,opacity] duration-300');

export interface CopyButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	/**
	 * 텍스트 메서드
	 */
	copyText?: string | Func<void, string | undefined>;
}

/**
 * 복사 버튼 atom 컴포넌트 반환 메서드
 *
 * @param {CopyButtonProps} param0 CopyButtonProps
 *
 * @returns {React.JSX.Element} JSX
 */
export function CopyButton({ copyText, className, onClick, ...props }: CopyButtonProps): React.JSX.Element {
	const [isCopyState, setIsCopyState] = useState(false);

	const timerRef = useRef<number>(undefined);

	const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
		async (e) => {
			onClick?.(e);

			let text: string | undefined;

			if (typeof copyText === 'function') {
				text = copyText();
			} else {
				text = copyText;
			}

			if (text === undefined) {
				return;
			}

			try {
				await navigator.clipboard.writeText(text);
			} catch {
				return;
			}

			setIsCopyState(true);

			window.clearTimeout(timerRef.current);
			timerRef.current = window.setTimeout(() => setIsCopyState(false), COPIED_DURATION);
		},
		[onClick, copyText]
	);

	return (
		<Button
			className={cn('relative', className)}
			data-testid="CopyButton"
			disabled={isCopyState}
			onClick={handleClick}
			size="icon-sm"
			variant="ghost"
			{...props}
		>
			<CheckIcon
				className={cn(BUTTON_CLS, 'text-green-500', {
					'scale-75 opacity-0': !isCopyState
				})}
			/>

			<CopyIcon
				className={cn(BUTTON_CLS, {
					'scale-75 opacity-0': isCopyState
				})}
			/>
		</Button>
	);
}
