import fetch from 'cross-fetch';

/*——————————————————————————————获取素材————————————————————————————————*/
export const serverUrl='http://112.126.71.150:8090/fastcatve/api/';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {

  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data,
    receivedAt: Date.now()
  }
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit));

      return fetch(`${serverUrl}program/list`,{
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: 'currentPage=1&pageSize=36&name&provider&programType&from&to'
        })
        .then(response => response.json())
        .then(json => dispatch(receivePosts(subreddit, json)))
      }    
}

function shouldFetchPosts(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}

/*——————————————————————————————获取工程————————————————————————————————*/
export const REQUEST_POSTS_PROJECT = 'REQUEST_POSTS_PROJECT';
export const RECEIVE_POSTS_PROJECT = 'RECEIVE_POSTS_PROJECT';
export const SELECT_PROJECT = 'SELECT_PROJECT';
export function selectProject(id) {
  return {
    type: SELECT_PROJECT,
    id
  }
}

function requestPostsProject(id){
  return {
    type: REQUEST_POSTS_PROJECT,
    id
  }
}

function receivePostsProject(id,json){
  return {
    type: RECEIVE_POSTS_PROJECT,
    id,
    posts: JSON.parse(json.data.projectcontent)
  }
}
function fetchProjectPosts(id){
  return dispatch => {

    dispatch(requestPostsProject(id));
    return fetch(`${serverUrl}proj/info`,{
        method: 'post',
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: `projectid=${id}`
      })
      .then(response => response.json())
      .then(json => dispatch(receivePostsProject(id,json)))
  }  
}

function shouldFetchProjectPosts(state, id) {
  const posts = state.projectJson[id];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchProjectPostsIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchProjectPosts(getState(), id)) {
      return dispatch(fetchProjectPosts(id))
    }
  }
}


/*——————————————————————————————播放器配置————————————————————————————————*/

export const RESIZE_PLAYER_TIMER_WIDTH ='RESIZE_PLAYER_TIMER_WIDTH';
export const PLAYER_TRACK_MOUSEMOVE='PLAYER_TRACK_MOUSEMOVE';
export const PLAYER_TRACK_MOUSEUP='PLAYER_TRACK_MOUSEUP';

export function resizePlayerTimerWidth(width){
  return {
    type: RESIZE_PLAYER_TIMER_WIDTH,
    width
  }
}
export function playerTrackMousemove(newConfig){
  return {
    type: PLAYER_TRACK_MOUSEMOVE,
    newConfig
  }
}
export function playerTrackMouseup(newConfig){
  return {
    type: PLAYER_TRACK_MOUSEUP,
    newConfig
  }
}
/*——————————————————————————————时间线配置————————————————————————————————*/

export const RESIZE_TIMER_WIDTH='RESIZE_TIMER_WIDTH';
export function resizeTimerWidth(width){
  return {
    type: RESIZE_TIMER_WIDTH,
    width
  }
}




