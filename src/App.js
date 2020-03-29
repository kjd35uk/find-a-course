import React, { Component, Fragment } from "react";
import "./App.css";
import SearchBox from "./SearchBox";
import CourseTable from "./CourseTable";
import SingleCourse from "./SingleCourse";
import CourseList from './data/CourseList';
import LoginForm from './LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    courses: CourseList,
    user: 'Kirstie Davidson',
    course: '',
  };

  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
          { this.state.user ?
            <Fragment>
              <h1 className="App-title">Course Catalogue</h1>
              <SearchBox
                handleChange={ this.handleChange }
                courses={ this.state.courses }
              />
              { this.state.course ?
                <Fragment>
                  <button className="button" onClick={ this.goHome }>HOME</button>
                  <SingleCourse
                    addLearner={ this.addLearner }
                    availability={ this.availability }
                    course={ this.state.course }
                    courses={ this.state.courses }
                    registered={ this.registered }
                    removeLearner={ this.removeLearner }
                    user={ this.state.user }
                  />
                </Fragment>
              :
                <CourseTable
                  courses={ this.state.courses }
                  handleChange={ this.pickCourse }
                  registered={ this.registered }
                  user={ this.state.user }
                />
              }
            </Fragment>
            :
            <Fragment>
            <LoginForm
              handleLogin={ this.handleLogin }
            />
          </Fragment>
          }
      </div>
    );
  }

  addLearner = (e, learner) => {
    e.preventDefault();
    const newCourses = this.state.courses.map(course => {
      if (course.title === this.state.course.title) {
        course.learners.push(learner)
      }
      return course
    })
    this.setState({ courses: newCourses, course: '' });
  }

  availability = (course) => {
    return course.type === "Online" || course.learners.length < Number(course.maxSeats)
  }

  goHome = () => {
    this.setState({ course: '' })
  }

  handleChange = ({ target: { value } }) => {
    this.pickCourse(value);
  };

  handleLogin = (e, user) => {
    e.preventDefault();
    this.setState({ user: user });
  }

  pickCourse = (title) => {
    const newCourse = title;
    const filteredCourses = this.state.courses.filter(({ title }) => {
      return title === newCourse;
    });

    this.setState({
      course: filteredCourses[0]
    });
  };

  registered = (course, user) => {
    return course.learners.some(e => e.name === user)
  }

  removeLearner = (e) => {
    e.preventDefault();
    const newCourses = this.state.courses.map(course => {
      if (course.title === this.state.course.title) {
        course.learners = course.learners.filter(learner => learner.name !== this.state.user)
      }
      return course
    })
    this.setState({ courses: newCourses, course: '' });
  }
}

export default App;
