'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeechInput = function (_React$Component) {
  _inherits(SpeechInput, _React$Component);

  function SpeechInput(props) {
    _classCallCheck(this, SpeechInput);

    var _this = _possibleConstructorReturn(this, (SpeechInput.__proto__ || Object.getPrototypeOf(SpeechInput)).call(this, props));

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

  _createClass(SpeechInput, [{
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
  store: _propTypes2['default'].object,
  config: _propTypes2['default'].oneOfType([_propTypes2['default'].object, _propTypes2['default'].func])
};
SpeechInput.defaultProps = {
  lang: 'en',
  continuous: true,
  interimResults: true
};


module.exports = (0, _OlaTranslate2['default'])(SpeechInput);