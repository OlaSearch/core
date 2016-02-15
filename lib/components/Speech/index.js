'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SpeechInput = _react2.default.createClass({
	displayName: 'SpeechInput',

	getInitialState: function getInitialState() {

		return {
			isRecording: false
		};
	},
	onLaunch: function onLaunch() {
		var isRecording = this.state.isRecording;


		this.setState({
			isRecording: !isRecording
		});

		if (isRecording) {
			this.recog.stop();
			return;
		}

		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		this.recog = new SpeechRecognition();

		this.recog.lang = 'en';
		this.recog.continuous = true;
		this.recog.interimResults = true;
		this.recog.serviceURI = 'wami.csail.mit.edu';

		this.recog.addEventListener('result', this.handleEvent);

		this.recog.start();
	},
	handleEvent: function handleEvent(event) {
		var _this = this;

		switch (event && event.type) {
			case 'result':
				window.requestAnimationFrame(function () {

					var result = event.results[event.resultIndex];
					var item = result[0];

					_this.props.onResult.call(_this, item.transcript, item.confidence);

					if (result.isFinal) {
						_this.props.onFinalResult.call(_this, item.transcript);
					}
				});
				break;
		}
	},
	render: function render() {
		var isRecording = this.state.isRecording;


		var klassName = 'ola-link-speech' + (isRecording ? ' ola-link-speech-stop' : '');

		var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

		if (!SpeechRecognition) return null;

		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement('button', {
				type: 'button',
				className: klassName,
				onClick: this.onLaunch,
				'aria-label': 'Press to speak'
			})
		);
	}
});

module.exports = SpeechInput;