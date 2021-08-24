/* Imports */
import React, { useReducer, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  acceptGroupInvitation,
  acceptUserInvitation,
  getPendingGroupInvitations,
  getPendingUserInvitations,
  rejectGroupInvitation,
  rejectUserInvitation,
} from "app/assets/js/config/api";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons/faBan";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { BASE_URL, changeShownList } from "app/assets/js/config/helper";
import noProfilePic from "app/assets/images/no-profile.png";
import Image from "react-bootstrap/Image";
import { MyPagination } from "app/assets/js/config/reusable";
import shownDataReducer from "../reducers/shownData";
import { useRouteMatch } from "react-router-dom";
/* Imports */

const InvitationItem = ({ item, index, accept, reject, isGroup }) => {
  let invitationImg;

  if (!item["inviter_userImg"]) {
    invitationImg = noProfilePic;
  } else {
    invitationImg = BASE_URL + "uploads/" + item["inviter_userImg"];
  }

  return (
    <Col
      md="12"
      className={index % 2 ? "invitation-wrap even" : "invitation-wrap odd"}
    >
      <div className="invitation-target">
        <Image roundedCircle src={invitationImg} height="35" width="35" />
        <p className="invitation-description">
          Покана от {item["inviter_firstName"] + " " + item["inviter_lastName"]}
          {isGroup
            ? " за членство в група" + " " + item["groupName"]
            : " за добавяне като " +
              (item["isChild"] === 1 ? "дете" : "приятел")}
        </p>
      </div>
      <div className="invitation-action">
        <FontAwesomeIcon
          style={{ color: "green" }}
          icon={faCheck}
          title="Приемане!"
          onClick={accept}
        />
        <FontAwesomeIcon
          style={{ color: "red", marginLeft: "10px" }}
          title="Отказване!"
          icon={faBan}
          onClick={reject}
        />
      </div>
    </Col>
  );
};
/**
 * The component responsible for showing the list of pending invitations.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function PendingInvitationsList() {
  var isMounted = true;
  let { path } = useRouteMatch();
  const [state, dispatch] = useReducer(shownDataReducer, initialState);

  const { data, shownData, load, page, itemsPerPage, isGroup } = state;

  useEffect(() => {
    if (state.load) {
      if (path.includes("user-invitations")) {
        getPendingUserInvitations().then((result) => {
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
        getPendingGroupInvitations().then((result) => {
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
   * Method handling the accept invitation button.
   *
   * Checks the type of invitation and sends a request according to it.
   *
   * @param id
   */
  const acceptInvitation = (id) => {
    if (state.isGroup) {
      acceptGroupInvitation(id).then((result) => {
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
      acceptUserInvitation(id).then((result) => {
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
   * Method handling the reject invitation button.
   *
   * Checks the type of invitation and sends a request according to it.
   *
   * @param id
   */
  const rejectInvitation = (id) => {
    if (state.isGroup) {
      rejectGroupInvitation(id).then((result) => {
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
      rejectUserInvitation(id).then((result) => {
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
                accept={() => acceptInvitation(item["id"])}
                reject={() => rejectInvitation(item["id"])}
                isGroup={isGroup}
              />
            ))}
          </Row>
        ) : (
          <div className="no-invitations-message-box">
            <h4>Нямате получени покани</h4>
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
export default PendingInvitationsList;
