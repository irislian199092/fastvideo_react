import {
  REQUEST_POSTS_PROJECT,
  RECEIVE_POSTS_PROJECT,
  SELECT_PROJECT
} from '../actions';

const initialId='d6b81d63-2809-40cc-8828-f78af10122bf';


export function selectedProject(state =initialId, action) {
  switch (action.type) {
  case SELECT_PROJECT:
    return action.id;
  default:
    return state;
  }
}


function projectPosts(
  	state = {
    	isFetching: false,
    	didInvalidate: false,
    	items: null
  	},
  	action
) {
  switch (action.type) {
    case REQUEST_POSTS_PROJECT:
      	return Object.assign({}, state, {
        	isFetching: true,
      	  	didInvalidate: false
      	});
    case RECEIVE_POSTS_PROJECT:
      	return Object.assign({}, state, {
        	isFetching: false,
        	didInvalidate: false,
        	items: action.posts
      	});
    default:
      return state
  }
}

 
export function projectJson(state={},action){
	switch (action.type) {
		case RECEIVE_POSTS_PROJECT:
	  	case REQUEST_POSTS_PROJECT:
	  		return Object.assign({}, state, {
		        [action.id]: projectPosts(state[action.id], action)
		    });

	  	default:
	    	return state;
	}
}


