import { FC } from 'react';
import styles from './index.styl';

const Button: FC<any> = ({
	children,
	className = '',
	type,
	onClick,
	icon,
	iconPosition = 'right',
	disabled = false,
	nativeType = 'button',
	htmlTag: HtmlTag = 'button',
	htmlFor,
}) => {
	return (
		<HtmlTag
			htmlFor={htmlFor}
			type={nativeType}
			className={`${styles.button}  ${className || ''} ${disabled && styles.disabled} ${
				styles[type]
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{iconPosition === 'right' && icon && <i className={styles.icon}>{icon}</i>}
			<span>{children}</span>
			{iconPosition === 'left' && icon && <i className={styles.afterIcon}>{icon}</i>}
		</HtmlTag>
	);
};

export default Button;
