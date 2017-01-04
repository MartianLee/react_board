import React, { Component } from 'react';
import PostContainer from './PostContainer/PostContainer';
import { Header } from '../components';
import './View.css';

class View extends Component {
  render() {
    return (
      <div>
        <PostContainer/>
        {this.props.children}
      </div>
    );
  }
}

export default View;
