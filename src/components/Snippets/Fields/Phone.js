import React from 'react';

const Phone = ( { phone }) => {

	if(!phone) return <noscript />

	var url = 'tel://' + phone;
	
	return <a href={url} className="ola-btn ola-btn-call">Call</a>;
}

module.exports = Phone