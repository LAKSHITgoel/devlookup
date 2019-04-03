import React from "react";
import "./avatar.css";
import { connect } from "react-redux";
import axios from "axios";
import { updateProfileImage } from "../../actions/profileActions";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDesktop: false,
      file: null,
      imgURL: null,
      uploadStatus: null
    };
  }

  show = () => this.setState({ showDesktop: true });
  hide = () => this.setState({ showDesktop: false });
  handleFileUpload = async e => {
    e.persist();
    await this.setState({ file: e.target.files[0] });

    let filetype = e.target.files[0].type.split("/")[1];

    let uploadConfig = await axios.get(`api/profile/dp?filetype=${filetype}`);

    let res = await fetch(uploadConfig.data.url, {
      method: "PUT",
      body: e.target.files[0],
      headers: {
        "Content-Type": "image/*",
        "Access-Control-Allow-Origin": "*"
      }
    });
    if (res.status == 200) {
      this.setState(() => ({
        imgURL: `${uploadConfig.data.baseURL}${uploadConfig.data.key}`
      }));
    }
  };

  onSave = async () => {
    /*let res = await axios.post("/api/profile/update-profile-image", {
      imageURL: this.state.imgURL
    });*/
    this.props.updateProfileImage(this.state.imgURL);
    // console.log(res);
  };

  render() {
    return (
      <div className="avatar">
        <div className="upload-container">
          <img
            className="rounded-circle big1-avatar"
            src={
              this.state.imgURL == null
                ? this.props.auth.user.avatar
                : this.state.imgURL
            }
            alt=""
            onMouseEnter={this.show}
          />
          {this.state.showDesktop && (
            <div className="rounded-circle">
              <label
                htmlFor="upload-image"
                className="upload-image"
                onMouseLeave={this.hide}
              >
                <i className="material-icons addImg-icon">&#xe439;</i>
              </label>
              <input
                name="upload-image"
                id="upload-image"
                className="hide-upload"
                type="file"
                accept="images/*"
                onChange={this.handleFileUpload}
              />
            </div>
          )}
        </div>
        <div className="save-container ml-5">
          {this.state.file != null && (
            <button onClick={this.onSave} className="save-btn btn btn-primary ">
              Save
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateProfileImage }
)(Avatar);
