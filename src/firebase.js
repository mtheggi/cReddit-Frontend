// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBMfQZGiURoZ2kG2-AD3vmu3tbrW4K7718",
    authDomain: "pushnotifications-f62af.firebaseapp.com",
    projectId: "pushnotifications-f62af",
    storageBucket: "pushnotifications-f62af.appspot.com",
    messagingSenderId: "279396824268",
    appId: "1:279396824268:web:25d2a2eb10543dabccfe69",
    measurementId: "G-WBDZS6JW3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BHVS4RVfU59NlPh1W6qqhr04T2P599KlE6iuzEVbkHbAFmuq-BrF2e_mZ83DtWqGuvnHSY6ZGtf88_mHhUnVm7Y",
        })
        console.log(token)
        return token;
    }
    else
        return null

}

const fcmToken = await generateToken();
export default fcmToken;