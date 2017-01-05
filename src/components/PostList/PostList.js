import React from 'react';
import PostTitle from '../PostTitle/PostTitle';
import './PostList.css';

class PostList extends React.Component {

    render() {
        const mapToComponents = data => {
          return data.map((post,i) => {
            return (<PostTitle
                      data={post}
                      key={post._id}
                    />);
          });
        };
        return (
          <div>
            <div className="PostList">
              <div>글 목록</div>
              {mapToComponents(this.props.data)}
              <div className="PostPost">
                <a className="ClickButton" href="/write"> 글쓰기 </a>
              </div>
            </div>
          </div>
        );
    }
}

PostList.propTypes = {
  data : React.PropTypes.array
}

PostList.defaultProps = {
  data : []
}

export default PostList;
