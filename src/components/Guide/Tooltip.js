import React from 'react';

const Tooltip = (props) => {

	if(!props.isShown) return <noscript />

	let { onClose } = props;

	return (
		<div className="ola-tooltip-holder">
			<div className="ola-tooltip-content">
				<p>Here are your selections. You can always add or remove filters.</p>
				<a onClick = {onClose}>Close</a>
			</div>
			<div className="ola-modal-background" onClick = {onClose}></div>
		</div>
	)
}

module.exports = Tooltip;