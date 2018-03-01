import React, { Component } from 'react';
import styles from './index.scss';
import {TimerulerBoxContainer} from './TimerulerBoxContainer';
import {TimerulerTrackContent} from './TimerulerTrackContent';
import {PlayerSliderTrackContainer} from './PlayerSliderTrack.js';
export class TimerulerWrap extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {tracks,maxDuration,material}=this.props;
		let config={tracks,maxDuration,material};
		return(
			<div className={styles.time_ruler_Wrap}>
				<TimerulerBoxContainer />
				<TimerulerTrackContent {...config}/>
				<PlayerSliderTrackContainer />
			</div>
		);
	}
}