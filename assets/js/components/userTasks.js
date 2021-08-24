/* Imports */
import React, { useState, useEffect } from "react";
// import "app/assets/css/home.css";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import PendingTasks from "app/assets/js/components/pendingTasks";
import SentTasks from "app/assets/js/components/sentTasks";
import { BASE_PATH } from "app/assets/js/config/helper";
/* Imports */

/**
 * The component responsible for showing the list of user tasks.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function UserTasks() {
  const parentPath = `${BASE_PATH}platform/tasks/`;

  useEffect(() => {
    if (location.pathname.includes("sent")) {
      document.getElementById("left-btn").click();
    } else if (location.pathname.includes("pending")) {
      document.getElementById("right-btn").click();
    }
  });

  return (
    <Router>
      <Container
        fluid={true}
        className="mt-2"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <Row>
          <Col />
          <Col md="6">
            <div className="switch-button-wrapper">
              <Button
                id="left-btn"
                as={NavLink}
                to={`${parentPath}sent`}
                className={"switch-button left-switch-button"}
              >
                Изпратени
              </Button>
              <Button
                id="right-btn"
                as={NavLink}
                to={`${parentPath}pending`}
                className={"switch-button right-switch-button"}
              >
                Получени
              </Button>
            </div>
          </Col>
          <Col />
        </Row>
        <Switch>
          <Route path={`${parentPath}sent`}>
            <SentTasks />
          </Route>
          <Route path={`${parentPath}pending`}>
            <PendingTasks />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

/* Exporting the component. */
export default UserTasks;
