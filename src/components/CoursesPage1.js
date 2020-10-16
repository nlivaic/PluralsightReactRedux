import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

class CoursesPage1 extends Component {
  state = {
    course: {
      title: "",
    },
  };

  handleTitleChange = (event) => {
    var course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            id="title"
            value={this.state.course.title}
            type="text"
            onChange={this.handleTitleChange}
          />
          <input type="submit" value="Save" />
          {this.props.courses.map((course) => (
            <div key={course.title}>{course.title}</div>
          ))}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(courseActions, dispatch),
  };
};

CoursesPage1.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage1);
