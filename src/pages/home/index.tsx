import Button from 'components/ui/form/button';
import { FC, useState } from 'react';
import Helmet from 'react-helmet';
import arrow from 'assets/icons/arrow.svg';
import TextField from 'components/ui/form/textfield';
import Select from 'components/ui/form/select';
import styles from './index.styl';

const Home: FC = () => {
	const [state, setState] = useState('');
	const options = [
		{ name: 'ali', value: 1 },
		{ name: 'hassan', value: 2 },
		{ name: 'hossein', value: 3 },
	];
	return (
		<main className={`${styles.page} container`}>
			<Helmet>
				<title>Home page </title>
			</Helmet>
			<div className={styles.info}>
				<h1>Bimito</h1>
			</div>
			<Button
				type='outlined'
				iconPosition='left'
				icon={<img src={arrow} style={{ height: 10 }} alt='' />}
			>
				بیمیتو
			</Button>

			<Button type='contained'>بیمیتو</Button>

			<TextField value={state} onChange={(e) => setState(e.target.value)} label='نام' />

			<TextField
				value={state}
				error='ارور'
				onChange={(e) => setState(e.target.value)}
				label='نام'
			/>

			<Select label='مدل' options={options} value={state} onChange={(v) => setState(v)} />
		</main>
	);
};

export default Home;
