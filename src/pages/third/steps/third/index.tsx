import { FC, useEffect } from 'react';
import Select from 'components/ui/form/select';
import Button from 'components/ui/form/button';
import axios from 'utils/axios';
import styles from '../../index.styl';

const ThirdStep: FC<any> = ({
	thirdDiscount,
	setThirdDiscount,
	driverDiscount,
	setDriverDiscount,
	className = '',
	done,
	discounts,
	setDiscounts,
}) => {
	useEffect(() => {
		axios
			.get('/core/data/car-third-discount')
			.then((res) => {
				setDiscounts(res.data.result);
			})
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return (
		<section className={className}>
			<p>درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید</p>

			<div className={styles.fields}>
				<Select
					label='درصد تخفیف ثالث'
					options={discounts?.map(({ id, title }) => ({ name: title, value: id })) || []}
					value={thirdDiscount}
					onChange={(v) => setThirdDiscount(v)}
				/>

				<Select
					label='درصد تخفیف حوادث راننده'
					options={discounts?.map(({ id, title }) => ({ name: title, value: id })) || []}
					value={driverDiscount}
					onChange={(v) => setDriverDiscount(v)}
				/>
			</div>

			<div className={styles.actions}>
				<Button
					className={styles.next}
					disabled={!thirdDiscount || !driverDiscount}
					variant='contained'
					onClick={done}
				>
					استعلام قیمت
				</Button>
			</div>
		</section>
	);
};

export default ThirdStep;
