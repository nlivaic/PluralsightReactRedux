import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

const CourseForm = ({
  course,
  authors,
  errors,
  isSaving,
  onSubmit,
  onInputChange,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        {errors.onSave && (
          <div className="alert alert-danger" role="alert">
            {errors.onSave}
          </div>
        )}
        <TextInput
          id="title"
          name="title"
          onInputChange={onInputChange}
          label="Title"
          value={course.title}
          error={errors.title}
        />
        <label htmlFor="author">Author</label>
        <div className="field">
          <select
            id="author"
            onChange={onInputChange}
            name="authorId"
            className="form-control"
            value={course.authorId || ""}
          >
            <option value=""></option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
          {errors.author && (
            <div className="alert alert-danger">{errors.author}</div>
          )}
        </div>
        <TextInput
          id="category"
          name="category"
          onInputChange={onInputChange}
          label="Category"
          value={course.category}
          error={errors.category}
        />
        <button
          disabled={isSaving}
          className={isSaving ? "btn-secondary" : "btn-primary"}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default CourseForm;
