import React, { Component } from 'react';
import styles from './index.scss';


export class TimerulerTrackbar extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {tracks,maxDuration,material}=this.props;
		return(
			<div className={styles.time_ruler_trackbar}>
				<div className={styles.time_ruler_trackbar_header}>
					<p className={styles.time_ruler_trackbar_nowtime}>00:00:00:00</p>
					<div className={styles.time_ruler_trackbar_toolbar}>
						<i className="fa fa-plus"></i>
					</div>
				</div>
				<div className={styles.time_ruler_trackbar_body}>
					<div className={styles.time_ruler_trackbar_wrap}>
						{
							tracks.map((item,index)=>{
								return (<div key={index} className={styles.time_ruler_trackbar_list}>{item.type.toUpperCase()}{item.index}</div>)
							})
						}
					</div>
					<div className={styles.time_ruler_trackbar_bottom}></div>

				</div>
			</div>
		);
	}
}


