
import React from 'react'
import * as ROUTES from '../utils/routes'
import { withFirebase } from '../components/firebase';
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

const SignOutButton = ({ firebase, history }) => {
  function onSubmit(e) {
    e.preventDefault();
    firebase
      .doSignOut()
      .then(() => {
        history.push(ROUTES.HOME)
      })
  }
  return (
    <button type="button" class="dropdown-item" onClick={onSubmit.bind(this)}>
     <i class="fas fa-power-off"></i>
       Logout
    </button>
  );
};

export default compose(withRouter)(withFirebase(SignOutButton));

