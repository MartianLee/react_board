import React from 'react';
import { connect } from 'react-redux';
import {PostWriter, Warning} from '../components';
import {postInsertRequest} from '../actions/post';

class Write extends React.Component {

  constructor(props){
    super(props);
    this.state={
      postId: 1,
      fetching: false,
      post:{
        title: '',
        contents: '',
        writer: ''
      },
      warningVisibility: false
    };
    this.handlePost = this.handlePost.bind(this);
  }

  handlePost(post){
    return this.props.postInsertRequest(post).then(
      () => {
        if(this.props.postStatus.status === "SUCCESS"){
          console.log("SUCCESS");
        }else{
          let $toastContent;
          switch(this.props.postStatus.error){
            case 1:
              console.log("error 1");
              break;
            default:
              console.log("Something Wrong..");
              break;
          }
        }
      }
    )
  }

  showWarning = () => {
    this.setState({
      warningVisibility: true
    });
    setTimeout(
      () => {
        this.setState({
          warningVisibility: false
        });
      }, 1000
    )
  }

  render() {

    const {postId, fetching, post, warningVisibility} = this.state;

    return (
        <div>
            <PostWriter
              onPost={this.handlePost}
            />
            <Warning visible={warningVisibility} message="Invalid Input"/>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postStatus : state.post.post
  };
}

const mapDispatchToProps = (dispatch) => {
    return {
        postInsertRequest: (post) => {
            return dispatch(postInsertRequest(post));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Write);
