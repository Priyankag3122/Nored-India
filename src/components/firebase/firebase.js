import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

const config = {
  apiKey: "AIzaSyCPrNYZMpF6i06lJjXpki-qyD2vostQGN4",
  authDomain: "noredindia.firebaseapp.com",
  databaseURL: "https://noredindia.firebaseio.com",
  projectId: "noredindia",
  storageBucket: "noredindia.appspot.com",
  messagingSenderId: "575845268748",
  appId: "1:575845268748:web:2c5f4d0b1e25a701f25d29",
  measurementId: "G-1PXJH9W6QT"
  };

  class Firebase {
    constructor() {
      
      app.initializeApp(config);

       /* Helper */

    this.fieldValue = app.firestore.FieldValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
    }
     // *** Auth API ***
 
  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);
    
  doSignOut = () => this.auth.signOut();

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: 'http://localhost:3000',
    });
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
  
  doUpdateProfile = displayName =>
    this.auth.currentUser.updateProfile(displayName);
  
   // *** Merge Auth and DB User API *** //
   componentDidMount(){
       this.onAuthUserListener();
   }
    
   onAuthUserListener = (next, fallback) =>
   this.auth.onAuthStateChanged(authUser => {
     if (authUser) {
       this.user(authUser.uid)
         .get()
         .then(snapshot => {
           const dbUser = snapshot.data();

           // default empty roles
           if (!dbUser.roles) {
             dbUser.roles = {};
           }

           // merge auth and db user
           authUser = {
             uid: authUser.uid,
             email: authUser.email,
             username: authUser.username,
             emailVerified: authUser.emailVerified,
             providerData: authUser.providerData,
             ...dbUser,
           };

           next(authUser);
         });
     } else {
       fallback();
     }
   });


     // *** User API ***
 
  user = uid => this.db.doc(`users/${uid}`);
 
  users = () => this.db.collection('users');
  
  // *** Message API ***

  message = uid => this.db.doc(`messages/${uid}`);

  messages = () => this.db.collection('messages');

  image = uid => this.storage.ref(`images/${uid}`);

  images = () => this.storage.ref('images');

}
   
  export default Firebase;
