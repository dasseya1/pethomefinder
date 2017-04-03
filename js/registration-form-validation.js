// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBhI4PHzfxptoOUJnW2FkrRI4w11o7_fAI",
    authDomain: "gw-pet-project.firebaseapp.com",
    databaseURL: "https://gw-pet-project.firebaseio.com",
    projectId: "gw-pet-project",
    storageBucket: "gw-pet-project.appspot.com",
    messagingSenderId: "1010431917406"
  };
  firebase.initializeApp(config);

// Function which is called onSubmit
function formValidation() {
	var uemail = document.registration.email;
	var passid = document.registration.passid;

if(passid_validation(passid,7,12))   
{  
if(ValidateEmail(uemail))  
{  
}  
}  
return false;  
}  

// Function for validating password
function passid_validation(passid, mx, my) {
	var passid_len = passid.value.length;
	if (passid_len === 0 || passid_len >= my || passid_len < mx) {
		alert("Password should not be empty / length between "+mx+" to "+my)
		passid.focus();
		return false;
	}
	return true;
} // End of passid_validation function

// Function for validating email format
function ValidateEmail(uemail) {
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(uemail.value.match(mailformat)) {
		return true;
	}
	else {
		alert("You have entered an invalid email address!");
		uemail.focus();
		return false;
	}
}