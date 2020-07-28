import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../firebase';

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);

      this.state = { isSent: false };
    }

    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="../images/logo.png" alt="User Logo" />
                    </div>
                {this.state.isSent ? (
                  <p>
                    <div class="alert alert-primary mx-4 my-4" role="alert">
                    E-Mail confirmation sent: Check you E-Mails (Spam
                    folder included) for a confirmation E-Mail.
                    Refresh this page once you confirmed your E-Mail.
                    </div>
                  </p>
                ) : (
                  <p>
                     <div class="alert alert-primary mx-4 my-4" role="alert">
                    Verify your E-Mail: Check you E-Mails (Spam folder
                    included) for a confirmation E-Mail or send
                    another confirmation E-Mail.
                    </div>
                  </p>
                  
                )}

                <button
                  type="submit"
                  className="btn btn-success mb-4"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                  
                >
                  Send confirmation E-Mail
                </button>
             
                </div>
                  </div>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
