/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { FC } from 'react';
import styles from './index.styl';

const Modal: FC<any> = ({ modalOpen, setModalOpen, className, children }) => {
	return (
		<div
			onClick={() => {
				setModalOpen(false);
			}}
			className={`${styles.modalContainer} ${modalOpen ? styles.opened : ''}`}
		>
			<div
				onClick={(e) => {
					e.stopPropagation();
				}}
				className={`${styles.modal} ${className}`}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
