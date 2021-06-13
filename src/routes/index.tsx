import { ComponentType } from 'react';

import Home from 'pages/home';
import NotFound from 'pages/404';
import Signup from 'pages/signup';

export type RouteLayoutType = {
	name: string;
};

class Route {
	path: string | [string];

	exact = true;

	privateRoute = false;

	loading = false;

	// eslint-disable-next-line no-unused-vars
	component: ComponentType;

	layout: RouteLayoutType;

	constructor(path: string, exact = true, component: ComponentType, privateRoute?: boolean) {
		this.path = path;
		this.exact = exact;
		this.component = component;
		this.privateRoute = privateRoute;
	}
}

export default [
	new Route('/', true, Home, true),
	new Route('/signup', true, Signup, false),
	new Route('', false, NotFound),
];
