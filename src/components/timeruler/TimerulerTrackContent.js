import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';

export class TimerulerTrackContent extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {tracks,maxDuration,material}=this.props;
		return(
			<div className={styles.time_ruler_trackContent_wrap}>
				<div className={styles.time_ruler_trackContent}>
					{
						tracks.map((item,index)=>{
							return (<div key={index} className={styles.time_ruler_trackContent_list}></div>);
						})
					}
				</div>
			</div>
		);
	}
}
