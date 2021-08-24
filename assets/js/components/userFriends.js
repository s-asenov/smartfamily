/* Imports */
import React, { useState, useReducer, useEffect } from "react";
import {
  getUserFriends,
  searchUser,
  sendUserInvitation,
  removeFriend,
} from "app/assets/js/config/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import dateFormat from "dateformat";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import { BASE_URL } from "app/assets/js/config/helper";
import Image from "react-bootstrap/Image";
import noProfilePic from "app/assets/images/no-profile.png";
import { MyPagination } from "app/assets/js/config/reusable";
import searchReducer from "../reducers/search";
import shownDataReducer from "../reducers/shownData";
import { useStore } from "react-redux";
/* Imports */

const SortingHeadings = ({ nameSort, dateSort, isActiveSort, isChildSort }) => {
  return (
    <div className="sorting-list-wrap">
      <div className="sorting-list">
        <p className="sorting-list-heading">Име</p>
        <p
          className="sorting-list-button"
          onClick={nameSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
      <div className="sorting-list">
        <p className="sorting-list-heading">Последно влязъл</p>
        <p
          className="sorting-list-button"
          onClick={dateSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
      <div className="sorting-list">
        <p className="sorting-list-heading">Активен</p>
        <p
          className="sorting-list-button"
          onClick={isActiveSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
      <div className="sorting-list">
        <p className="sorting-list-heading">Тип връзка</p>
        <p
          className="sorting-list-button"
          onClick={isChildSort}
          title="Сортиране!"
        >
          ▾
        </p>
      </div>
    </div>
  );
};

const InviteModal = ({ openModal, modal }) => {
  let reduxStore = useStore();
  const user = reduxStore.getState().userReducer.user;

  const [search, dispatchSearch] = useReducer(
    searchReducer,
    initialSearchResult
  );
  const [invitationError, setInvitationError] = useState(null);
  const [invitedIsChild, setInvitedIsChild] = useState(false);

  const {
    userResult,
    userResultShow,
    input,
    invitedUser,
    doneRequest,
    invitedUserData,
  } = search;

  /**
   * Handles the click on the list with the user results.
   *
   * @param user
   */
  const handleUserChosen = (user) => {
    dispatchSearch({
      type: "setinvited",
      payload: {
        user: user,
      },
    });
  };

  /**
   * Handles the invite button.
   *
   * Sends a request,
   * on success reloads the page,
   * on error shows the error to the user and
   * if the user is not logged redirect him to the index page.
   * @param event
   */
  const handleInviteButton = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("invited_id", invitedUser);
    data.append("is_child", invitedIsChild ? 1 : 0);

    sendUserInvitation(data).then((result) => {
      if (result.status === 200) {
        window.location.reload();
      }

      if (result.status === 400) {
        setInvitationError(result.json.error);
      }

      if (result.status === 401) {
        window.location.replace(BASE_URL);
      }
    });
  };

  /**
   * Handles the change of the search input.
   *
   * @param event
   */
  const handleInputChange = (event) => {
    let value = event.currentTarget.value;

    const data = new FormData();
    data.append("input", value);

    dispatchSearch({
      type: "input",
      payload: {
        value: value,
      },
    });

    searchUser(data).then((result) => {
      let newResult = result;

      const shownIndex = newResult.findIndex((found) => found.id === user.id);

      if (shownIndex !== -1) {
        newResult.splice(shownIndex, 1);
      }

      dispatchSearch({
        type: "result",
        payload: {
          result: newResult,
        },
      });
    });
  };

  return (
    <Modal show={modal} onHide={openModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавяне на приятел</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Покана към</Form.Label>
            <Form.Control readOnly value={invitedUserData} />
          </Form.Group>
          <Form.Label>Потребител</Form.Label>
          <Form.Group as={InputGroup}>
            <Form.Control
              type="text"
              placeholder="Име на потребител!"
              onChange={handleInputChange}
              value={input}
            />
            <InputGroup.Append>
              <InputGroup.Text>🔍</InputGroup.Text>
            </InputGroup.Append>
          </Form.Group>
          {userResultShow && input !== "" && doneRequest ? (
            <ListGroup>
              {userResult.length > 0 ? (
                userResult.map((item, index) => {
                  let userImage;
                  if (!item["userImg"]) {
                    userImage = noProfilePic;
                  } else {
                    userImage = BASE_URL + "uploads/" + item["userImg"];
                  }

                  if (item["id"] !== user.id) {
                    return (
                      <ListGroup.Item
                        key={index}
                        style={{ border: "1px solid lightgray" }}
                        onClick={() => handleUserChosen(item)}
                      >
                        <Image
                          src={userImage}
                          height="40"
                          width="40"
                          roundedCircle
                          className="mr-2"
                        />
                        <p className="d-inline" style={{ lineHeight: "40px" }}>
                          {item["firstName"] + " " + item["lastName"] + " "}
                        </p>
                        <small className="text-muted">
                          {"@" + item["username"]}
                        </small>
                        {item["isActive"] ? (
                          <p
                            title="Активен"
                            className="float-right m-0"
                            style={{ lineHeight: "40px" }}
                          >
                            🟢
                          </p>
                        ) : (
                          <p
                            title="Неактивен"
                            className="float-right m-0"
                            style={{ lineHeight: "40px" }}
                          >
                            🔴
                          </p>
                        )}
                      </ListGroup.Item>
                    );
                  }
                })
              ) : (
                <div className="text-center">Няма намерени резултати</div>
              )}
            </ListGroup>
          ) : null}
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Поканеният е дете"
              checked={invitedIsChild}
              onChange={() =>
                setInvitedIsChild((previousIsChild) => !previousIsChild)
              }
            />
            {invitationError ? (
              <Form.Text style={{ color: "#a30d08" }}>
                {invitationError}
              </Form.Text>
            ) : null}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={openModal}>
          Затваряне
        </Button>
        <Button variant="primary" onClick={handleInviteButton}>
          Изпращане
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
/**
 * The component responsible for showing the user friends list.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function UserFriends() {
  var isMounted = true;

  const [modal, openModal] = useState(false);

  const [friends, dispatchFriends] = useReducer(
    shownDataReducer,
    initialFriends
  );

  const { shownData, data, page, itemsPerPage, load, sorts } = friends;

  useEffect(() => {
    if (load) {
      getUserFriends().then((result) => {
        if (isMounted) {
          dispatchFriends({
            type: "setshown",
            payload: {
              result: result.json,
            },
          });
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePageClick = (index) => {
    dispatchFriends({
      type: "pageclick",
      payload: {
        data: index,
      },
    });
  };

  const handleDeleteButton = (id) => {
    removeFriend(id).then((result) => {
      if (result.status === 200) {
        console.log("qko");
      }
    });
  };

  if (load) {
    return null;
  }

  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h2 className="text-center m-3 d-inline">Моите приятели</h2>
        <FontAwesomeIcon
          className="add-friend-icon"
          icon={faPlusCircle}
          title="Добавяне на приятел!"
          onClick={() => openModal((prevModal) => !prevModal)}
        />
      </div>
      <SortingHeadings
        isChildSort={() =>
          dispatchFriends({
            type: "sort",
            sort: "number",
            sortingFieldName: "isChild",
          })
        }
        isActiveSort={() =>
          dispatchFriends({
            type: "sort",
            sort: "number",
            sortingFieldName: "friend_isActive",
          })
        }
        dateSort={() =>
          dispatchFriends({
            type: "sort",
            sort: "date",
            sortingFieldName: "friend_lastSeen",
          })
        }
        nameSort={() =>
          dispatchFriends({
            type: "sort",
            sort: "string",
            sortingFieldName: "friend_firstName",
          })
        }
      />
      <Container fluid={true} className="friends-list-wrap">
        {shownData.length > 0 ? (
          <Row className="shown-list">
            {shownData.map((item, index) => (
              <Col
                key={index}
                md="12"
                className={index % 2 ? "friends-wrap even" : "friends-wrap odd"}
              >
                <div className="friend-info">
                  <div className="friend-info-wrap">
                    <div className="info-content">
                      <p>
                        {item["friend_firstName"] +
                          " " +
                          item["friend_lastName"]}
                      </p>
                    </div>
                    <div className="info-content">
                      <p>
                        {dateFormat(
                          new Date(item["friend_lastSeen"]),
                          "dd/mm/yy"
                        )}
                      </p>
                    </div>
                    <div className="info-content">
                      {item["friend_isActive"] ? (
                        <p title="Активен">🟢</p>
                      ) : (
                        <p title="Неактивен">🔴</p>
                      )}
                    </div>
                    <div className="info-content">
                      <p>
                        {item["isChild"] === 2
                          ? "Родител"
                          : item["isChild"] === 1
                          ? "Дете"
                          : "Приятел"}
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-invitations-message-box">
            <h4>Нямате добавени приятели</h4>
          </div>
        )}
      </Container>
      {data.length > itemsPerPage ? (
        <MyPagination
          handlePageClick={handlePageClick}
          pageCount={data.length / itemsPerPage}
        />
      ) : null}
      <InviteModal
        openModal={() => openModal((prevModal) => !prevModal)}
        modal={modal}
      />
    </>
  );
}

const initialFriends = {
  shownData: [],
  data: [],
  page: 1,
  itemsPerPage: 10,
  load: true,
  sorts: {
    date: null,
    friend_firstName: null,
    friend_isActive: null,
    isChild: null,
  },
};

const initialSearchResult = {
  userResult: [],
  userResultShow: false,
  input: "",
  invitedUser: "",
  invitedUserIsChild: false,
  doneRequest: false,
  invitedUserData: "",
};

/* Exporting the component. */
export default UserFriends;
