import React, { Component } from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: ""
    };
    this.isMountedComponent = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    
  }

  handleRegisterClick() {
    if (this.props.openRegisterModal) {
      this.props.openRegisterModal(); // Llama a la función pasada como prop
    }
  }


  componentDidMount() {
    this.isMountedComponent = true; // El componente se ha montado
  }

  componentWillUnmount() {
    this.isMountedComponent = false; // El componente se desmonta
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        "http://localhost:5000/login",
        {
            users_email: this.state.email,
            users_password: this.state.password
        }
      )
      .then(response => {
        if (response.status === 200) {
          if (this.isMountedComponent) {
            localStorage.setItem('token', response.data.token);
            this.props.handleSuccessfulAuth();
          }
        } else {
          if (this.isMountedComponent) {
            this.setState({
              errorText: "Wrong email or password"
            });
            this.props.handleUnsuccessfulAuth();
          }
        }
      })
      .catch(error => {
        if (error.name === 'CanceledError') {
          return;
        }
        if (this.isMountedComponent) { 
          this.setState({
            errorText: "An error occurred"
          });
          this.props.handleUnsuccessfulAuth();
        }
      });


  }

  render() {
    return (
      <div>

        <div className='title-login'>
          <h2>INICIA SESIÓN EN STUDY ONLINE</h2>
        </div>


        <div>{this.state.errorText}</div>

        <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
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

          <button className="btn" type="submit">Login</button>

          <div className="links-login-modal-wrapper">
            <p className="link-forgot-pass">He olvidado la contraseña</p>
            <p className="link-register">¿No tienes una cuenta? 
              <span className="register-link" onClick={this.handleRegisterClick}>Regístrate</span>
            </p>
          </div>
        </form>
      </div>
    )
  }
}

