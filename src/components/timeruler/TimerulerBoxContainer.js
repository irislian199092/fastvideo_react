import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';
import { connect } from 'react-redux';

import {PlayerCanvas} from './PlayerCanvas';
import {PlayerTrimInOut} from './PlayerTrimInOut';
import {PlayerCursor} from './PlayerCursor';
import {resizeTimerWidth} from '../../actions';


class TimerulerBox extends Component{
	constructor(props){
		super(props);
		this.resizeWindow=this.resizeWindow.bind(this);
	}
	componentDidMount(){
		this.resizeWindow();
	}
	resizeWindow(){
		const {dispatch}=this.props;
		dispatch(resizeTimerWidth(window.innerWidth-190));
	}
	render(){
		const {config}=this.props;
		const {rulerPrefix}=config;
		return(
			<div className={styles[`${rulerPrefix}_box`]}>
				<div className={styles[`${rulerPrefix}`]}>
					<div className={styles[`${rulerPrefix}_container`]}>
						<PlayerCanvas config={config} />
						<PlayerTrimInOut  config={config}/>
					</div>
					<PlayerCursor config={config} />
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

export const TimerulerBoxContainer = connect(mapStateToProps)(TimerulerBox);

