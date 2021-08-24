/**
 * The file containing constants and functions used throughout the application.
 *
 * @author Slavi Asenov <slavi_asenov2002@abv.bg>
 */

// export const BASE_URL = "http://smartfamily.localhost/";
// export const BASE_URL = "http://localhost/smartfamily/public/";
// export const BASE_PATH = "/smartfamily/public/";

export const BASE_URL = "https://smartfamily.noit.eu/";
export const BASE_PATH = "/";

export function changeShownList(state, id) {
  const newState = state;

  const shownIndex = newState.shownData.findIndex((inv) => inv.id === id);
  const dataIndex = newState.data.findIndex((inv) => inv.id === id);

  if (shownIndex === -1 || dataIndex === -1) return;
  newState.data.splice(dataIndex, 1);

  if (newState.data.length % newState.itemsPerPage === 0 && newState.page > 1) {
    newState.page--;
  }

  let shownFirstIndex = shownDataStartingIndex(
    newState.page,
    newState.itemsPerPage
  );
  newState.shownData = newState.data.slice(
    shownFirstIndex,
    shownFirstIndex + newState.itemsPerPage
  );

  return newState;
}

export function shownDataStartingIndex(page, itemsPerPage) {
  return (page - 1) * itemsPerPage;
}

export function calculateDateDiff(date) {
  let dt1 = new Date();
  let dt2 = new Date(date);

  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

export function formatDate(dateString) {
  let date = new Date(dateString);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  year = year.toString();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    day + "-" + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds
  );
}

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

export function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}
