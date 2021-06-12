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
				<h1>Rasayesh Front-End Boilerplate</h1>
				<p>
					Created with <i className='icon heart' /> and <a href='https://reactjs.com'>React</a>
				</p>
			</div>
		</main>
	);
};

export default Home;
