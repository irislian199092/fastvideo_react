import React, { Component } from 'react';
import PlayerTimeRuler from './timeRuler';

import './index.scss';
function Title(props){
	return (
		<div className="player_title">
			未命名
		</div>
	);
}
function Timer(props){
	return (
		<div className="player_time">
			<span className="js_player_totalTime" title="总时长">00:00:00:00</span>
			<span className="js_player_trimInOutTime" title="出入点时长">00:00:00:00</span>
		</div>
	);
}
function Bar(props){
	const listItems=[
		{
			name:'fa fa-file',
			id:'js_newProject',
			'title':'新建工程(ctrl+n)'
		},{
			name:'fa fa-file-text',
			id:'js_openProject',
			'title':'编辑工程(ctrl+o)'
		},{
			name:'fa fa-file-o',
			id:'js_saveProject',
			'title':'保存工程(ctrl+s)'
		},{
			name:'fa fa-file-video-o',
			id:'js_exportProject',
			'title':'合成输出(ctrl+b)'
		}
	];
	const list=listItems.map((item,index)=>(
		<li key={item.id}>
			<a href="#" id={item.id} className={item.name} title={item.title}></a>
		</li>
	));

	return(
		<ul className="player_bar">{list}</ul>
	);
}

class Header extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="row player_header">
				<Title />
				<Timer />
				<Bar />
			</div>
		);
	}
}

function Body(props){
	return(
		<div className="row  player_body">
			<div id="ocx">
				<video></video>
			</div>
		</div>
	);
}
function Footer(props){
	return(
		<div className="row  player_footer">
			
		</div>
	);
}


export class HeaderRight extends Component {
	constructor(props){
		super(props);

	}
	render() {
		return (
			<div className="col-md-6 player_wrap">
				<Header />
				<Body />
				<PlayerTimeRuler />
				<Footer />
			</div>
		);
	}
}
