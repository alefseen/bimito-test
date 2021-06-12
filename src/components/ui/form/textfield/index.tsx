import { useEffect, useRef, useState, FC } from 'react';
import styles from './index.styl';

const TextField: FC<any> = ({
	className,
	style,
	label,
	value,
	onChange,
	onFocus,
	onBlur,
	disabled,
	readOnly,
	direction = 'rtl',
	error,
	alignment,
	placeholder,
	type = 'text',
}) => {
	const [hasValue, setHasValue] = useState(false);
	const [labelWidth, setLabelWidth] = useState(0);
	const [isInputFocused, setIsInputFocused] = useState(false);
	const labelRef = useRef(null);

	useEffect(() => {
		if (value.length) {
			setHasValue(true);
			setLabelWidth(labelRef?.current?.getBoundingClientRect().width);
		} else {
			setHasValue(false);
			if (!isInputFocused) setLabelWidth(0);
		}
	}, [value]);

	const handleFocus = (e) => {
		setIsInputFocused(true);
		setLabelWidth(labelRef?.current?.getBoundingClientRect().width);
		if (onFocus instanceof Function) onFocus(e);
	};
	const handleBlur = (e) => {
		setIsInputFocused(false);
		if (!hasValue) {
			setLabelWidth(0);
		}
		if (onBlur instanceof Function) onBlur(e);
	};

	const handleChange = (e) => {
		if (onChange instanceof Function) onChange(e);
	};

	return (
		<div className={`${styles.wrapper} ${className || ''}`}>
			<div
				className={`${styles.inputWrapper} ${disabled ? styles.disabled : ''}   ${
					((value && value.length > 0) || hasValue) && styles.hasValue
				} ${error ? styles.hasError : ''} `}
				style={style}
			>
				<input
					type={type}
					readOnly={readOnly}
					disabled={disabled}
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={`${direction === 'ltr' ? styles.ltr : ''} ${styles[`align${alignment}`]}`}
					placeholder={placeholder}
				/>

				<fieldset>
					{label && (
						<legend style={{ maxWidth: `${labelWidth}px` }}>
							<span ref={labelRef}>{label}</span>
						</legend>
					)}
				</fieldset>

				<div className={styles.labelContainer}>{label}</div>
			</div>
			<div className={`${styles.error} ${error && styles.hasError}`}>{error}</div>
		</div>
	);
};

export default TextField;
