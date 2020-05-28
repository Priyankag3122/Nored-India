import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import * as ROUTES from "../utils/routes";
import Home from "../views/home"
import PostDetail from "../views/postDetail"
import HeaderApp from "../common/headerApp"
import About from "../views/about"
import { AuthUserContext } from './Session';
import { withAuthentication } from './Session';



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

      </Switch>
    </div>
  
  );
};
export default withAuthentication(App);