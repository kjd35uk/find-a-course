import React from "react";

const SearchBox = ({ handleChange, courses }) => {

  const options = courses.map(course => course.title);

  return (
    <div className='searchbox-container'>
    <select className='select-button' onChange={ handleChange }>
      <option font='Amatic SC' value="">Select your course here</option>
      { options.map((course, i) => (
        <option key={i} font='Amatic SC' value={ course }>
          { course }
        </option>
      ))}
    </select>
  </div>
  );
}

export default SearchBox;
