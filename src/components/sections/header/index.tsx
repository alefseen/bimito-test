import { FC } from 'react';
import logo from 'assets/logo.svg';
import styles from './index.styl';

const Header: FC = () => {
	return (
		<header className={`${styles.headerWrapper}`}>
			<div className='container'>
				<div className={styles.header}>
					<img src={logo} alt='بیمیتو' />

					<nav>
						<p>ثبت نام</p>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
