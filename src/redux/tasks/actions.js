import { GET_ID, SET_TASK_ID, SET_TASK_NAME } from "./types";

export const getTaskId = () => ({
  type: GET_ID
});

export const setTaskId = id => ({
  type: SET_TASK_ID,
  payload: id
});

export const setTaskName = name => ({
  type: SET_TASK_NAME,
  payload: name
});
