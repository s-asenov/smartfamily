/* Imports */
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import LoginForm from "app/assets/js/components/loginForm";
import RegisterForm from "app/assets/js/components/registerForm";
import { BASE_PATH, BASE_URL } from "app/assets/js/config/helper";
import { useStore } from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import "app/assets/css/forms.css";
/* Imports */

/**
 * The component responsible for showing the login and register form.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function Forms() {
  let history = useHistory();
  let store = useStore();
  let state = store.getState();

  const { user, load } = state.userReducer;

  /**
   * The method is invoked immediately after the component is mounted.
   *
   * Checks if there is an user logged in and if there is, redirect him to his account page.
   */
  useEffect(() => {
    if (user && !load) {
      history.replace(`${BASE_PATH}platform/home`);
    }
  });

  return (
    <Router>
      <div className="container-wrapper">
        <Container className="forms">
          <Row>
            <Col />
            <Col md="6">
              <Switch>
                <Route exact path={BASE_PATH + "login"}>
                  <LoginForm />
                </Route>
                <Route exact path={BASE_PATH + "register"}>
                  <RegisterForm />
                </Route>
              </Switch>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    </Router>
  );
}
/* Exporting the component.*/
export default Forms;
