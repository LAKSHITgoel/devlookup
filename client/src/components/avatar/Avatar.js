import React from "react";
import "./avatar.css";
import { connect } from "react-redux";
import MyModal from "../model/Model";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDesktop: false,
      showCropModel: false
    };
  }

  handleFileUpload = async e => {
    e.persist();
    // console.log("target",e,e.target.value)

    let reader = new FileReader();
    reader.onload = e => {
      // let imgURL = e.target.result;
      this.setState({ imgURL: e.target.result });
      this.toggleModal();
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  onSave = async () => {
    this.props.updateProfileImage(this.state.imgURL);
  };

  toggleModal = () => {
    this.setState(() => ({ showCropModel: !this.state.showCropModel }));
  };

  render() {
    return (
      <div className="avatar">
        <div className="upload-container">
          <img
            className="rounded-circle big1-avatar"
            src={
              this.state.dataURL == null
                ? this.props.auth.user.avatar
                  ? this.props.auth.user.avatar
                  : "http://www.gravatar.com/avatar/74ae1741bff6a79fbda9a9dad6cf4ef4?s=200&r=pg&d=mm"
                : this.state.dataURL
            }
            alt=""
          />
         
            <div className="rounded-circle">
              <label
                htmlFor="upload-image"
                className="upload-image"
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
        </div>
        
          <MyModal
            header="Resize"
            src={this.state.imgURL}
            showCropModel={this.state.showCropModel}
            toggleModal={this.toggleModal}
          />
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Avatar);
