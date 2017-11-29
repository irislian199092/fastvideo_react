import './css/base.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {HeaderLeft} from './components/headerLeft/index.js';
import {HeaderRight} from './components/headerRight/index.js';
import {BodyLeft} from './components/bodyLeft/index.js';

class Wrap extends Component {
	constructor(props){
		super(props);
	}
	render() {
		return (
			<div className='container-fluid'>
				<div className='row container-fluid-box'>
					<HeaderLeft  />
					<HeaderRight />
					<BodyLeft />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
  <Wrap />,
  document.getElementById('root')
);