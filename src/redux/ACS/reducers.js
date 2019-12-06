import { GET_ID, SET_ACS_ID, SET_ACS_NAME } from "./types";

const initalState = { id: null, name: null };

const taskReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ID:
      return { ...state };
    case SET_ACS_ID:
      return {
        ...state,
        id: action.payload
      };
    case SET_ACS_NAME:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
};

export default taskReducer;
