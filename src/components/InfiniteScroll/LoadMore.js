import React from 'react';

const LoadMore = (props) => {

	var { totalResults, currentPage, perPage, actions } = props;

	if(currentPage * perPage >= totalResults) return <noscript />

	return (
		<button 
			type="button" 
			className="ola-link-load-more" 
			onClick = { () => actions.loadMore() }>
			Load more
		</button>
	)
}

LoadMore.propTypes = {
	actions: React.PropTypes.shape({
		loadMore: React.PropTypes.func.isRequired
	}),
	totalResults: React.PropTypes.any.isRequired,
	currentPage: React.PropTypes.any.isRequired,
	perPage: React.PropTypes.any.isRequired,
}

module.exports = LoadMore