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

function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '1270222299679738',
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };


  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) return;
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1270222299679738";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }