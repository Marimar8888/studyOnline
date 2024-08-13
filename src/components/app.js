import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetails from "./pages/blog-details";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";
import PortfolioManager from "./pages/portfolio-manager";
import Icons from "./helpers/icons";
import LoginModal from "./modals/login-modal";
import RegisterModal from "./modals/register-modal";
import Footer from "./foot/footer";
import Store from "./pages/store";


export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      isModalOpen: false
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.handleSuccessfulRegister = this.handleSuccessfulRegister.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.closeRegisterModal = this.closeRegisterModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);


  }

  openLoginModal() {
    this.setState({
      isRegisterModalOpen: false,
      isModalOpen: true
    });
  }

  openRegisterModal() {
    this.setState({
      isModalOpen: false,
      isRegisterModalOpen: true
    });
  }

  closeRegisterModal() {
    this.setState({ isRegisterModalOpen: false });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  
  handleSuccessfulRegister(){
    this.openLoginModal();
  }

  handleSuccessfulLogin() {
    this.setState({
        loggedInStatus: "LOGGED_IN"
    }, () => {
        console.log("Logged in status:", this.state.loggedInStatus); 
        this.checkLoginStatus(); 
        this.closeModal(); 
    });
  }

handleUnsuccessfulLogin() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  });
  this.closeModal();
}

handleSuccessfulLogout() {
  this.setState({
    loggedInStatus: "NOT_LOGGED_IN"
  });
}


checkLoginStatus() {
  const token = localStorage.getItem("token"); 
  const loggedInStatus = this.state.loggedInStatus;
  if (token && loggedInStatus === "NOT_LOGGED_IN"){
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  } else if (!token && loggedInStatus === "LOGGED_IN") {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }
}

componentDidMount() {
  this.checkLoginStatus();
}

authorizedPages() {
  return [<Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />];
}

render() {
  return (
    <div className="container">
      <Router>
        <div>
          <NavigationContainer
            loggedInStatus={this.state.loggedInStatus}
            handleSuccessfulLogout={this.handleSuccessfulLogout}
            openModal={this.openModal}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/store" component={Store} />
            <Route path="/about-me" component={About} />
            <Route path="/contact" component={Contact} />
            <Route
              path="/blog"
              render={props => (
                <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            <Route
              path="/b/:slug"
              render={props => (
                <BlogDetails {...props} loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            {this.state.loggedInStatus === "LOGGED_IN" ? (this.authorizedPages()) : null}
            <Route
              exact
              path="/portfolio/:slug"
              component={PortfolioDetail}
            />
            <Route component={NoMatch} />
          </Switch>
          <LoginModal
            isOpen={this.state.isModalOpen}
            onClose={this.closeModal}
            handleSuccessfulLogin={this.handleSuccessfulLogin}
            handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
            openRegisterModal={this.openRegisterModal}
          />
          <RegisterModal
            isOpen={this.state.isRegisterModalOpen}
            onClose={this.closeRegisterModal}
            openLoginModal={this.openLoginModal}
            handleSuccessfulRegister={this.handleSuccessfulRegister}
          />
          <Footer />
        </div>
      </Router>
    </div>
  );
}
}