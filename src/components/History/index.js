import React from 'react';
import { connect } from 'react-redux';
import { clearHistory } from './../../actions/History';
import listensToClickOutside from 'react-onclickoutside/decorator';
import HistoryItem from './HistoryItem';
import classNames from 'classnames';

class History extends React.Component{
	
	static propTypes = {
		dispatch: React.PropTypes.func.isRequired,
		history: React.PropTypes.array.isRequired
	};

	constructor(props){

		super(props)

		this.state = {
			isOpen: false
		}
	}

	static contextTypes = {
		config: React.PropTypes.object
	};

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

	clearHistory = () => {

		this.props.dispatch( clearHistory() )
	};

	shouldComponentUpdate( nextProps, nextState){

		return nextProps.history !== this.props.history || nextState.isOpen != this.state.isOpen
	}

	render(){

		var {
			history,			
		} = this.props;

		var {
			searchPageUrl
		} = this.context.config;

		var {
			isOpen
		} = this.state;

		var klass = classNames({
			'ola-module': true,
			'ola-js-hide': !isOpen
		});
		
		return (
			<div className="ola-history-container">
				<button 
					type="button" 
					className="ola-link-history" 
					onClick = {this.toggleVisibility} 
					aria-label="Show history" />
				
				<div className={klass}>
					<div className="ola-module-title">
						<span>History </span>
						<button 
							type="button" 
							className="ola-fake-button ola-clear" 
							onClick = {this.clearHistory}>
							(clear)
						</button>
					</div>
					<div className="ola-module-body">
						
						{!history.length
						 ? <div className="ola-module-item">
							Your history will show here.
						  </div> 
						 : null}

						{ history.map( (item, idx) =>  <HistoryItem searchPageUrl = { searchPageUrl } history = {item} key = {idx} /> ) }
						
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps( state ){

	return {
		history: state.AppState.history
	}
}

module.exports = connect( mapStateToProps )( listensToClickOutside(History) )