import React, { Component } from 'react';
import { withFirebase } from '../components/firebase';


const INITIAL_STATE = {
  username: '',
  error: null,
};

class profileUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
      console.log("ddd",this.props.event);
      
      
    const { username } = this.state;

    this.props.firebase.authUser
      .doUpdateProfile(username)
      .then(authUser => {
        return (
          {username: authUser.username}
        )
      }, 
     )
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { username, error } = this.state;

    // const isInvalid =
    //   passwordOne !== passwordTwo || passwordOne === '';

    return (
      
      <form >

                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text1" class="form-control" name="username"
            value={username}
            onChange={this.onChange} placeholder="username"/>
                  </div>
                 
                  <button type="submit" class="btn btn-primary" onSubmit={this.onSubmit}>Update</button>
                  {error && <p>{error.message}</p>}
                </form>

    );
  }
}

export default withFirebase(profileUpdate);