// Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyBhI4PHzfxptoOUJnW2FkrRI4w11o7_fAI",
  //   authDomain: "gw-pet-project.firebaseapp.com",
  //   databaseURL: "https://gw-pet-project.firebaseio.com",
  //   projectId: "gw-pet-project",
  //   storageBucket: "gw-pet-project.appspot.com",
  //   messagingSenderId: "1010431917406"
  // };
  // firebase.initializeApp(config);

// Sign Up button press
  function handleSignUp() {
  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;
  	if (email.length < 4) {
  		alert("Please enter an email address.");
  		return;	
  	}
  	if (password.length < 4) {
  		alert('Please enter a password.');
  		return;
  	}
// Sign in with email and pass.
// Start createwithemail
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  	var errorCode = error.code;
	  	var errorMessage = error.message;
	  	// [start exclude]
	  	if (errorCode === 'auth/weak-password') {
	  	alert("The password is too weak.");
	  	} else {
	  	alert(errorMessage);
	  	}
	  	console.log(error);
	  	// [end exclude]
	});
  } //Closes the function handleSignUp
   
// Sign in button press
function toggleSignIn() {
	if (firebase.auth().currentUser) {
		// [start signout]
		firebase.auth().signout();
		// [end signout]
	} else {
		var email = document.getElementById('email').value;
		var password = document.getElementById('password').value;
		if (email.length < 4) {
			alert("Please enter an email address.");
			return;
		}
		if (password.lenth < 4) {
			alert("Please enter a password.");
			return;
		}

		// Log (sign) in existing users
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  	// Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // [start exclude]
		  if (errorCode === 'auth/wrong-password') {
		  	alert('Wrong password.');
		  } else {
		  	alert(errorMessage);
		  }
		  console.log(error);
		  document.getElementById('quickstart-sign-in').disabled = false;
		  // [end exclude]
		}); 
		// [end authwithemail]
	}
	document.getElementById('quickstart-sign-in').disabled = true;  
}

// Set an authentication state observer and get user data
function initApp() {

	firebase.auth().onAuthStateChanged(function(user) {
		// [start authstatelistener]

	  if (user) {
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // [start exclude]
	    document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
	    document.getElementById('quickstart-sign-in').textContent = 'Sign out';
	    document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
	    if (!emailVerified) {
	    	document.getElementById('quickstart-verify-email').disabled = false;
	      }
	      // [END_EXCLUDE]
	    } else {
	      // User is signed out.
	      // [START_EXCLUDE]
	      document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
	      document.getElementById('quickstart-sign-in').textContent = 'Sign in';
	      document.getElementById('quickstart-account-details').textContent = 'null';
	      // [END_EXCLUDE]
	    }
	    // [START_EXCLUDE silent]
	    document.getElementById('quickstart-sign-in').disabled = false;
	    // [END_EXCLUDE]
	  });
	  // [END authstatelistener]

	  document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
	  document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
	  // document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
	  // document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
	}

	window.onload = function() {
	  initApp();
	};

