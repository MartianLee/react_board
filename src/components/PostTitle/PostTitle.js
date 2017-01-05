import React from 'react';
import './PostTitle.css';
import TimeAgo from 'react-timeago';

class PostTitle extends React.Component {

    render() {
        const {data} = this.props;
        return (
          <div className="PostTitle">
            <div className="Title" id={`title-${data._id}`}>
            <a href={`/view/${data._id}`}>{data.title}</a></div>
            <div className="Writer">{data.writer}</div>
            <div className="Time"><TimeAgo date={data.date.created}/></div>
          </div>
        );
    }
}

PostTitle.propTypes = {
    data: React.PropTypes.object
};

PostTitle.defaultProps = {
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

export default PostTitle;
