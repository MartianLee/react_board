import React from 'react';
import ReactDOM from 'react-dom';
import update from 'react-addons-update';
import styles from './Board.css'

class Board extends React.Component {
  componentWillMount(){
    document.body.style.margin = 0;
    document.body.style.padding = 0;
  }
  render(){
    return (
      <div className = {styles.container}>
        <Posts/>
      </div>
    );
  }
}

class Posts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postData: [
        {title: "Martian", contents: "올 한해 열심히 해보겠습니다!"},
        {title: "king7282", contents: "아무것도하기싫다!!"},
        {title: "choiking10", contents: "주변 사람들 모두 행복했으면 좋겠어요."},
        {title: "hyo123bin", contents: "취업 했으면 좋겠습니다ㅠㅠ"}
      ],
      selectedKey: -1,
      selected:{
        title: "",
        contents: ""
      }
    };

  }

  sayHey(){
    alert("GOAL!!!!");
  }

  _insertPost(title, contents){
    let newState = update(this.state, {
      postData: {
        $push: [{"title": title, "contents": contents}]
      }
    });
    this.setState(newState);
  }

  _removePost(){
    if(this.state.selectedKey == - 1){
      console.log("contact not selected");
      return;
    }
    /*
    let deletedState = update(this.state,{
      postData:{
        $splice: [[this.state.selectedKey, 1]]
      },
      selectedKey: -1
    });
    this.setState(deletedState);
    */
    this.setState({
      postData: update(
        this.state.postData,
        {
          $splice:[[this.state.selectedKey, 1]]
        }
      ),
      selectedKey: -1,
      selected:{
        title: "",
        contents: ""
      }
    });
  }

  _editPost(title, contents){
    this.setState({
      postData:update(
        this.state.postData,
        {
          [this.state.selectedKey]:{
            title: { $set: title },
            contents: { $set: contents }
          }
        }
      ),
      selected:{
        title: title,
        contents: contents
      }
    });
  }

  _onSelect(key){
     if(key == this.state.selectedKey){
       console.log("key select cancelled");
       this.setState({
         selectedKey: -1,
         selected:{
           title: "",
           contents: ""
         }
       });
       return;
     }

     this.setState({
       selectedKey: key,
       selected: this.state.postData[key]
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
      <div className = {styles.contents}>
        <h1>Board<button onClick={this.sayHey}>Shoot!!</button></h1>
        <ul>
          {this.state.postData.map((contact, i) => {
              return (<ContactInfo title={contact.title}
                                  contents={contact.contents}
                                    key={i}
                                    contactKey={i}
                                    isSelected={this._isSelected.bind(this)(i)}
                                    onSelect={this._onSelect.bind(this)}/>);
          })}
        </ul>
        <ContactRemover onRemove={this._removePost.bind(this)}/>
        <div>
          <p> New Post </p>
          <ContactCreator onInsert={this._insertPost.bind(this)}/>
        </div>
        <div>
          <p> Edit Post </p>
          <ContactEditor onEdit={this._editPost.bind(this)}
                        isSelected={(this.state.selectedKey != -1)}
                        contact={this.state.selected}/>
        </div>
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
    console.log("rendered: " + this.props.title);
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
       <p>Title : {this.props.title}</p>
       <p style={getStyle(this.props.isSelected)}>
       {this.props.contents}</p>
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
          title: "",
          contents: ""
      };
   }

   handleClick(){
     if (this.state.title=="" || this.state.contents==""){
        alert("Please Fill All Required Field");
        return;
      }
       this.props.onInsert(this.state.title, this.state.contents);
       this.setState({
           title: "",
           contents: ""
       });
   }

   handleChange(e){
      var nextState = {};
      nextState[e.target.title] = e.target.value;
      this.setState(nextState);
   }

   render() {
     return (
       <div>
        <p>
          <input type="text"
            title="title"
            placeholder="title"
            value={this.state.title}
            onChange={this.handleChange.bind(this)}/>
        </p>
        <p>
          <input type="textarea"
          title="contents"
          placeholder="content"
          value={this.state.contents}
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
      title:"",
      contents:""
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      title: nextProps.contact.title,
      contents: nextProps.contact.contents
    });
  }

  handleClick(){
    if(!this.props.isSelected){
      console.log("post not selected");
      return;
    }
    this.props.onEdit(this.state.title, this.state.contents);
  }

  handleChange(e){
    var nextState = {};
      nextState[e.target.title] = e.target.value;
      this.setState(nextState);
  }

  render(){
    return (
      <div>
       <p>
         <input type="text"
           title="title"
           placeholder="title"
           value={this.state.title}
           onChange={this.handleChange.bind(this)}/>
       </p>
       <p>
         <input type="textarea"
           title="contents"
           placeholder="content"
           value={this.state.contents}
           onChange={this.handleChange.bind(this)}/>
       </p>
       <button onClick={this.handleClick.bind(this)}>Edit</button>
      </div>
    );
  }
}

export default Board;
