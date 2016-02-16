import React from 'react';

const Bookmark = ( { bookmark, onRemove } ) => {

	let { url, title } = bookmark;

	let isValidUrl = url && url.indexOf('http') != -1;

	return (
		<div className="ola-module-item">
			{ isValidUrl
				?  <a href={url}>{title}</a>
				: <span>{ title }</span>
			}
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