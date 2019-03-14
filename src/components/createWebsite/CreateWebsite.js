import React, { Component } from 'react';
import './CreateWebsite.css';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const createWebsiteList = [
  {
    title: 'Buy Now',
    description: 'Use Buy Now to sell products from your advertisers.',
    image: 'url',
    runSrc: {
      text: 'nothing',
    }
  },
  {
    title: 'Vote',
    description: 'Use Vote for your viewers to vote for a movie, get a general opinion or vote for the best player.',
    image: 'url',
    runSrc: {
      text: 'nothing',
    }
  },
]

class CreateWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      userFirstname: sessionStorage.getItem('userFirstname'),
    };
  }

  render() {
    return (
      <div>
        <input type="text" className="inp" />
        <p>
          Choose a theme refered to your target.
        </p>
        <div>
          {createWebsiteList.map((item, key)=>
            <div key={key}>
              Option {item.title}
            </div>
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userFirstname: state.userFirstname,
  };
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateWebsite));