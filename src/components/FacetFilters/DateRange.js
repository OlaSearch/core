import React from 'react';
import { removeFacet, replaceFacet, executeSearch } from './../../actions/Search';
import { FacetToggle } from './../../decorators/OlaFacetToggle';
import DateParser from './../../utilities/dateParser';
import classNames from 'classnames';

class DateRange extends React.Component{
    
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        facet: React.PropTypes.object.isRequired,
        selected: React.PropTypes.array.isRequired
    };

	onChange = () => {

		var fromDate = new Date( this.refs.fromDate.value ).getTime(),
			toDate = new Date( this.refs.toDate.value).getTime();

		var { facet, dispatch } = this.props;

		dispatch(replaceFacet(facet, [ fromDate, toDate ]))

		dispatch(executeSearch())
	};

	format = ( date ) => {

		var d = new Date(parseInt(date));
		
		return DateParser.format(d, 'YYYY-MM-DD')

	};

	render(){

		var {
			facet,			
			selected,
			isCollapsed,
			toggleDisplay,
		} = this.props;

		var [ from, to ] = selected;
		var { values } = facet;
		var dates =  values.map( value => value.name )
		var min = Math.min.apply(this, dates)
		var max = Math.max.apply(this, dates)

		
		var defaultFrom = from? from : min;
		var defaultTo = to? to: max;

		var klass = classNames({
			'ola-facet': true,
			'ola-facet-collapsed': isCollapsed
		});

		return (
			<div className={klass}>
				<h4 className="ola-facet-title" onClick = {toggleDisplay}>{facet.displayName}</h4>
				<div className="ola-facet-wrapper">
					<label className="ola-label">
						From
						<input 
							type="date" 
							value = { this.format( defaultFrom ) }
							min = { this.format( min ) }
							ref = 'fromDate'
							onChange = { this.onChange }
						/>
					</label>
					<label className="ola-label">
						To
						<input 
							type="date" 
							ref = 'toDate'
							max = { this.format( max ) }
							value = { this.format( defaultTo ) }
							onChange = { this.onChange }
						/>
					</label>
				</div>
			</div>
		)
	}
}

module.exports = FacetToggle( DateRange )