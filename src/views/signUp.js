import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../components/firebase';
import * as ROUTES from '../utils/routes';
import * as ROLES from '../utils/roles';
import { SignInGoogle, SignInFacebook, SignInTwitter} from "../views/signIn"

 
const SignUpPage = () => (
  <div>

    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = {};
    
    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set(
          {
            username,
            email,
            roles,
          },
          { merge: true },
        );
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src="../images/logo.png" alt="User Logo" />
          </div>
          <div className="container">
            <div className="card bg-light">
              <article className="card-body mx-auto" style={{ maxWidth: "400px" }}>
                <h4 className="card-title mt-3 text-center">Create Account</h4>
                <p className="text-center">Get started with your free account</p>
                <SignInTwitter/>
                <SignInFacebook/>
                <SignInGoogle/>
                <p className="divider-text">
                  <span className="bg-light">OR</span>
                </p>
                <form >
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                    </div>
                    <input
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>
                    <input
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      type="text"
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input
                      className="form-control"
                      name="passwordOne"
                      value={passwordOne}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input
                      className="form-control"
                      name="passwordTwo"
                      value={passwordTwo}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <label>
                    Admin:
          <input
                      name="isAdmin"
                      type="checkbox"
                      checked={isAdmin}
                      onChange={this.onChangeCheckbox}
                    />
                  </label>
                  <div className="form-group">
                    <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block" onClick={this.onSubmit}> Create Account  </button>
                    {error && <p>{error.message}</p>}
                  </div>
                  <p className="text-center">Have an account? <Link to={ROUTES.SIGNIN}>
                    Log in
            </Link> </p>
                </form>
              </article>
            </div>

          </div>
        </div>
      </div>
    );
  }
}




const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm };