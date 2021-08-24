/* Imports */
import React, { useReducer } from "react";
import Slider from "react-animated-slider";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import contactReducer from "../reducers/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSlidersH,
  faUsers,
  faCompass,
  faMobileAlt,
  faHome,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { BASE_URL } from "app/assets/js/config/helper";
import androidPic from "app/assets/images/android-pic.png";
import slider1 from "app/assets/images/slider-pic1.jpg";
import slider2 from "app/assets/images/slider-pic2.jpg";
import slider3 from "app/assets/images/slider-pic3.jpg";
import "app/assets/css/index.css";
// import "react-animated-slider/build/horizontal.css";
// import "app/assets/css/slider.css";
// import "app/assets/css/notification.css";
/* Imports */

/**
 * Contains the content of the slider.
 */
const slides = [
  {
    title: "SmartFamily",
    description: "Платформа за пестене на време!",
    button: (
      <>
        <Image
          src={androidPic}
          height="25px"
          width="25px"
          alt="Google Play"
          className="mr-2"
        />
        Достъпно и за Android
      </>
    ),
    buttonRedirect: "#",
    image: slider3,
  },
  {
    title: "Край на дългите разговори",
    description: "управлявайте ежедневието си с няколко клика!",
    button: "Влезте!",
    buttonRedirect: "login",
    image: slider2,
  },
  {
    title: "За Вас",
    description: "хората обгърнати от задължения!",
    button: "Повече",
    buttonRedirect: "#purpose",
    image: slider1,
  },
];

/**
 * The component responsible for showing the index page.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function Index() {
  const MySlider = () => {
    /**
     * Handles the redirect when the button on the slider is clicked.
     */
    const handleRedirect = (event) => {
      let path = event.target.name;

      window.location.replace(BASE_URL + path);
    };

    return (
      <div id="#slider">
        <Slider className="slider-wrapper" autoplay="3000">
          {slides.map((item, index) => (
            <div
              key={index}
              className="slider-content"
              style={{
                background: `url('${item.image}') no-repeat center center`,
              }}
            >
              <div className="inner">
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <Button
                  className="redirect-button"
                  onClick={handleRedirect}
                  name={item.buttonRedirect}
                >
                  {item.button}
                </Button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const Purposes = () => {
    return (
      <div id="purpose">
        <div className="section-heading">
          <h1>Главни цели</h1>
          <hr />
        </div>
        <Container>
          <Row>
            <Col md="3">
              <div className="section-item">
                <FontAwesomeIcon
                  icon={faSlidersH}
                  size="2x"
                  className="section-col-icons"
                />
                <h3>Лесна организация</h3>
                <p>
                  Потребителите във всяка група имат удобството да разпределят
                  задачите помежду си, като така си спестяват излишното
                  напрежение в днешния забързан свят!
                </p>
              </div>
            </Col>
            <Col md="3">
              <div className="section-item">
                <FontAwesomeIcon
                  icon={faUsers}
                  size="2x"
                  className="section-col-icons"
                />
                <h3>Групи</h3>
                <p>
                  Всеки потребител може да бъде член в група, в която да се
                  споделят задачите между отделните членове!
                </p>
              </div>
            </Col>
            <Col md="3">
              <div className="section-item">
                <FontAwesomeIcon
                  icon={faCompass}
                  size="2x"
                  className="section-col-icons"
                />
                <h3>Удобен дизайн</h3>
                <p>
                  Потребителите лесно могат да се адаптират към нашата
                  бързоразвиваща се платформа!
                </p>
              </div>
            </Col>
            <Col md="3">
              <div className="section-item">
                <FontAwesomeIcon
                  icon={faMobileAlt}
                  size="2x"
                  className="section-col-icons"
                />
                <h3>Известия</h3>
                <p>
                  За да се спести неудобството от забравяване на важно
                  задължение, приложението изпраща известия, които безопасно се
                  пазят до тяхното отваряне!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  const Contacts = () => {
    const [state, dispatch] = useReducer(contactReducer, initialState);

    const { formHeading, formEmail, formBody, formName } = state;

    const handleInputChange = (event) => {
      event.preventDefault();

      dispatch({
        type: "field",
        fieldName: event.currentTarget.name,
        payload: event.currentTarget.value,
      });
    };

    /**
     * Handles the submit button in the contact form.
     *
     * The method appends the contact data in a FormData and executes the request sending the email.
     */
    const handleSubmit = (event) => {
      event.preventDefault();

      const data = new FormData();

      data.append("subject", state.formHeading);
      data.append("sender", state.formEmail);
      data.append("body", state.formBody);
      data.append("name", state.formName);

      fetch(BASE_URL + "send-email", {
        method: "POST",
        body: data,
      }).then(window.location.reload());
    };

    return (
      <div id="contact-form">
        <div className="section-heading">
          <h1>Контакти</h1>
          <hr />
        </div>
        <Container>
          <Row>
            <Col md="6">
              <div className="section-heading">
                <h3>Пишете ни!</h3>
              </div>
              <Form className="contact-form-area" onSubmit={handleSubmit}>
                <Form.Group className="contact-form-group">
                  <Form.Label>Име</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Въведете име!"
                    onChange={handleInputChange}
                    value={formName}
                    name="formName"
                    required
                  />
                </Form.Group>
                <Form.Group className="contact-form-group">
                  <Form.Label>Имейл</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Имейл, с който да се свържем!"
                    onChange={handleInputChange}
                    value={formEmail}
                    name="formEmail"
                  />
                </Form.Group>
                <Form.Group className="contact-form-group">
                  <Form.Label>Тема</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Въведете тема!"
                    onChange={handleInputChange}
                    value={formHeading}
                    name="formHeading"
                    required
                  />
                </Form.Group>
                <Form.Group className="contact-form-group">
                  <Form.Label>Информация</Form.Label>
                  <Form.Control
                    placeholder="Текст"
                    as="textarea"
                    rows="5"
                    onChange={handleInputChange}
                    value={formBody}
                    name="formBody"
                    required
                  />
                </Form.Group>
                <Button
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-30deg, #427bff, #2c5cff)",
                  }}
                  type="submit"
                  value="Submit"
                >
                  Изпрати
                </Button>
              </Form>
            </Col>
            <Col md="6">
              <div className="section-heading">
                <h3>Къде да ни намерите?</h3>
              </div>
              <div className="contact-form-area">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2936.611292577541!2d23.04509131509653!3d42.60598997917109!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14aacadf4ba43b73%3A0x28028560258f88be!2sProfesionalna%20Gimnaziya%20PO%20Ikonomika!5e0!3m2!1sen!2sbg!4v1582619910533!5m2!1sen!2sbg"
                  frameBorder="0"
                  style={{
                    border: "2px solid #999999",
                    borderRadius: "30px",
                    height: "400px",
                    width: "100%",
                  }}
                  allowFullScreen=""
                />
                <p className="mt-2">
                  <FontAwesomeIcon className="mr-2" icon={faHome} size="lg" />
                  гр. Перник, ул. Г. Мамарчев, 2
                </p>
                <a className="mt-2" href="mailto:noiteu.smartfamily@gmail.com">
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={faEnvelope}
                    size="lg"
                  />
                  noiteu.smartfamily@gmail.com
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return (
    <div id="index-wrapper">
      <MySlider />
      <Purposes />
      <Contacts />
    </div>
  );
}

const initialState = {
  formHeading: "",
  formEmail: "",
  formBody: "",
  formName: "",
};

/* Exporting the component. */
export default Index;
