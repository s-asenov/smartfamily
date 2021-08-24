/* Imports */
import React, { useReducer, useState, useEffect } from "react";
// import "app/assets/css/home.css";
import {
  getUserTasks,
  markTaskAsDone,
  markTaskAsUnfinished,
} from "app/assets/js/config/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
  faEye,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MyPagination } from "app/assets/js/config/reusable";
import { calculateDateDiff, formatDate } from "app/assets/js/config/helper";
import shownDataReducer from "../reducers/shownData";
import { getTaskMarkers } from "../config/api";
import { Collapse } from "react-bootstrap";
import ReactTooltip from "react-tooltip";
/* Imports */

const SortingHeadings = ({ taskSort, groupSort, dateSort }) => {
  return (
    <div className="sorting-list-wrap">
      <div className="sorting-list">
        <p className="sorting-list-heading">Име на задачата</p>
        <p
          className="sorting-list-button"
          onClick={taskSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
      <div className="sorting-list">
        <p className="sorting-list-heading">Зададена в група</p>
        <p
          className="sorting-list-button"
          onClick={groupSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
      <div className="sorting-list">
        <p className="sorting-list-heading">Краен срок</p>
        <p
          className="sorting-list-button"
          onClick={dateSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
      <div className="sorting-list">
        <p className="sorting-list-heading">Повече информация</p>
        <p className="sorting-list-button">▾</p>
      </div>
    </div>
  );
};

const TaskItem = ({
  item,
  index,
  showMoreInfo,
  handleDone,
  handleUnfinished,
}) => {
  const dateDiff = calculateDateDiff(item["expiringOn"]);

  let textColor;

  if (dateDiff < 0) {
    textColor = "red";
  } else if (dateDiff < 7) {
    textColor = "orange";
  } else if (dateDiff < 14) {
    textColor = "yellow";
  } else {
    textColor = index % 2 ? "green" : "lawnGreen";
  }

  return (
    <Col
      key={index}
      md="12"
      className={index % 2 ? "friends-wrap even" : "friends-wrap odd"}
    >
      <div className="friend-info">
        <div className="friend-info-wrap">
          <div className="info-content">
            <p>{item["taskName"]}</p>
          </div>
          <div className="info-content">
            <p>{item["groupName"]}</p>
          </div>
          <div className="info-content">
            <p
              style={{
                color: textColor,
                fontWeight: "600",
              }}
            >
              {formatDate(item["expiringOn"])}
            </p>
          </div>
          <div className="info-content">
            <p>
              <FontAwesomeIcon
                className="task-action"
                icon={faEye}
                title="Повече информация!"
                onClick={showMoreInfo}
              />
              <FontAwesomeIcon
                className="task-action done-task-mark"
                icon={faCheck}
                title="Маркиране като приключена!"
                onClick={handleDone}
              />
              <FontAwesomeIcon
                className="task-action unfinished-task-mark"
                icon={faBan}
                title="Маркиране като неприключена!"
                onClick={handleUnfinished}
              />
            </p>
          </div>
        </div>
      </div>
    </Col>
  );
};

const TaskInfoModal = ({ modal, hideModal }) => {
  const [showMap, setShowMap] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    getTaskMarkers(modal.data["id"]).then((result) => {
      if (!result.json.length) {
        setMarkers([]);
      } else {
        setMarkers(result.json);
      }
      setLoad(false);
    });
  }, [modal]);
  /**
   * Method responsible for hiding the info modal.
   */
  const hideMoreInfoModal = () => {
    modal.show = false;
    setShowMap(false);
    setMarkers([]);
  };

  const toggleMap = (event) => {
    var markerCount = 1;
    var mapDiv = document.getElementById("map");
    var map;

    if (event.target.checked) {
      map = window.initMap(mapDiv);
    }

    markers.forEach((element) => {
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(element.lat),
          lng: parseFloat(element.lng),
        },
        map: map,
        label: markerCount.toString(),
      });
      markerCount++;
    });

    setShowMap(event.target.checked);
  };

  return (
    <Modal show={modal.show} onHide={() => hideMoreInfoModal()} centered>
      <Modal.Header closeButton>
        <Modal.Title>Повече информация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modal.data ? (
          <Form className="task-info">
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Име на задължение
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={modal.data["taskName"]}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Описание на задължение
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={modal.data["taskDescription"]}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Зададена в група
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={modal.data["groupName"]}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Зададена от
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={
                    modal.data["appointer_firstName"] +
                    " " +
                    modal.data["appointer_lastName"]
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Краен срок
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={formatDate(modal.data["expiringOn"])}
                />
              </Col>
            </Form.Group>
            {!load && markers.length ? (
              <>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  checked={showMap}
                  label="Искам да видя маркерите!"
                  onChange={toggleMap}
                  style={{ display: "inline" }}
                />
                <FontAwesomeIcon
                  style={{
                    float: "right",
                    color: "#2c5cff",
                    fontSize: "20px",
                  }}
                  icon={faQuestionCircle}
                  data-tip
                  data-for="mapInfo"
                />
                <ReactTooltip id="mapInfo" type="info">
                  <span>Потребителят възложил задачата,</span>
                  <br />
                  <span>е добавил маркери,</span>
                  <br />
                  <span>които подсказват къде тя</span>
                  <br />
                  <span>може да бъде изпълнена!</span>
                </ReactTooltip>
                <Collapse in={showMap}>
                  <div id="fade-map">
                    <div
                      id="map"
                      style={{
                        width: "100%",
                        height: "400px",
                        marginTop: "20px",
                      }}
                    />
                  </div>
                </Collapse>
              </>
            ) : !load ? (
              <div>Потребителят не е добавил маркери!</div>
            ) : null}
          </Form>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => hideMoreInfoModal()}>
          Затваряне
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
/**
 * The component responsible for showing the list of pending tasks.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function PendingTasks() {
  var isMounted = true;

  const [state, dispatch] = useReducer(shownDataReducer, initialState);
  const [modal, openModal] = useState(initialModal);

  const { shownData, data, page, itemsPerPage, load, sorts } = state;

  useEffect(() => {
    getUserTasks().then((result) => {
      if (isMounted) {
        dispatch({
          type: "setshown",
          payload: {
            result: result.json,
          },
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePageClick = (index) => {
    dispatch({
      type: "pageclick",
      payload: {
        data: index,
      },
    });
  };

  /**
   * The method handling the marking of the task as done on clicking a button.
   *
   * @param id
   */
  const handleMarkAsDone = (id) => {
    let confirmText =
      " Сигурни ли сте, че искате да маркирате задачата като приключена?";

    if (confirm(confirmText) != true) {
      return null;
    }

    markTaskAsDone(id).then((result) => {
      if (result.status === 200) {
        dispatch({
          type: "changeshown",
          payload: {
            id: id,
          },
        });
      }
    });
  };

  /**
   * The method handling the marking of the task as unfinished on clicking a button.
   *
   * @param id
   */
  const handleMarkAsUnfinished = (id) => {
    let confirmText =
      " Сигурни ли сте, че искате да маркирате задачата като неприключена?";

    if (confirm(confirmText) != true) {
      return null;
    }

    markTaskAsUnfinished(id).then((result) => {
      if (result.status === 200) {
        dispatch({
          type: "changeshown",
          payload: {
            id: id,
          },
        });
      }
    });
  };

  /**
   * Method responsible for showing the info modal.
   *
   * @param data
   */
  const showMoreInfoModal = (data) => {
    openModal({
      show: true,
      data: data,
    });
  };

  if (load) {
    return null;
  }

  return (
    <>
      <SortingHeadings
        taskSort={() =>
          dispatch({
            type: "sort",
            sort: "string",
            sortingFieldName: "taskName",
          })
        }
        groupSort={() =>
          dispatch({
            type: "sort",
            sort: "string",
            sortingFieldName: "groupName",
          })
        }
        dateSort={() =>
          dispatch({
            type: "sort",
            sort: "date",
            sortingFieldName: "expiringOn",
          })
        }
      />
      <Container fluid={true} className="friends-list-wrap tasks">
        {shownData.length > 0 ? (
          <Row className="shown-list">
            {shownData.map((item, index) => (
              <TaskItem
                key={index}
                item={item}
                index={index}
                showMoreInfo={() => showMoreInfoModal(item)}
                handleDone={() => handleMarkAsDone(item["id"])}
                handleUnfinished={() => handleMarkAsUnfinished(item["id"])}
              />
            ))}
          </Row>
        ) : (
          <div className="no-invitations-message-box">
            <h4>Нямате получени задачи</h4>
          </div>
        )}
      </Container>
      {data.length > itemsPerPage ? (
        <MyPagination
          handlePageClick={handlePageClick}
          pageCount={data.length / itemsPerPage}
        />
      ) : null}
      {modal.show && <TaskInfoModal modal={modal} />}
    </>
  );
}

const initialState = {
  data: [],
  shownData: [],
  load: true,
  page: 1,
  itemsPerPage: 10,
  sorts: {
    date: null,
    taskName: null,
    groupName: null,
  },
};

const initialModal = {
  show: false,
  data: {},
};

export default PendingTasks;
