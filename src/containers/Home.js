import React from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import {PostList, Warning} from '../components';

import {postListGetRequest} from '../actions/post';

class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.postListGetRequest(true).then(
      () =>{
        console.log(this.props.postData);
      }
    )
  }

    render() {

        return (
            <div>
                <PostList data={this.props.postData}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    postStatus: state.post.post,
    postData: state.post.list.data
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    postListGetRequest: (postInfo) => {
      return dispatch(postListGetRequest(postInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
