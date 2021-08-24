/* Imports */
import React, { useEffect, useReducer, useState } from "react";
import {
  createTask,
  getGroupByName,
  getUserFriends,
  getUserInGroup,
  getUsersInGroup,
  searchUser,
  sendGroupInvitation,
  updateGroup,
  deleteGroup,
  leaveGroup,
  kickFromGroup,
  givePermission,
  reducePermission,
} from "app/assets/js/config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import noGroupImg from "app/assets/images/question-mark.png";
import { BASE_URL, formatDate } from "app/assets/js/config/helper";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons/faPencilAlt";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faDownload,
  faPlus,
  faTasks,
  faUserPlus,
  faTimesCircle,
  faUserTimes,
  faUser,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faCrown,
  faQuestionCircle,
  faSignOutAlt,
  faCommentDots,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import noProfilePic from "app/assets/images/no-profile.png";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bg from "date-fns/locale/bg";
import { useParams, useHistory } from "react-router-dom";
import groupPageReducer from "../reducers/group";
import searchReducer from "../reducers/search";
import modalReducer from "../reducers/modal";
import { BASE_PATH } from "../config/helper";
import ReactTooltip from "react-tooltip";
import markerReducer from "../reducers/markers";
import firebase from "../config/fcm";
/* Imports */

registerLocale("bg", bg);

