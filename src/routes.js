import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { BrowserRouter as Switch } from "react-router-dom";

import App from "./components/App";
import SignIn from "./views/signIn";
import SignUp from "./views/signUp";
import LandingPage from "./views/landingPage";

// import Footer from "../components/common/footer";
// import headerfile from "../components/headerfile";

const Routes = ({history}) => (
  <BrowserRouter basename={"/"}>
   
      <Switch>
        <div >
          <Route exact path="/" component={LandingPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/app" component={App} />
        </div>
      </Switch>
      {/* <Footer /> */}
 
  </BrowserRouter>
);

export default Routes;