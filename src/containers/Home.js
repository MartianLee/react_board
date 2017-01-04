import React from 'react';
import {browserHistory} from 'react-router';
import {PostList, Warning} from '../components';

class Home extends React.Component {
  constructor(props){
    super(props);
  }

    render() {
        return (
            <div>
                Home
                <PostList/>
            </div>
        );
    }
}

export default Home;
