/* Imports */
import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  useHistory,
} from "react-router-dom";
import UserAccount from "app/assets/js/components/userAccount";
import SideNavigation from "app/assets/js/components/sideNavigation";
import InvitationsPage from "app/assets/js/components/invitationsPage";
import UserGroups from "app/assets/js/components/userGroups";
import UserFriends from "app/assets/js/components/userFriends";
import ChangePassword from "app/assets/js/components/changePassword";
import GroupPage from "app/assets/js/components/groupPage";
import UserTasks from "app/assets/js/components/userTasks";
import { useStore } from "react-redux";
import "app/assets/css/footer.css";
import "app/assets/css/home.css";
import "app/assets/css/notification.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_PATH } from "../config/helper";
/* Imports */

/**
 * The component responsible for showing the platform page.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */
function Home() {
  let history = useHistory();
  let store = useStore();
  let state = store.getState();
  let { path, url } = useRouteMatch();

  const {
    userReducer: { user, load },
    sideBarReducer: { sideBar, icon },
  } = state;

  /**
   * The method is invoked immediately after the component is mounted.
   *
   * Checks if there is an user logged in and if there is not, redirect him to the index page
   */
  useEffect(() => {
    if (!user && !load) {
      history.replace(`${BASE_PATH}`);
    }
  }, [user, load]);

  return (
    <Router>
      <div id="home-wrapper">
        <SideNavigation class={sideBar} />
        <div className={"content " + sideBar}>
          <Switch>
            <Route exact path={`${path}`}>
              <Redirect to={`${path}/home`} />
            </Route>
            <Route exact path={`${path}/home`}>
              <UserAccount user={user} />
            </Route>
            <Route exact path={`${path}/user-invitations/sent`}>
              <InvitationsPage />
            </Route>
            <Route exact path={`${path}/group-invitations/sent`}>
              <InvitationsPage />
            </Route>
            <Route exact path={`${path}/group-invitations/pending`}>
              <InvitationsPage />
            </Route>
            <Route exact path={`${path}/user-invitations/pending`}>
              <InvitationsPage />
            </Route>
            <Route exact path={`${path}/groups`}>
              <UserGroups />
            </Route>
            <Route exact path={`${path}/friends`}>
              <UserFriends user={user} />
            </Route>
            <Route exact path={`${path}/change-pass`}>
              <ChangePassword />
            </Route>
            <Route exact path={`${path}/group/:groupName`}>
              <GroupPage user={user} />
            </Route>
            <Route exact path={`${path}/tasks/sent`}>
              <UserTasks />
            </Route>
            <Route exact path={`${path}/tasks/pending`}>
              <UserTasks />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

/* Exporting the component. */
export default Home;
