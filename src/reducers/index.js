import { combineReducers } from 'redux';
import {postsBySubreddit,selectedSubreddit} from './getMaterial';
import {playerTimeRulerConfig} from './playerTimeRulerConfig';
import {timeRulerConfig} from './timeRulerConfig';
import {selectedProject,projectJson} from './projectJson';

export const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  playerTimeRulerConfig,
  timeRulerConfig,
  selectedProject,
  projectJson
});



