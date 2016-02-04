import React from 'react';

const Directions = ( { latlong } ) => {

	if(!latlong) return <noscript />

	var url = 'https://www.google.com/maps?q=' + latlong
	
	return <a className="ola-btn ola-btn-directions" href={url}>Get directions</a>
}

module.exports = Directions