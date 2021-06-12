import { FC } from 'react';
import Helmet from 'react-helmet';
import styles from './index.styl';

const NotFound: FC = () => {
	return (
		<main className={styles.page}>
			<Helmet>
				<title>صفحه پیدا نشد</title>
			</Helmet>
			<h1>404</h1>

			<p>صفحه مورد نظر یافت نشد</p>
		</main>
	);
};

export default NotFound;
