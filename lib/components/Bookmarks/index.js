'use strict';

var _react = require('react');

var _react2 = require('../../../.babelhelper.js').interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Bookmarks = require('./../../actions/Bookmarks');

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = require('../../../.babelhelper.js').interopRequireDefault(_reactOnclickoutside);

var _classnames = require('classnames');

var _classnames2 = require('../../../.babelhelper.js').interopRequireDefault(_classnames);

var _SearchResults = require('./../SearchResults');

var _SearchResults2 = require('../../../.babelhelper.js').interopRequireDefault(_SearchResults);

var _NoResults = require('./../Snippets/NoResults');

var _NoResults2 = require('../../../.babelhelper.js').interopRequireDefault(_NoResults);

var _olaTranslate = require('./../../decorators/olaTranslate');

var _olaTranslate2 = require('../../../.babelhelper.js').interopRequireDefault(_olaTranslate);

var Bookmarks = function (_React$Component) {
  require('../../../.babelhelper.js').inherits(Bookmarks, _React$Component);

  function Bookmarks(props) {
    require('../../../.babelhelper.js').classCallCheck(this, Bookmarks);

    var _this = require('../../../.babelhelper.js').possibleConstructorReturn(this, Object.getPrototypeOf(Bookmarks).call(this, props));

    _this.handleClickOutside = function (event) {
      _this.setState({
        isOpen: false
      });
    };

    _this.toggleVisibility = function () {
      _this.setState({
        isOpen: !_this.state.isOpen
      });
    };

    _this.onRemove = function (bookmark) {
      _this.props.dispatch((0, _Bookmarks.removeBookmark)(bookmark));
    };

    _this.state = {
      isOpen: false
    };
    return _this;
  }

  require('../../../.babelhelper.js').createClass(Bookmarks, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.bookmarks !== nextProps.bookmarks || this.state.isOpen !== nextState.isOpen;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var bookmarks = _props.bookmarks;
      var dispatch = _props.dispatch;
      var translate = _props.translate;
      var isOpen = this.state.isOpen;


      var klass = (0, _classnames2['default'])({
        'ola-module': true,
        'ola-js-hide': !isOpen
      });

      return _react2['default'].createElement(
        'div',
        { className: 'ola-bookmarks-container' },
        _react2['default'].createElement(
          'button',
          {
            type: 'button',
            className: 'ola-link-bookmark',
            onClick: this.toggleVisibility
          },
          _react2['default'].createElement('span', { className: 'ola-btn-hint hint--top', 'aria-label': translate('bookmarks_label') })
        ),
        _react2['default'].createElement(
          'div',
          { className: klass },
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-title' },
            translate('bookmarks_label')
          ),
          _react2['default'].createElement(
            'div',
            { className: 'ola-module-body' },
            _react2['default'].createElement(_NoResults2['default'], {
              results: bookmarks,
              isBookmark: true
            }),
            _react2['default'].createElement(_SearchResults2['default'], {
              bookmarks: bookmarks,
              results: bookmarks,
              dispatch: dispatch,
              isBookmark: true
            })
          )
        )
      );
    }
  }]);

  return Bookmarks;
}(_react2['default'].Component);

function mapStateToProps(state) {
  return {
    bookmarks: state.AppState.bookmarks
  };
}

module.exports = (0, _reactRedux.connect)(mapStateToProps)((0, _olaTranslate2['default'])((0, _reactOnclickoutside2['default'])(Bookmarks)));