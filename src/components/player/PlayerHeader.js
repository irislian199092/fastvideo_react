import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';


export class PlayerHeader extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className={styles.player_header}>
				<div className={styles.player_name}>
					未命名
				</div>
				<div className={styles.player_time}>
					<span className={styles.player_total_duration}>00:00:00:00</span>
					<span className={styles.player_triminout_duration}>00:00:00:00</span>
				</div>
				<ul className={styles.player_file}>
					<li><i className="fa fa-floppy-o"></i></li>
					<li><i className="fa fa-file-text"></i></li>
				</ul>
			</div>
		);
	}
}
