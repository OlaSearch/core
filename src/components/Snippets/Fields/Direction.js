import React from 'react';

const Directions = (props) => {

	var { latlong } = props;

	if(!latlong) return <noscript />

	var url = 'https://www.google.com/maps?q=' + latlong
	
	return <a className="ola-btn ola-btn-directions" href={url}>Get directions</a>
}

module.exports = Directions