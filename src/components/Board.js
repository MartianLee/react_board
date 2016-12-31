import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';

class Board extends React.Component {

  render(){
    return (
      <div>
        <Contacts/>
      </div>
    );
  }
}

class Contacts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contactData: [
        {name: "Martian", phone: "올 한해 열심히 해보겠습니다!"},
        {name: "king7282", phone: "아무것도하기싫다!!"},
        {name: "choiking10", phone: "주변 사람들 모두 행복했으면 좋겠어요."},
        {name: "hyo123bin", phone: "취업 했으면 좋겠습니다ㅠㅠ"}
      ],
      selectedKey: -1,
      selected:{
        name: "",
        phone: ""
      }
    };

  }

  sayHey(){
    alert("GOAL!!!!");
  }

  _insertContact(name, phone){
    let newState = update(this.state, {
      contactData: {
        $push: [{"name": name, "phone": phone}]
      }
    });
    this.setState(newState);
  }

  _removeContact(){
    if(this.state.selectedKey == - 1){
      console.log("contact not selected");
      return;
    }
    /*
    let deletedState = update(this.state,{
      contactData:{
        $splice: [[this.state.selectedKey, 1]]
      },
      selectedKey: -1
    });
    this.setState(deletedState);
    */
    this.setState({
      contactData: update(
        this.state.contactData,
        {
          $splice:[[this.state.selectedKey, 1]]
        }
      ),
      selectedKey: -1
    });
  }

  _editContact(name, phone){
    this.setState({
      contactData:update(
        this.state.contactData,
        {
          [this.state.selectedKey]:{
            name: { $set: name },
            phone: { $set: phone }
          }
        }
      ),
      selected:{
        name: name,
        phone: phone
      }
    });
  }

  _onSelect(key){
     if(key == this.state.selectedKey){
       console.log("key select cancelled");
       this.setState({
         selectedKey: -1,
         selected:{
           name: "",
           phone: ""
         }
       });
       return;
     }

     this.setState({
       selectedKey: key,
       selected: this.state.contactData[key]
     });
     console.log(key + " is selected");
  }

  _isSelected(key){
      if(this.state.selectedKey == key){
          return true;
      }else{
          return false;
      }
  }

  render(){
    return(
      <div>
        <h1>Board<button onClick={this.sayHey}>Shoot!!</button></h1>
        <ul>
          {this.state.contactData.map((contact, i) => {
              return (<ContactInfo name={contact.name}
                                  phone={contact.phone}
                                    key={i}
                                    contactKey={i}
                                    isSelected={this._isSelected.bind(this)(i)}
                                    onSelect={this._onSelect.bind(this)}/>);
          })}
        </ul>
        <div>
          <p> New Post </p>
          <ContactCreator onInsert={this._insertContact.bind(this)}/>
        </div>
        <ContactRemover onRemove={this._removeContact.bind(this)}/>
        <ContactEditor onEdit={this._editContact.bind(this)}
                      isSelected={(this.state.selectedKey != -1)}
                      contact={this.state.selected}/>
      </div>
    );
  }

 }

class ContactInfo extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return (JSON.stringify(nextProps) != JSON.stringify(this.props));
  }
  handleClick(){
      this.props.onSelect(this.props.contactKey);
  }
  render() {
    console.log("rendered: " + this.props.name);
    let getStyle = isSelect => {
      if(!isSelect){
        let style = {
            display : 'none'
        };
        return style;
      }

      let style = {
          fontWeight: 'bold',
          backgroundColor: '#4efcd8'
      };

      return style;
    };
    return(
      <li
       onClick={this.handleClick.bind(this)}>
       <p>Title : {this.props.name}</p>
       <p style={getStyle(this.props.isSelected)}>
       {this.props.phone}</p>
       </li>
      );
  }
}

class ContactRemover extends React.Component{
  handleClick(){
    this.props.onRemove();
  }

  render(){
    return (
      <button onClick={this.handleClick.bind(this)}>
        Remove selected post
      </button>
    )
  }
}

class ContactCreator extends React.Component {

   constructor(props) {
      super(props);
      // Configure default state
      this.state = {
          name: "",
          phone: ""
      };
   }

   handleClick(){
     if (this.state.name=="" || this.state.phone==""){
        alert("Please Fill All Required Field");
        return;
      }
       this.props.onInsert(this.state.name, this.state.phone);
       this.setState({
           name: "",
           phone: ""
       });
   }

   handleChange(e){
      var nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
   }

   render() {
     return (
       <div>
        <p>
          <input type="text"
            name="name"
            placeholder="title"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}/>
        </p>
        <p>
          <input type="textarea"
          name="phone"
          placeholder="content"
          value={this.state.phone}
          onChange={this.handleChange.bind(this)}/>
        </p>
        <button onClick={this.handleClick.bind(this)}>Write</button>
       </div>
    );
  }
}

class ContactEditor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name:"",
      phone:""
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      name: nextProps.contact.name,
      phone: nextProps.contact.phone
    });
  }

  handleClick(){
    if(!this.props.isSelected){
      console.log("post not selected");
      return;
    }
    this.props.onEdit(this.state.name, this.state.phone);
  }

  handleChange(e){
    var nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
  }

  render(){
    return (
      <div>
       <p>
         <input type="text"
           name="name"
           placeholder="title"
           value={this.state.name}
           onChange={this.handleChange.bind(this)}/>
       </p>
       <p>
         <input type="textarea"
           name="phone"
           placeholder="content"
           value={this.state.phone}
           onChange={this.handleChange.bind(this)}/>
       </p>
       <button onClick={this.handleClick.bind(this)}>Edit</button>
      </div>
    );
  }
}

export default Board;
