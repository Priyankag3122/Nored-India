import React, { Component } from 'react'
import * as ROUTES from "../utils/routes";
import { withRouter } from "react-router-dom";
// import Navigation from "../components/Navigation"
import SignOutButton from '../views/signOut';

class headerApp extends Component {
    onHandlerSubmit = (event) => {
        this.props.history.push(ROUTES.ABOUT);
    }
    render() {
        return (
            <div>
                  <nav class="navbar navbar-default navbar-expand-xl navbar-light ">
	<div class="navbar-header d-flex col">
		<a class="navbar-brand" href="/#">
                        <img src="../images/logo.png" alt="User Logo" />
                    </a>  	
                    </div>	
		<button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle navbar-toggler ml-auto">
			<span class="navbar-toggler-icon"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</button>
	
	{/* <!-- Collection of nav links, forms, and other content for toggling --> */}
	<div id="navbarCollapse" class="collapse navbar-collapse justify-content-start">
		<ul class="nav navbar-nav">
			<li class="nav-item active"><a href={ROUTES.HOME} class="nav-link">Home</a></li>
			<li class="nav-item"><a href="/#" class="nav-link" onClick={this.onHandlerSubmit}>About</a></li>
			<li class="nav-item dropdown">
				<a data-toggle="dropdown" class="nav-link dropdown-toggle" href="/#">Services <b class="caret"></b></a>
				<ul class="dropdown-menu">					
					<li><a href="/#" class="dropdown-item">Web Design</a></li>
					<li><a href="/#" class="dropdown-item">Web Development</a></li>
					<li><a href="/#" class="dropdown-item">Graphic Design</a></li>
					<li><a href="/#" class="dropdown-item">Digital Marketing</a></li>
				</ul>
			</li>
			<li class="nav-item"><a href="/#" class="nav-link"><i class="fab fa-blogger"></i>Blog</a></li>
			<li class="nav-item"><a href="/#" class="nav-link">Contact</a></li>
		</ul>
		<ul class="nav navbar-nav navbar-right ml-auto">
			<li class="nav-item"><a href="/#" class="nav-link notifications"><i class="fa fa-bell"></i><span class="badge"></span></a></li>
			<li class="nav-item"><a href="/#" class="nav-link bookmark"><i class="fa fa-bookmark"></i><span class="badge"></span></a></li>
			<li class="nav-item dropdown">
				<a href="/#" data-toggle="dropdown" class="nav-link dropdown-toggle user-action">
                    <img src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg" class="avatar" alt="Avatar"/> <b class="caret">
                    </b>
                    </a>
				 <ul class="dropdown-menu ">
					<li><a href={ROUTES.ACCOUNT} class="dropdown-item"><i class="fas fa-user-plus"></i> Profile
					</a></li>
					<li>
					<a href={ROUTES.ADMIN} class="dropdown-item"><i class="fas fa-user-shield"></i> Admin </a>
</li>
					<li><a href="/#" class="dropdown-item"><i class="fa fa-calendar-o"></i> Calendar</a></li>
					<li><a href={ROUTES.SETTINGS} class="dropdown-item"><i class="fa fa-sliders"></i> Settings</a></li>
					<li class="divider dropdown-divider"></li>
					<li><SignOutButton/></li>
				</ul> 
				
			</li>
		</ul>
	</div>
</nav>
            </div>
        )
    }
}

export default withRouter(headerApp);