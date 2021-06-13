import { useEffect, useLayoutEffect, useState } from 'react';

const loadState = (key, type) => {
	let newValue: any = localStorage.getItem(key);

	if (newValue) {
		switch (type) {
			case 'boolean':
				if (newValue === 'true') {
					newValue = true;
				} else {
					newValue = false;
				}
				break;

			case 'json':
				newValue = JSON.parse(newValue);

				break;

			case 'number':
				newValue = Number(newValue);

				break;

			default:
				break;
		}
	}
	return newValue;
};

const usePersistedState = (key, defaultValue, type = 'string', visiblaty = false) => {
	const [value, setValue] = useState(defaultValue);
	const [visible, setVisible] = useState(visiblaty);

	useLayoutEffect(() => {
		const newValue = loadState(key, type);
		if ([undefined, null].includes(newValue)) {
			setValue(defaultValue);
			localStorage.setItem(key, defaultValue);
		} else {
			setValue(newValue);
		}
		setVisible(true);
	}, []);

	useEffect(() => {
		if (visible) {
			if ([undefined, null].includes(value)) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		}
	}, [value]);

	return [visible ? value : '', setValue];
};

export default usePersistedState;
