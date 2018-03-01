import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';

export class PlayerSliderTrack extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const config=this.props.config;
		const {rulerPrefix}=config;
		return(
			<div className={styles[`${rulerPrefix}_slider_track`]}>
				<div className={styles[`${rulerPrefix}_slider_scroll_total`]}>
					<div className={styles[`${rulerPrefix}_slider_scroll_left`]}>
					</div>
					<div className={styles[`${rulerPrefix}_slider_scroll_middle`]}>
					</div>
					<div className={styles[`${rulerPrefix}_slider_scroll_right`]}>
					</div>
				</div>
			</div>
		);
	}
}
