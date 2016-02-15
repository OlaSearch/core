import React from 'react';
import { 
	updateQueryTerm, 
	executeSearch, 
	changePage, 
	clearQueryTerm 
	} from './../actions/Search';
import Bookmarks from './Bookmarks';
import History from './History';
import SpeechInput from './Speech';
import { debounce } from './../utilities';

class InstantSearchForm extends React.Component{

	constructor(props, context){
		super(props)

		this.instantSearchDebounce = debounce( () => this.props.dispatch( executeSearch() ),  context.config.searchTimeOut)
	}
	
	static defaultProps = {
		placeholder: "Enter keywords"
	};

	static contextTypes = {
		config: React.PropTypes.object
	};

	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		q: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		spellSuggestions: React.PropTypes.array,		
	};

	onChange = (term) => {

		var { dispatch } = this.props;

		dispatch( updateQueryTerm(term) );	

		this.instantSearchDebounce();	
	};

	onClear = () => {

		var { dispatch } = this.props;

		setTimeout( () => this.refs.Input.focus(), 100);

		dispatch(clearQueryTerm())

		dispatch(executeSearch())
	};

	onSubmit = (event) => {

		event.preventDefault();
	};

	render(){
		
		let {
			placeholder,
			dispatch,
			q,
		} = this.props;

		let button = q
			? <button type="reset" className="ola-clear-button" onClick = {this.onClear}  aria-label="Clear"></button>
			: <button type="button" className="ola-search-button" onClick = {this.onClear} aria-label="Submit"></button>;


		return (
			<form className="ola-search-form" onSubmit = { this.onSubmit }>
				<div className="ola-search-form-container">
					
					<input
						ref = 'Input'
						type="text"
						className="ola-text-input ola-text-input-round"
						placeholder = {placeholder}
						value = {q}
						aria-label = 'searchInput'
						autoComplete = "off" 
						autoCorrect = "off"
						autoCapitalize = "off" 
						spellCheck = "false"
						onFocus = {this.props.onFocus}
						onBlur = {this.props.onBlur}
						onChange = { (event) => {

							this.onChange(event.target.value);

						}}
					/>
					{button}

					<Bookmarks />
						
					<History />

					<SpeechInput 
						onResult = { (value, confidence) => {

							// this.refs.Input.value = value
							
							dispatch( updateQueryTerm(value) );

							dispatch( executeSearch() )
						}}
						onFinalResult = { (value) => {
							
							dispatch( updateQueryTerm(value) );

							dispatch( executeSearch() )
						}}
					/>

				</div>
			</form>
		)
	}
}

module.exports = InstantSearchForm