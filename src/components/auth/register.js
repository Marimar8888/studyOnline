import React, { Component } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errorText: ""
        };

        this.handleRegisterClick= this.handleRegisterClick.bind(this);

    }

    handleRegisterClick(){
        if (this.props.openLoginModal) {
            this.props.openLoginModal(); // Llama a la función pasada como prop
        }
    }

    render() {
        return (
            <div>

                <div className='title-login'>
                    <h2>REGISTRATE Y EMPIEZA A APRENDER</h2>
                </div>


                <div>{this.state.errorText}</div>

                <form  className="auth-form-wrapper">
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
         
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
      
                        />
                    </div>

                    <button className="btn" type="submit">Regístrate</button>

                    <div className="links-login-modal-wrapper">

                        <p className="link-register">¿Ya tienes cuenta?
                            <span className="register-link" onClick={this.handleRegisterClick}> Inicio Sesión</span>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
