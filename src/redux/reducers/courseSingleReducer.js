import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function courseSingleReducer(
  state = initialState.course,
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_COURSE_SUCCESS:
      return action.course;
    case actionTypes.CLEAR_COURSE:
      return {};
    default:
      return state;
  }
}
