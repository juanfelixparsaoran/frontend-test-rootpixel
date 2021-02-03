import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import React from 'react';

import Login from './component/login.component'
import AdminHome from './component/admin.home.component'
import DetailPost from './component/post.detail.componet'
import SessionChecker from './component/session.checker.component'
import GuestHome from './component/guest.home.component'
import Register from './component/register.component'
import PostDetailGuest from './component/post.detail.guest.component'
import CreatePost from './component/create.post.component'

class App extends React.Component {
  render(){
    return (<Router>
      <div className="App">
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/admin/home' component={SessionChecker(AdminHome)}/>
          <Route path='/admin/post' component={SessionChecker(DetailPost)}/>
          <Route path='/guest/post' component={SessionChecker(PostDetailGuest)}/>
          <Route path='/guest/home' component={SessionChecker(GuestHome)}/>
          <Route path='/admin/createpost' component={SessionChecker(CreatePost)}/>
        </Switch>
      </div>
    </Router>)
  }
}

export default App;
