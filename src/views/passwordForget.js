import React, { Component } from 'react';

import { withFirebase } from '../components/firebase';


const INITIAL_STATE = {
    email: '',
    error: null,
   
  };

class passwordForget extends Component {
    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE ,  isSent: false };
      }
    
      onSubmit = event => {
        const { email } = this.state;
    
        this.props.firebase
          .doPasswordReset(email)
          .then(() => {
            this.setState({
             ...INITIAL_STATE,  isSent: true
            });
            // this.props.history.push(ROUTES.PASSWORDCHANGE);
          })
          .catch(error => {
            if (error.code === "auth/user-not-found") {
              error.message =
                "Sorry, there is no account associated with this email address";
            } else if (error.code === "auth/invalid-email") {
              error.message = "Please enter valid email address";
            }
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
          <div>
                  
                <div className="wrapper fadeInDown">        
                <div id="formContent">
                
                    <div className="fadeIn first">
                        <img src="../images/logo.png" alt="User Logo" />
                    </div>
                    {this.state.isSent} 
                  <p>
                    <div class="alert alert-primary mx-4 my-4" role="alert">
                    If you have forgotten your password you can reset it here. Enter your email address below and we'll send you a link to reset your password.
                    </div>
                  </p>
          <form onSubmit={this.onSubmit}>
            <input
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Enter your Email Address"
            />
            <button  class="btn btn-primary my-4" disabled={isInvalid} type="submit">
              Reset My Password
            </button>
    
            {error && <p>{error.message}</p>}
          </form>
          </div>
          </div>
          </div>
        )
    }
}
export default withFirebase(passwordForget);