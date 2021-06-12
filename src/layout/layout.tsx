import { FC } from 'react';
import Header from 'components/sections/header';
import car from 'assets/icons/car-green.svg';
import Helmet from 'react-helmet';
import styles from './index.styl';

const MainLayout: FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Helmet titleTemplate='%s - بیمیتو' />

			<Header />

			<div className='container'>
				<div className={styles.row}>
					{children}
					<img src={car} alt='' />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
