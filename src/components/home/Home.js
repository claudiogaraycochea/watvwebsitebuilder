import React, { Component } from 'react';
import './Home.css';
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
						Internet and Television Together
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
