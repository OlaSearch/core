'use strict';

var _react = require('react');

var _react2 = require('../../../../.babelhelper.js').interopRequireDefault(_react);

var _OlaTranslate = require('./../../../decorators/OlaTranslate');

var _OlaTranslate2 = require('../../../../.babelhelper.js').interopRequireDefault(_OlaTranslate);

var TableDetail = function (_React$Component) {
  require('../../../../.babelhelper.js').inherits(TableDetail, _React$Component);

  function TableDetail(props) {
    require('../../../../.babelhelper.js').classCallCheck(this, TableDetail);

    var _this = require('../../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(TableDetail).call(this, props));

    _this.toggle = function () {
      return _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  require('../../../../.babelhelper.js').createClass(TableDetail, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var _props$data = _props.data;
      var record_data = _props$data.record_data;
      var record_keys = _props$data.record_keys;
      var caption = _props$data.caption;
      var max = _props.max;
      var translate = _props.translate;
      var isOpen = this.state.isOpen;

      var size = record_data.length;
      return _react2['default'].createElement(
        'div',
        { className: 'ola-answer-table-detail' },
        caption && _react2['default'].createElement(
          'h4',
          { className: 'ola-answer-table-caption' },
          caption
        ),
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
                record_keys.map(function (key, idx) {
                  return _react2['default'].createElement(
                    'td',
                    { key: idx },
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

  return TableDetail;
}(_react2['default'].Component);

TableDetail.defaultProps = {
  max: 5
};


module.exports = (0, _OlaTranslate2['default'])(TableDetail);