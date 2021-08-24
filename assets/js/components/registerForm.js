/* Imports */
import React, { useReducer, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { BASE_PATH, BASE_URL } from "app/assets/js/config/helper";
import formReducer from "../reducers/form";
/* Imports */

/**
 * The component responsible for showing the register form.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function RegisterForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const {
    firstName,
    lastName,
    username,
    password,
    passwordConf,
    email,
    userImgName,
    userImg,
    errors,
  } = state;

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
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        passwordConf: passwordConf,
      },
    });

    var fields = Object.keys(state).filter(
      (el) => ["errors", "userImg", "userImgName"].indexOf(el) < 0
    );

    const isDisabled =
      Object.keys(errors).some((el) => errors[el]) ||
      Object.values(fields).some((el) => !state[el]);

    return !isDisabled;
  };

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
   * Handles the image change in the form.
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
   * The method is called when the user *clicks* the submit button.
   *
   * Calls the validation method, on success appends the form data
   * and sends the register request.
   *
   * @param event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!canBeSubmitted()) {
      return;
    }

    const data = new FormData();

    data.append("username", state.username.trim());
    data.append("password", state.password.trim());
    data.append("password_confirmation", state.passwordConf.trim());
    data.append("email", state.email.trim());
    data.append("first_name", state.firstName.trim());
    data.append("last_name", state.lastName.trim());
    data.append("user_img", state.userImg);

    registerRequest(data);
  };

  /**
   * The method handles the register request.
   *
   * The method on success response (HTTP 200) sends the user to their account page or
   * on receiving errors updates the state and shows them to the user.
   *
   * @param data
   * @returns {Promise<void>}
   */
  const registerRequest = async (data) => {
    const response = await fetch(BASE_URL + "user/register", {
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
        <p className="heading-text">Регистрация</p>
      </div>

      <Form.Group>
        <Form.Label>Име</Form.Label>
        <Form.Control
          type="text"
          placeholder="Въведете име!"
          onChange={handleChange}
          value={firstName}
          name="firstName"
        />
        {errors.firstName ? <Form.Text>{errors.firstName}</Form.Text> : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          type="text"
          placeholder="Въведете фамилия!"
          onChange={handleChange}
          value={lastName}
          name="lastName"
        />
        {errors.lastName ? <Form.Text>{errors.lastName}</Form.Text> : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Потребителско име</Form.Label>
        <Form.Control
          type="text"
          placeholder="Въведете потребителско име!"
          onChange={handleChange}
          value={username}
          name="username"
        />
        {errors.username ? <Form.Text>{errors.username}</Form.Text> : null}
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Имейл</Form.Label>
        <Form.Control
          type="text"
          placeholder="Въведете имейл!"
          onChange={handleChange}
          value={email}
          name="email"
        />
        {errors.email ? <Form.Text>{errors.email}</Form.Text> : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Парола</Form.Label>
        <Form.Control
          type="password"
          placeholder="Въведете парола!"
          onChange={handleChange}
          value={password}
          name="password"
        />
        {errors.password || errors.newPassword ? (
          <Form.Text>{errors.password || errors.newPassword}</Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group>
        <Form.Label>Потвърждение</Form.Label>
        <Form.Control
          type="password"
          placeholder="Потвърдете паролата!"
          onChange={handleChange}
          value={passwordConf}
          name="passwordConf"
        />
        {errors.error || errors.passwordConf ? (
          <Form.Text>
            {errors.error || "Паролите" + errors.passwordConf}
          </Form.Text>
        ) : null}
        {errors.passwordUnique ? (
          <Form.Text>{errors.passwordUnique}</Form.Text>
        ) : null}
      </Form.Group>
      <Form.Group controlId="file-upload">
        <Form.Label className="custom-file-upload">
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faDownload}
            size={"lg"}
          />
          Профилна снимка
        </Form.Label>
        <Form.Label>{userImgName ? userImgName : null}</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          name="userImg"
        />
        <Form.Text>*Снимкате не е задължителна</Form.Text>
      </Form.Group>
      <div className="button-wrapper">
        <Button type="submit" value="Submit">
          Регистрация
        </Button>
      </div>
      <hr />
      <p className="redirect-p">
        Регистрирали сте се? Влезте
        <Link to={`${BASE_PATH}login`} style={{ display: "contents" }}>
          {" "}
          тук!
        </Link>
      </p>
    </Form>
  );
}

const initialState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  username: "",
  passwordConf: "",
  userImg: null,
  userImgName: "",
  errors: {
    error: null,
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    username: null,
    userImg: null,
    passwordUnique: null,
    passwordConf: null,
  },
};

/* Exporting the component. */
export default RegisterForm;
