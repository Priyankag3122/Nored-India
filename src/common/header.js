import React, { Component } from 'react'
import { Link } from "react-router-dom";
import * as ROUTES from "../utils/routes";
import { withRouter } from 'react-router-dom';

class header extends Component {
  onHandlerSubmit = (event) => {
    this.props.history.push(ROUTES.SIGNIN);
}
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to={ROUTES.LANDINGPAGE} className="navbar-brand">
            <h1> <span className="badge badge-danger">noRED</span></h1>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Dropdown
        </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">Action</a>
                  <a className="dropdown-item" href="#">Another action</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success my-2 my-sm-0" type="submit">Search</button>
              <button className="btn btn-success btn-rounded btn blue-gradient my-2 mx-2 my-sm-0 " type="button" onClick = {this.onHandlerSubmit}
              >              SignIn
      
               
              </button>
            </form>
          </div>
        </nav>
      </div>
    )
  }
}
export default withRouter(header);