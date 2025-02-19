import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../utils/routes";

class signIn extends Component {
    
    onHandlerSubmit = (event) => {
        this.props.history.push(ROUTES.HOME);
    }
    
    render() {
        return (

            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="../images/logo.png"  alt="User Logo" />
                    </div>
                    <form>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="Login" />
                        <input type="text" id="password" className="fadeIn third" name="login" placeholder="Enter password" />
                        <input type="submit" className="fadeIn fourth" value="Log In" onClick = {this.onHandlerSubmit.bind(this)} />
                    </form>
                   
                   
                    
                    <p>
                        Don't have an account?{" "}
                        <Link to={"/signup"}>
                            Sign Up
            </Link>
                    </p>
                    <div id="formFooter">
                        <a className="underlineHover" href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(signIn);