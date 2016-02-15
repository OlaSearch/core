import React from 'react';
import * as defaultTranslations from './../translations';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/lib/locale-data/en';

addLocaleData(enLocaleData);

class OlaIntlProvider extends React.Component{

	static defaultProps = {
		lang: 'en',
		translations: {}
	};

	render() {
		
		var { translations, lang, children } = this.props;
		var activeTranslation = lang && translations? translations[lang] : {};
		var { locales, messages } = { ...defaultTranslations[lang], ...activeTranslation}

		return (
			<IntlProvider locale = { locales }  messages = { messages }>
				<div className="ola-search">
					{ React.cloneElement(children, this.props) }
				</div>
			</IntlProvider>
		)
	}
};

module.exports = OlaIntlProvider;