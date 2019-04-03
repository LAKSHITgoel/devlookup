import React from "react";
import "./avatar.css";
import { connect } from "react-redux";
import axios from "axios";
import { updateProfileImage } from "../../actions/profileActions";
import {LoaderBar} from "../image-loader";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDesktop: false,
      imgURL: null,
      uploadStatus: null,
      progress:0
    };
  }

  show = () => this.setState({ showDesktop: true });
  hide = () => this.setState({ showDesktop: false });
  handleFileUpload = async e => {
    e.persist();
    let filetype = e.target.files[0].type.split("/")[1];

    let uploadConfig = await axios.get(`api/profile/dp?filetype=${filetype}`);
    // for cloning and deleting auth header from axios config
    //========================================
    let crossDomain = axios;
    delete crossDomain.defaults.headers.common["Authorization"];
    let res = await crossDomain.put(uploadConfig.data.url, e.target.files[0], {
      headers: {
        "Content-Type": e.target.files[0].type
      },
      onUploadProgress: progressEvent => {
        let progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        this.setState(() => ({ progress }));
       
      }
    });
    if (res.status == 200) {
      this.setState(() => ({
        imgURL: `${uploadConfig.data.baseURL}${uploadConfig.data.key}`
      }));
    }
  };

  onSave = async () => {
    this.props.updateProfileImage(this.state.imgURL);
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
         {this.state.progress != 0 && <LoaderBar progress={this.state.progress} />}
        </div>
        <div className="save-container ml-5">
          {this.state.progress == 100 && (
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
