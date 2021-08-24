/* Imports */
import React, { useState, useEffect } from "react";
// import "app/assets/css/home.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";
import Nav from "react-bootstrap/Nav";
import {
  faHome,
  faEnvelope,
  faUserFriends,
  faUsers,
  faTasks,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_PATH } from "app/assets/js/config/helper";
import { useStore } from "react-redux";
/* Imports */

/**
 * The component responsible for showing the side navigation bar.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function SideNavigation() {
  const [open, setOpen] = useState(true);
  let store = useStore();
  let state = store.getState();

  const {
    sideBarReducer: { sideBar },
  } = state;

  return (
    <div className={`sidenav ${sideBar}`}>
      <Nav defaultActiveKey={`${BASE_PATH}/home`} className="flex-column">
        <NavLink
          className="menu-item nav-link"
          activeClassName="menu-link"
          to={`${BASE_PATH}platform/home`}
        >
          <FontAwesomeIcon icon={faHome} className="menu-icons" />
          Начало
        </NavLink>
        <Nav.Link
          className="menu-item nav-link dropdown"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          aria-controls="collapse-menu"
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={faEnvelope} className="menu-icons" />
          Покани
        </Nav.Link>
        <Collapse in={open}>
          <div id="collapse-menu">
            <NavLink
              className="menu-item nav-link"
              activeClassName="menu-sublink"
              to={`${BASE_PATH}platform/user-invitations/sent`}
              isActive={(match, location) => {
                const active = (link) => location.pathname.includes(link);
                return [
                  "/platform/user-invitations/sent",
                  "/platform/user-invitations/pending",
                ].some(active);
              }}
            >
              Потребители
            </NavLink>
            <NavLink
              className="menu-item nav-link"
              activeClassName="menu-sublink"
              to={`${BASE_PATH}platform/group-invitations/sent`}
              isActive={(match, location) => {
                const active = (link) => location.pathname.includes(link);
                return [
                  "/platform/group-invitations/sent",
                  "/platform/group-invitations/pending",
                ].some(active);
              }}
            >
              Групи
            </NavLink>
            <hr />
          </div>
        </Collapse>
        <NavLink
          className="menu-item nav-link"
          activeClassName="menu-link"
          to={`${BASE_PATH}platform/friends`}
        >
          <FontAwesomeIcon icon={faUserFriends} className="menu-icons" />
          Приятели
        </NavLink>
        <NavLink
          className="menu-item nav-link"
          activeClassName="menu-link"
          to={`${BASE_PATH}platform/groups`}
          isActive={(match, location) => {
            const active = (link) => location.pathname.includes(link);
            return ["/platform/groups", "/platform/group/"].some(active);
          }}
        >
          <FontAwesomeIcon icon={faUsers} className="menu-icons" />
          Групи
        </NavLink>
        <NavLink
          className="menu-item nav-link"
          activeClassName="menu-link"
          to={`${BASE_PATH}platform/tasks/sent`}
          isActive={(match, location) => {
            const active = (link) => location.pathname.includes(link);
            return ["/platform/tasks/sent", "/platform/tasks/pending"].some(
              active
            );
          }}
        >
          <FontAwesomeIcon icon={faTasks} className="menu-icons" />
          Задачи
        </NavLink>
      </Nav>
    </div>
  );
}
/* Exporting the component. */
export default SideNavigation;
