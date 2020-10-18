import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authorActions from "../redux/actions/authorActions";
import AuthorsList from "./AuthorsList";
import PropTypes from "prop-types";

const AuthorsPage = (props) => {
  useEffect(() => {
    props.authorActions.loadAuthors().catch((error) => {
      alert("Loading errors failed: " + error);
    });
  }, [props.authorActions]);

  return <AuthorsList authors={props.authors} />;
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authorActions: bindActionCreators(authorActions, dispatch),
  };
}

AuthorsList.defaultProps = {
  authors: [],
};

AuthorsList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
