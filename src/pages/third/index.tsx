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
	const [prevCompany, setPrevCompany] = usePersistedState('prevCompany', undefined, 'number');
	const [thirdDiscount, setThirdDiscount] = usePersistedState('thirdDiscount', undefined, 'number');
	const [driverDiscount, setDriverDiscount] = usePersistedState(
		'driverDiscount',
		undefined,
		'number'
	);
	const [showModal, setShowModal] = useState(false);
	const { pathname } = useLocation();

	const [carTypes, setCarTypes] = useState([]);
	const [companies, setCompanies] = useState([]);
	const [discounts, setDiscounts] = useState([]);

	const handleDone = () => {
		setShowModal(true);
	};

	const steps = [
		{
			path: '/third',
			Component: FirstStep,
			props: {
				carType,
				setCarType,
				carModel,
				setCarModel,
				next: '/third/1',
				prev: '/',
				carTypes,
				setCarTypes,
			},
		},
		{
			path: '/third/1',
			Component: SecondStep,
			props: {
				prevCompany,
				setPrevCompany,
				next: '/third/2',
				prev: '/third',
				companies,
				setCompanies,
			},
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
				discounts,
				setDiscounts,
			},
		},
	];

	const state = steps.findIndex(({ path }) => pathname === path);

	if (state === 1 && (!carType || !carModel)) return <Redirect to='/third' />;
	if (state === 2 && !prevCompany) return <Redirect to='/third/1' />;

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
						<b>{carTypes?.find(({ carTypeID }) => carTypeID === carType)?.carType}</b>
					</li>

					<li>
						<span>مدل خودرو</span>
						<b>
							{
								carTypes
									?.find(({ carTypeID }) => carTypeID === carType)
									?.brand?.find(({ id }) => id === carModel)?.name
							}
						</b>
					</li>

					<li>
						<span>شرکت بیمه‌گر قبلی</span>
						<b>{companies?.find(({ id }) => id === prevCompany)?.company}</b>
					</li>

					<li>
						<span>درصد تخفیف ثالث</span>
						<b>{discounts?.find(({ id }) => thirdDiscount === id)?.title}</b>
					</li>

					<li>
						<span>درصد تخفیف حوادث راننده</span>
						<b>{discounts?.find(({ id }) => driverDiscount === id)?.title}</b>
					</li>
				</ul>
			</Modal>
		</main>
	);
};

export default Third;
