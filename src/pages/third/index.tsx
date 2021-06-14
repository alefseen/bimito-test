import usePersistedState from 'components/hooks/persisted_state';
import { FC, useState } from 'react';
import Helmet from 'react-helmet';
import { useLocation, Redirect } from 'react-router-dom';
import Modal from 'components/ui/modal';
import userStore from 'stores/user';
import styles from './index.styl';
import FirstStep from './steps/first';
import SecondStep from './steps/second';
import ThirdStep from './steps/third';

const Third: FC = () => {
	const [carType, setCarType] = usePersistedState('carType', undefined, 'number');
	const [carModel, setCarModel] = usePersistedState('carModel', undefined, 'number');
	const [prevCompony, setPrevCompony] = usePersistedState('prevCompony', undefined, 'number');
	const [thirdDiscount, setThirdDiscount] = usePersistedState('thirdDiscount', undefined, 'number');
	const [driverDiscount, setDriverDiscount] = usePersistedState(
		'driverDiscount',
		undefined,
		'number'
	);
	const [showModal, setShowModal] = useState(false);
	const { pathname } = useLocation();

	const handleDone = () => {
		setShowModal(true);
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

	if (state === 1 && (!carType || !carModel)) return <Redirect to='/third' />;
	if (state === 2 && !prevCompony) return <Redirect to='/third/1' />;

	const { phone, firstname, lastname, password } = userStore.user;

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

			<Modal className={styles.modal} modalOpen={showModal} setModalOpen={setShowModal}>
				<ul>
					<li>
						<span>نام و نام خانوادگی</span>
						<b>
							{firstname} {lastname}
						</b>
					</li>

					<li>
						<span>شماره موبایل</span>
						<b>{phone}</b>
					</li>

					<li>
						<span>رمز عبور</span>
						<b>{password}</b>
					</li>

					<li className={styles.seperator} />

					<li>
						<span>نوع خودرو</span>
						<b>{carType}</b>
					</li>

					<li>
						<span>مدل خودرو</span>
						<b>{carModel}</b>
					</li>

					<li>
						<span>شرکت بیمه‌گر قبلی</span>
						<b>{prevCompony}</b>
					</li>

					<li>
						<span>درصد تخفیف ثالث</span>
						<b>{thirdDiscount}</b>
					</li>

					<li>
						<span>درصد تخفیف حوادث راننده</span>
						<b>{driverDiscount}</b>
					</li>
				</ul>
			</Modal>
		</main>
	);
};

export default Third;
