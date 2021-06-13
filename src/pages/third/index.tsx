import { FC, useState } from 'react';
import Helmet from 'react-helmet';
import { useLocation } from 'react-router-dom';
import styles from './index.styl';
import FirstStep from './steps/first';
import SecondStep from './steps/second';
import ThirdStep from './steps/third';

const Third: FC = () => {
	const [carType, setCarType] = useState('');
	const [carModel, setCarModel] = useState('');
	const [prevCompony, setPrevCompony] = useState('');
	const [thirdDiscount, setThirdDiscount] = useState('');
	const [driverDiscount, setDriverDiscount] = useState('');
	const { pathname } = useLocation();

	const handleDone = () => {
		console.log('done');
	};

	const steps = [
		{
			path: '/third',
			Component: FirstStep,
			props: { carType, setCarType, carModel, setCarModel, next: '/third/1', prev: '/' },
		},
		{
			path: '/third/1',
			Component: SecondStep,
			props: { prevCompony, setPrevCompony, next: '/third/2', prev: '/third' },
		},
		{
			path: '/third/2',
			Component: ThirdStep,
			props: {
				thirdDiscount,
				setThirdDiscount,
				driverDiscount,
				setDriverDiscount,
				done: handleDone,
			},
		},
	];

	const state = steps.findIndex(({ path }) => pathname === path);

	return (
		<main className={styles.page}>
			<Helmet>
				<title>ثبت نام</title>
			</Helmet>
			<h1>بیمه شخص ثالث</h1>

			<div className={styles.formsContainer}>
				{steps.map(({ path, Component, props }, index) => (
					<Component
						{...props}
						className={`${state < index ? styles.prev : ''} ${
							state === index ? styles.active : ''
						} ${state > index ? styles.next : ''}`}
						key={`route-${path}`}
					/>
				))}
			</div>
		</main>
	);
};

export default Third;
