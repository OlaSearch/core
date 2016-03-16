import React from 'react';
import Year from './Year';
import { createHTMLMarkup } from './../../../utilities';
import { log } from './../../../actions/Logger';

class Title extends React.Component{

	static defaultProps = {
		isLink: true
	};

	static contextTypes = {
		store: React.PropTypes.object
	};

	logClick = (event) => {

		this.context.store.dispatch( log('C', this.props.result) )
		
	};

	render(){
		
		var { result, isLink, children, baseUrl } = this.props;

		var {
			year,
			title,
			url,
			highlighting,
		} = result;

		if(baseUrl) url = baseUrl + url;
		
		/* Check for highlighting */

		if(highlighting){

			var { title: highlighted_title } = highlighting;
			
			if(typeof highlighted_title == 'object') {
				title = highlighted_title[0];
			}
		}

		return (
			<h3 className="ola-field ola-field-title">
				{ isLink
					? <a href={url} onClick = { this.logClick } dangerouslySetInnerHTML = { createHTMLMarkup( title) } />
					: <span dangerouslySetInnerHTML = { createHTMLMarkup( title) } />
				}
				{children}
			</h3>
		)
	}
}

module.exports = Title;