import React, { useEffect } from "react";
import CoursesList from "./CoursesList";
import * as courseActions from "../redux/actions/courseActions";
import * as authorActions from "../redux/actions/authorActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

const CoursesPage = (props) => {
  // Due to [] as second argument, will run only on mount.
  useEffect(() => {
    //const { courses, courseActions, authorActions } = props;
    if (props.courses.length === 0) {
      props.courseActions.loadCourses().catch((error) => {
        alert("Loading courses failed: " + error);
      });
    }
    if (props.courses.length === 0) {
      props.authorActions.loadAuthors().catch((error) => {
        alert("Loading authors failed: " + error);
      });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <CoursesList courses={props.courses} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              ).name,
            };
          }),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch),
  };
};

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  courseActions: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
