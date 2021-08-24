import React, { useState, useEffect, useReducer } from "react";
import NavBar from "./navBar";
import { getUserData, warnUserForExpiringTasks } from "../config/api";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useStore, connect } from "react-redux";
import { BASE_PATH, BASE_URL } from "../config/helper";
import Index from "./indexPage";
import Home from "./home";
import Forms from "./forms";
import Footer from "./footer";
import { MyNotification } from "app/assets/js/config/reusable";
import firebase from "../config/fcm";
import noProfilePic from "app/assets/images/no-profile.png";
import "react-animated-slider/build/horizontal.css";
import "app/assets/css/slider.css";
import "app/assets/css/notification.css";

const mapStateToProps = (state) => {
  return state;
};

const initialNotification = {
  isShown: false,
  title: "",
  body: "",
  url: "",
};

function App(props) {
  let store = useStore();
  const [notification, setNotification] = useState(initialNotification);

  const {
    userReducer: { user, load },
    sideBarReducer: { sideBar, icon },
  } = props;

  useEffect(() => {
    var script = document.createElement("script");

    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API}&callback=initMap`;
    script.defer = true;
    script.async = true;
    script.id = "maps-id-api";

    // Attach your callback function to the `window` object
    window.initMap = function (map) {
      if (map) {
        var googleMap = new google.maps.Map(map, {
          center: { lat: 42.610229, lng: 23.032141 },
          zoom: 13,
          streetViewControl: false,
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            googleMap.setCenter(pos);
          });
        }

        return googleMap;
      }
    };

    document.head.appendChild(script);

    if (!user) {
      getUserData().then((result) => {
        if (result.user) {
          if (result.user.userImg === "") {
            result.user.userImg = noProfilePic;
          } else {
            result.user.userImg = `${BASE_URL}uploads/${result.user.userImg}`;
          }

          store.dispatch({
            type: "login",
            payload: {
              user: result.user,
            },
          });
        } else {
          store.dispatch({
            type: "logout",
          });
        }
      });
    }
  }, []);

  const messaging = firebase.messaging();
  
  messaging.onMessage((payload) => {
    setNotification({
      isShown: true,
      title: payload.data.title,
      body: payload.data.body,
      url: payload.data.url,
    });

    var audio = new Audio("https://smartfamily.noit.eu/notification.mp3");

    audio.volume = 0.7;
    audio.play();

    setTimeout(() => {
      setNotification(initialNotification);
    }, 10000);
  });

  return (
    <>
      <Router forceRefresh>
        <NavBar {...props} />
        <Switch>
          <Route exact path={`${BASE_PATH}`}>
            <Index />
          </Route>
          <Route exact path={[`${BASE_PATH}register`, `${BASE_PATH}login`]}>
            <Forms />
          </Route>
          <Route path={`${BASE_PATH}platform`}>
            <Home />
          </Route>
        </Switch>
        <MyNotification
          url={notification.url}
          isShown={notification.isShown}
          title={notification.title}
          body={notification.body}
        />
        <Footer />
      </Router>
    </>
  );
}

export default connect(mapStateToProps)(App);
