import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import StateExample from './components/StateExample';
import RandomNumber from './components/RandomNumber';

const rootElement = document.getElementById('root');
ReactDOM.render(<App headerTitle = "Welcome!"
                    contentTitle = "Sports geeks,"
                    contentBody = "Welcome to example board"/>, rootElement);
/*
const app2Element = document.getElementById('app2');
ReactDOM.render(<StateExample  />, app2Element);


const app3Element = document.getElementById('random');
ReactDOM.render(<RandomNumber  />, app3Element);
*/
