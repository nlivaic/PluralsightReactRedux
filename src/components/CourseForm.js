import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const CourseForm = (props) => {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <TextInput
          id="title"
          name="title"
          onInputChange={props.onInputChange}
          label="Title"
          value={props.course.title}
          error={props.errors.title}
        />
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            onChange={props.onInputChange}
            name="authorId"
            className="form-control"
            value={props.course.authorId || ""}
          >
            <option value=""></option>
            <option value="1">Cory House</option>
            <option value="2">Scott Allen</option>
          </select>
          {props.errors.author && (
            <div className="alert alert-danger">{props.errors.author}</div>
          )}
        </div>
        <TextInput
          id="category"
          name="category"
          onInputChange={props.onInputChange}
          label="Category"
          value={props.course.category}
          error={props.errors.category}
        />
        <button className="btn-primary">Save</button>
      </form>
    </>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default CourseForm;
