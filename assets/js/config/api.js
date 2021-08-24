/**
 * The file responsible for the API calls.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */

import { BASE_URL } from "app/assets/js/config/helper";

export async function changeUserImage(image) {
  const response = await fetch(BASE_URL + "api/user/change-image", {
    method: "POST",
    body: image,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function getUserData(state) {
  const response = await fetch(BASE_URL + "api/user", {
    method: "GET",
  });

  const json = await response.json();
  const status = response.status;

  if (status === 200) {
    state = {
      user: json,
      load: false,
    };
  }

  if (status === 401) {
    state = {
      load: false,
      user: null,
    };
  }

  return state;
}

export async function getSentUserInvitations() {
  const response = await fetch(BASE_URL + "api/user-invitations", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function getPendingUserInvitations() {
  const response = await fetch(BASE_URL + "api/user-invitations/pending", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function getSentGroupInvitations() {
  const response = await fetch(BASE_URL + "api/group-invitations", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function getPendingGroupInvitations() {
  const response = await fetch(BASE_URL + "api/group-invitations/pending", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function sendUserInvitation(data) {
  const response = await fetch(BASE_URL + `api/user-invitations`, {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function deleteUserInvitation(id) {
  const response = await fetch(BASE_URL + `api/user-invitations/${id}`, {
    method: "DELETE",
  });

  return response.status;
}

export async function acceptUserInvitation(id) {
  const response = await fetch(BASE_URL + `api/user-invitations/accept/${id}`, {
    method: "PATCH",
  });

  return response.status;
}

export async function rejectUserInvitation(id) {
  const response = await fetch(BASE_URL + `api/user-invitations/reject/${id}`, {
    method: "PATCH",
  });

  return response.status;
}

export async function deleteGroupInvitation(id) {
  const response = await fetch(BASE_URL + `api/group-invitations/${id}`, {
    method: "DELETE",
  });

  return response.status;
}

export async function acceptGroupInvitation(id) {
  const response = await fetch(
    BASE_URL + `api/group-invitations/accept/${id}`,
    {
      method: "PATCH",
    }
  );

  return response.status;
}

export async function rejectGroupInvitation(id) {
  const response = await fetch(
    BASE_URL + `api/group-invitations/reject/${id}`,
    {
      method: "PATCH",
    }
  );

  return response.status;
}

export async function searchUser(input) {
  const response = await fetch(BASE_URL + "api/user/find", {
    method: "POST",
    body: input,
  });

  return await response.json();
}

export async function getUserFriends() {
  const response = await fetch(BASE_URL + "api/user-relations", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function removeFriend(id) {
  const response = await fetch(BASE_URL + `api/user-relations/{$id}`, {
    method: "DELETE",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function createGroup(data) {
  const response = await fetch(BASE_URL + `api/groups`, {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function updateGroup(id, data) {
  const response = await fetch(BASE_URL + `api/groups/${id}`, {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function deleteGroup(id) {
  const response = await fetch(BASE_URL + `api/groups/${id}`, {
    method: "DELETE",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function getGroupById(id) {
  const response = await fetch(BASE_URL + `api/groups/${id}`, {
    method: "GET",
  });

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function getGroupByName(name) {
  const response = await fetch(BASE_URL + `api/groups/${name}`, {
    method: "GET",
  });

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function leaveGroup(id) {
  const response = await fetch(BASE_URL + `api/group-memberships/leave/${id}`, {
    method: "DELETE",
  });

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function kickFromGroup(id) {
  const response = await fetch(BASE_URL + `api/group-memberships/kick/${id}`, {
    method: "DELETE",
  });

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function givePermission(id) {
  const response = await fetch(
    BASE_URL + `api/group-memberships/give-permission/${id}`,
    {
      method: "PATCH",
    }
  );

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function reducePermission(id) {
  const response = await fetch(
    BASE_URL + `api/group-memberships/reduce-permission/${id}`,
    {
      method: "PATCH",
    }
  );

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function getUserGroups() {
  const response = await fetch(BASE_URL + "api/group-memberships/groups", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function getUsersInGroup(id) {
  const response = await fetch(BASE_URL + `api/group-memberships/users/${id}`, {
    method: "GET",
  });

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function sendGroupInvitation(data) {
  const response = await fetch(BASE_URL + `api/group-invitations`, {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function getUserInGroup(id) {
  const response = await fetch(BASE_URL + `api/group-memberships/${id}`, {
    method: "GET",
  });

  const json = await response.json();
  const status = response.status;
  return {
    status: status,
    json: json,
  };
}

export async function createTask(data) {
  const response = await fetch(BASE_URL + "api/tasks", {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function deleteTask(id) {
  const response = await fetch(BASE_URL + `api/tasks/${id}`, {
    method: "DELETE",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function markTaskAsDone(id) {
  const response = await fetch(BASE_URL + `api/tasks/done/${id}`, {
    method: "PATCH",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function markTaskAsUnfinished(id) {
  const response = await fetch(BASE_URL + `api/tasks/unfinished/${id}`, {
    method: "PATCH",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function getUserTasks() {
  const response = await fetch(BASE_URL + "api/tasks", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function getAppointedUserTasks() {
  const response = await fetch(BASE_URL + "api/tasks/appointed", {
    method: "GET",
  });

  const json = await response.json();

  return {
    load: false,
    json: json,
  };
}

export async function showTask(id) {
  const response = await fetch(BASE_URL + `api/tasks/${id}`, {
    method: "GET",
  });

  const status = response.status;
  let json;

  if (status === 404) {
    json = null;
  } else {
    json = await response.json();
  }

  return {
    status: status,
    json: json,
  };
}

export async function showTasksStatitistics() {
  const response = await fetch(BASE_URL + "api/tasks/statistics", {
    method: "GET",
  });

  const status = response.status;
  const json = await response.json();

  return {
    status: status,
    json: json,
  };
}

export async function warnUserForExpiringTasks() {
  const response = await fetch(BASE_URL + "api/tasks/warn", {
    method: "GET",
  });

  const status = response.status;
  const json = await response.json();

  return {
    status: status,
    json: json,
  };
}

export async function markFCMTokenAsActive(data) {
  const response = await fetch(BASE_URL + "api/fcm/mark", {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function markFCMTokenAsUnactive(data) {
  const response = await fetch(BASE_URL + "api/fcm/unmark", {
    method: "POST",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function removeFCMToken(data) {
  const response = await fetch(BASE_URL + "api/fcm", {
    method: "DELETE",
    body: data,
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function getTaskMarkers(id) {
  const response = await fetch(BASE_URL + `api/tasks/markers/${id}`, {
    method: "GET",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function getUserNotifications() {
  const response = await fetch(BASE_URL + `api/notifications`, {
    method: "GET",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}

export async function readNotification(id) {
  const response = await fetch(BASE_URL + `api/notifications/read${id}`, {
    method: "GET",
  });

  const json = await response.json();
  const status = response.status;

  return {
    status: status,
    json: json,
  };
}
