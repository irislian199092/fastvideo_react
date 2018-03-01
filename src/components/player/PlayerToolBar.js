import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';
 
export class PlayerToolBar extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let toolbarList=
		[
			{
				className:'icon-1',
				title:'转到入点(shift+i)'
			},{
				className:'icon-2',
				title:'转到入点(shift+i)'
			},{
				className:'icon-3',
				title:'转到入点(shift+i)'
			},{
				className:'icon-4',
				title:'转到入点(shift+i)'
			},{
				className:'icon-5',
				title:'转到入点(shift+i)'
			},{
				className:'icon-6',
				title:'转到入点(shift+i)'
			},{
				className:'icon-7',
				title:'转到入点(shift+i)'
			},{
				className:'icon-8',
				title:'转到入点(shift+i)'
			},{
				className:'icon-9',
				title:'转到入点(shift+i)'
			}
		];

		let LI=toolbarList.map((toolbar,index)=>
			<li key={index}>
				<a href="javascript:;" className={styles[toolbar.className]} title={toolbar.title}></a>
			</li>
		);
		let marginLeft=(window.innerWidth*0.5-324)/2;
		return (
			<div className={styles.player_toolbar_box}>
				<ul className={styles.player_toolbar_list} style={{marginLeft:marginLeft}}>
					{LI}
				</ul>
			</div>
		);
	}
}