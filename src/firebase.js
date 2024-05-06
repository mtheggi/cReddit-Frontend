// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyCcVZwRwhcV50n0MozxYRyCHuzXBMtisCg",
    authDomain: "creddit-by-ss-ltd.firebaseapp.com",
    projectId: "creddit-by-ss-ltd",
    storageBucket: "creddit-by-ss-ltd.appspot.com",
    messagingSenderId: "737898149215",
    appId: "1:737898149215:web:599824eea54d2806d5f2ea",
    measurementId: "G-N200CQ3FQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    console.log(permission);
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BAOo40lVroFVeMDVgUI3WLjqaqM67vkgv-k-wFFBbepUpVePhK6mQLPM_uqbURL5LnzPo_Xc8j_czKQYmNgplUE",
        })
        console.log(token)
        return token;
    }
    else
        return null

}

const fcmToken = await generateToken();
export default fcmToken;