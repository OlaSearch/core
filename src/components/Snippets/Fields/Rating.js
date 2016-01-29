import React from 'react';

var Rating = (props) => {

	let {rating} = props;

	let normalized = rating/20;

	let star = [];

	let total = Math.max(Math.ceil(normalized), 1);
	
	for(let i = 0; i < total; i++){
		star.push(
			<em key = {i} className="ion ion-ios-star ola-rating-active" />
		)
	}

	for(let i = total; i < 5; i++){
		star.push(
			<em key = {i} className="ion ion-ios-star ola-rating-inactive" />
		)
	}

	if(!star.length) star = <em className="ion ion-ios-star" />;
	
	return (
		<div className="ola-snippet-rating">
			{star}
		</div>
	)
};

module.exports = Rating;