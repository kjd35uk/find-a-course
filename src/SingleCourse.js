import React, { Fragment } from "react";
import RegistrationForm from "./RegistrationForm";

const SingleCourse = ({ addLearner, availability, course, courses, registered, removeLearner, user }) => {

  return (
    <div>
    <div className="single-course">
      <h1 className="single-course__name">This is the { course.title } course</h1>
      </div>
      { registered(course, user) ?
      <Fragment>
        <p className="single-course__registered">Good news! You are already registered on this course</p>
        <button onClick={ removeLearner } className="btn btn-primary">
          Deregister
        </button>
      </Fragment>
      :
      <RegistrationForm
        addLearner={ addLearner }
        availability={ availability }
        course={ course }
        courses={ courses }
      />
    }
    </div>
  );
};

export default SingleCourse;
