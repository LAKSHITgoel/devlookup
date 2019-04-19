import React, { Component } from "react";
import PropTypes from "prop-types";
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
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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
              <div className="custom-form card col-xl-4 col-lg-4 col-md-6  col-sm-8 col-xs-8 col-10 m-auto">
                <div
                  className="card card-header aqua-gradient"
                  style={{ border: "none",marginTop:"-75px" }}
                >
                  <h1 className="text-center text-white ">Log In</h1>
                </div>
                <p className="text-center card-text" style={{marginTop:"50px"}}>
                  Sign in to your devLookup account
                </p>
                <form onSubmit={this.onSubmit}>
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
                    value="LOG IN"
                    className="btn blue-gradient btn-block mt-4 mb-4"
                    style={{paddingTop:10,paddingBottom:10}}
                  />
                </form>
                <hr style={{backgroundColor:"#fff"}} />
                <p className="card-text text-center small" >Or login with</p>
                <div className="row">
                  <div className="col-6">
                    <a
                      href="http://localhost:8080/auth/github"
                      className="btn"
                      style={{ color: "#fff", backgroundColor: "#000" }}
                    >
                      Github
                    </a>
                  </div>
                  <div className="col-6">
                    <a
                      href="http://localhost:8080/auth/google"
                      className="btn"
                      style={{ color: "#fff", backgroundColor: "#ef4321" }}
                    >
                      Google
                    </a>
                  </div>
                </div>
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
