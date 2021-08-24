/* Imports */
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BASE_URL } from "app/assets/js/config/helper";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useReducer } from "react";
import formReducer from "../reducers/form";
import { useHistory } from "react-router-dom";
import { BASE_PATH } from "../config/helper";
/* Imports */

/**
 * The component for the change password form.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function ChangePassword() {
  let history = useHistory();
  const [state, dispatch] = useReducer(formReducer, initialState);

  const { oldPassword, password, passwordConf, errors } = state;

  /**
   * Handles the change of fields in the form.
   *
   * @param event
   */
  const handleChange = (event) => {
    event.preventDefault();

    dispatch({
      type: "field",
      fieldName: event.currentTarget.name,
      payload: event.currentTarget.value,
    });
  };
  /**
   * The method handles the validation upon submission.
   *
   * Gets the field values and validates them with the validator service or condition.
   *
   * @returns {boolean}
   */
  const canBeSubmitted = () => {
    dispatch({
      type: "validate",
      payload: {
        password: password,
        passwordConf: passwordConf,
      },
    });

    const isDisabled = Object.keys(errors).some((x) => errors[x]);

    return !isDisabled;
  };

  /**
   * The method is called when the user *clicks* the submit button.
   *
   * Calls the validation method, on success appends the form data
   * and sends the change password request.
   *
   * @param event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canBeSubmitted()) {
      return null;
    }

    const data = new FormData();

    data.append("old_password", oldPassword);
    data.append("password", password);
    data.append("password_confirmation", passwordConf);

    changePassword(data);
  };

  /**
   * The method handles the change password request.
   *
   * The method on success response (HTTP 200) sends the user back to their account page or
   * on receiving errors updates the state and shows them to the user.
   *
   * @param data
   * @returns {Promise<void>}
   */
  const changePassword = async (data) => {
    const response = await fetch(BASE_URL + "api/user/update-pass", {
      method: "POST",
      body: data,
    });

    const json = await response.json();

    const status = response.status;

    if (status === 200) {
      history.push(`${BASE_PATH}platform/home`);
      //   window.location.replace(BASE_URL + "platform/home");
    }

    if (status === 401) {
      history.push(BASE_PATH);
      //   window.location.replace(BASE_URL);
    }

    if (status === 400) {
      dispatch({
        type: "error",
        payload: json.error,
      });
    }
  };

  return (
    <div className="password-form-wrapper">
      <h2 className="text-center m-3">Промяна на паролата</h2>
      <Container>
        <Row>
          <Col />
          <Col md="6">
            <Form className="password-form" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Стара парола</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Въведете стара парола!"
                  onChange={handleChange}
                  value={oldPassword}
                  name="oldPassword"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Нова парола</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Въведете нова парола!"
                  onChange={handleChange}
                  value={password}
                  name="password"
                  required
                />
                {errors.password ? (
                  <Form.Text>{errors.password}</Form.Text>
                ) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Нова парола</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Повторете новата парола!"
                  onChange={handleChange}
                  value={passwordConf}
                  name="passwordConf"
                  required
                />
                {errors.error || errors.passwordConf ? (
                  <Form.Text>
                    {errors.error || "Паролите" + errors.passwordConf}
                  </Form.Text>
                ) : null}
              </Form.Group>
              <div className="button-wrapper">
                <Button className="submit-button" type="submit" value="Submit">
                  Промяна
                </Button>
              </div>
            </Form>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
}

const initialState = {
  oldPassword: "",
  password: "",
  passwordConf: "",
  errors: {
    password: null,
    passwordConf: null,
    error: null,
  },
};

/* Exporting the component.*/
export default ChangePassword;
