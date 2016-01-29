import React from 'react';

const Year = (props) => {

	var { year } = props;

	if(!year) return <noscript />
	
	return <span> ({year})</span>
}

module.exports = Year