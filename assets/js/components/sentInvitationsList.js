/* Imports */
import React, { useReducer, useEffect, useState } from "react";
// import "app/assets/css/home.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  deleteGroupInvitation,
  deleteUserInvitation,
  getSentGroupInvitations,
  getSentUserInvitations,
} from "app/assets/js/config/api";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons/faTimesCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_URL, changeShownList } from "app/assets/js/config/helper";
import noProfilePic from "app/assets/images/no-profile.png";
import Image from "react-bootstrap/Image";
import { MyPagination } from "../config/reusable";
import shownDataReducer from "../reducers/shownData";
import { useRouteMatch } from "react-router-dom";
/* Imports */

const InvitationItem = ({ item, index, del, isGroup }) => {
  let invitationImg;

  if (!item["invited_userImg"]) {
    invitationImg = noProfilePic;
  } else {
    invitationImg = BASE_URL + "uploads/" + item["invited_userImg"];
  }

  return (
    <Col
      key={index}
      md="12"
      className={index % 2 ? "invitation-wrap even" : "invitation-wrap odd"}
    >
      <div className="invitation-target">
        <Image roundedCircle src={invitationImg} height="35" width="35" />
        <p className="invitation-description">
          Покана към{" "}
          {item["invited_firstName"] + " " + item["invited_lastName"]}
          {isGroup
            ? " за членство в група " + item["groupName"]
            : " за добавяне като " +
              (item["isChild"] === 1 ? "дете" : "приятел")}
        </p>
      </div>
      <div className="invitation-action">
        <FontAwesomeIcon
          style={{ color: "red" }}
          icon={faTimesCircle}
          title="Изтриване!"
          onClick={del}
        />
      </div>
    </Col>
  );
};

/**
 * The component responsible for showing the list of sent invitations.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function SentInvitationsList() {
  var isMounted = true;
  let { path } = useRouteMatch();
  const [state, dispatch] = useReducer(shownDataReducer, initialState);

  const { data, shownData, load, page, itemsPerPage, isGroup } = state;

  useEffect(() => {
    if (load) {
      if (path.includes("user-invitations")) {
        getSentUserInvitations().then((result) => {
          if (isMounted) {
            dispatch({
              type: "setshown",
              payload: {
                isGroup: false,
                result: result.json,
              },
            });
          }
        });
      } else if (path.includes("group-invitations")) {
        getSentGroupInvitations().then((result) => {
          if (isMounted) {
            dispatch({
              type: "setshown",
              payload: {
                isGroup: true,
                result: result.json,
              },
            });
          }
        });
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);
  /**
   * Handles the deletion of invitation on button click.
   *
   * @param id
   */
  const deleteInvitation = (id) => {
    if (state.isGroup) {
      deleteGroupInvitation(id).then((result) => {
        if (result === 200) {
          dispatch({
            type: "changeshown",
            payload: {
              id: id,
            },
          });
        }
      });
    } else {
      deleteUserInvitation(id).then((result) => {
        if (result === 200) {
          dispatch({
            type: "changeshown",
            payload: {
              id: id,
            },
          });
        }
      });
    }
  };

  /**
   * Method handling the change of pages.
   *
   * @param data
   */
  const handlePageClick = (index) => {
    dispatch({
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
      <Container fluid={true} className="invitation-list-wrap">
        {shownData.length > 0 ? (
          <Row className="shown-list">
            {shownData.map((item, index) => (
              <InvitationItem
                key={index}
                item={item}
                index={index}
                del={() => deleteInvitation(item["id"])}
                isGroup={isGroup}
              />
            ))}
          </Row>
        ) : (
          <div className="no-invitations-message-box">
            <h4>Нямате изпратени покани</h4>
          </div>
        )}
      </Container>
      {data.length > itemsPerPage ? (
        <MyPagination
          handlePageClick={handlePageClick}
          pageCount={data.length / itemsPerPage}
        />
      ) : null}
    </>
  );
}

const initialState = {
  data: [],
  shownData: [],
  load: true,
  page: 1,
  itemsPerPage: 10,
  isGroup: false,
};

/* Exporting the component. */
export default SentInvitationsList;
