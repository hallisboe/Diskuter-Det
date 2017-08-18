import React from 'react'
import axios from 'axios'




let CommentWidget = function(props) {

		return (
		<div className="media" style={{padding: "10px"}}>

		 	<div className="btn-group-vertical  mr-3" role="group" aria-label="Basic example">
				<button type="button" className={props.comment.voteUpClass} onClick={props.voteUp}><i className="fa fa-chevron-up" aria-hidden="true"></i></button>
				<a href="#" className="btn btn-secondary btn-sm disabled" role="button" aria-disabled="true">{props.comment._get_score}</a>
				<button type="button" className={props.comment.voteDownClass} onClick={props.voteDown}><i className="fa fa-chevron-down" aria-hidden="true"></i></button>
			</div>	
			<div className="media-body">
				<h5><small>{props.comment.user.username}</small></h5>
			 	<p>{props.comment.text}</p>
			</div> 	
		</div>
		)
	
}


export default class CommentContainer extends React.Component {

	constructor(props) {

		super(props)


   
	}

	componentDidMount() {
	    
	    

	}

	shouldComponentUpdate() {
		return true
	}

	vote(id, vote) {
		let _this = this
	    axios.post('/api/vote/',{"model": "comment", "id": id, "vote": vote})

		    .then(function (response) {
		      	_this.props.update()
		    })

		    .catch(function (error) {
		      console.log(error)
		    })


	 }

	

	render() {
		if(this.props.comment === undefined) {
			return <small style={{color: "grey"}}>Ingen kommentarer</small>
		} else {
			return (<div>
			
			<CommentWidget comment={this.props.comment} voteUp={this.vote.bind(this, this.props.comment.id, "true")} voteDown={this.vote.bind(this, this.props.comment.id, "false")} />
		</div>)
		}	
	}	
}