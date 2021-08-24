/* Imports */
import React, { useReducer } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_PATH, BASE_URL } from "app/assets/js/config/helper";
import formReducer from "../reducers/form";
/* Imports */

/**
 * The component responsible for showing the login form.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function LoginForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { email, loginPassword, errors } = state;

  const handleInputChange = (event) => {
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
   * Gets the field values and validates them with the validator service.
   *
   * @returns {boolean}
   */
  const canBeSubmitted = () => {
    dispatch({
      type: "validate",
      payload: {
        email: email,
      },
    });

    // var fields = Object.keys(state).filter((el) => typeof errors[el] !== "undefined");

    const isDisabled = Object.keys(errors).some((el) => errors[el]);

    return !isDisabled;
  };
  /**
   * The method is called when the user *clicks* the submit button.
   *
   * Calls the validation method, on success appends the form data
   * and sends the login request.
   *
   * @param event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canBeSubmitted()) {
      return;
    }

    const data = new FormData();

    data.append("email", email);
    data.append("password", loginPassword);

    loginRequest(data);
  };
  /**
   * The method handles the login request.
   *
   * The method on success response (HTTP 200) sends the user to their account page or
   * on receiving errors updates the state and shows them to the user.
   *
   * @param data
   * @returns {Promise<void>}
   */
  const loginRequest = async (data) => {
    const response = await fetch(BASE_URL + "api/login", {
      method: "POST",
      body: data,
    });

    const json = await response.json();
    const status = response.status;

    if (status === 200) {
      window.location.replace(`${BASE_PATH}platform/home`);
    }

    if (status === 403) {
      window.location.replace(`${BASE_PATH}platform/home`);
    }

    if (status === 400) {
      dispatch({
        type: "error",
        payload: json.error,
      });
    }
  };

  return (
    <Form className="current-form" onSubmit={handleSubmit}>
      <div className="button-wrapper">
        <p className="heading-text">Вход</p>
      </div>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Имейл</Form.Label>
        <Form.Control
          type="email"
          placeholder="Въведете имейл!"
          onChange={handleInputChange}
          name="email"
          value={email}
        />
        {errors.email ? <Form.Text>{errors.email}</Form.Text> : null}
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Парола</Form.Label>
        <Form.Control
          type="password"
          placeholder="Въведете парола!"
          onChange={handleInputChange}
          name="loginPassword"
          value={loginPassword}
        />
        {errors.error ? <Form.Text>{errors.error}</Form.Text> : null}
      </Form.Group>
      <div className="button-wrapper">
        <Button className="submit-button" type="submit" value="submit">
          Вход
        </Button>
      </div>
      <hr />
      <p className="redirect-p">
        Нямате регистрация?
        <Link to={`${BASE_PATH}register`} style={{ display: "contents" }}>
          {" "}
          Регистрирайте се!
        </Link>
      </p>
    </Form>
  );
}

const initialState = {
  email: "",
  loginPassword: "",
  errors: {
    email: null,
    error: null,
  },
};

/* Exporting the component. */
export default LoginForm;
