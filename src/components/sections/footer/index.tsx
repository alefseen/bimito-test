import { FC } from 'react';
import styles from './index.styl';

const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<div className='container'>
				<p>This Boilerplate Created in Jun 2021 at Hamresan</p>
			</div>
		</footer>
	);
};

export default Footer;
