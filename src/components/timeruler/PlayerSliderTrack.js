import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';
import { connect } from 'react-redux';


class PlayerSliderTrack extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const {config}=this.props;
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

const mapStateToProps = state => {
  return {
    config: state.timeRulerConfig
  }
}

export const PlayerSliderTrackContainer = connect(mapStateToProps)(PlayerSliderTrack);