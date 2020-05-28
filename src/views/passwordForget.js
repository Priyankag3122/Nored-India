import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../components/firebase';
import * as ROUTES from '../utils/routes';



const INITIAL_STATE = {
    email: '',
    error: null,
  };

class passwordForget extends Component {
    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE };
      }
    
      onSubmit = event => {
        const { email } = this.state;
    
        this.props.firebase
          .doPasswordReset(email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.PASSWORDCHANGE);
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
        const { email, error } = this.state;
    
        const isInvalid = email === '';
    
        return (
          <form onSubmit={this.onSubmit}>
            <input
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
            <button disabled={isInvalid} type="submit">
              Reset My Password
            </button>
    
            {error && <p>{error.message}</p>}
          </form>
        )
    }
}
export default withFirebase(passwordForget);