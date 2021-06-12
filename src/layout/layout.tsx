import { FC } from 'react';
import Header from 'components/sections/header';
import styles from './index.styl';

const MainLayout: FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			{children}
		</div>
	);
};

export default MainLayout;
