import React from 'react';

const Phone = (props) => {

	var { phone } = props;

	if(!phone) return <noscript />

	var url = 'tel://' + phone;
	
	return <a href={url} className="ola-btn ola-btn-call">Call</a>;
}

module.exports = Phone