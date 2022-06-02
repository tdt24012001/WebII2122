import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import PremisesService from "./services/premises.service";
import CertificateService from "./services/certificate.service";
import InspectionService from "./services/inspection.service";
import SampleService from "./services/sample.service";
import AreaService from "./services/area.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Premises from "./components/board-premises.component";
import Inspection from "./components/board-inspection.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      navSelected: ""
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  selectedNav = (navName) => {
    return this.state.navSelected == navName ? " selected" : "";
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div className="background">
        <nav className="navbar navbar-expand nav-top">
          <Link to={"/"} className="navbar-brand" onClick={() => this.setState({navSelected: ""})}>
            ANDZ
          </Link>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className={"nav-item" + this.selectedNav("profile")}>
                <Link to={"/profile"} className="nav-link"  onClick={() => this.setState({navSelected: "profile"})}>
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            </div>
          )}
        </nav>
        {currentUser && (
        <nav className="navbar navbar-expand nav-bellow">
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className={"nav-item" + this.selectedNav("home")}>
                <Link to={"/home"} className="nav-link" onClick={() => this.setState({navSelected: "home"})}>
                  Home
                </Link>
              </li> 
            )}   
            {showModeratorBoard && (
              <li className={"nav-item" + this.selectedNav("mod")}>
                <Link to={"/mod"} className="nav-link" onClick={() => this.setState({navSelected: "mod"})}>
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className={"nav-item" + this.selectedNav("admin")}>
                <Link to={"/admin"} className="nav-link" onClick={() => this.setState({navSelected: "admin"})}>
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className={"nav-item" + this.selectedNav("user")}>
                <Link to={"/user"} className="nav-link" onClick={() => this.setState({navSelected: "user"})}>
                  User
                </Link>
              </li>
            )}

            {currentUser && (
              <li className={"nav-item" + this.selectedNav("premises")}>
                <Link to={"/premises"} className="nav-link" onClick={() => this.setState({navSelected: "premises"})}>
                Premises
                </Link>
              </li>
            )}

            {currentUser && (
              <li className={"nav-item" + this.selectedNav("inspection")}>
                <Link to={"/inspection"} className="nav-link" onClick={() => this.setState({navSelected: "inspection"})}>
                Inspection
                </Link>
              </li>
            )}

            {currentUser && (
              <li className={"nav-item" + this.selectedNav("certificate")}>
                <Link to={"/certificate"} className="nav-link" onClick={() => this.setState({navSelected: "certificate"})}>
                Certificate
                </Link>
              </li>
            )}

          </div>
        </nav>
        )}
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/premises" component={Premises} />
            <Route path="/inspection" component={Inspection} />
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
    );
  }
}

export default App;
