import React from 'react';
import Bookmarks from './../Bookmarks';
import History from './../History';
import SpeechInput from './../Speech';

class Input extends React.Component{

	constructor(props){
		super(props)
	}

	static propTypes = {
		q: React.PropTypes.string,
		onChange: React.PropTypes.func		
	};

	
	onClear = (event) => {

		event && event.preventDefault()
	
		/* Do not call blur event when its a button */		
		if(event.target.nodeName == 'INPUT' && !event.target.value) {
			event.target.blur()
			this.props.handleClickOutside.call(this, event)
			return ;
		}		
		
		this.props.onClear()

		setTimeout( () => this.refs.Input.focus(), 0 );
	};

	onFocus = (event) => {

		this.props.onFocus && this.props.onFocus.call(this, event)

		if(!event.target.value) return;
		
		this.props.onChange.call(this, event.target.value);

	};

	onKeyDown = ( event ) => {

		var { onClear, onMove, onSubmit } = this.props

		switch( event.which ){

			case 27: // Esc
				this.onClear.call(this, event);
				break;	
			case 38: // Up
				onMove('up')
				break;

			case 40: // Down
				onMove('down')
				break;

			case 9: // Tab
				break;
			case 13: // Enter
				onSubmit()
				break;

		}
	};

	render(){
		
		var {
			q,
			onChange,
			placeholder,
			onSubmit,
			onBlur,			
		} = this.props;
        
		/* Show clear or submit button */

		// var button = q
		// 	? <button type="reset" className="ola-btn ola-clear-button" onClick = {this.onClear}></button>
		// 	: <button type="submit" className="ola-btn ola-search-button" onClick = { onSubmit}></button>;
		
		var button = q
			? <button type="reset" className="ola-btn ola-clear-button" onClick = {this.onClear}></button>
			: <button type="button" className="ola-btn ola-search-button" onClick = { () => this.refs.Input.focus() } />;

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
					onBlur = {onBlur}
					autoComplete = "off" 
					autoCorrect = "off"
					autoCapitalize = "off" 
					spellCheck = "false"
					placeholder = { placeholder }
					onKeyDown = { this.onKeyDown }
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

				<History />
			</div>
		)
	}
};

module.exports = Input