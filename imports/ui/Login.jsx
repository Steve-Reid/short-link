import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      error: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view_box">
          <h1>Short Lnk</h1>

          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit} noValidate className="boxed-view_form">
            <input type="email" ref={(c) => { this.email = c; }} name="email" placeholder="Email" />
            <input type="password" ref={(c) => { this.password = c; }} name="password" placeholder="Password" />
            <button className="button">Login</button>
          </form>

          <Link to="/signup">Create an account?</Link>
        </div>
      </div>
    );
  }
}
