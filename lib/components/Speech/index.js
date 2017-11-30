'use strict';

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = _interopRequireDefault(_OlaTranslate);

var _Logger = require('./../../actions/Logger');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var SpeechInput = function (_React$Component) {
  (0, _inherits3['default'])(SpeechInput, _React$Component);

  function SpeechInput(props) {
    (0, _classCallCheck3['default'])(this, SpeechInput);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (SpeechInput.__proto__ || (0, _getPrototypeOf2['default'])(SpeechInput)).call(this, props));

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

  (0, _createClass3['default'])(SpeechInput, [{
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
          { type: 'button', className: klassName, onClick: this.onLaunch },
          _react2['default'].createElement('span', {
            className: 'ola-btn-hint hint--top',
            'aria-label': translate('speech_label')
          })
        )
      );
    }
  }]);
  return SpeechInput;
}(_react2['default'].Component);

SpeechInput.contextTypes = {
  store: _propTypes2['default'].object,
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};
SpeechInput.defaultProps = {
  lang: 'en',
  continuous: true,
  interimResults: true
};


module.exports = (0, _OlaTranslate2['default'])(SpeechInput);