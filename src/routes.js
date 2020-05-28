import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { BrowserRouter as Switch } from "react-router-dom";

import App from "./components/App";
import SignIn from "./views/signIn";
import SignUp from "./views/signUp";
import LandingPage from "./views/landingPage";
import Passwordforget from "./views/passwordForget";
import PasswordChange from "./views/passwordChange"
import AdminPage from "./views/Admin"
import AccountPage from "./views/Account"
import { withAuthentication } from './components/Session';
import { AuthUserContext } from './components/Session';

const Routes = () => (
  <BrowserRouter basename={"/"}>
   
      <Switch>
        <div >
         
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/passwordforget" component={Passwordforget} />
          <Route path="/passwordchange" component={PasswordChange} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/account" component={AccountPage} />

          <Route path="/app" component={App} />
        </div>
      </Switch>
      {/* <Footer /> */}
 
  </BrowserRouter>
);

export default withAuthentication(Routes);