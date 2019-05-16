/*global chrome*/
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery'
import ReactDOM from "react-dom";

export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            options:{'drag':false}
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        var temp=this;
        chrome.storage.sync.get(['options'],function(result){
            console.log("@@@@@@@@@@@22",result)
            if(result.options) {
                temp.setState({options: result.options});
                console.log("@@@@@@@getstorage");
            }
        })
    }
    changeOptions(e) {
        // var ischecked=e.target.checked;
        var options = this.state.options;
        options[e.target.name] = e.target.checked;
        this.setState({
            options: options
        })
        chrome.storage.sync.set({options: this.state.options})
        var temp=this;
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                sendResponse(temp.state.options);
            });
    }
    render() {
    return (
      <div className="App" >
          <div className={'form-group'}>
              <label className={'form-switch'}>
                  <input name="drag" type="checkbox" checked={this.state.options['drag']} onChange={this.changeOptions.bind(this)}/>
                      <i className={"form-icon"}></i>search by drag
              </label>
          </div>
      </div>
    );
  }
}