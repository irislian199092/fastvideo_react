import React, { Component } from 'react';
import styles from '../css/base.scss';
require('font-awesome-webpack');


import {MaterialContainer} from '../components/material/index.js';
import {Player} from '../components/player/index.js';
import {Publictools} from '../components/publictools/index.js';
import {TimerulerContainer} from '../components/timeruler/index.js';


export  class App extends Component {
	constructor(props){
		super(props);
	}
	render() {
	    return (
	      	<div className={styles.wrap}>
				{/* ——————素材库 ————————*/}
				<MaterialContainer />
				{/* ——————播放器 ————————*/}
				<Player />
				{/* ——————工具条 ————————*/}
				<Publictools />
				{/* ——————轨道 ————————*/}
				<TimerulerContainer />
			</div>
	    );
	}
}



