'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var SpeechInput = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(SpeechInput, _React$Component);

  function SpeechInput(props) {
    require('../../../.babelhelper.js').classCallCheck(this, SpeechInput);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(SpeechInput).call(this, props));

    _this.onLaunch = function () {
      var isRecording = _this.state.isRecording;
      var _this$props = _this.props;
      var lang = _this$props.lang;
      var continuous = _this$props.continuous;
      var interimResults = _this$props.interimResults;


      _this.setState({
        isRecording: !isRecording
      });

      if (isRecording && _this.recog) {
        _this.recog.stop();
        return;
      }

      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

      _this.recog = new SpeechRecognition();
      _this.recog.lang = lang;
      _this.recog.continuous = continuous;
      _this.recog.interimResults = interimResults;
      _this.recog.serviceURI = 'wami.csail.mit.edu';

      /* Add event listener for onresult event */
      _this.recog.addEventListener('result', _this.handleEvent);
      // this.recog.addEventListener('end', () => console.warn('end'))
      _this.recog.addEventListener('error', _this.handleError);

      /* Start recognizing */
      _this.recog.start();
    };

    _this.handleError = function (err) {
      _this.setState({
        isRecording: false
      });
      console.warn(err);
    };

    _this.handleEvent = function (event) {
      switch (event && event.type) {
        case 'result':
          window.requestAnimationFrame(function () {
            var result = event.results[event.resultIndex];
            var item = result[0];

            _this.props.onResult && _this.props.onResult(item.transcript, item.confidence);

            if (result.isFinal) {
              _this.props.onFinalResult && _this.props.onFinalResult(item.transcript);
            }
          });
          break;
      }
    };

    _this.state = {
      isRecording: false,
      isSpeechSupported: window.SpeechRecognition || window.webkitSpeechRecognition
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(SpeechInput, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return nextState.isRecording !== this.state.isRecording;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var isRecording = _state.isRecording;
      var isSpeechSupported = _state.isSpeechSupported;
      var translate = this.props.translate;

      if (!isSpeechSupported) return null;

      var klassName = (0, _classnames2['default'])('ola-link-speech', {
        'ola-link-speech-stop': isRecording
      });

      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          'button',
          {
            type: 'button',
            className: klassName,
            onClick: this.onLaunch },
          _react2['default'].createElement('span', { className: 'ola-btn-hint hint--top', 'aria-label': translate('speech_label') })
        )
      );
    }
  }]);

  return SpeechInput;
}(_react2['default'].Component);

SpeechInput.defaultProps = {
  lang: 'en',
  continuous: true,
  interimResults: true
};


module.exports = (0, _olaTranslate2['default'])(SpeechInput);