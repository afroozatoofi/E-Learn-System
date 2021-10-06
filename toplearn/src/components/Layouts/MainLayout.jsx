import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

import TopNav from "./../Navs/TopNav";
import Header from "./../common/Header";
import MainNav from "./../Navs/MainNav";
import Footer from "./../common/Footer";
import Helmet from "react-helmet";

const MainLayout = props => {
    const { pathname } = props.location;
    return (
        <Fragment>
            <Helmet>
                <title>خودآموز تاپلرن</title>
            </Helmet>
            <div className="landing-layer">
                <div className="container">
                    <TopNav />
                    {pathname === "/" ? <Header /> : null}
                </div>
            </div>

            <MainNav />

            <main id="home-page">
                <div className="container">{props.children} </div>
            </main>

            <Footer />
        </Fragment>
    );
};

export default withRouter(MainLayout);
