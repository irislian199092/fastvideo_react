import React, { Component } from 'react';
import styles from './index.scss';
import { connect } from 'react-redux';
import {fetchProjectPostsIfNeeded} from '../../actions';

import {initalTracks} from './base';
import {TimerulerToolbar} from './TimerulerToolbar';
import {TimerulerTrackbar} from './TimerulerTrackbar';
import {TimerulerWrap} from './TimerulerWrap';

class Timeruler extends Component{
    constructor(props){
		super(props);
	}
	componentDidMount() {
  		const { dispatch, selectedProject } = this.props;
  		dispatch(fetchProjectPostsIfNeeded(selectedProject));
    }
	render(){
		let {isFetching,proContent}=this.props;
		let tracks,maxDuration,material;

		if(isFetching && !proContent){
			tracks=initalTracks;
			maxDuration=15000;
			material=[];
		}
		if(!isFetching && proContent){
			material=proContent.reference.material;
			tracks=proContent.rootBin.sequence[0].tracks;
			maxDuration=proContent.rootBin.sequence[0].maxDuration;
		}
			
		let config={tracks,maxDuration,material};
		return(
			<div className={styles.time_ruler_wrap}>
				<TimerulerToolbar {...config}/>
				<TimerulerTrackbar {...config} />
				<TimerulerWrap {...config} />
			</div>
		);
	}
}

const mapStateToProps=(state)=>{
	const { selectedProject, projectJson } = state;
    const {
        isFetching,
        items: proContent
    } = projectJson[selectedProject] || {
        isFetching: true,
        items: null
    }
	
    return {
        selectedProject,
        proContent,
        isFetching
    }
}

export const TimerulerContainer = connect(mapStateToProps)(Timeruler);