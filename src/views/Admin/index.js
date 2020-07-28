import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../../components/firebase';
import * as ROUTES from '../../utils/routes';
import Messages from "../../components/Messages";
 
class Admin extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      loading: false,
      users: [],
    };
  }
  
 
  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .users()
      .onSnapshot(snapshot => {
        let users = [];

        snapshot.forEach(doc =>
          users.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          users,
          loading: false,
        });
      });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
 
  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <Messages/>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
 
        <UserList users={users} />
      </div>
    );
  }
}
const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID:</strong> {user.uid}
        </span>
        <span>
          <strong>E-Mail:</strong> {user.email}
        </span>
        <span>
          <strong>Username:</strong> {user.username}
        </span>
        <span>
                <Link
                  to={{
                    pathname: `${ROUTES.ADMIN_DETAILS}/${user.uid}`,
                    state: { user },
                  }}
                >
                  Details
                </Link>
              </span>
      </li>
    ))}
  </ul>
);
export default withFirebase(Admin);