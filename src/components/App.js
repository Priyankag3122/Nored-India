import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "../views/home"
import PostDetail from "../views/postDetail"
import HeaderApp from "../common/headerApp"
import About from "../views/about"
import { withAuthentication } from './Session';
import Admin from "../views/Admin/index"
import UserItem from "../views/Admin/UserItem";
import AccountPage from "../views/Account"


const App = ({ match, history, authUser }) => {
  return (
    <div>
      <HeaderApp />
      <Switch>
        <Route
          path={`${match.url}/home`}
          render={props => <Home {...props} />}
        />
        <Route
          path={`${match.url}/about`}
          render={props => <About {...props} />}
        />
        <Route
          path={`${match.url}/postdetail`}
          render={props => <PostDetail {...props} />}
        />
        <Route
          path={`${match.url}/admin`}
          render={props => <Admin {...props} />}
        />
        <Route
          path={`${match.url}/admin/:id`}
          render={props => <UserItem {...props} />}
        />
        <Route
          path={`${match.url}/account`}
          render={props => <AccountPage {...props} />}
        />
      </Switch>
    </div>
  
  );
};
export default withAuthentication(App);