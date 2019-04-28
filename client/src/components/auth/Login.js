import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup2 from "../common/TextFieldGroup2";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/feed");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="dark-overlay landing-inner text-light">
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="custom-form col-xl-4 col-lg-5 col-md-6  col-sm-8 col-xs-8 col-10 m-auto">
                <div
                  className="card card-header aqua-gradient"
                  style={{ border: "none", marginTop: "-75px" }}
                >
                  <h1 className="text-center text-white login-text">Log In</h1>
                </div>
                <p
                  className="text-center card-text"
                  style={{ marginTop: "50px" }}
                >
                  Sign in to your devLookup account
                </p>
                <form onSubmit={this.onSubmit} autoComplete={false}>
                  <TextFieldGroup2
                    placeholder="Email Address"
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
                  <input
                    type="submit"
                    value="Let me In"
                    className="btn btn-rounded blue-gradient btn-block mt-4 mb-4"
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
                <p className="card-text text-center small">Or login with</p>
                <div className="icon-container">
                  <a
                    href="http://localhost:8080/auth/github"
                    title="Github"
                    className="github-icon-link"
                  >
                    <div className="github icon" />
                  </a>
                  <a
                    href="http://localhost:8080/auth/google"
                    titlt="Google"
                    className="google-icon-link"
                  >
                    <div className="google icon" />
                  </a>
                </div>
                <br />
                <p className="small text-center" style={{ marginBottom: -40 }}>
                  <Link className="text-white" to="/register">
                    Create an account
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
