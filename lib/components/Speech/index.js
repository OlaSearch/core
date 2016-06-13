'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = _interopRequireDefault(_olaTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? _defaults(subClass, superClass) : subClass.__proto__ = superClass; }

var SpeechInput = function (_React$Component) {
  _inherits(SpeechInput, _React$Component);

  function SpeechInput(props) {
    _classCallCheck(this, SpeechInput);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SpeechInput).call(this, props));

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

            _this.props.onResult.call(_this, item.transcript, item.confidence);

            if (result.isFinal) {
              _this.props.onFinalResult.call(_this, item.transcript);
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