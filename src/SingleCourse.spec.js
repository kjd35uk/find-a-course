import React from 'react';
import { shallow, mount } from 'enzyme';
import SingleCourse from './SingleCourse';
import CourseList from './data/CourseList';
import RegistrationForm from './RegistrationForm';

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

it('displays the course heading', () => {
  const component = shallow(<SingleCourse {...props} />);
  expect(component.find('.single-course__name').length).toBe(1);
});

it('displays a message if the user is registered on that course', () => {
  const props = {
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
    registered: jest.fn(() => true),
  };

  const component = shallow(<SingleCourse { ...props }/>);
  expect(component.find('.single-course__registered').length).toBe(1);
});

it('displays a deregister button if the user is registered on that course', () => {
  const props = {
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
    registered: jest.fn(() => true),
  };

  const component = shallow(<SingleCourse { ...props }/>);
  expect(component.find('button').length).toBe(1);
  expect(component.find('button').props().children).toEqual('Deregister');
});

it('does not display a deregister button if the user is not registered on that course', () => {
  const props = {
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
    registered: jest.fn(() => false),
  };

  const component = shallow(<SingleCourse { ...props }/>);
  expect(component.find('button').length).toBe(0);
});

it('displays a registration form if the user is not registered on that course', () => {
  const props = {
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
    registered: jest.fn(() => false),
    availability: jest.fn(),
  };

  const component = mount(<SingleCourse { ...props }/>);
  expect(component.find(RegistrationForm).length).toBe(1);
});

it('does not display a registration form if the user is already registered on that course', () => {
  const props = {
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
    registered: jest.fn(() => true),
    availability: jest.fn(),
  };

  const component = mount(<SingleCourse { ...props }/>);
  expect(component.find(RegistrationForm).length).toBe(0);
});
