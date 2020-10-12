import React, { useEffect, useState } from "react";
import { getCourses } from "../api/courseApi";
import CoursesList from "./CoursesList";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  // Due to [] as second argument, will run only on mount.
  useEffect(() => {
    getCourses().then((_courses) => {
      setCourses(_courses);
    });
  }, []);

  return (
    <>
      <CoursesList courses={courses} />
    </>
  );
};

export default CoursesPage;
