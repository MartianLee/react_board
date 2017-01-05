import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostContainer from './PostContainer/PostContainer';
import Post from '../components/Post/Post';
import { Header } from '../components';
import {postGetRequest} from '../actions/post';


import './View.css';

class View extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    console.log("ㅇ닒ㄷㅈ;ㅐㄻㅈㄷ;ㄹ");
    this.props.postGetRequest(true).then(
      () =>{
        console.log("propsPostData"+this.props.postData);
      }
    )
  }

  render() {
    return (
      <div>
          <Post data={this.props.postData}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postStatus: state.post.post,
    postData: state.post.postget.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    postListGetRequest: (postInfo) => {
      return dispatch(postListGetRequest(postInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
