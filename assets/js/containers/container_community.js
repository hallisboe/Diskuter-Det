import React from 'react'
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import axios from 'axios'


import CommentContainer from './container_comment'


let DiscussionListWidget = function(props) {
	let noOutline = {border: "none"}
	let topComment = props.comments[0]
	let _get_score = ""
	if(props.voteClass !== "btn btn-danger") {
		_get_score = props._get_score
	} 

	return (
		<div className="card">
			<div className="card-block">
		    <h5><small>Populært på </small>{props.username}<small> - 8 timer siden</small></h5>  {/* Needs to be community */}
		  

			<hr/>

		  	<div className="media">
		  		  		
		    	<div className="media-body">
		      		<Link to={props.link} activeClassName="active"><h5 className="mt-0 mb-1">{props.title}</h5></Link>
		         	{props.text}	
		         </div>

		    	<img className="d-flex mr-3" src={props.image} width="200px" alt="Generic placeholder image"/>
		 	
		 	</div>

		 	
			<button type="button" className={props.voteClass} onClick={props.vote}>
				<span>{props.buttonText}</span>
				<i className={props.buttonClass} aria-hidden="true"></i>
				<span>{_get_score}</span>
			</button>
			<button type="button" className="btn btn-secondary" style={noOutline}>Kommentarer <span style={{backgroundColor:"#e2e2e2", padding: "2px"}}> &nbsp; {props.comments.length} &nbsp; </span></button>
			<button type="button" className="btn btn-secondary" style={noOutline}>Del</button>
			

		 	<hr/>

		 	<CommentContainer comment={topComment} update={props.update}/>
		 	</div>

		</div>
		
	)
}


let DiscussionDetailWidget = function(props) {
	let noOutline = {border: "none"}
	let topComment = props.comments[0]
	let _get_score = ""
	if(props.voteClass !== "btn btn-danger") {
		_get_score = props._get_score
	} 
	return (
		<div className="card">
			<div className="card-block">

		    <h5><small>Populært på </small>{props.username}<small> - 8 timer siden</small></h5>  {/* Needs to be community */}
		  

			<hr/>

		  	<div className="media">
		  		  		
		    	<div className="media-body">
		      		<Link to={props.link} activeClassName="active"><h5 className="mt-0 mb-1">{props.title}</h5></Link>
		         	{props.text}	
		         </div>

		    	<img className="d-flex mr-3" src={props.image} width="300px" alt="Generic placeholder image"/>
		 	
		 	</div>

		 	
			<button type="button" className={props.voteClass} onClick={props.vote}>
				<span>{props.buttonText}</span>
				<i className={props.buttonClass} aria-hidden="true"></i>
				<span>{_get_score}</span>
			</button>
			<button type="button" className="btn btn-secondary" style={noOutline}>Kommentarer <span style={{backgroundColor:"#e2e2e2", padding: "2px"}}> &nbsp; {props.comments.length} &nbsp; </span></button>
			<button type="button" className="btn btn-secondary" style={noOutline}>Del</button>
			

		 	<hr/>

		 	<div className="form-group">
			    <textarea name={props.url} className="form-control" placeholder="Bli med på diskusjonen..." id="exampleTextarea" rows="3"></textarea>
			</div>
			<button className="btn btn-primary" onClick={props.addComment}>Del</button>

			<hr/>

		 	<div>
		 		{props.comments.map(comment => <CommentContainer key={"c" + comment.id} update={props.update} comment={comment}/>)}
		 	</div>
		 	</div>
		</div>
		
	)
}



export default class DiscussionContainer extends React.PureComponent {

	constructor(props) {

		super(props)

    	this.state = {
    		discussions: [],
    		votes: [],
    	}

    	this.getList = this.getList.bind(this)
    	this.addComment = this.addComment.bind(this) 

   
	}

	shouldComponentUpdate() {
		return true
	}

	componentWillMount() {
	    this.getList()
	}

