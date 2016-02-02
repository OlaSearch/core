import React from 'react';
import Pagination from './Pagination';
import LoadMore from './InfiniteScroll/LoadMore';
import * as SearchActionCreators from './../actions/Search';
import { bindActionCreators } from 'redux';

class SearchFooter extends React.Component{

	constructor(props){
		super(props)
	}

	static contextTypes = {
		config: React.PropTypes.object
	};

	render(){
		
		let { infiniteScroll } = this.context.config;

		let { isPhone, dispatch } = this.props;

		let boundActionCreators = bindActionCreators(SearchActionCreators, dispatch);

		if(infiniteScroll || isPhone){

			return (
				<LoadMore {...this.props} actions = {boundActionCreators} />
			)
		}

		return (
			<Pagination {...this.props} actions = {boundActionCreators} />
		)

	}
}

module.exports = SearchFooter