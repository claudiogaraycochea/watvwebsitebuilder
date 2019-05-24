import React, { Component } from 'react';
import './Home.css';
import logo from '../../assets/logo-watv.svg';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Footer from "../footer/Footer";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="tertiary-style">
				<div className="container padding-20 center">
          <div className="center-wrapper">
            <div className="logo-wrapper"><img src={logo} className="logo logo-large" alt="" /></div>
						<h2 className="slogan">Internet and Television Together</h2>
					</div>
				</div>
				<Footer className="footer" />
			</div>;
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
