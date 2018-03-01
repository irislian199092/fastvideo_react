import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';

import {PlayerHeader} from './PlayerHeader';
import {PlayerBody} from './PlayerBody';

//import PlayerTimeRuler from './timeRuler';


export class Player extends Component{
    constructor(props){
		super(props);
		this.state={
			playerWidth:0
		}
	}

	render(){
		return(
			<div className={styles.player_wrap}>
				<PlayerHeader />
				<PlayerBody/>
			</div>
		);
	}
}

