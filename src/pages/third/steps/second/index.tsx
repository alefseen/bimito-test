import { FC, useEffect } from 'react';
import Select from 'components/ui/form/select';
import Button from 'components/ui/form/button';
import axios from 'utils/axios';
import arrow from 'assets/icons/arrow.svg';
import { Link } from 'react-router-dom';
import styles from '../../index.styl';

const SecondStep: FC<any> = ({
	prevCompany,
	setPrevCompany,
	className = '',
	next,
	prev,
	companies,
	setCompanies,
}) => {
	useEffect(() => {
		axios
			.get('/core/data/companies')
			.then((res) => {
				setCompanies(res.data.result);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<section className={className}>
			<p>شرکت بیمه‌گر قبلی خود را در این بخش وارد کنید</p>

			<div className={styles.fields}>
				<Select
					label='شرکت بیمه‌گر قبلی'
					options={companies?.map(({ id, company }) => ({ name: company, value: id })) || []}
					value={prevCompany}
					onChange={(v) => setPrevCompany(v)}
				/>
			</div>

			<div className={styles.actions}>
				<Link to={prev} className={styles.prev}>
					<Button
						variant='outlined'
						iconPosition='right'
						icon={<img src={arrow} className={styles.icon} alt='' />}
					>
						مرحله قبل
					</Button>
				</Link>

				<Link to={next} className={`${styles.next} ${!prevCompany ? styles.disabled : ''}`}>
					<Button
						variant='outlined'
						iconPosition='left'
						icon={<img src={arrow} className={styles.icon} alt='' />}
						disabled={!prevCompany}
					>
						مرحله بعد
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default SecondStep;
