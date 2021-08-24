/* Imports */
import React, { useEffect, useState } from "react";
// import "app/assets/css/home.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import SentInvitationsList from "app/assets/js/components/sentInvitationsList";
import PendingInvitationsList from "app/assets/js/components/pendingInvitationsList";
import { BASE_PATH } from "app/assets/js/config/helper";
/* Imports */

function InvitationsPage() {
  const [parentPath, setParentPath] = useState("");
  let { path } = useRouteMatch();

  useEffect(() => {
    if (path.includes("user-invitations")) {
      setParentPath(`${BASE_PATH}platform/user-invitations/`);
    } else {
      setParentPath(`${BASE_PATH}platform/group-invitations/`);
    }

    if (path.includes("sent")) {
      document.getElementById("left-btn").click();
    } else if (path.includes("pending")) {
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
            <SentInvitationsList />
          </Route>
          <Route path={`${parentPath}pending`}>
            <PendingInvitationsList />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
/* Exporting the component. */
export default InvitationsPage;
