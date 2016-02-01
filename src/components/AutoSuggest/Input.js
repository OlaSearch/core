import React from 'react';
import Bookmarks from './../Bookmarks';
import SpeechInput from './../Speech';

export default class Input extends React.Component{

	constructor(props){
		super(props)
	}

	static propTypes = {
		q: React.PropTypes.string,
		onChange: React.PropTypes.func,
		placeholder: React.PropTypes.string
	};

	static defaultProps = { 
		placeholder: 'Enter keywords'
	};
	
	onClear = (event) => {

		event && event.preventDefault()
		
		this.props.onClear()

		setTimeout( () => this.refs.Input.focus(), 0 );
	};

	onFocus = (event) => {

		if(!event.target.value) return;
		
		this.props.onChange.call(this, event.target.value);

	};

	onKeyUp = ( event ) => {

		if(event.which == 27){

			this.props.onClear()
			
		}
	};

	render(){
		
		var {
			q,
			onChange,
			placeholder
		} = this.props;
        
		/* Show clear or submit button */

		var button = q
			? <button type="reset" className="ola-clear-button" onClick = {this.onClear}></button>
			: <button type="submit" className="ola-search-button"></button>;

		return (
			<div className="ola-search-form-container">
				<input
					ref = 'Input'
					type = "text"
					value = {q}
					className = "ola-text-input ola-text-input-round"
					onChange = { (event) => {
						onChange.call(this, event.target.value)
					}}
					onFocus = {this.onFocus}
					autoComplete = "off" 
					autoCorrect = "off"
					autoCapitalize = "off" 
					spellCheck = "false"
					placeholder = { placeholder }
					onKeyUp = { this.onKeyUp}
				/>
				{button}

				<SpeechInput 
					onResult = { (value, confidence) => {
						
						onChange.call(this, value);
					}}
					onFinalResult = { (value) => {
						
						onChange.call(this, value);

					}}
				/>

				<Bookmarks />
			</div>
		)
	}
};