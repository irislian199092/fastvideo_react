import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';


export class PlayerCursor extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const config=this.props.config;
		const {rulerPrefix}=config;
		return(
			<div className={styles[`${rulerPrefix}_cursor`]}>
				<div className={styles[`${rulerPrefix}_cursor_top`]}>
				</div>
			</div>
		);
	}
}
