import React, { Component } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            errorText: ""
        };
        this.isMountedComponent = false;
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post(
                "http://localhost:5000/user",
                {
                    users_name: this.state.name,
                    users_email: this.state.email,
                    users_password: this.state.password
                }
            )
            .then(response => {
                if (response.status === 201) {
                    if (this.isMountedComponent) {
                        this.props.handleSuccessfulReg();
                    }
                }
            })
            .catch(error => {
                if (this.isMountedComponent) {
                    if (error.response) {
                        switch (error.response.status) {
                            case 400:
                                this.setState({
                                    errorText: error.response.data.error
                                });
                                break;
                            case 404:
                                this.setState({
                                    errorText: "No se pudo encontrar un recurso necesario en el servidor."
                                });
                                break;
                            case 500:
                                this.setState({
                                    errorText: "Error en el servidor. Por favor, inténtalo más tarde."
                                });
                                break;
                            default:
                                this.setState({
                                    errorText: "Error inesperado. Por favor, inténtalo de nuevo."
                                });                                
                            
                        }
                    }else if (error.request) {
                        if (this.isMountedComponent) {
                            this.setState({
                                errorText: "No se pudo obtener una respuesta del servidor. Verifica tu conexión a internet."
                            });
                        }
                    }else {
                        if (this.isMountedComponent) {
                            this.setState({
                                errorText: "Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo."
                            });
                        }
                    }
                }
            });
    }

    handleLoginClick() {
        if (this.props.openLoginModal) {
            this.props.openLoginModal();
        }
    }

    componentDidMount() {
        this.isMountedComponent = true;
    }

    componentWillUnmount() {
        this.isMountedComponent = false;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    render() {
        return (
            <div>

                <div className='title-login'>
                    <h2>REGISTRATE Y EMPIEZA A APRENDER</h2>
                </div>

                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                        <FontAwesomeIcon icon="user" />
                        <input
                            type="text"
                            name="name"
                            placeholder="Your user name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="errorText">{this.state.errorText}</div>

                    <button className="btn" type="submit">Regístrate</button>

                    <div className="links-login-modal-wrapper">

                        <p className="link-register">¿Ya tienes cuenta?
                            <span className="register-link" onClick={this.handleLoginClick}> Inicio Sesión</span>
                        </p>
                    </div>
                </form>
            </div>
        )
    }
}
