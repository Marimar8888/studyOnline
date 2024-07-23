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

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleUnsuccessfulAuth = this.handleUnsuccessfulAuth.bind(this);
    }

    handleSuccessfulAuth() {
        this.props.handleSuccessfulLogin();
        this.props.onClose(); 
        this.props.history.push("/contact");
    }

    handleUnsuccessfulAuth() {
        this.props.handleUnsuccessfulLogin();
    }



    render() {
        return (
            <ReactModal
                style={this.customStyles}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onClose}
            >
                <Login
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                    handleUnsuccessfulAuth={this.handleUnsuccessfulAuth}
                />

            </ReactModal>
        );
    }
}