import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../firebase';
import MessageList from './MessageList';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      image: null,
      url: '',
      progress: 0,
      loading: false,
      messages: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForMessages();
  }

  onListenForMessages = () => {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .messages()
      .orderBy('createdAt', 'desc')
      .limit(this.state.limit)
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let messages = [];
          snapshot.forEach(doc =>
            messages.push({ ...doc.data(), uid: doc.id }),
          );

          this.setState({
            messages: messages.reverse(),
            loading: false,
          });
        } else {
          this.setState({ messages: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

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

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().add({
      text: this.state.text,
      image: this.state.url,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.fieldValue.serverTimestamp(),
    });

    this.setState({ text: '', image: '' });

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(message.uid).update({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.fieldValue.serverTimestamp(),
    });
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).delete();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForMessages,
    );
  };
  

  render() {
    const { text, messages, loading} = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div >
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                authUser={authUser}
                messages={messages}
                onEditMessage={this.onEditMessage}
                onRemoveMessage={this.onRemoveMessage}
              />
            )}
            {!messages && <div>There are no messages ...</div>}

            <div class="container emp-profile mt-5">
              <div class="col-sm-12 col-lg-10 mx-auto border p-4">
                <form method="post" enctype="multipart/form-data">
                  <div class="form-group">
                    <label><strong>Upload Image</strong></label>
                    <div class="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
                      <input id="upload" 
                      type="file" 
                      onChange={this.OnChangeImage} 
                      class="form-control border-4" />
                      <div class="input-group-append">
                        <label for="upload" class="btn btn-secondary m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 "></i>
                        <small class="text-uppercase font-weight-bold ">Choose file</small></label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <button type="button" name="upload" value="upload" id="upload" onClick={this.OnSubmitUpload} class="btn btn-block btn-dark"><i class="fa fa-fw fa-upload"></i> Upload</button>
                  </div>
                </form>
                <p class="font-italic text-center">The image uploaded will be rendered inside the box below.</p>
                <div class="image-area mt-4" >
                  <img
                    id="imageResult"
                    src={this.state.url || "http://placehold.it/900x300 "}
                    alt="Uploaded Images"
                    class="img-fluid rounded shadow-sm mx-auto d-block"

                  />

                </div>
                <br />
                <ProgressBar animated variant="success" now={this.state.progress} max="100" label={`${this.state.progress}%`} />

                {/* <div >
                  <progress value={this.state.progress} max="100" />
                  <br />
                  <input type="file" onChange={this.OnChangeImage} />
                  <button type="submit" class="btn btn-primary" onClick={this.OnSubmitUpload}>Upload</button>
                  <br />
                  <br />
                  <h2>Preview</h2>
                  <img
                    src={this.state.url || "https://via.placeholder.com/400x300"}
                    alt="Uploaded Images"
                    height="300"
                    width="400"
                  />
                </div> */}
                <br />
                <form onSubmit={event =>
                  this.onCreateMessage(event, authUser)
                }
                ><label >Content:</label>
                  {/*                 
                  <input
                    type="text"
                    value={text}
                    onChange={this.onChangeText}
                  /> */}
                  <textarea type="text"
                    value={text}
                    onChange={this.onChangeText} class="form-control" rows="5" id="content"></textarea>
                  <button type="submit" class="btn btn-primary mt-2">Send</button>

                </form>
              </div>
            </div>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withFirebase(Messages);
