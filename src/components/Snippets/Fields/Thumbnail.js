import React from 'react';
import Media from 'react-responsive';

const Thumbnail = (props, context) => {	

	var { mediaQuery } = context.config;

	var {
		thumbnail,
		thumbnail_mobile
	} = props;

	if(!thumbnail_mobile){
		return (
			<img className="ola-snippet-image" src={thumbnail} width="158" alt="" />
		)
	}
	
	return (
		<div>
			<Media query={mediaQuery.tablet}>
				<img className="ola-snippet-image-desktop" src={thumbnail} width="158" alt="" />
			</Media>
			<Media query={mediaQuery.mobile}>
				<img className="ola-snippet-image-mobile" src={thumbnail_mobile} width="320" alt="" />
			</Media>
		</div>
	)
};

Thumbnail.contextTypes = {
	config: React.PropTypes.object
}

Thumbnail.propTypes = {
	thumbnail: React.PropTypes.string,
	thumbnail_mobile: React.PropTypes.string,
}

module.exports = Thumbnail;