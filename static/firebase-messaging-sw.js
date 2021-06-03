importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyDe4fVbWMs_p84JzF6BeLDfqRGmvSfQavI",
  authDomain: "prototype-party-planner.firebaseapp.com",
  projectId: "prototype-party-planner",
  storageBucket: "prototype-party-planner.appspot.com",
  messagingSenderId: "803603139154",
  appId: "1:803603139154:web:886589fc2d9b5acb0a2d8b",
  databaseURL:
    "https:\u002F\u002Fprototype-party-planner-default-rtdb.europe-west1.firebasedatabase.app"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
