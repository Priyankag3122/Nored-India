import React, { Component } from "react";
import { Link } from "react-router-dom";
import { isEmail, isEmpty } from "../utils/helperMethods";
import * as ROUTES from "../utils/routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  fullName: "",
  errors: null
};

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmitHandler = event => {
    event.preventDefault();

  };

  onChange = event => {
    const errors = {};
    if (isEmpty(event.target.value)) {
      errors[event.target.name] = "field must not be empty";
    }
    if (event.target.name === "email") {
      if (!isEmail(event.target.value)) {
        errors[event.target.name] = "Must be a valid email address";
      }
      if (isEmpty(event.target.value)) {
        errors[event.target.name] = "Email field must not be empty";
      }
    }

    if (
      event.target.name === "confirmPassword" &&
      event.target.value.length >= this.state.password.length &&
      event.target.value !== this.state.password
    ) {
      errors[event.target.name] = "Passwords must match";
    }

    this.setState({ [event.target.name]: event.target.value, errors });
  };

  render() {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      errors
    } = this.state;

    const isInvalid =
      isEmpty(fullName) ||
      isEmpty(email) ||
      !isEmail(email) ||
      isEmpty(password) ||
      confirmPassword !== password;


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
                <p>
                  <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i>   Login via Twitter</a>
                  <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>   Login via facebook</a>
                </p>
                <p className="divider-text">
                  <span className="bg-light">OR</span>
                </p>
                <form>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                    </div>
                    <input
                      classNameName={`form-control ${
                        errors && errors.fullName ? "is-invalid" : ""
                        }`}
                      name="fullName"
                      value={fullName}
                      onChange={this.onChange}
                      type="text"
                      className="form-control" placeholder="Full name"
                    />
                    <div className="invalid-feedback">
                      {errors && "Full name " + errors.fullName}
                    </div>
                  </div>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>

                    <input
                      className={`form-control ${
                        errors && errors.email ? "is-invalid" : ""
                        }`}
                      name="email"
                      value={email}
                      onChange={this.onChange}
                      className="form-control" placeholder="Email address" type="email"
                    />
                    <div className="invalid-feedback">{errors && errors.email}</div>
                  </div>


                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input
                      className={`form-control ${
                        errors && errors.password ? "is-invalid" : ""
                        }`}
                      name="password"
                      className="form-control"
                      placeholder="Create password"
                      value={password}
                      onChange={this.onChange}
                      type="password"
                    />
                    <div className="invalid-feedback">
                      {errors && "Password " + errors.password}
                    </div>
                  </div>
                  <div className="form-group input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input
                      className={`form-control ${
                        errors && errors.confirmPassword ? "is-invalid" : ""
                        }`}
                      name="confirmPassword"
                      class="form-control"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={this.onChange}
                      type="password"
                    />
                    <div className="invalid-feedback">
                      {errors && errors.confirmPassword}
                    </div>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" > Create Account  </button>
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

export default SignUpPage;
