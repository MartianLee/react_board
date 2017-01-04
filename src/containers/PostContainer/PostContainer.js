import React, {Component} from 'react';
import {PostWrapper, Navigator, Post, Warning} from '../../components';
import * as service from '../../services/post';

class PostContainer extends Component{

  constructor(props){
    super();
    this.state={
      postId: 1,
      fetching: false,
      post:{
        title: null,
        body: null
      },
      comments: [],
      warningVisibility: false
    };
  }

  componentDidMount(){
    this.fetchPostInfo(1);
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

  fetchPostInfo = async(postId) => {

    this.setState({
      fetching: true
    });

    try{
      const info = await Promise.all([
        service.getPost(postId),
        service.getComments(postId)
      ]);

      const {title, body} = info[0].data;

      const comments = info[1].data;

      this.setState({
        postId,
        post:{
          title,
          body
        },
        comments,
        fetching:false
      });
      console.log(info);
    } catch(e){
      this.setState({
        fetching: false
      });
      this.showWarning();
      console.log('error occured',e);
    }
  }

  handleNavigateClick = (type) => {
    const postId = this.state.postId;

    if(type === 'NEXT'){
      this.fetchPostInfo(postId+1);
    }else{
      //if(postId > 1){
        this.fetchPostInfo(postId-1);
      //}
    }
  }


  render(){
    const {postId, fetching, post, comments, warningVisibility} = this.state;
    return(
      <PostWrapper>
        <Navigator
          postId={postId}
          disabled={fetching}
          onClick={this.handleNavigateClick}
        />
        <Post
          postId={postId}
          title={post.title}
          body={post.body}
          comments={comments}
        />
        <button>수정</button>
        <button>삭제</button>
        <button>목록으로</button>
        <Warning visible={warningVisibility} message="That post does not exit"/>
      </PostWrapper>
    );
  }
}

export default PostContainer;
