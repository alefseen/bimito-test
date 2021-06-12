/* eslint-disable no-unused-vars */
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from 'layout';
import { FC } from 'react';

const App: FC = () => {
	return (
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	);
};

render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
	// Accept HMR if it's enabled
	(module as any)?.hot?.accept();
}
