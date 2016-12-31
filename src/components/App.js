import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update'
import Header from './Header'
import Content from './Content'
import RandomNumber from './RandomNumber'

class App extends React.Component {

  constructor(props){
      super(props);

      this.state = {
          value: Math.round(Math.random()*100)
      };

      this.updateValue = this.updateValue.bind(this);
  }

  updateValue(randomValue){
      this.setState({
          value: randomValue
      });
  }

  sayHey(){
    alert("GOAL!!!!");
  }

  render(){
      let text = "Dev-Server"
      let pStyle = {
          color: 'white',
          backgroundColor: 'black'
      };
      return (
        /* This is comments */
        <div>
          <h1>Board with React</h1>
          <h2>text : {text}</h2>
          <button onClick={this.sayHey}>Click Me</button>
          <p style = {pStyle}>{1 == 1 ? 'Condition with Style : True' : 'False'}</p>
          <div>
              <Header title = {this.props.headerTitle} />
              <Content title = {this.props.contentTitle}
                        body = {this.props.contentBody} />
              <RandomNumber number={this.state.value}
                            onUpdate={this.updateValue} />
              <Contacts/>
          </div>
        </div>
      );
  }
}


class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        {name: "Martian", phone: "010-0000-0001"},
        {name: "Betty", phone: "010-0000-0002"},
        {name: "Charlie", phone: "010-0000-0003"},
        {name: "David", phone: "010-0000-0004"}
      ]
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(){
      this.setState({
          contactData:this.state.contactData.concat({name: "Martian", phone: "010-0000-0001"})
      });
  }

  render(){
    return(
      <div>
        <h1>Contacts</h1>
        <ul>
          {this.state.contactData.map((contact,i) => {
            return (<ContactInfo name={contact.name}
                                  phone={contact.phone}
                                  key={i}
                                />);
          })}
        </ul>
        <button onClick={this.updateValue}>추가</button>
      </div>
    );
  }
}


class ContactInfo extends React.Component {
    render() {
        return(
            <li>{this.props.name} {this.props.phone}</li>
        );
    }
}

App.defaultProps = {
    headerTitle: 'Default header',
    contentTitle: 'Default contentTitle',
    contentBody: 'Default contentBody'
};

export default App;
