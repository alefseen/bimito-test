import { FC, useEffect } from 'react';
import Select from 'components/ui/form/select';
import Button from 'components/ui/form/button';
import axios from 'utils/axios';
import arrow from 'assets/icons/arrow.svg';
import { Link } from 'react-router-dom';
import styles from '../../index.styl';

const FirstStep: FC<any> = ({
	carType,
	setCarType,
	carModel,
	setCarModel,
	className = '',
	next,
	prev,
}) => {
	const options = [
		{ name: 'ali', value: 1 },
		{ name: 'hassan', value: 2 },
		{ name: 'hossein', value: 3 },
	];
	useEffect(() => {
		axios
			.get('/core/data/car-third-discount')
			.then((res) => {
				console.log(res);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<section className={className}>
			<p>نوع و مدل خودرو خود را انتخاب کنید</p>

			<div className={styles.fields}>
				<div className={styles.row}>
					<Select
						label='نوع خودرو'
						options={options}
						value={carType}
						onChange={(v) => setCarType(v)}
					/>
					<Select
						label='مدل خودرو'
						options={options}
						value={carModel}
						onChange={(v) => setCarModel(v)}
						disabled={!carType}
					/>
				</div>
			</div>

			<div className={styles.actions}>
				<Link to={prev} className={styles.prev}>
					<Button
						variant='outlined'
						iconPosition='right'
						icon={<img src={arrow} className={styles.icon} alt='' />}
					>
						بازگشت
					</Button>
				</Link>

				<Link
					to={next}
					className={`${styles.next} ${!carType || !carModel ? styles.disabled : ''}`}
				>
					<Button
						variant='outlined'
						iconPosition='left'
						icon={<img src={arrow} className={styles.icon} alt='' />}
						disabled={!carType || !carModel}
					>
						مرحله بعد
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default FirstStep;
