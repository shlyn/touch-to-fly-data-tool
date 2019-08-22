import taskReducer from "./tasks";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
  task: taskReducer
});

export default createStore(rootReducer, {});
