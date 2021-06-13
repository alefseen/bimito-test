import { FC } from 'react';
import Helmet from 'react-helmet';
import ActionButton from 'components/ui/action_button';
import instIcon from 'assets/icons/insurance.svg';
import styles from './index.styl';

const Home: FC = () => {
	return (
		<main className={styles.page}>
			<Helmet>
				<title>انتخاب بیمه</title>
			</Helmet>

			<h1>انتخاب بیمه</h1>

			<div className={styles.choices}>
				<ActionButton path='/third' label='شخص ثالث' icon={instIcon} />

				<ActionButton disabled label='بدنه' icon={instIcon} />
			</div>
		</main>
	);
};

export default Home;
