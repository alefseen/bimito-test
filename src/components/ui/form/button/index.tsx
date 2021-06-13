/* eslint-disable react/button-has-type */
import { FC } from 'react';
import styles from './index.styl';

const Button: FC<any> = ({
	children,
	className = '',
	variant,
	onClick,
	icon,
	iconPosition = 'right',
	disabled = false,
	type = 'button',
}) => {
	return (
		<button
			type={type}
			className={`${styles.button}  ${className || ''} ${disabled && styles.disabled} ${
				styles[variant]
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{iconPosition === 'right' && icon && <i className={styles.icon}>{icon}</i>}
			<span>{children}</span>
			{iconPosition === 'left' && icon && <i className={styles.afterIcon}>{icon}</i>}
		</button>
	);
};

export default Button;
