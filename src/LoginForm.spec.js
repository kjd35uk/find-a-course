import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './data/CourseList';
import LoginForm from './LoginForm';

it('renders a Login form', () => {

  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(),
  };
  const component = shallow(<LoginForm { ...props }/>);
  expect(component.find('.login-form').length).toBe(1);
});

it('renders a form with three inputs', () => {

  const props = {
    courses: CourseList,
    registered: jest.fn(() => true),
    availability: jest.fn(),
  };
  const component = shallow(<LoginForm { ...props }/>);
  expect(component.find('input').length).toBe(3);
});

it('echoes user input when information is entered into the form fields', () => {
  const props = {
    courses: CourseList,
    availability: jest.fn(() => false),
    handleChange: jest.fn()
  }

  const component = shallow(<LoginForm {...props} />);
  component.find('input').first().simulate('change', { target: { name: 'firstName', value: 'Kirstie'}})
  expect(component.state('learner')).toEqual(expect.objectContaining({ firstName: 'Kirstie'}))
})


it('logs the user in', () => {
  const props = {
    handleLogin: jest.fn()
  }
  const component = shallow(
    <LoginForm { ...props } onSubmit={props.handleLogin} />
  );
  component.find('form').simulate('submit', { preventDefault: () => {} });
  expect(props.handleLogin).toHaveBeenCalled();
});
