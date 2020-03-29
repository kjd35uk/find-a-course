import React, { Component } from "react";

class RegistrationForm extends Component {
  state = {
    messageAvailability: '',
    messageAlreadyRegistered: '',
    course: '',
    learner: {
      firstName: '',
      lastName: '',
      email: ''
    }
  };

  componentDidMount() {
    const { course } = this.props;
    if (!this.props.availability(course)) {
      this.setState({ messageAvailability: 'Unfortunately you can\'t register at the moment because this course is full' })
    }
  }

  abletoRegister = () => {
    const { learner } = this.state;
    const { course } = this.props
    const name = `${learner.firstName} ${learner.lastName}`
    const email = learner.email

    return !course.learners.some(e => e.name === name || e.email === email);
  }

  handleFormInput = ({ target }) => {
    const { name, value } = target
    this.setState({ learner: { ...this.state.learner, [name]: value} });
  }

  handleSubmit = e => {
    const { learner } = this.state;
    const { course, addLearner } = this.props
    const name = `${learner.firstName} ${learner.lastName}`
    const email = learner.email
    if (course.learners.some(e => e.name === name || e.email === email)) {
      this.setState({ messageAlreadyRegistered: 'You have already registered for this course' })
    }
    if (this.abletoRegister()) {
      addLearner(e, {
        name: name,
        email: email
      })
    }
    e.preventDefault();
  }

  render() {
    const { course }= this.props
    return (
      <div className="registration-form">
        <div className="registration-form__availability">
        <span >current availability: </span>
        { this.props.availability(course) ?
          <span className="registration-form__available">There are places available on this course</span> :
          <span className="registration-form__not-available">This course is full</span>
        }
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="First Name" name="firstName" required onChange={this.handleFormInput} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" required onChange={this.handleFormInput} />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="text" className="form-control" placeholder="Email address" name="email" required onChange={this.handleFormInput} />
          </div>
          <button disabled={ !this.props.availability(course) } type="submit" className="button">Register</button>
        </form>
        { this.state.messageAvailability &&
          <p className="alert alert-availability" role="alert">
            { this.state.messageAvailability }
          </p>
        }
        { this.state.messageAlreadyRegistered &&
          <p className="alert alert-registered" role="alert">
            { this.state.messageAlreadyRegistered }
          </p>
        }
      </div>
    );
  }
}

export default RegistrationForm;
