import React from 'react';
import { replaceFacet, executeSearch } from './../../actions/Search';
import { flatten } from 'ramda';
import noUiSlider from 'nouislider';
import { FacetToggle } from './../../decorators/OlaFacetToggle';
import classNames from 'classnames';
import Histogram from './Histogram';

@FacetToggle
export default class Range extends React.Component{
	
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        selected: React.PropTypes.array.isRequired,
        facet: React.PropTypes.object.isRequired,
    };

    static defaultProps = {
		step: 1,
		showHistogram: false,
		pips: [0,26,44.5,63,81.5,100],
		pipsDensity: 4,
		pipsMode: 'positions',
		showPips: false,
    };

	onChange = (facet, value) => {
		
		if(typeof value == 'string' || value.length == 1) value = [0, value[0]]

		this.props.dispatch(replaceFacet(facet, value))

		this.props.dispatch(executeSearch())
	};

	componentDidUpdate(prevProps){
	
		var options = this.getSliderValues(this.props);
		var { step } = this.props;
		var { min, max, value } = options;
		
		/**
		 * Check if min, max is the same, then disable the slider
		 */
		
		if (min == max) {
			min -= 60;
			max += 60;
			step = 60;			
			
			this.refs.slider.setAttribute('disabled', true)
		}else{

			this.refs.slider.removeAttribute('disabled')
		}

		this.refs.slider.noUiSlider.updateOptions({
			step: step,
			range: {
				min: min,
				max: max
			}
		});

		this.refs.slider.noUiSlider.set(value)

	}

	getSliderValues(props){

		var {facet, selected} = props;

		var { values, singleHandle } = facet;

		var values = values.map( (value) => value.name);
		var min = 0, max = 0;
		
		if(values.length){
			min = Math.min(...values);
			max = Math.max(...values);
		}
				
		var arr = flatten(selected);
		
		var value = arr && arr.length? arr : [min, max];

		/* If Slider only has 1 handle */

		if(singleHandle){
			value = arr && arr.length? arr[1] : [max]
		}

		return {min, max, value}

	}

	componentDidMount(){

		var {
			facet,			
			step,
			showPips,
			pips,
			pipsDensity,
			pipsMode,
		} = this.props;

		var options = this.getSliderValues(this.props);

		var { singleHandle } = facet;

		var {min, max, value} = options;
		
		if (min == max) {
			min -= 60; 
			max += 60; 
			step = 60;
			
			this.refs.slider.setAttribute('disabled', true)
		}
		else{

			this.refs.slider.removeAttribute('disabled')
		}

		/* Slider options */

		var sliderOptions  = {
			start: value,
			step: step,
			connect: singleHandle? 'lower' : true,
			tooltips: true,
			range: {
				'min':  min,
				'max':  max
			},
			format: {
				to: ( value ) => Math.floor(value),
				from: ( value ) => Math.floor(value)
			}			
		};

		var pipsOptions = showPips? {
			pips: {				
				mode: pipsMode,
				values: pips,
				density: pipsDensity,
				stepped: true
			}
		} : {};

		/* Initialize Slider */
        
		this.slider = noUiSlider.create( this.refs.slider , {...sliderOptions, ...pipsOptions });

		/* Bind to onchange */

		this.slider.on('change', (value) => this.onChange(facet, value))
	}

	render(){

		var { facet, isCollapsed, toggleDisplay, showHistogram } = this.props;		
		var { values } = facet;
		
		var klass = classNames({
			'ola-facet': true,
			'ola-facet-collapsed': isCollapsed
		});

		return (
			<div className={klass}>
				<h4 className="ola-facet-title" onClick = {toggleDisplay}>{facet.displayName}</h4>
				<div className="ola-facet-wrapper">
					{ showHistogram
						? <Histogram data = { values } />
						: null
					}
					<div className="ola-slider">
						<div ref = 'slider' />
					</div>
				</div>
			</div>
		)
	}
};