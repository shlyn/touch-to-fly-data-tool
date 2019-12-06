import taskReducer from "./tasks";
import ACSReducer from "./ACS";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({ task: taskReducer, ACS: ACSReducer });

export default createStore(rootReducer, {});
