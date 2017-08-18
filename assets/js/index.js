import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import axios from 'axios'




import CommentComponent from './components/comment.js'
import Post from './components/post_list.js'
import PostDetail from './components/post_detail.js'
import PostForm from './components/post_form.js'
import LoginForm from './components/login.js'
import LogoutForm from './components/logout.js'
import RegistrationForm from './components/registration_form.js'
import PasswordChangeComponent from './components/password_change.js'
import UserComponent from './components/user.js'
import CommunityList from './components/community_list.js'
import CommunityDetail from './components/community_detail.js'
import DiscussionContainer from './containers/container_discussion.js'
import PlaceholderContainer from './containers/container_placeholder.js'


let App = React.createClass({

  shouldComponentUpdate: function() {
    return true
  },

  render: function() {
    return (
      <div>
      <nav className="navbar fixed-top navbar-toggleable-md navbar-light bg-faded">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Navbar w/ text</a>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <span className="navbar-text">
            Navbar text with an inline element
          </span>
        </div>
      </nav>
      <div className="container-fluid" style={{backgroundColor: '#e2e2e2', paddingTop:"70px"}}>
          {this.props.children}
      </div>
      <footer style={{backgroundColor: 'grey'}}>Footer</footer>
      </div>
    )
  }
})


let Sidebars = function(props) {
  return (
    <div className="row">
      <div className="col-lg-2">
        <div className="card">
          <img className="card-img-top" height="auto" width="100%" src="http://www.halfspring.com/static/img/3.jpg" alt="Card image cap"/>
          <div className="card-block">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        
          </div>
        </div>
       
      </div>
      <div className="col-lg-7">
        {props.children}
      </div>
      <div className="col-lg-3">
        <h3>Sidebar</h3>
      </div>
    </div>
  );
};


render(
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={Sidebars}>
        <IndexRoute component={DiscussionContainer} type="list"/>
      </Route>
      <Route path="log-inn" component={LoginForm} />
      <Route path="samfunn">
          <IndexRoute component={PlaceholderContainer} />
          <Route path=":community_slug">
            <IndexRoute component={PlaceholderContainer} />
            <Route path="diskusjoner" component={Sidebars}>
              <IndexRoute component={DiscussionContainer} type="list"/>
              <Route path=":discussion_slug" component={DiscussionContainer} type="detail"/>
            </Route>
          </Route>
      </Route>
    </Route>
  </Router>,
  document.getElementById('container')
)