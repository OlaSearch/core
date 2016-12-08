'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var AnswerTable = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(AnswerTable, _React$Component);

  function AnswerTable(props) {
    require('../../../.babelhelper.js').classCallCheck(this, AnswerTable);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(AnswerTable).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(AnswerTable, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var _props$data = _props.data;
      var record_data = _props$data.record_data;
      var record_keys = _props$data.record_keys;
      var max = _props.max;
      var translate = _props.translate;
      var isOpen = this.state.isOpen;

      var size = record_data.length;
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer' },
        _react2['default'].createElement(
          'table',
          { className: 'ola-answer-table' },
          _react2['default'].createElement(
            'thead',
            null,
            _react2['default'].createElement(
              'tr',
              null,
              record_keys.map(function (key, idx) {
                return _react2['default'].createElement(
                  'th',
                  { key: idx },
                  key
                );
              })
            )
          ),
          _react2['default'].createElement(
            'tbody',
            null,
            record_data.slice(0, isOpen ? undefined : max).map(function (row, idx) {
              return _react2['default'].createElement(
                'tr',
                { key: idx },
                record_keys.map(function (key) {
                  return _react2['default'].createElement(
                    'td',
                    null,
                    row[key]
                  );
                })
              );
            })
          )
        ),
        !isOpen && size > max ? _react2['default'].createElement(
          'button',
          { className: 'ola-answer-link-more', onClick: this.toggle },
          translate('answers_show_more')
        ) : null
      );
    }
  }]);

  return AnswerTable;
}(_react2['default'].Component);

AnswerTable.defaultProps = {
  max: 5
};


module.exports = (0, _OlaTranslate2['default'])(AnswerTable);