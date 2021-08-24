/* Imports */
import React, { useReducer, useState } from "react";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "app/assets/css/home.css";
import { faFileImage } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faKey, faBan } from "@fortawesome/free-solid-svg-icons";
import {
  changeUserImage,
  showTasksStatitistics,
} from "app/assets/js/config/api";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  BASE_PATH,
  getRandomColor,
  hexToRGB,
} from "app/assets/js/config/helper";
import { useEffect } from "react";
import { useStore } from "react-redux";
import accountInfoReducer from "../reducers/accountInfo";
import Chart from "chart.js";
import { BASE_URL } from "../config/helper";
/* Imports */

/**
 * The component responsible for showing the user account page.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function UserAccount() {
  let isMounted = true;
  const [state, dispatch] = useReducer(accountInfoReducer, initialState);
  let store = useStore();
  let reduxState = store.getState();

  const { userImg, userImgName, doneRequest, length } = state;

  const user = reduxState.userReducer.user;

  var statusChartData = {
    data: {
      labels: ["Неизпълнени", "Изпълнени", "Течащи"],
      datasets: [
        {
          label: "Брой задачи",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.3)",
            "rgba(75, 192, 192, 0.3)",
            "rgba(255, 159, 64, 0.3)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Брой задачи по статус!",
        fontSize: 18,
      },
    },
  };

  var groupChartData = {
    data: {
      labels: [],
      datasets: [
        {
          label: "Брой задачи",
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: "Брой задачи по групи!",
        fontSize: 18,
      },
    },
  };

  useEffect(() => {
    if (user && !doneRequest) {
      showTasksStatitistics().then((result) => {
        for (const property in result.json.tasks_by_groups) {
          let color = getRandomColor();
          let lighterColor = hexToRGB(color, 0.3);

          groupChartData.data.labels.push(property);
          groupChartData.data.datasets[0].data.push(
            result.json.tasks_by_groups[property]
          );
          groupChartData.data.datasets[0].backgroundColor.push(lighterColor);
          groupChartData.data.datasets[0].borderColor.push(color);
        }

        for (const property in result.json.tasks_by_status) {
          statusChartData.data.datasets[0].data.push(
            result.json.tasks_by_status[property]
          );
        }

        var statusChartCanvas = document.getElementById("statusChart");
        var groupChartCanvas = document.getElementById("groupChart");

        var statusPieChart = new Chart(statusChartCanvas, {
          type: "pie",
          ...statusChartData,
        });

        var groupPieChart = new Chart(groupChartCanvas, {
          type: "pie",
          ...groupChartData,
        });

        dispatch({
          type: "chartdata",
          length: result.json.tasks_by_groups.length,
        });
      });
    }
  });

  const UserActions = () => {
    /**
     * Handles the change of the image
     */
    const handleImageChange = (event) => {
      event.preventDefault();

      dispatch({
        type: "image",
        fieldName: event.currentTarget.name,
        payload: event.currentTarget.files[0],
      });
    };

    /**
     * Handles the request updating the image
     *
     * On success reload the page and on error alert the user.
     */
    const updateImage = () => {
      const data = new FormData();

      data.append("user_img", userImg);

      changeUserImage(data).then((result) => {
        if (result.status === 200) {
          console.log(result);
          let newUser = { ...user };
          newUser.userImg = `${BASE_URL}uploads/${result.json.userImg}`;

          store.dispatch({
            type: "login",
            payload: {
              user: newUser,
            },
          });

          dispatch({
            type: "clearimage",
            fieldName: "userImg",
          });
        } else {
          alert("Неочаквана грешка!");
        }
      });
    };

    const rejectUpdateImage = () => {
      dispatch({
        type: "clearimage",
        fieldName: "userImg",
      });
    };

    return (
      <>
        <Col className="profile-button-wrap">
          <div style={{ width: "100%" }}>
            <Form.Group className="profile-button-wrap" controlId="file-upload">
              <Form.Label className="file-upload">
                <FontAwesomeIcon
                  className="mr-2"
                  style={{ marginRight: "5px" }}
                  icon={faFileImage}
                  size={"lg"}
                />
                Промяна на аватар
              </Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="userImg"
                onChange={handleImageChange}
              />
            </Form.Group>
            {userImgName ? (
              <>
                <p style={{ display: "inline-block" }}>{userImgName}</p>
                <div className="image-action">
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "green", cursor: "pointer" }}
                    title={"Подтвърди!"}
                    onClick={updateImage}
                  />
                  <FontAwesomeIcon
                    icon={faBan}
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "8px",
                    }}
                    title={"Откажи!"}
                    onClick={rejectUpdateImage}
                  />
                </div>
              </>
            ) : null}
          </div>
        </Col>
        <Col md="4">
          <Image src={user.userImg} className="title-image" />
        </Col>
        <Col className="profile-button-wrap">
          <div style={{ width: "100%" }}>
            <Form.Group className="profile-button-wrap">
              <NavLink
                as={Form.Label}
                to={`${BASE_PATH}platform/change-pass`}
                className="file-upload"
              >
                <FontAwesomeIcon
                  className="mr-2"
                  style={{ marginRight: "5px" }}
                  icon={faKey}
                  size={"lg"}
                />
                Промяна на паролата
              </NavLink>
            </Form.Group>
          </div>
        </Col>
      </>
    );
  };

  const UserData = () => {
    return (
      <>
        <Col md="2" className="user-data-leading-text">
          <p>Име</p>
        </Col>
        <Col md="4" className="user-data-description-text">
          <p>{user["firstName"] + " " + user["lastName"]}</p>
        </Col>
        <Col md="2" className="user-data-leading-text">
          <p>Фамилия</p>
        </Col>
        <Col md="4" className="user-data-description-text">
          <p>{user["lastName"]}</p>
        </Col>
        <Col md="2" className="user-data-leading-text">
          <p>Имейл</p>
        </Col>
        <Col md="4" className="user-data-description-text">
          <p>{user["email"]}</p>
        </Col>
        <Col md="2" className="user-data-leading-text">
          <p>Потребителско име</p>
        </Col>
        <Col md="4" className="user-data-description-text">
          <p>{user["username"]}</p>
        </Col>
      </>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <Container fluid={true} id="user-account-container">
      <h2 className="text-center m-3">Моят профил</h2>
      <Row>
        <UserActions />
      </Row>
      <Row className="user-data">
        <UserData />
        {length === 0 ? (
          <div
            className="no-invitations-message-box"
            style={{ height: "400px" }}
          >
            <h5>Липсва история на задачите!</h5>
          </div>
        ) : (
          <>
            <Col md="6" className="mt-3 mb-3" style={{ height: "400px" }}>
              <canvas id="statusChart"></canvas>
            </Col>
            <Col md="6" className="mt-3 mb-3" style={{ height: "400px" }}>
              <canvas id="groupChart"></canvas>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

const initialState = {
  userImg: null,
  userImgName: "",
  doneRequest: false,
  length: null,
};

/* Exporting the component. */
export default UserAccount;
