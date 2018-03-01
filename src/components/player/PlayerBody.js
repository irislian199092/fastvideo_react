import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';

import {PlayerTimerulerBoxContainer} from './PlayerTimerulerBox';
import {PlayerToolBar} from './PlayerToolBar';


export class PlayerBody extends Component{
	constructor(props){
		super(props);

		this.state={
			videoWidth:0,
			videoMarginLeft:0
		};
		this.measureMainComponent=this.measureMainComponent.bind(this);
		this.resizeWindow=this.resizeWindow.bind(this);
	}
	componentDidMount(){
		setTimeout(this.measureMainComponent);//计算video的宽高
		window.addEventListener('resize',this.resizeWindow);//改变浏览器像素时一起改变
	}
	resizeWindow(){
		this.measureMainComponent();
	}
	measureMainComponent(){
		let player_box = ReactDOM.findDOMNode(this.refs['player_box']);
		let player_style=window.getComputedStyle(player_box);

		let playerHeight=parseFloat(player_style.height);
		let playerWidth=parseFloat(player_style.width);
		let videoWidth=parseFloat(16*playerHeight/9);
		let videoMarginLeft=(playerWidth-videoWidth)/2;

		this.setState({
			videoWidth:videoWidth,
			videoMarginLeft:videoMarginLeft
		});
	}
	componentWillUnmount() {
	  	window.removeEventListener('resize', this.resizeWindow);
	}
	render(){
		const {videoWidth,videoMarginLeft}=this.state;
		return(
			<div className={styles.player_body}>
				<div className={styles.player_box} ref="player_box">
					<video autoPlay width={videoWidth} style={{marginLeft:videoMarginLeft}}></video>
				</div>
				<PlayerTimerulerBoxContainer />
				<PlayerToolBar />
			</div>
		);
	}
}
