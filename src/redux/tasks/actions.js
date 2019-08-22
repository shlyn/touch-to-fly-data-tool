import { GET_ID, SET_TASK_ID } from "./types";

export const getTaskId = () => ({
  type: GET_ID
});

export const setTaskId = id => ({
  type: SET_TASK_ID,
  payload: id
});
