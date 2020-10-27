import * as authorsApi from "../../api/authorApi";
import * as actionTypes from "./actionTypes";
import * as apiStatusActions from "./apiStatusActions";

function loadAuthorsSuccess(authors) {
  return { type: actionTypes.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return (dispatch) => {
    dispatch(apiStatusActions.beginApiCall());
    return authorsApi
      .getAuthors()
      .then((authors) => dispatch(loadAuthorsSuccess(authors)))
      .catch((error) => {
        throw error;
      });
  };
}
