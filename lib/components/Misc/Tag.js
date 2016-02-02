'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilities = require('./../../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tag = function Tag(props, context) {

	var displayName = '';

	var name = props.name;
	var onRemove = props.onRemove;
	var facet = props.facet;
	var type = facet.type;
	var label = facet.label;
	var template = facet.template;

	switch (type) {

		case 'range':
			if (typeof name == 'string') {
				displayName = name;
			} else {
				var from = name[0],
				    to = name[1];
				displayName = (0, _utilities.supplant)(template, { from: from, to: to });
			}
			break;

		case 'rating':
			var index = name[0] / 20;
			displayName = label[index];
			break;

		default:
			displayName = (0, _utilities.getDisplayName)(context.config.facetNames, name);
			break;
	}

	return _react2.default.createElement(
		'div',
		{ className: 'ola-facet-tag' },
		_react2.default.createElement(
			'span',
			{ className: 'ola-facet-tag-name' },
			displayName
		),
		_react2.default.createElement('button', { className: 'ola-facet-tag-remove', onClick: onRemove })
	);
};

Tag.propTypes = {
	name: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.array]),
	onRemove: _react2.default.PropTypes.func,
	facet: _react2.default.PropTypes.object
};

Tag.contextTypes = {
	config: _react2.default.PropTypes.object
};

module.exports = Tag;