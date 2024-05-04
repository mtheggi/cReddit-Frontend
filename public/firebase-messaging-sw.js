// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBMfQZGiURoZ2kG2-AD3vmu3tbrW4K7718",
    authDomain: "pushnotifications-f62af.firebaseapp.com",
    projectId: "pushnotifications-f62af",
    storageBucket: "pushnotifications-f62af.appspot.com",
    messagingSenderId: "279396824268",
    appId: "1:279396824268:web:25d2a2eb10543dabccfe69",
    measurementId: "G-WBDZS6JW3C"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);

    const [title, date, time] = payload.notification.title.split(' --- ');
    
    // Generate a unique key using the current date-time to ensure uniqueness
    const uniqueKey = `${date.trim()}-${time.trim()}-${new Date().getTime()}`;

    const notificationDetails = {
        key: uniqueKey,
        title: title.trim(),
        date: date.trim(),
        time: time.trim(),
        description: payload.notification.body,
        image: avatar
    };
    addNotification(notificationDetails);
    console.log(notifications);
});