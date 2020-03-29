import React from 'react';
import { shallow, mount } from 'enzyme';
import SingleCourse from '../SingleCourse';
import CourseList from '../data/CourseList';

const props = {
  courses: CourseList,
  course: {
    title: 'Management',
    description: 'A Management Course',
    cost: '£200',
    type: 'Classroom',
    maxSeats: '10',
    learners:[
      { name: 'Tara Woods', email: 'bsmith@gmail.com' },
    ]
  },
  registered: jest.fn(() => true)
}

it('renders a single course', () => {
  const component = shallow(<SingleCourse {...props} />);
  expect(component.find('.single-course').length).toBe(1);
});
