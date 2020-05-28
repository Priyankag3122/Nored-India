import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyC0NnminWzFo2Lj8g0crYBMjUyzsuHFPAY",
  authDomain: "nored-india-344d2.firebaseapp.com",
  databaseURL: "https://nored-india-344d2.firebaseio.com",
  projectId: "nored-india-344d2",
  storageBucket: "nored-india-344d2.appspot.com",
  messagingSenderId: "804963923765",
  appId: "1:804963923765:web:638a6e3e598805d4983e7c",
  measurementId: "G-X4L7Y8RM4F"
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

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

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

}
   
  export default Firebase;