import Button from 'components/ui/form/button';
import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Helmet from 'react-helmet';
import TextField from 'components/ui/form/textfield';
import { isMobilePhone, isStrongPassword, isAlpha } from 'validator';
import userStore from 'stores/user';
import styles from './index.styl';

const Signup: FC = () => {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const [errors, setErrors] = useState<any>({});

	const handleSubmit = (e) => {
		e.preventDefault();
		const variables = {
			firstname,
			lastname,
			phone,
			password,
		};
		const newErrors: any = {};

		Object.entries({ firstname, lastname }).forEach(([key, value]) => {
			if (['firstname', 'lastname'].includes(key) && !isAlpha(value, 'fa-IR', { ignore: ' ' })) {
				newErrors[key] = 'باید با حروف فارسی نوشته شود';
			}
		});

		Object.entries(variables).forEach(([key, value]) => {
			if (!value?.trim()) {
				newErrors[key] = 'نمی‌تواند خالی باشد';
			}
		});

		if (!isMobilePhone(phone.trim())) {
			newErrors.phone = 'شماره موبایل نامعتبر است';
		}

		if (
			!isStrongPassword(password, {
				minLength: 4,
				minLowerCase: 1,
				minUpperCase: 1,
				minNumbers: 0,
				minSymbols: 0,
			})
		) {
			newErrors.password = 'رمز عبور ضغیف است';
		}

		if (password.length > 10) {
			newErrors.password = 'رمز عبور باید کمتر از ۱۰ حرف باشد';
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			userStore.setUser({
				firstname: firstname.trim(),
				lastname: lastname.trim(),
				password,
				phone,
			});
			history.push('/');
		}
	};

	return (
		<main className={styles.page}>
			<Helmet>
				<title>ثبت نام</title>
			</Helmet>

			<h1>ثبت نام</h1>

			<form onSubmit={handleSubmit}>
				<div className={styles.grid}>
					<TextField
						className={styles.half}
						value={firstname}
						error={errors.firstname}
						onChange={(e) => setFirstname(e.target.value)}
						label='نام'
					/>
					<TextField
						className={styles.half}
						value={lastname}
						error={errors.lastname}
						onChange={(e) => setLastname(e.target.value)}
						label='نام خانوادگی'
					/>
					<TextField
						value={phone}
						error={errors.phone}
						onChange={(e) => setPhone(e.target.value)}
						label='شماره موبایل'
					/>
					<TextField
						value={password}
						error={errors.password}
						onChange={(e) => setPassword(e.target.value)}
						label='رمز عبور'
						type='password'
					/>
				</div>

				<Button onClick={handleSubmit} type='submit' variant='contained'>
					ثبت نام
				</Button>
			</form>
		</main>
	);
};

export default Signup;
