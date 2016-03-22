import React from 'react';
import { supplant, getDisplayName } from './../../utilities';
import DateParser from './../../utilities/dateParser';

const Tag = (props, context) => {	
	
	var displayName = '';
	var { name, onRemove, facet } = props;
	var { type, label, template, } = facet
	var { dateFormat} = context.config;

	switch(type){

		case 'range':		
            if(typeof name == 'string') {
                displayName = name;
            }else{            	
			    var [ from, to ] = name;
			    displayName = supplant(template, {from, to})
            }
			break;

		case 'daterange':
			var [ from, to ] = name;
			
			var fromDate = new Date( parseInt(from) )
			var toDate = new Date( parseInt(to) )
			displayName = supplant(template, {
				from: DateParser.format(fromDate, dateFormat) , 
				to: DateParser.format(toDate, dateFormat)
			})
			break;

		case 'rating':
			var index = name[0]/20;	
			displayName = label[index]
			break;

		case 'geo_distance':
			displayName = name
			break;

		default:
			displayName = getDisplayName( context.config.facetNames, name) ;
			break;
	}

	return (
		<div className="ola-facet-tag">
			<span className="ola-facet-tag-name">{displayName}</span>
			<button className="ola-facet-tag-remove" onClick = {onRemove}><span>Remove</span></button>
		</div>
	)
}

Tag.propTypes = {	
	name: React.PropTypes.oneOfType([
		React.PropTypes.string,
		React.PropTypes.array
    ]),	
	onRemove: React.PropTypes.func,
	facet: React.PropTypes.object
}

Tag.contextTypes = {
	config: React.PropTypes.object
}

module.exports = Tag;