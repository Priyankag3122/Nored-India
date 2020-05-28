import React, { Component } from 'react'
import * as ROUTES from "../utils/routes";
import { Link, withRouter } from "react-router-dom";

class headerApp extends Component {
    onHandlerSubmit = (event) => {
        this.props.history.push(ROUTES.ABOUT);
    }
    render() {
        return (
            <div>
                  <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
                    <a className="navbar-brand" href="/#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/#navbarSupportedContent-333"
                        aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/#">Home
                                  <span className="sr-only">(current)</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#" onClick = {this.onHandlerSubmit.bind(this)}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#">Services</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">Blog  </a>
                                <div className="dropdown-menu dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                                    <a className="dropdown-item" href="/#">Action</a>
                                    <a className="dropdown-item" href="/#">Another action</a>
                                    <a className="dropdown-item" href="/#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto nav-flex-icons">
                            <li className="nav-item">
                                <a className="nav-link waves-effect waves-light" href="/#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link waves-effect waves-light" href="/#">
                                    <i className="fab fa-google-plus-g"></i>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" href="/#" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-default"
                                    aria-labelledby="navbarDropdownMenuLink-333">
                                    <a className="dropdown-item" href="/#"><i className="fa fa-user"></i>  Profile</a>
                                    <a className="dropdown-item" href="/#"><i className="fas fa-bell"></i>  Notifications</a>
                                    <a className="dropdown-item" href="/#"><i className="fa fa-sliders-h"></i>  Settings</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="/#"><i className="fas fa-power-off"></i>  Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(headerApp);