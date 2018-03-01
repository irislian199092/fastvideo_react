import React, { Component } from 'react';
import styles from './index.scss';
export class Publictools extends Component{
    constructor(props){
		super(props);
	}
	render(){
		let publicToolsList=[{
			className:'icon-1',
			title:'联动(shift+1)',
		},{
			className:'icon-2',
			title:'联动(shift+1)',
		},{
			className:'icon-3',
			title:'联动(shift+1)',
		},{
			className:'icon-4',
			title:'联动(shift+1)',
		}];

		const SPAN=publicToolsList.map((item,index)=>
			<span key={index} className={styles[item.className]} title={item.title}></span>
		);

		return(
			<div className={styles.publicTools_wrap}>
				{SPAN}
			</div>
		);
	}
}