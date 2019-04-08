import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = (
        <div className="col-12" style={{ marginTop: 20 }}>
          <Spinner />
        </div>
      );
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map(profile => (
          <div
            key={profile._id}
            className="col-xl-4 col-lg-5 col-md-6 col-sm-6"
            style={{ marginTop: 20 }}
          >
            <ProfileItem profile={profile} />
          </div>
        ));
      } else {
        profileItems = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <br />
          <br />
          <h1 className="display-4 text-center">Developer Profiles</h1>
          <p className="lead text-center">Browse and connect with developers</p>
          <div className="row">{profileItems}</div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
