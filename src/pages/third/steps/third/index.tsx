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
			<p>درصد تخفیف بیمه شخص ثالث و حوادث راننده را وارد کنید</p>

			<div className={styles.fields}>
				<Select
					label='درصد تخفیف ثالث'
					options={options}
					value={thirdDiscount}
					onChange={(v) => setThirdDiscount(v)}
				/>

				<Select
					label='درصد تخفیف حوادث راننده'
					options={options}
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
