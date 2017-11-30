'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * onSubmit=>
 * var data = new FormData(event.target)
 * var feedback = data.get('ola_escalation_feedback')
 */

function EscalationForm(props) {
  var label = props.label,
      placeholder = props.placeholder,
      buttonLabel = props.buttonLabel,
      formUrl = props.formUrl,
      visible = props.visible,
      onSubmit = props.onSubmit,
      children = props.children;

  if (!visible) return null;
  return _react2['default'].createElement(
    'form',
    { className: 'ola-escalation-form', action: formUrl, onSubmit: onSubmit },
    _react2['default'].createElement(
      'p',
      null,
      label
    ),
    children || _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement('textarea', { placeholder: placeholder, rows: '2', cols: '10', name: 'ola_escalation_feedback' }),
      _react2['default'].createElement(
        'button',
        null,
        buttonLabel
      )
    )
  );
}

EscalationForm.defaultProps = {
  label: 'We\'re sorry we don\'t have an answer to your query. Please use the following options to reach out to our customer service officers.',
  placeholder: 'Please describe what you are looking so we can assist you quickly',
  buttonLabel: 'Submit'
};

module.exports = EscalationForm;