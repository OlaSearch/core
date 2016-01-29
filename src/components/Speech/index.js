import React from 'react';

var SpeechInput = React.createClass({
	getInitialState: function(){

		return {
			isRecording: false
		}
	},
	onLaunch: function(){

		var { isRecording } = this.state;

		this.setState({
			isRecording: !isRecording
		})

		if(isRecording){
			this.recog.stop();
			return ;
		}

		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		this.recog = new SpeechRecognition()

		this.recog.lang = 'en'
		this.recog.continuous = true
		this.recog.interimResults = true
		this.recog.serviceURI = 'wami.csail.mit.edu'

		this.recog.addEventListener( 'result', this.handleEvent )

		this.recog.start()

	},
	handleEvent: function(event){
		
		switch( event && event.type ) {
		  case 'result': 
				window.requestAnimationFrame( () => {
	  
					var result = event.results[ event.resultIndex ]
					var item = result[0]

					this.props.onResult.call(this, item.transcript, item.confidence)

					if(result.isFinal){
						this.props.onFinalResult.call(this, item.transcript)

//						this.setState({
//							isRecording: false
//						})
					}

				})
				break;	      
		  default: console.log( 'Unhandled event:', event )
		}
	},
	render: function(){
		var { isRecording } = this.state;
		
		var klassName = 'ola-fake-button ola-link-speech' + (isRecording? ' ola-link-speech-stop': '');

		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if(!SpeechRecognition) return null;

		return (
			<div>
				<button
					type="button" 
					className={klassName}
					onClick = {this.onLaunch}
					aria-label="Press to speak"
					></button>
			</div>
		)
	}
});

module.exports = SpeechInput;