import React, { Component } from "react";
import MyCropper from "../cropper/Cropper";
import { MDBModal, MDBModalBody, MDBModalHeader } from "mdbreact";

export default class MyModal extends Component {
  handleDataURL = dataURL => this.setState({ dataURL });
  render() {
    return (
      <MDBModal
        isOpen={this.props.showCropModel}
        size={"lg"}
        toggle={this.props.toggleModal}
      >
        <MDBModalHeader>{this.props.header}</MDBModalHeader>
        <MDBModalBody>
          <div className="row">
            <div className="col-12">
              <MyCropper
                toggleModal={this.props.toggleModal}
                handleDataURL={this.handleDataURL}
                imgURL={this.props.src}
              />
            </div>
          </div>
        </MDBModalBody>
      </MDBModal>
    );
  }
}
