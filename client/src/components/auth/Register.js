import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup2 from "../common/TextFieldGroup2";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="dark-overlay landing-inner text-light">
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="custom-form col-xl-4 col-lg-5 col-md-6  col-sm-8 col-xs-8 col-10 m-auto">
                <div
                  className="card card-header purple-gradient"
                  style={{ border: "none", marginTop: "-75px" }}
                >
                  <h1 className="text-white text-center">Sign Up</h1>
                </div>
                <p
                  className="card-text text-center"
                  style={{ marginTop: "50px" }}
                >
                  Create your devLookup account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup2
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextFieldGroup2
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup2
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup2
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    value="REGISTER"
                    className="btn blue-gradient btn-block mt-4 mb-4"
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                  />
                </form>
                <hr
                  style={{
                    backgroundColor: "#fff",
                    marginLeft: 20,
                    marginRight: 20
                  }}
                />
                <p className="card-text text-center small">Or register with</p>
                <div className="icon-container">
                  <a
                    href="https://devlookup.herokuapp.com/auth/github"
                    title="Github"
                    className="github-icon-link"
                  >
                    <div className="github icon" />
                  </a>
                  <a
                    href="https://devlookup.herokuapp.com/auth/google"
                    title="Google"
                    className="google-icon-link"
                  >
                    <div className="google icon" />
                  </a>
                </div>
                <br />
                <p className="small text-center" style={{ marginBottom: -40 }}>
                  <Link className="text-white" to="/login">
                    I already have an account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
