import { FC } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styles from './index.styl';

const NotFound: FC = () => {
	return (
		<main className={`${styles.page} container`}>
			<Helmet>
				<title>404 - Not found</title>
			</Helmet>
			<h1>404</h1>
			<p>This page is not found, make sure you have right access or try again later.</p>
			<Link to='/'>Back to Home!</Link>
		</main>
	);
};

export default NotFound;
