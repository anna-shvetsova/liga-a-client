import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline, Container, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

import App from './components/app';
import store from './store';

const darkTheme = createMuiTheme({
	palette: {
		type: 'dark',
		primary: {
			main: blue[200],
		},
		error: {
			main: red[200],
		}
	}
});

ReactDOM.render(
	<ThemeProvider theme={darkTheme}>
		<CssBaseline />
		<Container maxWidth='sm'>
			<Provider store={store}>
				<App />
			</Provider>
		</Container>
	</ThemeProvider>
	, document.getElementById('root')
);

