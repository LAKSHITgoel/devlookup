import React, { Component } from "react";
import Cropper from "react-cropper";
import { MDBBtn } from "mdbreact";
import "./cropper.css";
import "./style.css";
import axios from "axios";
import { connect } from "react-redux";
import { updateProfileImage } from "../../actions/profileActions";
import setAuthToken from "../../utils/setAuthToken";
import Toast from "../toast/Toast";
import Compress from "compress.js";

let compress = new Compress();

class MyCropper extends Component {
  state = {
    progress: 0,
    imgURL: ""
  };
  _crop = () => {
    const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
    return dataUrl;
    // this.props.handleDataURL(dataUrl);
  };

  dataURItoBlob = dataURI => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  };

  // Extract an Base64 Image's File Extension
  extractImageFileExtensionFromBase64 = base64Data => {
    return base64Data.substring(
      "data:image/".length,
      base64Data.indexOf(";base64")
    );
  };

  onSave = async () => {
    let dataURL = this._crop();
    this.setState({ dataURL });
    let ext = await this.extractImageFileExtensionFromBase64(dataURL);
    let image = await this.dataURItoBlob(dataURL);
    let compressedfile = await compress.compress([image], {
      size: 0.5,
      quality: 1,
      maxWidth: 200,
      maxHeight: 200
    });
    const img1 = compressedfile[0];
    const base64str = img1.data;
    const imgExt = img1.ext;
    const file = Compress.convertBase64ToFile(base64str, imgExt);
    let uploadConfig = await axios.get(`api/services/avatar?filetype=${ext}`);

    // for cloning and deleting auth header from axios config
    // ========================================
    // let crossDomain = axios;
    // delete crossDomain.defaults.headers.common["Authorization"];
    setAuthToken(false);
    let res = await axios.put(uploadConfig.data.url, file, {
      headers: {
        "Content-Type": `image/${ext}`
      },
      onUploadProgress: progressEvent => {
        let progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        if (progress === 100) this.setState({ progress: 0 });
        else this.setState(() => ({ progress }));
      }
    });
    console.log(res);

    if (res.status == 200) {
      setAuthToken(localStorage.getItem("jwtToken"));
      this.setState(() => ({
        imgURL: `${uploadConfig.data.baseURL}${uploadConfig.data.key}`
      }));
      this.props.updateProfileImage(this.state.imgURL);
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <div className="image-cropper">
        <Cropper
          style={{ maxHeight: "500px" }}
          ref="cropper"
          aspectRatio={1}
          autoCropArea={1}
          src={this.props.imgURL}
          dragMode={"move"}
          viewMode={1}
        />
        <br />
        <div className="modal-footer">
          {this.state.progress != 0 && <Toast />}
          <MDBBtn outline rounded onClick={this.onSave} color="primary ">
            Upload
          </MDBBtn>
          <MDBBtn outline rounded onClick={this.props.toggleModal}>Cancel</MDBBtn>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { updateProfileImage }
)(MyCropper);
