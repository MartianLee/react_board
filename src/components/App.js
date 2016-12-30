import React from 'react';
import Header from './Header'
import Content from './Content'

class App extends React.Component {
  sayHey(){
    alert("hey");
  }
  render(){
      let text = "Dev-Server"
      let pStyle = {
          color: 'aqua',
          backgroundColor: 'black'
      };
      return (
        /* This is comments */
        <div>
          <h1>Hello React Skeleton</h1>
          <h2>text : {text}</h2>
          <button onClick={this.sayHey}>Click Me</button>
          <p style = {pStyle}>{1 == 1 ? 'True' : 'False'}</p>
          <div>
              <Header title = {this.props.headerTitle} />
              <Content title = {this.props.contentTitle}
                        body = {this.props.contentBody} />
          </div>
        </div>
      );
  }
}

class App2 extends React.Component {
    render(){
        return  (
            <div>
                <Header/>
                <Content/>
            </div>
        );
    }
}

App.defaultProps = {
    headerTitle: 'Default header',
    contentTitle: 'Default contentTitle',
    contentBody: 'Default contentBody'
};

export default App;
