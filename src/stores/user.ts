import { action, makeObservable, observable } from 'mobx';
import { create, persist } from 'mobx-persist';

class UserStore {
	@persist('object') @observable user = {};

	@persist @observable haveUser = false;

	constructor() {
		makeObservable(this);
	}

	@action
	setUser = (user) => {
		Object.keys(user).forEach((key) => {
			this.user[key] = user[key];
		});
		this.haveUser = true;
	};

	@action
	clearUser = () => {
		this.haveUser = false;
		this.user = observable({});
	};
}
const userStore = new UserStore();
export default userStore;

if (typeof window !== 'undefined') {
	create()('userStoreObject', userStore)
		.then()
		// eslint-disable-next-line no-console
		.catch((e) => console.log(e));
}
