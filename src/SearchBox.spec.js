import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';
import CourseList from './data/CourseList';

it('calls handleChange when an option is selected', () => {
  const props = {
    courses: CourseList,
    handleChange: jest.fn()
  }

  const component = shallow(<SearchBox {...props} />);
  component.find('select').simulate('change')
  expect(props.handleChange).toHaveBeenCalled();
})

