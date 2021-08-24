/* Imports */
import React, { useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import { createGroup, getUserGroups } from "app/assets/js/config/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { BASE_PATH, BASE_URL } from "app/assets/js/config/helper";
import ClampLines from "react-clamp-lines";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavLink, useHistory } from "react-router-dom";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import noGroupImg from "app/assets/images/question-mark.png";
import { MyPagination } from "app/assets/js/config/reusable";
import { useEffect } from "react";
import shownDataReducer from "../reducers/shownData";
import formReducer from "../reducers/form";
/* Imports */

const GroupItem = ({ item, index }) => {
  return (
    <Col
      md="4"
      className="group text-decoration-none"
      title={"Към " + item["groupName"] + "!"}
      as={NavLink}
      to={{
        pathname: `${BASE_PATH}platform/group/${item["groupName"]}`,
        state: {
          groupId: item["id"],
        },
      }}
    >
      <div className="group-list">
        <Image
          src={
            item["groupImg"]
              ? `${BASE_URL}uploads/${item["groupImg"]}`
              : noGroupImg
          }
          width="50"
          height="50"
          style={{
            float: "left",
            marginRight: "10px",
            borderRadius: "30%",
          }}
        />
        <p className="group-list-title">{item["groupName"]}</p>
        <ClampLines
          id={"gr-descr" + index}
          text={item["groupDescription"]}
          lines={3}
          ellipsis="..."
          className="group-list-description"
        />
      </div>
    </Col>
  );
};

const AddGroupModal = ({ modal, openModal }) => {
  let history = useHistory();
  const [form, dispatchForm] = useReducer(formReducer, initialForm);
  const { groupImg, groupImgName, groupName, groupDescription, errors } = form;

  /**
   * Handles the input change in the form for creating the group and
   * validates with the validator service.
   *
   * @param event
   */
  const handleInputChange = (event) => {
    event.preventDefault();

    dispatchForm({
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

    dispatchForm({
      type: "image",
      fieldName: event.currentTarget.name,
      payload: event.currentTarget.files[0],
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
    dispatchForm({
      type: "validate",
      payload: {
        groupDescription: groupDescription.trim(),
        groupName: groupName.trim(),
      },
    });

    const isDisabled = Object.keys(errors).some((el) => errors[el]);

    return !isDisabled;
  };

  /**
   * Handles the button creating the group.
   *
   * Checks if there are errors and displays them to the user.
   * On success reload the page.
   *
   * @param event
   */
  const handleCreateButton = (event) => {
    event.preventDefault();

    if (!canBeSubmitted()) {
      return;
    }

    const data = new FormData();

    data.append("group_name", groupName.trim());
    data.append("group_description", groupDescription.trim());
    data.append("group_img", groupImg);

    createGroup(data).then((result) => {
      if (result.status === 200) {
        // let newState = {
        //   ...groups,
        //   data: [...groups.data, result.json],
        //   shownData: [...groups.data, result.json].slice(
        //     (page - 1) * 15,
        //     (page - 1) * 15 + 15
        //   ),
        // };

        // dispatchForm({
        //   type: "clean",
        //   payload: {
        //     groupName,
        //     groupDescription,
        //     groupImgName,
        //     groupImg,
        //   },
        // });

        history.push(`${BASE_PATH}platform/group/${groupName}`);
      }

      if (result.status === 400) {
        dispatchForm({
          type: "error",
          payload: result.json.error,
        });
      }

      if (result.status === 401) {
        window.location.replace(BASE_URL);
      }
    });
  };

  return (
    <Modal show={modal} onHide={() => openModal((prevModal) => !prevModal)}>
      <Modal.Header closeButton>
        <Modal.Title>Създаване на група</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Име на група</Form.Label>
            <Form.Control
              type="text"
              placeholder="Име на група!"
              onChange={handleInputChange}
              value={groupName}
              name="groupName"
            />
            {errors.groupName ? (
              <Form.Text style={{ color: "#a30d08" }}>
                {errors.groupName}
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Описание на група</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              placeholder="Описание на група!"
              onChange={handleInputChange}
              value={groupDescription}
              name="groupDescription"
            />
            {errors.groupDescription ? (
              <Form.Text style={{ color: "#a30d08" }}>
                {errors.groupDescription}
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
              onChange={handleImageChange}
              name="groupImg"
            />
            <Form.Text>*Снимкате не е задължителна</Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => openModal((prevModal) => !prevModal)}
        >
          Затваряне
        </Button>
        <Button variant="primary" onClick={handleCreateButton}>
          Създаване
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
/**
 * The component responsible for showing the list of user groups.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function UserGroups() {
  var isMounted = true;

  const [modal, openModal] = useState(false);
  const [groups, dispatchGroups] = useReducer(shownDataReducer, initialGroups);

  const { shownData, data, page, itemsPerPage, load } = groups;

  useEffect(() => {
    if (load) {
      getUserGroups().then((result) => {
        if (isMounted) {
          dispatchGroups({
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
    dispatchGroups({
      type: "pageclick",
      payload: {
        data: index,
      },
    });
  };

  if (load) {
    return null;
  }

  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h2 className="text-center m-3 d-inline">Моите групи</h2>
        <FontAwesomeIcon
          className="add-friend-icon"
          icon={faPlusCircle}
          title="Добавяне на група!"
          onClick={() => openModal((prevModal) => !prevModal)}
        />
      </div>
      <Container
        fluid={true}
        className="invitation-list-wrap"
        style={{ marginTop: "15px" }}
      >
        {shownData.length > 0 ? (
          <Row className="shown-list">
            {shownData.map((item, index) => (
              <GroupItem key={index} item={item} index={index} />
            ))}
          </Row>
        ) : (
          <div className="no-invitations-message-box">
            <h4>Не сте член на група</h4>
          </div>
        )}
        {data.length > itemsPerPage ? (
          <MyPagination
            handlePageClick={handlePageClick}
            pageCount={data.length / itemsPerPage}
          />
        ) : null}
      </Container>
      <AddGroupModal
        modal={modal}
        openModal={() => openModal((prev) => !prev)}
      />
    </>
  );
}

const initialGroups = {
  data: [],
  shownData: [],
  load: true,
  openModal: false,
  page: 1,
  itemsPerPage: 15,
};

const initialForm = {
  groupImg: null,
  groupImgName: "",
  groupName: "",
  groupDescription: "",
  errors: {
    groupName: null,
    groupDescription: null,
  },
};
/* Exporting the component. */
export default UserGroups;
