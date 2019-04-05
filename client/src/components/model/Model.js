import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, Row, Col } from "reactstrap";
import MyCropper from "../cropper/Cropper";

export default class MyModal extends Component {
  handleDataURL = dataURL => this.setState({ dataURL });
  render() {
    return (
      <Modal
        isOpen={this.props.showCropModel}
        size={"lg"}
        toggle={this.props.toggleModal}
      >
        <ModalHeader>{this.props.header}</ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <MyCropper
                toggleModal={this.props.toggleModal}
                handleDataURL={this.handleDataURL}
                imgURL={this.props.src}
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}
