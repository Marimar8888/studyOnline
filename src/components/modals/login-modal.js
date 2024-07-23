import React, { Component } from "react";
import ReactModal from "react-modal";

import Login from "../auth/login";

ReactModal.setAppElement(".app-wrapper");

export default class LoginModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "540px"
            },
            overlay: {
              backgroundColor: "rgba(1, 1, 1, 0.75)"
            }
          };
        
          this.handleRequestClose = this.handleRequestClose.bind(this);
        
    }
    
    handleRequestClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <ReactModal
            style={this.customStyles}
            isOpen={this.props.isOpen}
            onRequestClose={this.handleRequestClose}
        >
            <Login />

        </ReactModal>
        );
    }
}