import React, { Component } from 'react';
import styles from './index.scss';
import { connect } from 'react-redux';
import {MillisecondsToTimeFrame} from '../public/millisecondsToTimeFrame';

import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../../actions';

class MaterialVideo extends Component{
    constructor(props){
		super(props);
    }   
    render(){
        const { selectedSubreddit, posts, isFetching} = this.props;
        return(
            <div className={styles.material_video_wrap}>
                <form action="" className={styles.material_video_form} >
                    <input type="text" placeholder="请输入素材名称"/>
                </form>

                {isFetching && posts.length === 0 &&
                  <h2>资源加载中。。。。</h2>
                }
                {!isFetching && posts.length === 0 &&
                  <h2>素材库里没有资源</h2>
                }
                {posts.length > 0 &&
                    <ul className={styles.material_video_list}>
                    {
                        posts.map( item =>
                            <li key={item.assetid}>
                                <img src={item.thumbnail} />
                                <span className={styles.material_video_duration}>{MillisecondsToTimeFrame(item.duration)}</span>
                                <span className={styles.material_video_name}>{item.name}</span>
                            </li>
                        )
                    } 
                    </ul>
                }
                
            </div>
        );
    }
}

class Material extends Component{
    constructor(props){
		super(props);
    }
    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }
    render(){

        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        return (
            <div className={styles.material_wrap}>
                <div className={styles.material_header}>
                    <div className={styles.material_index}>
                        <i className="fa fa-home"></i>
                    </div>
                    <ul className={styles.material_tabs}>
                        <li className={styles.active}>视频</li>
                        <li>音频</li>
                        <li>图片</li>
                        <li>字幕</li>
                        <li>特技</li>
                    </ul>
                </div>
                <div className={styles.material_body}>

                     <MaterialVideo posts={posts} isFetching={isFetching} selectedSubreddit={selectedSubreddit}/>  
                </div>
            </div>
        );
    }
}


const mapStateToProps=(state)=>{
    
    const { selectedSubreddit, postsBySubreddit } = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    }

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}
export const MaterialContainer = connect(mapStateToProps)(Material);



