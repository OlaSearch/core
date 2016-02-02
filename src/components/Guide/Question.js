import React from 'react';
import classNames from 'classnames';
import Dropdown from './FieldTypes/Dropdown';

class Question extends React.Component{

	constructor(props){
		super(props)
	}
	
	static propTypes = {
		item: React.PropTypes.object.isRequired,
		index: React.PropTypes.number.isRequired,
		active: React.PropTypes.bool.isRequired,
		onChange: React.PropTypes.func.isRequired
	};
	
	handleChange = ( value ) => {
		
		var { item, index } = this.props;
		
		this.props.onChange.call(this, item, value, index)  
	};
	
	componentDidMount(){
		
		var { item } = this.props;
		
		if(item.defaultValue){
			this.handleChange.call(this, item.defaultValue )
		}
	}
	
	shouldComponentUpdate(nextProps){
		
		return (
			nextProps.item != this.props.item || 
			nextProps.active != this.props.active
		)
		
	}
	
	render(){
		
		var { item, index, active, device } = this.props;
		var klass = classNames({
			'ola-panel': true,
			'ola-active': active
		});			

		return (
			<div className={klass}>
				<div className="ola-panel-title">
					<span className="ola-panel-number">{index + 1}</span>
					<span>{item.question}</span>
				</div>

				<div className="ola-panel-body">
					<Dropdown 
						item = {item} 
						handleChange = {this.handleChange}
						index = {index}
						device = { device }
						/>
				</div>
			</div>
		)
	}
};

module.exports = Question