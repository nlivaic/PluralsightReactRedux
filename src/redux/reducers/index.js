import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import course from "./courseSingleReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  course,
});

export default rootReducer;
