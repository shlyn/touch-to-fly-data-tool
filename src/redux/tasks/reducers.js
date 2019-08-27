import { GET_ID, SET_TASK_ID } from "./types";

const initalState = { id: null };

const taskReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ID:
      return { ...state };
    case SET_TASK_ID:
      return {
        ...state,
        id: action.payload
      };
    default:
      return state;
  }
};

export default taskReducer;
