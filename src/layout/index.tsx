import './index.styl';
import routes from 'routes';
import { Route, Switch } from 'react-router-dom';
import userStore from 'stores/user';
import { FC } from 'react';
import MainLayout from './layout';

const Layout: FC<{ staticContext?: any }> = () => {
	return (
		<MainLayout>
			<Switch>
				{routes.map(
					({ component: Component, privateRoute, ...route }) =>
						(userStore.haveUser || !privateRoute) && (
							<Route
								key={`${Component}-route`}
								component={(props) => <Component {...props} />}
								{...route}
							/>
						)
				)}
			</Switch>
		</MainLayout>
	);
};

export default Layout;
