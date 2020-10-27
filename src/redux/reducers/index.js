import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import course from "./courseSingleReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  course,
  apiCallsInProgress,
});

export default rootReducer;
