import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';


export class PlayerTrimInOut extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const config=this.props.config;
		const {rulerPrefix,height}=config;
		return(
			<div className={styles[`${rulerPrefix}_trimInOut`]} height={height}>
				<div className={styles[`${rulerPrefix}_trimIn`]} height={height}></div>
				<div className={styles[`${rulerPrefix}_trimOut`]} height={height}></div>
			</div>
		);
	}
}
