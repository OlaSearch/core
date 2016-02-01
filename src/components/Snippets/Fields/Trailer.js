import React from 'react';
// import Modal from 'react-modal';
import { modal as customStyles} from './../../../constants/styles';
import fetch from 'isomorphic-fetch';
import param from 'jquery-param';

export default class Trailer extends React.Component{
	
	constructor(props){
		super(props)
		
		this.state = {
			isModalOpen: false,
			videoUrl: ''
		}

	}

	closeModal = () => {

		this.setState({
			isModalOpen: false,
			videoUrl: '',
		})
	}

	openModal = () => {
		
		var { title, year } = this.props;

		var href = 'https://www.googleapis.com/youtube/v3/search';		

		var data = {
			q: 'Trailer ' + title + ' ' + year,
			part: 'snippet',
			key: 'AIzaSyDd1ikysxUDeOGibCKEVriKTwpQjKiJ7IM',
			type: 'video'
		}


		fetch( href + '?' + param(data), {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then( response => response.json() )
		.then( response => {

			let { items } = response;

			if(!items.length){
				alert('Could not find a trailer for this movie.')
				return ;
			}
			var videoId = items[0].id.videoId;

			this.setState({
				videoUrl: 'https://www.youtube.com/embed/' + videoId,
				isModalOpen: true
			})
		})
		
	}

	render(){

		var { isModalOpen, videoUrl } = this.state;

		return (
			<div className="ola-view-trailer">
				
				<button className="ola-btn ola-btn-trailer ola-btn__full" onClick = {this.openModal}>View trailer</button>

				<Modal
					isOpen={isModalOpen}
					onRequestClose={this.closeModal}
					style={customStyles} >

					<iframe 
						width="560" 
						height="315" 
						src= {videoUrl}
						frameBorder="0" 
						allowFullScreen>
					</iframe>
				</Modal>
			</div>
		)
	}
}