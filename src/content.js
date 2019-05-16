/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, { FrameContextConsumer }from 'react-frame-component';
import "./content.css";
import $ from 'jquery'
class Main extends React.Component {
    port=null;
    constructor(){
        super();
        console.log("@@@@@@@@@@@@@@@@@@@@@")
        this.state={
            movie_data:null,
            mouse_pos:{x:0,y:0},
        }
    }
    componentDidMount(){
        if (!this.port) {
            console.log("port생성");
            this.port = chrome.runtime.connect({ name: "movie_data_transfer" });
        }
        var temp=this;
        this.port.onMessage.addListener(function (msg) {
            if(msg.movie_data) {
                console.log(msg.movie_data, "@@@@@@@@@@@@@@@@")
                temp.setState({...this.state,...{movie_data :msg.movie_data}});
                $('#my-extension-root').css({"display":"block","left": temp.state.mouse_pos.x+"px", "top": temp.state.mouse_pos.y+"px"});
            }
        });
        $(document).mouseup(function (e) {
            var selection = document.getSelection();
            var text=selection.toString();
            if (text != "") {
                temp.port.postMessage({ search_text: text });
            }
            if(selection.anchorNode.nodeName!="#text"){
                var rec = selection.anchorNode.getBoundingClientRect();
            }else {
                var rec = selection.getRangeAt(0).getBoundingClientRect();
            }
            temp.setState({
                ...this.state, ...{
                    mouse_pos: {
                        x: rec.right + window.scrollX,
                        y: rec.bottom + window.scrollY
                    }
                }
            })
        });
    }
    componentWillUnmount() {
        if(this.port){
            this.port.disconnect();
        }
        $(document).off('mouseup');
    }

    removeExtensionRoot(){
        $("#my-extension-root").css("display","none");
    }
    goToLink(){
        window.location.href=this.state.movie_data.link;
    }
    render() {
        return (
            <Frame head={[<link type="text/css" rel="stylesheet" href="https://unpkg.com/spectre.css/dist/spectre.min.css"></link>,
                <link type="text/css" rel="stylesheet" href={chrome.runtime.getURL("/static/css/content.css")}></link>]}>
               <FrameContextConsumer>
               {
               // Callback is invoked with iframe's window and document instances
                   ({document, window}) => {
                      // Render Children
                        return (
                            <div className={'my-extension'}>
                            {this.state.movie_data?(
                                <div className={'card'}>
                                   <div className={'chard-header'}>
                                       <button className={'btn btn-primary'} onClick={this.removeExtensionRoot.bind(this)} style={{float:'right'}}>X</button>
                                       <div className={'card-title'}>
                                       {this.state.movie_data.title}
                                       </div>
                                   </div>
                                    <div className={'card-body'}>
                                       <img className={'img-responsive'} src={this.state.movie_data.image}></img>
                                       <p >개봉일:{this.state.movie_data.pubDate}</p>
                                       <p>감독/출연배우:{this.state.movie_data.director}{this.state.movie_data.director}</p>
                                    </div>
                                    <div className={'card-footer'}>
                                        <button className={"btn btn-link"} onClick={this.goToLink.bind(this)}>바로가기</button>
                                    </div>
                                </div>
                            ):null}
                            </div>
                        )
                    }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}
if(!window.location.href.includes("chrome-extension://")){
        var app = document.createElement('div');
        app.id = "my-extension-root";
        document.body.appendChild(app);
        ReactDOM.render(<Main/>, app);
    }
// chrome.runtime.sendMessage({},function(response){
//     if(response['drag']==true&&!window.location.href.includes("chrome-extension://")){
//         var app = document.createElement('div');
//         app.id = "my-extension-root";
//         document.body.appendChild(app);
//         ReactDOM.render(<Main/>, app);
//     }
//     else{
//         if($('#my-extension-root').length) {
//             $('#my-extension-root').remove();
//         }
//     }
// });