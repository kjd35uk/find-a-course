import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    learner: {
      firstName: '',
      lastName: '',
      email: ''
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target
    this.setState({ learner: { ...this.state.learner, [name]: value} });
  }

  render() {
    const user = `${this.state.learner.firstName} ${this.state.learner.lastName}`
    return (
      <div className="login-form">
        <form onSubmit={(e) => this.props.handleLogin(e, user)}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="First Name" name="firstName" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="Last Name" name="lastName" required onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="text" className="form-control" placeholder="Email address" name="email" required onChange={this.handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
