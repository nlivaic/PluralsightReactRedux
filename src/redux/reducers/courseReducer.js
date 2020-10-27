import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;
    case actionTypes.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.id);
    default:
      return state;
  }
}
