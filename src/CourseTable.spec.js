import React from 'react';
import { shallow, mount } from 'enzyme';
import CourseTable from './CourseTable';
import CourseList from './data/CourseList';
import App from './App';

const props = {
  courses: CourseList,
  registered: jest.fn(() => true),
};

it('renders a table', () => {
  const component = shallow(<CourseTable { ...props }/>);
  expect(component.find('.table').length).toBe(1);
});

it('renders a table heading row and a row for each course', () => {
  const component = shallow(<CourseTable { ...props }/>);
  expect(component.find('tr').length).toEqual(props.courses.length + 1);
});

it('renders a course row in the body colour if the user is not registered on that course', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => false),
  };

  const component = shallow(<CourseTable { ...props }/>);
  expect(component.find('tr').at(2).hasClass('registered')).toBe(false);
});

it('renders a course row in a different colour if the user is registered on that course', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
  };

  const component = shallow(<CourseTable { ...props }/>);
  expect(component.find('tr').at(2).hasClass('registered')).toBe(true);
});

it('does not display a message if the user is not registered on that course', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => false),
  };

  const component = shallow(<CourseTable { ...props }/>);
  expect(component.find('.course-table-registered').length).toEqual(0);
});

it('displays a message if the user is registered on that course', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
  };

  const component = shallow(<CourseTable { ...props }/>);
  expect(component.find('.course-table-registered').length).toEqual(3);
});

it('calls handleChange when a table course row is clicked', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    handleChange: jest.fn(),
  };

  const component = shallow(<CourseTable { ...props }/>);

  component.find('tr').at(2).simulate('click');
  expect(props.handleChange).toHaveBeenCalledWith(CourseList[1].title);
})
