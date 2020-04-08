import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  // We're defining a componentDidMount method so that we can check if the user is logged in as soon as the app starts.
  // gapi library is used by many sites, so you need to load more functionality from the Google servers.
  componentDidMount() {
    // Loading the additional functionality from the Google servers takes some time, so we add a callback.
    // Callback gets executed when the additional functionality is loaded.
    window.gapi.load('client:auth2', () => {
      // We initialize the library with our clientId and the scope (what we want to access).
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          if (this.auth.isSignedIn.get()) {
            this.props.signIn(this.auth.currentUser.get().getId());
          } else {
            this.props.signOut(this.auth.currentUser.get().getId());
          }

          // When the component is rendered, see if the user is signed in and have the state reflect this:

          // Change the state whenever the user's sign-in status changes:

          this.auth.isSignedIn.listen((isSignedIn) => {
            if (isSignedIn) {
              this.props.signIn(this.auth.currentUser.get().getId());
            } else {
              this.props.signOut(this.auth.currentUser.get().getId());
            }
          });
        });
    });
  }

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="red ui button google">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="red ui button google">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
