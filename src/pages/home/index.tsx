import { FC } from 'react';
import Helmet from 'react-helmet';
import styles from './index.styl';

const Home: FC = () => {
	return (
		<main className={`${styles.page} container`}>
			<Helmet>
				<title>Home page </title>
			</Helmet>
			<div className={styles.info}>
				<h1>Bimito</h1>
			</div>
		</main>
	);
};

export default Home;
