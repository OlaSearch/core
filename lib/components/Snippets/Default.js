'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

var _Bookmark = require('./../SnippetActions/Bookmark');

var _Bookmark2 = _interopRequireDefault(_Bookmark);

var _Title = require('./../Fields/Title');

var _Title2 = _interopRequireDefault(_Title);

var _Thumbnail = require('./../Fields/Thumbnail');

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _Rating = require('./../Fields/Rating');

var _Rating2 = _interopRequireDefault(_Rating);

var _Summary = require('./../Fields/Summary');

var _Summary2 = _interopRequireDefault(_Summary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var DefaultSnippet = function DefaultSnippet(props) {
  var result = props.result;
  var showSummary = props.showSummary;

  return _react2['default'].createElement(
    'div',
    { className: 'ola-snippet' },
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-image' },
      _react2['default'].createElement(_Thumbnail2['default'], {
        thumbnail: result.thumbnail,
        thumbnail_mobile: result.thumbnail_mobile
      })
    ),
    _react2['default'].createElement(
      'div',
      { className: 'ola-snippet-content' },
      _react2['default'].createElement(
        'div',
        { className: 'ola-snippet-actions' },
        _react2['default'].createElement(_Bookmark2['default'], props)
      ),
      _react2['default'].createElement(_Title2['default'], { result: result }),
      _react2['default'].createElement(_Rating2['default'], { rating: result.star_rating }),
      showSummary && _react2['default'].createElement(_Summary2['default'], { result: result }),
      result.directors && _react2['default'].createElement(
        'p',
        null,
        (0, _utilities.arrayJoin)('By ', result.directors)
      )
    )
  );
};

DefaultSnippet.defaultProps = {
  showTrailer: true,
  showSummary: true,
  isAutosuggest: false
};

module.exports = DefaultSnippet;