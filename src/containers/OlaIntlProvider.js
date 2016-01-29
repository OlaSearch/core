import React from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/lib/locale-data/en';
// import zhLocaleData from 'react-intl/lib/locale-data/zh';

addLocaleData(enLocaleData);
// addLocaleData(zhLocaleData);

@connect( state => ({
	Intl: state.Intl
}))
export default class OlaIntlProvider extends React.Component{

	render() {
		
		var { locales, messages } = this.props.Intl;

		return (
			<IntlProvider locale = { locales }  messages = { messages }>
				{this.props.children}
			</IntlProvider>
		)
	}
};