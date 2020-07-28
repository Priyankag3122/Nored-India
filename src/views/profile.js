import React, { Component } from 'react';
import { compose } from 'recompose';

import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
  } from '../components/Session';
// import { withFirebase } from '../components/firebase';

class profile extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          image: null,
          url: '',
          progress: 0,
        };
      }

      OnChangeImage = e => {
        if (e.target.files[0]) {
          const image = e.target.files[0];
          this.setState(() => ({ image }));
        }
      }
      OnSubmitUpload = (event, authUser) => {
        const { image } = this.state;
        const uploadTask = this.props.firebase.image(`${image.name}`).put(image);
        uploadTask.on('state_changed',
          (snapshot) => {
            // progrss function ....
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({ progress });
          },
          (error) => {
            // error function ....
            console.log(error);
          },
          () => {
            // complete function ....
            this.props.firebase.images().child(image.name).getDownloadURL().then(url => {
              console.log(url);
              this.setState({ url });
            })
            console.log("image: ", image);
          });
      }
    render() {
        return (
            <AuthUserContext.Consumer>
    {authUser => (
    <div>
        <form>
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={authUser.email} />
                  </div>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text1" class="form-control" id="username" placeholder={authUser.username} />
                  </div>
                  <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                  </div>
                  <button type="submit" class="btn btn-primary">Update</button>
                </form></div>)}
    </AuthUserContext.Consumer>


        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(profile);