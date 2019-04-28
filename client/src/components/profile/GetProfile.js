import React from "react";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { getProfileByHandle } from "../../actions/profileActions";
import { connect } from "react-redux";

class GetProfile extends React.Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile !== null) {
      this.props.history.push(`/profile/${this.props.match.params.handle}`);
    }
  }

  render() {
    return <Spinner />;
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(withRouter(GetProfile));
