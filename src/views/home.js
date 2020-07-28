import React, { Component } from 'react';
import { compose } from 'recompose';
import * as ROUTES from "../utils/routes";
import { withAuthorization ,withEmailVerification } from '../components/Session';

class home extends Component {   
    render() {
        return (
            <div>
                {/* <!-- Page Content --> */}
                <div className="container">

                    <div className="row">

                        {/* <!-- Blog Entries Column --> */}
                        <div className="col-md-8">

                            <h1 className="my-4">Page Heading<small>Secondary Text</small>
                            </h1>

                            {/* <!-- Blog Post --> */}
                            <div className="card mb-4">
                                <img className="card-img-top" src="http://placehold.it/750x300" alt="Card cap" />
                                <div className="card-body">
                                    <h2 className="card-title">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
                                    <a href={ROUTES.POSTDETAIL} className="btn btn-primary" >

                                        Read More &rarr;</a>
                                </div>
                                <div className="card-footer text-muted">
                                    Posted on January 1, 2017 by   <a href="/#">Start Bootstrap</a>
                                </div>
                            </div>

                            {/* <!-- Blog Post --> */}
                            <div className="card mb-4">
                                <img className="card-img-top" src="http://placehold.it/750x300" alt="Card cap" />
                                <div className="card-body">
                                    <h2 className="card-title">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
                                    <a href="/#" className="btn btn-primary">Read More &rarr;</a>
                                </div>
                                <div className="card-footer text-muted">
                                    Posted on January 1, 2017 by   <a href="/#">Start Bootstrap</a>
                                </div>
                            </div>

                            {/* <!-- Blog Post --> */}
                            <div className="card mb-4">
                                <img className="card-img-top" src="http://placehold.it/750x300" alt="Card cap" />
                                <div className="card-body">
                                    <h2 className="card-title">Post Title</h2>
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a laboriosam. Dicta expedita corporis animi vero voluptate voluptatibus possimus, veniam magni quis!</p>
                                    <a href="/#" className="btn btn-primary">Read More &rarr;</a>
                                </div>
                                <div className="card-footer text-muted">
                                    Posted on January 1, 2017 by        <a href="/#">Start Bootstrap</a>
                                </div>
                            </div>

                            {/* <!-- Pagination --> */}
                            <ul className="pagination justify-content-center mb-4">
                                <li className="page-item">
                                    <a className="page-link" href="/#">&larr; Older</a>
                                </li>
                                <li className="page-item disabled">
                                    <a className="page-link" href="/#">Newer &rarr;</a>
                                </li>
                            </ul>

                        </div>

                        {/* <!-- Sidebar Widgets Column --> */}
                        <div className="col-md-4">



                            {/* <!-- Categories Widget --> */}
                            <div className="card my-4">
                                <h5 className="card-header">Categories</h5>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <ul className="list-unstyled mb-0">
                                                <li>
                                                    <a href="/#">Web Design</a>
                                                </li>
                                                <li>
                                                    <a href="/#">HTML</a>
                                                </li>
                                                <li>
                                                    <a href="/#">Freebies</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <ul className="list-unstyled mb-0">
                                                <li>
                                                    <a href="/#">JavaScript</a>
                                                </li>
                                                <li>
                                                    <a href="/#">CSS</a>
                                                </li>
                                                <li>
                                                    <a href="/#">Tutorials</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Side Widget --> */}
                            <div className="card my-4">
                                <h5 className="card-header">Side Widget</h5>
                                <div className="card-body">
                                    You can put anything you want inside of these side widgets. They are easy to use, and feature the new Bootstrap 4 card containers!</div>
                            </div>

                        </div>

                    </div>
                    {/* <!-- /.row --> */}

                </div>
                {/* <!-- /.container --> */}

                {/* <!-- Footer --> */}
                <footer className="py-5 bg-dark">
                    <div className="container">
                        <p className="m-0 text-center text-white">Copyright &copy; Your Website 2019</p>
                    </div>
                    {/* <!-- /.container --> */}
                </footer>
            </div>
        )
    }
}
const condition = authUser => !!authUser;
export default compose(
    withEmailVerification,
    withAuthorization(condition),
  )(home);