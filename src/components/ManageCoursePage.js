import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    if (props.match.params.slug) {
      courseApi
        .getCourseBySlug(props.match.params.slug)
        .then((_course) => setCourse(_course));
    }
  }, [props.match.params.slug]);

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
        errors={errors}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
