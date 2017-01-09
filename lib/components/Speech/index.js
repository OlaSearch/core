'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var _Logger = require('./../../actions/Logger');

var SpeechInput = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(SpeechInput, _React$Component);

  function SpeechInput(props) {
    require('../../../.babelhelper.js').classCallCheck(this, SpeechInput);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, (SpeechInput.__proto__ || Object.getPrototypeOf(SpeechInput)).call(this, props));

    _this.onLaunch = function () {
      var isRecording = _this.state.isRecording;
      var _this$props = _this.props,
          lang = _this$props.lang,
          continuous = _this$props.continuous,
          interimResults = _this$props.interimResults;


      _this.setState({
        isRecording: !isRecording
      });

      if (isRecording && _this.recog) {
        _this.recog.stop();
        return;
      }

      /**
       * Log
       */
      var eventLabel = _this.props.isInstantSearch ? 'instantsearch' : _this.props.isAutosuggest ? 'autosuggest' : null;
      _this.context.store.dispatch((0, _Logger.log)({
        eventType: 'C',
        eventCategory: 'Voice',
        eventAction: 'click',
        eventLabel: eventLabel
      }));

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
      _this.recog.addEventListener('end', _this.stopRecording);
      _this.recog.addEventListener('onnomatch', _this.stopRecording);
      _this.recog.addEventListener('onspeechend', _this.stopRecording);

      /* Start recognizing */
      _this.recog.start();
    };

    _this.stopRecording = function () {
      _this.setState({
        isRecording: false
      });
      if (_this.recog) _this.recog.stop();
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
      var _state = this.state,
          isRecording = _state.isRecording,
          isSpeechSupported = _state.isSpeechSupported;
      var translate = this.props.translate;
      var voiceSearch = this.context.config.voiceSearch;

      if (!isSpeechSupported || !voiceSearch) return null;

      var klassName = (0, _classnames2['default'])('ola-link-speech', {
        'ola-link-speech-stop': isRecording
      });

      return _react2['default'].createElement(
        'div',
        { className: 'ola-speech-input' },
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

SpeechInput.contextTypes = {
  store: _react2['default'].PropTypes.object,
  config: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.object, _react2['default'].PropTypes.func])
};
SpeechInput.defaultProps = {
  lang: 'en',
  continuous: true,
  interimResults: true
};


module.exports = (0, _OlaTranslate2['default'])(SpeechInput);