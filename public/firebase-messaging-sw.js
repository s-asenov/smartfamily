
if( 'function' === typeof importScripts) {
    importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-app.js');
    importScripts('https://www.gstatic.com/firebasejs/7.24.0/firebase-messaging.js');

    const firebaseConfig = JSON.parse('{"apiKey":"AIzaSyAoV3ajKuRn1RL2M4fHiQLVG69IJtKeljc","authDomain":"smartfamily-97623.firebaseapp.com","databaseURL":"https://smartfamily-97623.firebaseio.com","projectId":"smartfamily-97623","storageBucket":"smartfamily-97623.appspot.com","messagingSenderId":"849757139114","appId":"1:849757139114:web:094f0ffcdfc275a17ba0d3","measurementId":"G-86EEJ6BQNG"}');

    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();

    messaging.setBackgroundMessageHandler(function(payload) {
        const notificationTitle = payload.data.title;
        const notificationOptions = {
            body: payload.data.body,
            icon: "https://smartfamily.noit.eu/cr-logo.png",
            data: {
                url: payload.data.url
            }
        };

        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });

    self.addEventListener('notificationclick', function (e) {
        e.notification.close();

        clients.openWindow(e.notification.data.url);
    });
}



