importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCcVZwRwhcV50n0MozxYRyCHuzXBMtisCg",
    authDomain: "creddit-by-ss-ltd.firebaseapp.com",
    projectId: "creddit-by-ss-ltd",
    storageBucket: "creddit-by-ss-ltd.appspot.com",
    messagingSenderId: "737898149215",
    appId: "1:737898149215:web:71912c46eac7dd78d5f2ea",
    measurementId: "G-Z500NQX36P"
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});