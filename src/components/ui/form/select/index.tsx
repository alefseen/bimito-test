/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import chevronDown from 'assets/icons/chevron-down.svg';
import chevronUp from 'assets/icons/chevron-up.svg';
import styles from './index.styl';

const Select: any = ({
	className,
	style,
	label,
	options,
	value,
	onChange,
	disabled = false,
	error,
}) => {
	const [collapse, setCollapse] = useState(true);

	const currentOption = options.find(({ value: optionValue }) => value === optionValue);

	const closeSelect = () => {
		setCollapse(true);
	};

	useEffect(() => {
		window.addEventListener('click', closeSelect);
		return () => {
			window.removeEventListener('click', closeSelect);
		};
	}, []);

	return (
		<div className={`${styles.selectContainer} ${className}`} style={style}>
			<button
				type='button'
				className={`${styles.button} ${error ? styles.haveError : ''} ${
					collapse ? '' : styles.active
				}`}
				onClick={(e) => {
					e.nativeEvent.stopPropagation();
					setCollapse((prev) => !prev);
				}}
				disabled={disabled}
			>
				<div>
					<span>
						{label}
						{value ? ': ' : ''}
					</span>

					<span className={styles.value}>{currentOption?.name || ''}</span>
				</div>

				<i className={styles.icon}>
					<img src={collapse ? chevronDown : chevronUp} alt='' />
				</i>
			</button>

			<div className={`${styles.error} ${error && collapse && styles.hasError}`}>{error}</div>

			<ul
				onClick={(e) => e.nativeEvent.stopPropagation()}
				className={`${styles.list} ${collapse ? '' : styles.active}`}
			>
				{options.map(({ value: optionValue, name }) => (
					<li key={optionValue}>
						<button
							type='button'
							onClick={() => {
								onChange(optionValue);
								setCollapse(true);
							}}
						>
							{name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Select;
