import './index.styl';
import routes from 'routes';
import { Route, Switch, Redirect } from 'react-router-dom';
import userStore from 'stores/user';
import { FC } from 'react';
import { observer } from 'mobx-react';
import MainLayout from './layout';

const Layout: FC<{ staticContext?: any }> = () => {
	return (
		<MainLayout>
			<Switch>
				{routes.map(({ component: Component, privateRoute, ...route }) =>
					(userStore.haveUser && privateRoute === true) ||
					(!userStore.haveUser && privateRoute === false) ||
					privateRoute === undefined ? (
						<Route
							key={`${Component}-route`}
							component={(props) => <Component {...props} />}
							{...route}
						/>
					) : (
						<Route key={`${Component}-route`} {...route}>
							<Redirect to={privateRoute ? '/signup' : '/'} />
						</Route>
					)
				)}
			</Switch>
		</MainLayout>
	);
};

export default observer(Layout);
