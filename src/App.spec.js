import React from 'react';
import { shallow, mount } from 'enzyme';
import CourseList from './data/CourseList';
import App from './App';
import CourseTable from './CourseTable';
import LoginForm from './LoginForm';
import SearchBox from './SearchBox';
import SingleCourse from './SingleCourse';

it('renders successfully', () => {
  shallow(<App />);
});

it('displays the login form if the user is not logged in', () => {
  const component = shallow(<App />)
  component.setState({ user: '' })
  expect(component.find(LoginForm).length).toBe(1)
});

it('displays the searchbox if the user is logged in', () => {
  const component = shallow(<App />)
  component.setState({ user: 'Kirstie Davidson' })
  expect(component.find(SearchBox).length).toBe(1)
});

it('displays the course table if a course has not been selected', () => {
  const component = shallow(<App />)
  component.setState({ course: '' })
  expect(component.find(CourseTable).length).toBe(1)
});

it('displays the single course page if a course has been selected', () => {
  const component = shallow(<App />)
  component.setState({ course: 'Law' })
  expect(component.find(SingleCourse).length).toBe(1)
});

it('displays a button to return to the home page if a course has been selected', () => {
  const component = shallow(<App />)
  component.setState({ course: 'Law' })
  const button = component.find('button')
  expect(button.length).toBe(1)
  expect(button.props().children).toEqual('HOME');

  button.simulate('click')
  expect(component.state('course')).toEqual('');
});

describe('availability', () => {
  it('always returns true for online courses', () => {
    const props = {
      course: {
        type: 'Online',
        maxSeats: '2',
        learners:[
          { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
          { name: 'Sara Woods', email: 'swoods@gmail.com' },
        ]
        },
      };

    const component = shallow(<App />)
    expect(component.instance().availability(props.course)).toBe(true)
  });

  it('returns true if the course is not fully subscribed', () => {
    const component = shallow(<App />)
    component.setState({
      course: {
        type: 'Classroom',
        maxSeats: '3',
        learners:[
         { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
         { name: 'Sara Woods', email: 'swoods@gmail.com' },
        ]
      },
    });
    expect(component.instance().availability(component.state('course'))).toBe(true)
  });

  it('returns false if the course is fully subscribed', () => {
    const component = shallow(<App />)
    component.setState({
      course: {
        type: 'Classroom',
        maxSeats: '2',
        learners:[
         { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
         { name: 'Sara Woods', email: 'swoods@gmail.com' },
        ]
      },
    });
    expect(component.instance().availability(component.state('course'))).toBe(false)
  });
});

describe('addLearner', () => {
  it('adds the learner to the course', () => {

    const component = shallow(<App />)
    const learner = { name: 'Fred Davidson', email: 'fred@gmail'}
    const event = { preventDefault: () => {} }

    component.setState({
      courses: CourseList,
      course: {
        title: 'Law',
        type: 'Classroom',
        maxSeats: '2',
        learners:[
         { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
        ]
      },
    })
    component.instance().addLearner(event, learner)
    expect(component.state('courses')[0].learners).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Fred Davidson'
        })
      ])
    )
  });
});

describe('registered', () => {
  it('returns true if the user is registered on the course', () => {
    const component = shallow(<App />)
    component.setState({
      course: {
        type: 'Classroom',
        maxSeats: '3',
        learners:[
         { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
         { name: 'Sara Woods', email: 'swoods@gmail.com' },
        ]
      },
      user: 'Tara Woods'
    });

    const course = component.state('course')
    const user = component.state('user')
    expect(component.instance().registered(course, user)).toBe(true)
  });

  it('returns false if the user is not registered on the course', () => {
    const component = shallow(<App />)
    component.setState({
      course: {
        type: 'Classroom',
        maxSeats: '3',
        learners:[
         { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
         { name: 'Sara Woods', email: 'swoods@gmail.com' },
        ]
      },
      user: 'Bob Jenkins'
    });
    const course = component.state('course')
    const user = component.state('user')
    expect(component.instance().registered(course, user)).toBe(false)
  });
});

describe('removeLearner', () => {
  it('removes the learner from the course', () => {

    const component = shallow(<App />)
    const learner = { name: 'Fred Davidson', email: 'fred@gmail'}
    const event = { preventDefault: () => {} }

    component.setState({
      courses: CourseList,
      course: {
        title: 'Law',
        type: 'Classroom',
        maxSeats: '2',
        learners:[
         { name: 'Tara Woods', email: 'twoodsh@gmail.com' },
         { name: 'Fred Davidson', email: 'fred@gmail' },
        ]
      },
      user: 'Fred Davidson'
    })
    component.instance().removeLearner(event, learner)
    expect(component.state('courses')[0].learners).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Fred Davidson'
        })
      ])
    )
  });
});

describe('pickCourse', () => {
  it('echoes the course selected by the user', () => {
    const component = shallow(<App />)
    const title = 'Law'

    component.instance().pickCourse(title)
    expect(component.state('course')).toEqual(expect.objectContaining({ title: 'Law'}))
  });
});

describe('handleLogin', () => {
  it('mocks log in by saving the user in state', () => {
    const component = shallow(<App />);
    const event = { preventDefault: () => {} };
    const user = 'George Dibbs';

    component.instance().handleLogin(event, user)
    expect(component.state('user')).toEqual('George Dibbs')
  });
});

describe('handleChange', () => {
  it('echoes the input of the user', () => {
    const component = shallow(<App />)
    const event = { target: { value: 'Law'}}

    component.instance().handleChange(event)
    expect(component.state('course')).toEqual(expect.objectContaining({ title: 'Law'}))
  });
});
