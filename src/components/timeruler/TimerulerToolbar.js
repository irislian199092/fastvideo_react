import React, { Component } from 'react';
import styles from './index.scss';



export class TimerulerToolbar extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const toolbarList=[{
			className:'select',
			titile:'选择工具(V)'
		},{
			className:'select_pre',
			titile:'选择工具(V)'
		},{
			className:'select_back',
			titile:'选择工具(V)'
		},{
			className:'cut',
			titile:'选择工具(V)'
		},{
			className:'uCut',
			titile:'选择工具(V)'
		},{
			className:'zoom_plus',
			titile:'选择工具(V)'
		},{
			className:'zoom_minus',
			titile:'选择工具(V)'
		}];
		const SPAN=toolbarList.map((item,index)=>
			<span key={index} className={styles[item.className]} title={item.title}></span>
		);
		return(
			<div className={styles.time_ruler_toolbar}>
				{SPAN}
			</div>
		);
	}
}