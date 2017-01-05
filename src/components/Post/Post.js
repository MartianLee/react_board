import React, {Component} from 'react';
import './Post.css';
import {CommentList} from '../';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postInfo: {
                title: '',
                contents: '',
                writer: ''
            },
            direction: 'left'
        }
    }

    render() {
        const { title, contents, writer } = this.props;

        return (
            <div className="WriteForm">
              <div className="Post">
                  <div className="Title">{title}</div>
                  <div className="Contents">{contents}</div>
                  <div className="Writer">{writer}</div>
              </div>
              <div className="PostPost">
                <a className="ClickButton" onClick={this.handleGet} href="/">수정</a>
                <a className="ClickButton" >삭제</a>
                <a className="ClickButton" href="/">글 목록</a>
              </div>
            </div>
        );
    }
}

Post.propTypes = {
    data: React.PropTypes.object
};

Post.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Martian',
        title: 'Develop React',
        contents: 'I love Football',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        }
    }
}

export default Post;
