import React from 'react';
import { connect } from 'react-redux';
import { removeBookmark } from './../../actions/Bookmarks';
import listensToClickOutside from 'react-onclickoutside/decorator';
import Bookmark from './Bookmark';
import classNames from 'classnames';

class Bookmarks extends React.Component{	
	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		bookmarks: React.PropTypes.array.isRequired
	};

	constructor(props){
		super(props)

		this.state =  {
			isOpen: false
		}
	}

	handleClickOutside = (event) => {
		
		this.setState({
			isOpen: false
		})

	};

	toggleVisibility = () => {

		this.setState({
			isOpen: !this.state.isOpen
		})
	};

	onRemove = (bookmark) => {

		this.props.dispatch( removeBookmark(bookmark) )
	};
	render(){

		var {
			bookmarks,
		} = this.props;

		var {
			isOpen
		} = this.state;

		var klass = classNames({
			'ola-module': true,
			'js-hide': !isOpen
		});
		
		return (
			<div className="ola-bookmarks-container">
				<button type="button" className="ola-link-bookmark" onClick = {this.toggleVisibility} aria-label="Show bookmarks"></button>
				
				<div className={klass}>
					<div className="ola-module-title">Bookmarks</div>
					<div className="ola-module-body">
						
						{!bookmarks.length
						 ? <div className="ola-module-item">
							Your bookmarks will show here.
						  </div> 
						 : null}

						{bookmarks.map( (bookmark, idx) => {

							return (
								<Bookmark 
									bookmark = {bookmark}
									onRemove = {this.onRemove.bind(this, bookmark)}
									key = {idx}
								/>
							)

						})}
						
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps( state ){

	return {
		bookmarks: state.AppState.bookmarks
	}
}

export default connect( mapStateToProps )( listensToClickOutside( Bookmarks ) )