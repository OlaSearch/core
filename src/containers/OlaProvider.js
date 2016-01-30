import React from 'react';
import { Provider } from 'react-redux'
import OlaIntlProvider from './OlaIntlProvider';

export default class OlaProvider extends React.Component{
	
	static displayName = 'OlaProvider';

	static childContextTypes = {
		config: React.PropTypes.object
	};

	constructor(props){

		super(props)

		var { config, parser, queryBuilder, searchService, store } =  this.props;

		if( !config || !parser || !queryBuilder || !searchService || !store){

			var namePart = this.constructor.displayName ? " of " + this.constructor.displayName : "";
			throw new Error("Could not find config, parser, queryBuilder, searchService, store on this.props " + namePart);
		}
		
	}

	getChildContext(){
		
		return {
			config: this.props.config
		}
	}
	
	render(){

		var { translations, children, lang, store } = this.props;

		return (
				<Provider store = { store }>
					<OlaIntlProvider translations = { translations } lang = { lang }>
						{ children }
					</OlaIntlProvider>
				</Provider>
		)
	}
}