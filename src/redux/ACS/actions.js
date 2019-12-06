import { GET_ID, SET_ACS_ID, SET_ACS_NAME } from "./types";

export const getACSId = () => ({
  type: GET_ID
});

export const setACSId = id => ({
  type: SET_ACS_ID,
  payload: id
});

export const setACSName = name => ({
  type: SET_ACS_NAME,
  payload: name
});
