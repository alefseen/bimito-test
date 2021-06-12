import { FC } from 'react';
import logo from 'assets/logo.svg';
import userStore from 'stores/user';
import { observer } from 'mobx-react';
import avatar from 'assets/icons/user.svg';
import styles from './index.styl';

const Header: FC = () => {
	const { haveUser, user } = userStore;

	return (
		<header className={`${styles.headerWrapper}`}>
			<div className='container'>
				<div className={styles.header}>
					<img src={logo} alt='بیمیتو' />

					<h1>سامانه مقایسه و خرید آنلاین بیمه</h1>

					<nav>
						{!haveUser ? (
							<div className={styles.user}>
								<img src={avatar} alt={`${user.firstname} ${user.lastname}`} />

								<span>
									{user.firstname} {user.lastname}
								</span>
							</div>
						) : (
							<p>ثبت نام</p>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default observer(Header);
