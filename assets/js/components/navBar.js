/* Imports */
import React, { useState, useEffect } from "react";
// import "app/assets/css/home.css";
// import "app/assets/css/index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import {
  faUserAlt,
  faUserPlus,
  faSignOutAlt,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL, BASE_PATH } from "app/assets/js/config/helper";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import { useStore, connect } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getUserNotifications } from "app/assets/js/config/api";
import dateFormat from "dateformat";
/* Imports */

dateFormat.i18n = {
  dayNames: [
    "Нед",
    "Пон",
    "Вт",
    "Ср",
    "Чет",
    "Пт",
    "Сб",
    "Неделя",
    "Понеделник",
    "Вторник",
    "Сряда",
    "Четвъртък",
    "Петък",
    "Събота",
  ],
  monthNames: [
    "ян",
    "февр",
    "март",
    "април",
    "май",
    "юни",
    "юли",
    "авг",
    "септ",
    "окт",
    "ноем",
    "дек",
    "януари",
    "февруари",
    "март",
    "април",
    "май",
    "юни",
    "юли",
    "август",
    "септември",
    "октомври",
    "ноември",
    "декември",
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

const NotificationListItem = ({ id, sender, info, additionalInfo, date }) => {
  let path;

  switch (additionalInfo) {
    case "welcome":
      path = `${BASE_URL}platform/home`;
      break;
    case "task":
      path = `${BASE_URL}platform/tasks/sent`;
      break;
    case "user_invitation":
      path = `${BASE_URL}platform/user-invitations/pending`;
      break;
    case "group_invitation":
      path = `${BASE_URL}platform/group-invitations/pending`;
      break;
    case "relation":
      path = `${BASE_URL}platform/friends`;
      break;
    default:
      path = `${BASE_URL}platform/group/${additionalInfo}`;
      break;
  }

  const onNotificationClick = () => {
    navigator.sendBeacon(`${BASE_URL}api/notifications/read/${id}`);
    window.location.replace(path);
  };

  return (
    <>
      <Dropdown.Item
        className="dropdown-notification-item"
        onClick={onNotificationClick}
      >
        <p className="info">{info}</p>
        <small className="from">От {sender === " " ? "система" : sender}</small>
        <small className="date">
          {dateFormat(date.toString(), "hh:mm dd mmm yyyy")}
        </small>
      </Dropdown.Item>
      <hr />
    </>
  );
};

function NavBar() {
  const store = useStore();
  const state = store.getState();

  const [notifications, setNotifications] = useState([]);
  const [drop, setDrop] = useState("left");
  const [loading, setLoading] = useState(true);

  const {
    userReducer: { user, load },
    sideBarReducer: { sideBar, icon },
  } = state;

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    window.onresize = function resize() {
      if (window.innerWidth > 708) {
        setDrop("left");
      } else {
        setDrop("down");
      }
    };

    if (!load && user && loading) {
      setLoading(false);
      getUserNotifications().then((result) => {
        if (result.status === 200) {
          setNotifications(result.json);
        }
      });
    }
  });

  const toggleSideNav = () => {
    if (sideBar === "partial") {
      store.dispatch({
        type: "open",
      });
    } else {
      store.dispatch({
        type: "close",
      });
    }
  };

  /**
   * Handles the logout when the logout button is clicked.
   *
   * @returns {Promise<void>}
   */
  const handleLogout = async () => {
    let fcmToken = window.localStorage.getItem("fcm_token");
    let formData = new FormData();

    if (fcmToken) {
      formData.append("fcm_token", fcmToken);
    }

    const request = await fetch(`${BASE_URL}api/logout`, {
      method: "POST",
      body: formData,
    });

    if (request.status === 200) {
      history.push(BASE_PATH);

      store.dispatch({
        type: "logout",
      });
    }
  };

  /**
   * Redirects the user to their profile.
   */
  const showProfile = () => {
    history.replace(BASE_PATH + "platform/home");
  };

  const showIndexPage = () => {
    history.replace(BASE_PATH);
  };

  const MyMenu = () => {
    if (!load) {
      if (user) {
        return (
          <Dropdown>
            <DropdownToggle as={Nav.Item} id={"profile-dropdown"}>
              <Image
                src={user.userImg}
                width="38px"
                height="38px"
                alt=""
                roundedCircle
              />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-lg-right">
              <Dropdown.Item onClick={showProfile}>
                <FontAwesomeIcon
                  className="mr-1"
                  icon={faUserAlt}
                  transform="shrink-2"
                  mask="circle"
                  size="lg"
                />
                Профил
              </Dropdown.Item>
              <Dropdown drop={drop}>
                <Dropdown.Toggle
                  bsPrefix="dropdown-item"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  <span className="fa-layers fa-fw mr-1">
                    <FontAwesomeIcon size="lg" icon={faBell} />
                    <span
                      className="fa-layers-counter"
                      style={{
                        fontSize: "22px",
                        transform: "scale(.25, 0.3)",
                      }}
                    >
                      {notifications.length}
                    </span>
                  </span>
                  Известия
                </Dropdown.Toggle>

                {notifications.length > 0 ? (
                  <Dropdown.Menu>
                    <Row className="dropdown-notification-menu">
                      {notifications.map((item, index) => (
                        <NotificationListItem
                          key={index}
                          id={item["id"]}
                          sender={`${item["sender_firstName"]} ${item["sender_lastName"]}`}
                          info={item["info"]}
                          additionalInfo={item["additional_info"]}
                          date={item["date"]}
                        />
                      ))}
                    </Row>
                  </Dropdown.Menu>
                ) : null}
              </Dropdown>
              <Dropdown.Item onClick={handleLogout}>
                <FontAwesomeIcon
                  className="mr-1"
                  icon={faSignOutAlt}
                  transform="shrink-1"
                  mask="circle"
                  size="lg"
                />
                Изход
              </Dropdown.Item>
            </DropdownMenu>
          </Dropdown>
        );
      } else {
        return (
          <>
            <Button
              className="mr-1"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-30deg, #427bff, #2c5cff)",
              }}
              size="sm"
              href={BASE_URL + "register"}
            >
              <FontAwesomeIcon
                className="mr-1"
                icon={faUserPlus}
                transform="shrink-3"
                mask="circle"
                size="lg"
              />
              Регистрация
            </Button>

            <Button variant="outline-dark" size="sm" href={BASE_URL + "login"}>
              <FontAwesomeIcon
                className="mr-1"
                icon={faUserAlt}
                transform="shrink-3"
                mask="circle"
                size="lg"
              />
              Вход
            </Button>
          </>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <Navbar className="navbar-custom" expand="md">
        {location.pathname.includes("platform") ? (
          <a
            className="arrow-btn mr-3"
            onClick={() => toggleSideNav()}
            style={{ cursor: "pointer" }}
            title={sideBar == "active" ? "Сгъни!" : "Разгъни!"}
          >
            <FontAwesomeIcon
              icon={icon}
              transform="shrink-3"
              mask="circle"
              size="lg"
            />
          </a>
        ) : null}
        <Navbar.Brand onClick={showIndexPage}>
          <Image
            src={"https://smartfamily.noit.eu/cr-logo.png"}
            width="48px"
            height="36px"
            className="d-inline-block align-top"
            alt=""
            title="Начало"
            style={{
              cursor: "pointer",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!location.pathname.includes("platform") ? (
              <>
                <Nav.Link href={BASE_URL + "#slider"}>Начало</Nav.Link>
                <Nav.Link href={BASE_URL + "#purpose"}>Цел</Nav.Link>
                <Nav.Link href={BASE_URL + "#contact-form"}>Контакти</Nav.Link>
              </>
            ) : null}
          </Nav>
          <Form inline>
            <MyMenu />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

function mapStateToProps(state) {
  return state;
}

/* Exporting the component. */
export default connect(mapStateToProps)(NavBar);
