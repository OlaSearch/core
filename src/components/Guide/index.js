import React from 'react';
import { connect } from 'react-redux';
import { 
		initGuide, 
		executeSearch, 
		incrementIndex, 
		decrementIndex, 
		replaceFacet, 
		clearFacetAfterIndex } from './../../actions/Guide';
import Question from './Question';
import { buildQueryString } from './../../services/urlSync';

class Guide extends React.Component{
	constructor(props){
		super(props)
	}

	static propTypes = {
		index: React.PropTypes.number,
		searchUrl: React.PropTypes.string
	};

	static defaultProps = {
		searchUrl : 'search.html?',
		btnContinueText: 'Continue',
		btnSubmitText: 'Search',
	};

	static contextTypes = {
		config: React.PropTypes.object
	};

	componentDidMount(){

		var { config } = this.context;
		var { dispatch, name } = this.props;

		if(!config.guides.hasOwnProperty(name)) throw new Error('Guide error: Cannot find ' + name + ' in config file');

		var questions = config.guides[name].filter( (facet) => !!facet.question);
        
        var fields = questions.map( (q) => q.name);
        
		dispatch( initGuide( { questions, fields }) )
	
	}

	componentDidUpdate( prevProps ){

		if(this.props.Guide.facets.length != prevProps.Guide.facets.length){
			
			this.invokeSearch();
		}
	}
		
	invokeSearch( activeIndex = null ){
		
		var { dispatch, Guide } = this.props;

		var { facets, index } = Guide;

		if(!facets.length) {
			console.warn('No facets for guide')
			return;
		}

		var idx = activeIndex != null ? activeIndex : index;
		
		var currentFl = facets[ idx ].name
		
		dispatch ( executeSearch( {fl: currentFl, index: idx }) )
		
	}
	
	onContinue = () => {
		
		var { dispatch } = this.props;
				
		dispatch( incrementIndex() )
				
		this.invokeSearch();
	};
	
	handleChange = (facet, value, idx) => {
		
		this.props.dispatch( replaceFacet(facet, value ))

		var { index } = this.props.Guide;
		
		if(idx != index){
			
			/* Clear all the selected facets */
			
			if(idx < index){
				this.props.dispatch( clearFacetAfterIndex(idx) )
			}
			
			this.invokeSearch( idx + 1 );
		}
	};

	onHandleSearch = () => {
		
		var { facet_query } = this.props.Guide.query;
		
		window.location.href = this.props.searchUrl + buildQueryString({ facet_query, referrer: 'guide' })
	};

	render(){

		var { facets, index } = this.props.Guide;
		var { Device, btnContinueText, btnSubmitText } = this.props;
		var size = facets.length;
		var list = facets.filter( (facet, idx) => idx <= index);
		var isLastIndex = index == (size - 1);

		return (
			<div className="ola-guide">

				{list.map( (item, idx) => {
				
					return <Question 
							item = {item} 
							key = {idx} 
							index = {idx} 
							onChange = {this.handleChange}
							active = { idx === index}
							device = { Device }
							/>
				})}
				
				{ isLastIndex
					? <button 
						className="ola-btn ola-btn-primary"
						onClick = {this.onHandleSearch}
						>
						{ btnSubmitText }
					</button>
					:
					<button 
						className="ola-btn ola-btn-primary"
						onClick = {this.onContinue}
						>
						{ btnContinueText }
					</button>
				}
			</div>
		)
	}
}


function mapStateToProps( state ){

	return {
		Guide: state.Guide,
		Device: state.Device
	}
}

module.exports = connect( mapStateToProps )( Guide )