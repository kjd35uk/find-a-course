import React from 'react';
import { shallow, mount } from 'enzyme';
import CourseList from './data/CourseList';
import RegistrationForm from './RegistrationForm';

const props = {
  courses: CourseList,
  registered: jest.fn(() => true),
};

it('renders a registration form', () => {

  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(),
  };
  const component = shallow(<RegistrationForm { ...props }/>);
  expect(component.find('.registration-form').length).toBe(1);
});

it('renders a form with three inputs', () => {

  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(),
  };
  const component = shallow(<RegistrationForm { ...props }/>);
  expect(component.find('input').length).toBe(3);
});

it('echoes user input when information is entered into the form fields', () => {
  const props = {
    courses: CourseList,
    availability: jest.fn(() => false),
    handleChange: jest.fn()
  }

  const component = shallow(<RegistrationForm {...props} />);
  component.find('input').first().simulate('change', { target: { name: 'firstName', value: 'Kirstie'}})
  expect(component.state('learner')).toEqual(expect.objectContaining({ firstName: 'Kirstie'}))
})

it('displays an availability message when the course has places', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(() => true),
  };
  const component = shallow(<RegistrationForm { ...props }/>);
  expect(component.find('.registration-form__available').length).toBe(1);
  expect(component.find('.registration-form__not-available').length).toBe(0);

});

it('displays a no availability message when the course is full', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(() => false),
  };
  const component = shallow(<RegistrationForm { ...props }/>);
  expect(component.find('.registration-form__not-available').length).toBe(1);
  expect(component.find('.registration-form__available').length).toBe(0);
  expect(component.find('.registration-form__not-available').props().children).toEqual('This course is full');

});

it('displays a no availability alert if the course is full', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(() => false),
  };
  const component = shallow(<RegistrationForm { ...props }/>);
  component.setState({ messageAvailability: 'This course is full' });
  expect(component.find('.alert-availability').length).toBe(1);
});

it('displays an already registered alert if the user has already registered on the course', () => {
  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(() => false),
  };

  const component = shallow(<RegistrationForm { ...props }/>);
  component.setState({ messageAlreadyRegistered: 'You have already registered' });
  expect(component.find('.alert-registered').length).toBe(1);
});

it('adds the learner to the course if not already registered when the button is clicked', () => {
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
    registered: jest.fn(() => true),
    availability: jest.fn(() => false),
    handleSubmit: jest.fn(),
    addLearner: jest.fn()
  };

  const component = mount(<RegistrationForm { ...props }/>);
  component.setState({
    learner: {
      firstName: 'Kirstie',
      lastName: 'Davidson',
      email: 'kdavidson@gmail'
    }
  })
  component.instance().abletoRegister();
  component.find('button').simulate('submit');
  expect(props.addLearner).toHaveBeenCalledTimes(1);
});

it('does not add the learner to the course if already registered', () => {
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
    registered: jest.fn(() => true),
    availability: jest.fn(() => false),
    handleSubmit: jest.fn(),
    addLearner: jest.fn()
  };

  const component = mount(<RegistrationForm { ...props }/>);
  component.setState({
    learner: {
      firstName: 'Tara',
      lastName: 'Woods',
      email: 'twoods@gmail'
    }
  })
  component.instance().abletoRegister();
  component.find('button').simulate('submit');
  expect(props.addLearner).not.toHaveBeenCalled();
});