	componentDidMount() {
		this.render()
	}

	
	getList() {

		console.log(this.props)
		
		let url = '/api/discussions/'
		if(!(this.props.params.community_slug === undefined) && !(this.props.params.discussion_slug === undefined)) {
			url = '/api/discussions/?format=json&id=&community__slug=' + this.props.params.community_slug + '&slug=' + this.props.params.discussion_slug
		} else if(!(this.props.params.community_slug === undefined)) { 
			url = '/api/discussions/?format=json&id=&community__slug=' + this.props.params.community_slug
		}
		let array = []
		function _in(arr, obj) {return(arr.indexOf(obj) != -1)}
		axios.get(url)
	    	.then(response => { this.setState({discussions:response.data})
	    axios.get('/api/vote/')
	    	.then(vote => { 


	    		this.setState({votes:vote.data})

	    		var data = this.state.discussions

	    		for(var i = 0; i < data.length; i++){
	    			if(_in(this.state.votes.discussionVoteData, data[i].id)) {
	    				data[i].voteClass = "btn btn-danger"
	    				data[i].buttonClass = "fa fa-heart"
	    				data[i].buttonText = ""
	    			} else {
	    				data[i].voteClass = "btn btn-outline-primary"
	    				data[i].buttonClass = ""
	    				data[i].buttonText = "Anbefal "
	    			}

	    			for(var j = 0; j < data[i].comments.length; j++){
		    			if(_in(this.state.votes.commentVoteDataUp, data[i].comments[j].id)) {
		    				data[i].comments[j].voteUpClass = "btn btn-sm btn-success"
		    				data[i].comments[j].voteDownClass = "btn btn-sm btn-outline-danger"
		    			} else if(_in(this.state.votes.commentVoteDataDown, data[i].comments[j].id)) {
		    				data[i].comments[j].voteUpClass = "btn btn-sm btn-outline-success"
		    				data[i].comments[j].voteDownClass = "btn btn-sm btn-danger"
		    			} else {
		    				data[i].comments[j].voteUpClass = "btn btn-sm btn-outline-success"
		    				data[i].comments[j].voteDownClass = "btn btn-sm btn-outline-danger"
		    			}
		    		}
	    			
	    		}

	    	
	    		
	    		this.setState({discussions: data})

	    		})
	    	})

	
	}

	addComment() {
	    let url = this.state.discussions[0].url
	    let _this = this
	    axios.post('/api/comments/', {
	          post: url,
	          user: {username: "halvor1606", url: "http://127.0.0.1:8000/api/users/1/?format=json"},
	          text: document.getElementsByName(url)[0].value,
	          csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value},
	          )
	    .then(function (response) {
	      _this.getList()
	    })
	    .catch(function (error) {
	      console.log(error);
	    });

	}



	vote(id) {
		let _this = this
	    axios.post('/api/vote/',{"model": "post", "id": id, "vote": "true"})

		    .then(function (response) {
		      _this.getList()
		    })

		    .catch(function (error) {
		      console.log(error)
		    })
	}

	render() {

		// List view

		if(this.props.route.type === "list") {

			return (
				<div>

					{this.state.discussions.map(discussion => <DiscussionListWidget buttonText={discussion.buttonText} buttonClass={discussion.buttonClass} key={discussion.id} voteClass={discussion.voteClass} image={discussion.image} update={this.getList} link={"/samfunn/" + discussion.community.slug + "/diskusjoner/" + discussion.slug} vote={this.vote.bind(this, discussion.id)} _get_score={discussion._get_score} title={discussion.title} text={discussion.text} username={discussion.user.username} comments={discussion.comments} />)}
				
				</div>
			)
		}

		// Detail view

		

		else if(this.props.route.type === "detail" && this.state.discussions !== []) {


		return <div>{this.state.discussions.map(discussion => <DiscussionDetailWidget buttonText={discussion.buttonText} buttonClass={discussion.buttonClass} key={discussion.id} voteClass={discussion.voteClass} image={discussion.image} url={discussion.url} update={this.getList} vote={this.vote.bind(this, discussion.id)} _get_score={discussion._get_score} title={discussion.title} text={discussion.text} comments={discussion.comments} addComment={this.addComment} />)}</div>

		} else {

			return <h3>Error!</h3>

		}
		
	}	
}