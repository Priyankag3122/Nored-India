import React, { Component } from 'react';
import { withFirebase } from '../components/firebase';
import * as ROUTES from '../utils/routes';


const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class passwordChange extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
console.log("hhhh",this.props.firebase);

    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SIGNIN);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (

      <form onSubmit={this.onSubmit}>
        <fieldset class="fieldset">
          <h2 >Change Password:</h2>
        </fieldset>
        <div class="form-group">
          <label for="exampleInputPassword1">New Password</label>
          <input type="password" class="form-control" name="passwordOne"
            value={passwordOne}
            onChange={this.onChange} placeholder="New Password" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm New Password</label>
          <input type="password" class="form-control" name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange} placeholder="Confirm New Password" />
        </div>
        <button disabled={isInvalid} type="submit" class="btn btn-primary"> Reset My Password</button>
        {error && <p>{error.message}</p>}
      </form>

    );
  }
}

export default withFirebase(passwordChange);