const GroupChat = ({ fullName, groupName, visible, messages }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    var element = document.getElementById("message-list");
    element.scrollTop = element.scrollHeight;
  }, [visible]);

  const handleInputChange = (event) => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await firebase.database().ref(`group-chats/${groupName}`).push({
        content: input,
        time: Date.now(),
        sender: fullName,
      });
    } catch (error) {
      console.log(error);
    }

    setInput("");
  };

  return (
    <div className="group-chat" style={{ display: visible ? "block" : "none" }}>
      <div className="group-chat-heading">Чатът на група {groupName}</div>
      <Container
        fluid
        style={{ display: "flex", flexDirection: "row-reverse" }}
      >
        <Row className="group-chat-messages" id="message-list">
          {messages.map((item, index) => (
            <Col key={index} md="12" className="message-wrap">
              <div>
                {item.sender != fullName ? (
                  <p className="message-sender">{item.sender}</p>
                ) : null}
                <div
                  className={`message ${
                    item.sender == fullName ? "user" : "friend"
                  }`}
                >
                  <p>{item.content}</p>
                </div>

                <div
                  className="message-date"
                  style={{ float: item.sender != fullName ? "left" : "right" }}
                >
                  {formatDate(item.time)}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Form
        onSubmit={handleSubmit}
        style={{ width: "100%", position: "absolute", bottom: "0" }}
      >
        <Form.Group
          controlId="formBasicEmail"
          style={{ width: "80%", display: "inline" }}
        >
          <Form.Control
            style={{
              width: "80%",
              display: "inline",
              border: "2px solid #333",
            }}
            type="text"
            placeholder="Съобщение!"
            onChange={handleInputChange}
            value={input}
          />
        </Form.Group>
        <Button
          title="Изпрати!"
          className="submit-button"
          type="submit"
          value="submit"
          style={{ width: "20%", display: "inline", marginBottom: "4px" }}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Form>
    </div>
  );
};

/**
 * The component responsible for showing group page.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function GroupPage(props) {
  var isMounted = true;
  var markerCount = 1;

  var { user } = props;
  let params = useParams();
  let history = useHistory();

  const [state, dispatchState] = useReducer(groupPageReducer, initialState);
  const [search, dispatchSearch] = useReducer(
    searchReducer,
    initialSearchResult
  );
  const [visible, dispatchVisible] = useReducer(
    modalReducer,
    initialVisibility
  );

  const [showChat, setShowChat] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [messages, setMessages] = useState([]);
  const [markers, dispatchMarkers] = useReducer(markerReducer, {});

  const toggleMap = (event) => {
    var mapDiv = document.getElementById("map");
    var map;

    if (event.target.checked) {
      map = window.initMap(mapDiv);
      setShowMap(event.target.checked);
    } else {
      map = null;

      dispatchMarkers({
        type: "clear",
      });

      setShowMap(event.target.checked);
      return;
    }

    var marker = new google.maps.Marker({
      position: { lat: 42.610229, lng: 23.032141 },
      map: map,
      draggable: true,
      title: "Помести ме!",
      label: markerCount.toString(),
    });

    google.maps.event.addListener(marker, "rightclick", function () {
      marker.setMap(null);
      dispatchMarkers({
        type: "remove",
        marker: {
          label: marker.getLabel(),
        },
      });
    });

    google.maps.event.addListener(marker, "dragend", function () {
      dispatchMarkers({
        type: "add",
        marker: {
          label: marker.getLabel(),
          lat: marker.getPosition().lat(),
          lng: marker.getPosition().lng(),
        },
      });
    });

    google.maps.event.addListener(map, "click", function (event) {
      var newMarker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        label: (markerCount + 1).toString(),
        draggable: true,
      });

      markerCount++;

      google.maps.event.addListener(newMarker, "dragend", function () {
        dispatchMarkers({
          type: "add",
          marker: {
            label: newMarker.getLabel(),
            lat: newMarker.getPosition().lat(),
            lng: newMarker.getPosition().lng(),
          },
        });
      });

      dispatchMarkers({
        type: "add",
        marker: {
          label: newMarker.getLabel(),
          lat: newMarker.getPosition().lat(),
          lng: newMarker.getPosition().lng(),
        },
      });

      google.maps.event.addListener(newMarker, "rightclick", function () {
        dispatchMarkers({
          type: "remove",
          marker: {
            label: newMarker.getLabel(),
          },
        });
        newMarker.setMap(null);
      });
    });

    dispatchMarkers({
      type: "add",
      marker: {
        label: marker.getLabel(),
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      },
    });
  };

  const {
    load,
    groupId,
    groupInfo,
    updateInfo,
    groupImgName,
    userMembership,
    groupMemberships,
    friendsOptions,
    taskInfo,
    errors,
  } = state;

  const {
    userResult,
    userResultShow,
    input,
    doneRequest,
    invitedUser,
    invitedUserData,
  } = search;

  const {
    groupMembershipsShow,
    updateModal,
    inviteModal,
    addTaskModal,
  } = visible;

  useEffect(() => {
    if (load) {
      loadGroupData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * The method loads the group data by the group name given in the url.
   */
  const loadGroupData = () => {
    // Make a request with the group name given in the url.
    getGroupByName(params.groupName).then((result) => {
      if (isMounted) {
        /*
         * If there is no such group with this name,
         * redirect the user to the page with his groups.
         *
         * Otherwise change the component state and load the other data.
         */
        if (!result.json) {
          history.push(`${BASE_PATH}platform/groups`);
        } else {
          dispatchState({
            type: "setgroup",
            payload: {
              result: result.json,
            },
          });
        }

        getUserMembership(result.json.id);
        loadGroupMembers(result.json.id);
        loadUserFriends();

        try {
          firebase
            .database()
            .ref(`group-chats/${params.groupName}`)
            .on("value", (snap) => {
              let chats = [];

              snap.forEach((snap) => {
                console.log(snap.val());
                chats.push(snap.val());
              });
              setMessages(chats);
            });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  /**
   * The method handles the loading of the group memberships.
   *
   * If the user is not part of the group, redirect the user to the page with his groups.
   */
  const loadGroupMembers = (id) => {
    getUsersInGroup(id).then((result) => {
      if (result.status === 400) {
        history.push(`${BASE_PATH}platform/groups`);
      } else {
        dispatchState({
          type: "loadmembers",
          payload: {
            result: result.json,
          },
        });
      }
    });
  };

  /**
   * The method loads the user's friends, shown in the modal used for inviting them
   */
  const loadUserFriends = () => {
    getUserFriends().then((result) => {
      dispatchState({
        type: "loadfriends",
        payload: {
          result: result.json,
        },
      });
    });
  };

  /**
   * The method loads the membership of the user in the group and
   * sets the state property to the json response.
   *
   * If the user is not part of the group or the group is not found,
   * redirect the user to the page with his groups.
   */
  const getUserMembership = (id) => {
    getUserInGroup(id).then((result) => {
      if (result.status === 400 || result.status === 404) {
        history.push(`${BASE_PATH}platform/groups`);
        // window.location.replace(BASE_URL + "platform/groups");
      } else {
        dispatchState({
          type: "setusermembership",
          payload: {
            result: result.json,
          },
        });
      }
    });
  };

  const handleUpdateInputChange = (event) => {
    event.preventDefault();

    dispatchState({
      type: "updateinput",
      fieldName: event.currentTarget.name,
      payload: event.currentTarget.value,
    });
  };

  const handleTaskInputChange = (event) => {
    event.preventDefault();

    dispatchState({
      type: "taskinput",
      fieldName: event.currentTarget.name,
      payload: event.currentTarget.value,
    });
  };

  const handleImageChange = (event) => {
    event.preventDefault();

    dispatchState({
      type: "image",
      fieldName: event.currentTarget.name,
      payload: event.currentTarget.files[0],
    });
  };

  const handleDeleteButton = () => {
    let confirmText =
      " Сигурни ли сте, че искате да изтриете групата? \n Всички настоящи задачи в групата ще бъдат ИЗТРИТИ!";

    if (confirm(confirmText) == true) {
      deleteGroup(groupId).then(() => {
        history.push(`${BASE_PATH}platform/groups`);
        // window.location.replace(BASE_URL + "platform/groups");
      });
    }
  };

  const handleLeaveButton = () => {
    let confirmText =
      " Сигурни ли сте, че искате да напуснете групата? \n Всички ваши задачи в групата ще бъдат ИЗТРИТИ!";

    if (confirm(confirmText) == true) {
      leaveGroup(groupId).then(() => {
        history.push(`${BASE_PATH}platform/groups`);
        // window.location.replace(BASE_URL + "platform/groups");
      });
    }
  };

  const handleDateChange = (date) => {
    dispatchState({
      type: "setexpiring",
      date: date,
    });
  };

  const handleAppointeeChosen = (event) => {
    dispatchState({
      type: "appoint",
      appointee: event.currentTarget.value,
    });
  };

  const handleSearchInputChange = (event) => {
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

      const shownIndex = newResult.findIndex((memb) => memb.id === user.id);

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

  const handleUserChosenByOptions = (event) => {
    let value = event.target.value;

    let values = value.split("|");

    dispatchSearch({
      type: "setinvited",
      payload: {
        user: {
          firstName: values[1],
          lastName: values[2],
          id: values[0],
        },
      },
    });
  };

  const handleUserChosenByList = (value) => {
    let values = value.split("|");

    dispatchSearch({
      type: "setinvited",
      payload: {
        user: {
          firstName: values[1],
          lastName: values[2],
          id: values[0],
        },
      },
    });
  };

  const handleUpdateButton = (event) => {
    event.preventDefault();

    if (!updateCanBeSubmitted()) {
      return;
    }

    const data = new FormData();

    data.append("group_name", updateInfo.groupName.trim());
    data.append("group_description", updateInfo.groupDescription.trim());
    data.append("group_img", updateInfo.groupImg);

    updateGroup(groupId, data).then((result) => {
      if (result.status === 200) {
        let groupImg;

        if (result.json.group.groupImg === "") {
          groupImg = noGroupImg;
        } else {
          groupImg = `${BASE_URL}uploads/${result.json.group.groupImg}`;
        }

        history.push(`${BASE_PATH}platform/group/${updateInfo.groupName}`);

        dispatchState({
          type: "updategroup",
          payload: {
            groupImg: groupImg,
          },
        });

        dispatchVisible({
          modal: "updateModal",
        });
      }

      if (result.status === 400) {
        let errors = result.json.error;

        dispatchState({
          type: "error",
          payload: errors,
        });
      }

      if (result.status === 401) {
        window.location.replace(BASE_URL);
      }
    });
  };

  const handleInviteButton = (event) => {
    event.preventDefault();
    const data = new FormData();

    data.append("invited_id", invitedUser);
    data.append("group_id", groupId);

    sendGroupInvitation(data).then((result) => {
      if (result.status === 200) {
        window.location.reload();
      }

      if (result.status === 400) {
        dispatchState({
          type: "error",
          payload: result.json.error,
        });
      }

      if (result.status === 401) {
        window.location.replace(BASE_URL);
      }
    });
  };

  const handleGivePermissionButton = (id) => {
    givePermission(id).then((result) => {
      if (result.status === 200) {
        dispatchState({
          type: "changememberlist",
          payload: {
            newEl: result.json.membership,
          },
        });
      }
    });
  };

  const handleReducePermissionButton = (id) => {
    reducePermission(id).then((result) => {
      if (result.status == 200) {
        dispatchState({
          type: "changememberlist",
          payload: {
            newEl: result.json.membership,
          },
        });
      }
    });
  };

  const handleKickOutButton = (id) => {
    kickFromGroup(id).then((result) => {
      if (result.status == 200) {
        dispatchState({
          type: "deletemember",
          payload: {
            id: id,
          },
        });
      }
    });
  };

  const updateCanBeSubmitted = () => {
    dispatchState({
      type: "validateupdate",
      payload: {
        groupDescription: updateInfo.groupDescription,
        groupName: updateInfo.groupName,
      },
    });

    const isDisabled = Object.keys(errors.update).some((x) => errors.update[x]);

    return !isDisabled;
  };

  const addTaskCanBeSubmitted = () => {
    dispatchState({
      type: "validatetask",
      payload: {
        taskDescription: taskInfo.taskDescription,
        taskName: taskInfo.taskName,
        expiringOn: taskInfo.expiringOn,
        appointeeId: taskInfo.appointeeId,
      },
    });

    const isDisabled = Object.keys(errors.task).some((x) => errors.task[x]);

    return !isDisabled;
  };

  const handleAddTaskButton = (event) => {
    event.preventDefault();

    if (!addTaskCanBeSubmitted() || !taskInfo.appointeeId) {
      console.log("zdr");
      return;
    }

    const data = new FormData();

    data.append("task_name", taskInfo.taskName.trim());
    data.append("task_description", taskInfo.taskDescription.trim());
    data.append("appointee_id", taskInfo.appointeeId);
    data.append("expiring_on", formatDate(taskInfo.expiringOn.toString()));
    data.append("group_id", groupId);

    createTask(data).then((result) => {
      if (result.status === 200) {
        if (showMap && Object.keys(markers).length) {
          navigator.sendBeacon(
            `${BASE_URL}api/tasks/markers/${result.json.id}`,
            JSON.stringify(markers)
          );
        }

        window.location.reload();
      }

      if (result.status === 400) {
        let errors = result.json.error;

        dispatchState({
          type: "error",
          payload: errors,
        });

        // dispatchVisible({
        //   modal: "addTaskModal",
        // });
      }

      if (result.status === 401) {
        window.location.replace(BASE_URL);
      }
    });
  };

  const toggleVisibility = (modal) => {
    dispatchVisible({
      modal: modal,
    });
  };

  if (load) {
    return null;
  }

  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h2 className="text-center m-3 d-inline">Група</h2>
        {userMembership && userMembership["authLevel"] ? (
          <>
            <FontAwesomeIcon
              className="update-group-icon"
              icon={faPencilAlt}
              title="Редактиране на група!"
              onClick={() => toggleVisibility("updateModal")}
            />
            <FontAwesomeIcon
              className="delete-group-icon"
              icon={faTimesCircle}
              title="Изтриване на група!"
              onClick={handleDeleteButton}
            />
          </>
        ) : null}
        <FontAwesomeIcon
          className="delete-group-icon"
          icon={faSignOutAlt}
          title="Напускане на група!"
          onClick={handleLeaveButton}
        />
      </div>
      <Container fluid={true} className="group-wrap">
        <Row className="group-info-row">
          <Col md="5">
            <Image
              src={groupInfo.groupImg}
              className="title-image"
              roundedCircle
            />
          </Col>
          <Col md="7">
            <h4>{groupInfo.groupName}</h4>
            <p className="group-page-description">
              {groupInfo.groupDescription}
            </p>
          </Col>
        </Row>
        <div className="group-members-heading">
          <p className="text-center mt-3 ml-2 d-inline">Членове</p>
          <p
            className="text-center d-inline section-arrow"
            onClick={() => toggleVisibility("groupMembershipsShow")}
          >
            ▾
          </p>
          {userMembership && userMembership["authLevel"] ? (
            <>
              <FontAwesomeIcon
                className="add-member-icon"
                icon={faUserPlus}
                title="Покана за членство в групата!"
                onClick={() => toggleVisibility("inviteModal")}
              />
            </>
          ) : null}

          <hr />
        </div>
        <Collapse in={groupMembershipsShow}>
          <div id="group-members">
            {groupMemberships.length > 0
              ? groupMemberships.map((item, index) => (
                  <div key={index} className="group-member">
                    <p className="d-inline mr-2">
                      {item["authLevel"] ? (
                        <FontAwesomeIcon
                          className="auth-user-crown-icon"
                          icon={faCrown}
                          title="С права!"
                        />
                      ) : null}
                      {item["user_firstName"] + " " + item["user_lastName"]}
                    </p>
                    {userMembership && userMembership["authLevel"] ? (
                      <>
                        <span
                          className="fa-layers fa-fw add-task-icon"
                          title="Добавяне на задача!"
                          onClick={() => toggleVisibility("addTaskModal")}
                        >
                          <FontAwesomeIcon icon={faTasks} />
                          <FontAwesomeIcon
                            icon={faPlus}
                            transform="shrink-8 up-9 right-11"
                          />
                        </span>
                        {userMembership["id"] != item["id"] ? (
                          <>
                            <span
                              className="fa-layers fa-fw give-permission-icon"
                              title="Даване на права!"
                              onClick={() =>
                                handleGivePermissionButton(item["id"])
                              }
                            >
                              <FontAwesomeIcon icon={faUser} />
                              <FontAwesomeIcon
                                icon={faAngleDoubleUp}
                                transform="shrink-8 up-9 right-11"
                              />
                            </span>
                            <span
                              className="fa-layers fa-fw reduce-permission-icon"
                              title="Премахване на права!"
                              onClick={() =>
                                handleReducePermissionButton(item["id"])
                              }
                            >
                              <FontAwesomeIcon icon={faUser} />
                              <FontAwesomeIcon
                                icon={faAngleDoubleDown}
                                transform="shrink-8 up-9 right-11"
                              />
                            </span>
                            <FontAwesomeIcon
                              className="reduce-permission-icon"
                              icon={faUserTimes}
                              title="Изритване от групата!"
                              onClick={() => handleKickOutButton(item["id"])}
                            />
                          </>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        </Collapse>
        <div
          title="Чат на групата!"
          className="chat-button"
          onClick={() => setShowChat((prevShow) => !prevShow)}
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </div>
        <GroupChat
          fullName={user.firstName + " " + user.lastName}
          groupName={groupInfo.groupName}
          visible={showChat}
          messages={messages}
        />
      </Container>
      <Modal
        show={updateModal}
        scrollable
        onHide={() => toggleVisibility("updateModal")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактиране на група</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Име на група</Form.Label>
              <Form.Control
                type="text"
                placeholder="Име на група!"
                onChange={handleUpdateInputChange}
                value={updateInfo.groupName}
                name="groupName"
              />
              {errors.update.groupName ? (
                <Form.Text style={{ color: "#a30d08" }}>
                  {errors.update.groupName}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Описание на група</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Описание на група!"
                onChange={handleUpdateInputChange}
                value={updateInfo.groupDescription}
                name="groupDescription"
              />
              {errors.update.groupDescription ? (
                <Form.Text style={{ color: "#a30d08" }}>
                  {errors.update.groupDescription}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="file-upload">
              <Form.Label className="custom-file-upload">
                <FontAwesomeIcon
                  style={{ marginRight: "5px" }}
                  icon={faDownload}
                  size={"lg"}
                />
                Снимка на групата
              </Form.Label>
              <Form.Label>{groupImgName ? groupImgName : null}</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="groupImg"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => toggleVisibility("updateModal")}
          >
            Затваряне
          </Button>
          <Button variant="primary" onClick={handleUpdateButton}>
            Редактиране
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={inviteModal}
        scrollable
        onHide={() => toggleVisibility("inviteModal")}
      >
        <Modal.Header closeButton>
          <Modal.Title>Покана за членство в {groupInfo.groupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Покана към</Form.Label>
              <Form.Control readOnly value={invitedUserData} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Покани приятел</Form.Label>
              <Form.Control as="select" onChange={handleUserChosenByOptions}>
                <option>Избери приятел...</option>
                {friendsOptions.map((item, index) => (
                  <option
                    key={index}
                    value={
                      item["friend_id"] +
                      "|" +
                      item["friend_firstName"] +
                      "|" +
                      item["friend_lastName"]
                    }
                  >
                    {item["friend_firstName"] +
                      " " +
                      item["friend_lastName"] +
                      " "}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Label>Или покани потребител</Form.Label>
            <Form.Group as={InputGroup}>
              <Form.Control
                type="text"
                placeholder="Име на потребител!"
                onChange={handleSearchInputChange}
                value={input}
              />
              <InputGroup.Append>
                <InputGroup.Text>🔍</InputGroup.Text>
              </InputGroup.Append>
            </Form.Group>
            {userResultShow && input && doneRequest ? (
              <ListGroup>
                {userResult.length > 0 ? (
                  userResult.map((item, index) => {
                    let userImage;
                    if (!item["userImg"]) {
                      userImage = noProfilePic;
                    } else {
                      userImage = BASE_URL + "uploads/" + item["userImg"];
                    }

                    if (item["id"] !== userMembership["user_id"]) {
                      return (
                        <ListGroup.Item
                          key={index}
                          name="hiiii"
                          onClick={() =>
                            handleUserChosenByList(
                              item["id"] +
                                "|" +
                                item["firstName"] +
                                "|" +
                                item["lastName"]
                            )
                          }
                        >
                          <Image
                            src={userImage}
                            height="40"
                            width="40"
                            roundedCircle
                            className="mr-2"
                          />
                          {item["firstName"] + " " + item["lastName"] + " "}
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
            <Form.Group>
              {errors.error ? (
                <Form.Text style={{ color: "#a30d08" }}>
                  {errors.error}
                </Form.Text>
              ) : null}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => toggleVisibility("inviteModal")}
          >
            Затваряне
          </Button>
          <Button variant="primary" onClick={handleInviteButton}>
            Покани
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={addTaskModal}
        onHide={() => {
          toggleVisibility("addTaskModal");
          setShowMap(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Добавяне на задача</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Име на задача</Form.Label>
              <Form.Control
                type="text"
                placeholder="Име на задача!"
                onChange={handleTaskInputChange}
                value={taskInfo.taskName}
                name="taskName"
              />
              {errors.task.taskName ? (
                <Form.Text style={{ color: "#a30d08" }}>
                  {errors.task.taskName}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Описание на задача</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="Описание на задача!"
                onChange={handleTaskInputChange}
                value={taskInfo.taskDescription}
                name="taskDescription"
              />
              {errors.task.taskDescription ? (
                <Form.Text style={{ color: "#a30d08" }}>
                  {errors.task.taskDescription}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column md="12">
                Краен срок на задача
              </Form.Label>
              <Col md="12">
                <Form.Control
                  as={DatePicker}
                  className="form-label"
                  onChange={handleDateChange}
                  minDate={new Date()}
                  timeIntervals={1}
                  timeFormat="HH:mm"
                  showTimeSelect
                  selected={taskInfo.expiringOn}
                  locale="bg"
                  placeholderText="Въведете краен срок на задачата!"
                  dateFormat="dd/MM/yyyy HH:mm"
                />
              </Col>
              {errors.task.expiringOn ? (
                <Form.Text style={{ color: "#a30d08", marginLeft: "15px" }}>
                  {errors.task.expiringOn}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Задай на</Form.Label>
              <Form.Control as="select" onChange={handleAppointeeChosen}>
                <option value={""}>Избери член на групата...</option>
                {groupMemberships.map((item, index) => (
                  <option key={index} value={item["user_id"]}>
                    {item["user_firstName"] + " " + item["user_lastName"] + " "}
                  </option>
                ))}
              </Form.Control>
              {errors.task.appointeeId ? (
                <Form.Text style={{ color: "#a30d08" }}>
                  {errors.task.appointeeId}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={showMap}
                label="Искам да добавя местоположение!"
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
                <span>Може да добавите маркери,</span>
                <br />
                <span>които да подскажат къде задачата</span>
                <br />
                <span>може да бъде изпълнена!</span>
              </ReactTooltip>
            </Form.Group>
            <Collapse in={showMap}>
              <div id="fade-map">
                <div
                  id="map"
                  style={{
                    width: "100%",
                    height: "400px",
                    marginTop: "12px",
                  }}
                />
              </div>
            </Collapse>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              toggleVisibility("addTaskModal");
              setShowMap(false);
            }}
          >
            Затваряне
          </Button>
          <Button variant="primary" onClick={handleAddTaskButton}>
            Добавяне
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const initialSearchResult = {
  userResult: [],
  userResultShow: false,
  input: "",
  doneRequest: false,
  invitedUser: "",
  invitedUserData: "",
};

const initialState = {
  load: true,
  groupId: null,
  groupInfo: {
    groupName: "",
    groupDescription: "",
    groupImg: "",
  },
  updateInfo: {
    groupName: "",
    groupDescription: "",
    groupImg: "",
  },
  groupImgName: "",
  userMembership: null,
  groupMemberships: [],
  friendsOptions: [],
  taskInfo: {
    taskName: "",
    taskDescription: "",
    appointeeId: "",
    expiringOn: null,
  },
  errors: {
    task: {
      taskName: null,
      taskDescription: null,
      expiringOn: null,
      appointeeId: null,
    },
    update: {
      groupName: null,
      groupDescription: null,
    },
    error: null,
  },
};

const initialVisibility = {
  groupMembershipsShow: true,
  updateModal: false,
  inviteModal: false,
  addTaskModal: false,
  showMap: false,
};

export default GroupPage;
