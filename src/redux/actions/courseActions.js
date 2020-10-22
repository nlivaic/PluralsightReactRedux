import * as actionTypes from "./actionTypes";
import * as coursesApi from "../../api/courseApi";

export function createCourse(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}

function loadCoursesSuccess(courses) {
  return { type: actionTypes.LOAD_COURSES_SUCCESS, courses };
}

export function loadCourses() {
  return (dispatch) =>
    coursesApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
}

export function loadCourseBySlug(slug) {
  return (dispatch) => {
    return coursesApi
      .getCourseBySlug(slug)
      .then((course) => {
        dispatch(loadCourseBySlugSuccess(course));
      })
      .catch((error) => {
        throw error;
      });
  };
}

function loadCourseBySlugSuccess(course) {
  return { type: actionTypes.LOAD_COURSE_SUCCESS, course };
}

export function clearCourse() {
  return { type: actionTypes.CLEAR_COURSE };
}

export function saveCourse(course) {
  return (dispatch) => {
    return coursesApi
      .saveCourse(course)
      .then(() =>
        !course.id
          ? dispatch(createCourseSuccess(course))
          : dispatch(updateCourseSuccess(course))
      );
  };
}

function updateCourseSuccess(course) {
  return { type: actionTypes.UPDATE_COURSE_SUCCESS, course };
}

function createCourseSuccess(course) {
  return { type: actionTypes.CREATE_COURSE_SUCCESS, course };
}
