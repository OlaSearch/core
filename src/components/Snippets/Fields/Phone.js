import React from 'react';

const Phone = ( { phone, title }) => {

	if(!phone) return <noscript />

	var url = 'tel://' + phone;
	
	return <a href={url} className="ola-btn ola-btn-call">{ title } </a>;
}

Phone.defaultProps = {
    title: 'Call'
}

module.exports = Phone