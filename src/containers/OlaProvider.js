import React from 'react';
import { Provider } from 'react-redux'
import { createOlaStore } from './../store';
import OlaIntlProvider from './OlaIntlProvider';

export default class OlaProvider extends React.Component{
	
	static displayName = 'OlaProvider';

	static childContextTypes = {
		config: React.PropTypes.object
	};

	constructor(props){

		super(props)

		var { config, parser, queryBuilder, searchService } =  this.props;

		if( !config || !parser || !queryBuilder || !searchService){

			var namePart = this.constructor.displayName ? " of " + this.constructor.displayName : "";
			throw new Error("Could not find config, parser, queryBuilder, searchService on this.props" + namePart);
		}

		/* Store */
		
		this.olaStore = createOlaStore( this.props )

	}

	getChildContext(){
		
		return {
			config: this.props.config
		}
	}
	
	render(){

		var { translations, children, lang } = this.props;

		return (
				<Provider store = { this.olaStore }>
					<OlaIntlProvider translations = { translations } lang = { lang }>
						{ children }
					</OlaIntlProvider>
				</Provider>
		)
	}
}