import React, { Fragment } from "react";
import Table from 'react-bootstrap/Table';

const CourseTable = ({ courses, registered, handleChange, user}) => {

  return (
    <Table className='table' striped bordered hover>
    <thead>
      <tr className="table-heading">
        <th>Title</th>
        <th>Description</th>
        <th>Cost</th>
        <th>Type</th>
        <th>Max. Seats</th>
      </tr>
    </thead>
    <tbody>
      { courses.map((course) => (
        <tr
          className={ registered(course, user)? 'registered': '' }
          key={ course.title }
          onClick={() => handleChange(course.title)}
        >
          <td>
            <span>{ course.title }</span>
            { registered(course, user) && (
              <Fragment>
                <br></br>
                <span className="course-table-registered">You are registered on this course</span>
              </Fragment>
            )}
          </td>
          <td>{ course.description }</td>
          <td>{ course.cost }</td>
          <td>{ course.type }</td>
          <td>{ course.maxSeats }</td>
        </tr>
        ))}
    </tbody>
  </Table>
  )}

export default CourseTable;
