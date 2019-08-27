import taskReducer from "./tasks";
import { createStore, combineReducers } from "redux";

export default createStore(taskReducer, {});
