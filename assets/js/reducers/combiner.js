import { combineReducers } from "redux";
import userReducer from "./user";
import sideBarReducer from "./sideBar";

const combinedReducers = combineReducers({
    userReducer: userReducer,
    sideBarReducer: sideBarReducer
});

export default combinedReducers;