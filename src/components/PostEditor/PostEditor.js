import React, {Component} from 'react';
import './PostEditor.css';

class PostEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postInfo: {
                title: "",
                contents: "",
                writer: ""
            },
            animate: false,
            direction: 'left'
        }

        this.titleChange = this.titleChange.bind(this);
        this.contentsChange = this.contentsChange.bind(this);
        this.writerChange = this.writerChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }


    componentWillReceiveProps (nextProps) {

        // sync the props to state directly (this is the first post)
        this.setState({
            postInfo: {
                title: "", contents: "", writer: ""
            }
        })
    }

    titleChange(e){
      let tmp = this.state.postInfo;
      tmp.title = e.target.value;
      this.setState({
        postInfo:tmp
      });
    }
    contentsChange(e){
      let tmp = this.state.postInfo;
      tmp.contents = e.target.value;
      this.setState({
        postInfo:tmp
      });
    }
    writerChange(e){
      let tmp = this.state.postInfo;
      tmp.writer = e.target.value;
      this.setState({
        postInfo:tmp
      });
    }

    handlePost() {
      let postInfo = this.state.postInfo;
      console.log(postInfo);
      this.props.onPost(postInfo).then(
        () => {
          this.setState({
            postInfo: {
                title: "",
                contents: "",
                writer: ""
            }
          });
        }
      );
    }

    render() {
        const { title, contents, writer } = this.state.postInfo;

        // show nothing when data is not loaded
        //if(title===null) return null;

        return (
            <div className="PostEditor">
                <textarea
                  rows="1"
                  className="PostTitle"
                  placeholder="제목"
                  value={this.state.title}
                  onChange={this.titleChange}></textarea>
                <textarea rows="10"
                  className="PostContents"
                  placeholder="내용"
                  value={this.state.contents}
                  onChange={this.contentsChange}></textarea>
                <textarea rows="1"
                  className="PostWriter"
                  placeholder="글쓴이"
                  value={this.state.writer}
                  onChange={this.writerChange}></textarea>
                  <div className="PostPost">
                    <a onClick={this.handlePost} href="/">글쓰기</a>
                    <a >삭제</a>
                    <a href="/">글 목록</a>
                  </div>
            </div>
        );
    }
}

PostEditor.propTypes = {
    onPost: React.PropTypes.func
};

PostEditor.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
};

export default PostEditor;
