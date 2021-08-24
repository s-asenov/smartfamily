/**
 * The file responsible for implementing FCM.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
import firebase from "firebase/app";
import "@firebase/messaging";
import "@firebase/database";

import {
  getUserData,
  markFCMTokenAsActive,
  removeFCMToken,
} from "app/assets/js/config/api";
import { BASE_URL } from "app/assets/js/config/helper";


const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

navigator.serviceWorker
  .register(BASE_URL + "firebase-messaging-sw.js")
  .then((registration) => {
    messaging.useServiceWorker(registration);

    Notification.requestPermission().then(function (permission) {
      if (permission === "denied") {
        let fcmToken = window.localStorage.getItem("fcm_token");

        if (fcmToken) {
          getUserData().then((result) => {
            if (result.user) {
              let formData = new FormData();
              formData.append("fcm_token", fcmToken);

              window.localStorage.removeItem("fcm_token");
              removeFCMToken(formData);
            }
          });
        }
      }

      if (permission === "granted") {
        messaging.getToken().then((token) => {
          window.localStorage.setItem("fcm_token", token);

          getUserData().then((result) => {
            if (result.user) {
              let formData = new FormData();
              formData.append("fcm_token", token);

              markFCMTokenAsActive(formData);
            }
          });
        });
      }
    });
  });

messaging.onTokenRefresh(() => {
  messaging.getToken().then((refreshedToken) => {
    getUserData().then((result) => {
      if (result.user) {
        let fcmToken = window.localStorage.getItem("fcm_token");

        if (fcmToken) {
          let unmarkData = new FormData();
          unmarkData.append("fcm_token", fcmToken);

          removeFCMToken(formData);
          // markFCMTokenAsUnactive(unmarkData)
        }

        window.localStorage.setItem("fcm_token", refreshedToken);

        let formData = new FormData();
        formData.append("fcm_token", refreshedToken);

        markFCMTokenAsActive(formData);
      }
    });
  });
});

window.addEventListener("unload", () => {
  if (Notification.permission === "granted") {
    let fcmToken = window.localStorage.getItem("fcm_token");

    if (fcmToken) {
      let formData = new FormData();
      formData.append("fcm_token", fcmToken);

      navigator.sendBeacon(BASE_URL + "api/fcm/unmark", formData);
    }
  }
});

export default firebase;

/*
async function zd() {
  //USER CHAT
  ->get messages from chatroom name
  try {
    firebase
      .database()
      .ref("user-chats/messages")
      .orderByChild("chatroom")
      .equalTo("pesho")
      .on("value", function (snap) {
        let chats = [];
        snap.forEach((snap) => {
          chats.push(snap.val());
        });
  
        console.log(chats);
      });
  } catch (error) {
    console.log(error);
  }

  ->add message
  try {
    await firebase.database().ref("user-chats/messages").push({
      content: "test",
      time: Date.now(),
      sender: 1,
      receiver: 2,
      chatroom: "pesho",
    });
    console.log("amm");
  } catch (error) {
    console.log(error);
  }

  ->change room name
  var updates = {};
  updates[`/user-chats/${chatroomID}`] = "new";

  return firebase.database().ref().update(updates);

  

  //GROUP CHAT
  ->add new message
  try {
    await firebase.database().ref(`group-chats/${id}`).push({
      content: "test",
      time: Date.now(),
      sender: id,
    });
    console.log("amm");
  } catch (error) {
    console.log(error);
  }

  ->get all messages in group
  try {
    firebase
      .database()
      .ref(`group-chats/${id}`)
      .equalTo(1)
      .on("value", function (snap) {
        let chats = [];
        
        snap.forEach((snap) => {
          chats.push(snap.val());
        });
  
        console.log(chats);
      });
  } catch (error) {
    console.log(error);
  }
}

*/
