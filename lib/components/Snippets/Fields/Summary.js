'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../../utilities');

var Summary = function Summary(_ref) {
	var result = _ref.result;
	var length = _ref.length;
	var summary = result.summary;
	var highlighting = result.highlighting;

	if (!summary) return _react2['default'].createElement('noscript', null);

	/* Check for highlighting */

	if (highlighting) {
		var highlighted_summary = highlighting.summary;

		if (typeof highlighted_summary == 'object') {
			summary = highlighted_summary.join('<br />...');
		}
	} else if (summary.length > length) {
		summary = summary.substr(0, length).split(" ").slice(0, -1).join(" ") + "...";
	}

	return _react2['default'].createElement('div', { className: 'ola-field ola-field-summary', dangerouslySetInnerHTML: (0, _utilities.createHTMLMarkup)(summary) });
};

Summary.defaultProps = {
	length: 200
};

Summary.propTypes = {
	length: _react2['default'].PropTypes.number
};

module.exports = Summary;