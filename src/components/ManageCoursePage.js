import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import * as authorActions from "../redux/actions/authorActions";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bindActionCreators } from "redux";
import * as courseApi from "../api/courseApi";
import { PropTypes } from "prop-types";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({});
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (props.match.params.slug) {
      props.courseActions
        .loadCourseBySlug(props.match.params.slug)
        .catch((error) => alert("Loading course failed: " + error));
    }
    props.authorActions
      .loadAuthors()
      .catch((error) => alert("Loading authors failed: " + error));

    return () => {
      props.courseActions.clearCourse();
    };
    // eslint-disable-next-line
  }, []);

  if (!course.id && !!props.course.id) {
    setCourse({ ...props.course });
  }

  if (authors.length === 0 && props.authors.length > 0) {
    setAuthors([...props.authors]);
  }

  const handleInputChange = ({ target }) => {
    setCourse({ ...course, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      courseApi.saveCourse(course).then(() => {
        props.history.push("/courses");
        toast.success("Course saved!");
      });
    }
  };

  const isFormValid = () => {
    let _errors = {};
    if (course.title === "") _errors.title = "Title must not be null.";
    if (course.authorId === null) _errors.author = "Author must not be null.";
    if (course.category === "") _errors.category = "Category must not be null.";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  };

  return (
    <>
      <h2>Manage Course</h2>
      <span>{course.title}</span>
      <CourseForm
        course={course}
        authors={props.authors}
        errors={errors}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    course: state.course,
    authors: state.authors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    courseActions: bindActionCreators(courseActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch),
  };
};

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courseActions: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
