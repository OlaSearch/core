import React from 'react';

const Bookmark = ( { bookmark, onRemove } ) => {

	return (
		<div className="ola-module-item">
			<a href={bookmark.url}>{bookmark.title}</a>
			<button
				type="button"
				className="ola-module-clear"
				onClick = {onRemove}
				aria-label="Remove bookmark"
				>
				<span>Remove</span>
			</button>
		</div>
	)
};

module.exports = Bookmark