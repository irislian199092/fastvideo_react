import React, { Component } from 'react';
import axios from 'axios';
import './index.scss';

function HeaderLogo(props){
	return (
		<div className="logo" title={props.title}>
			<a className="fa fa-home"></a>
		</div>
	);
}
class HeaderUser extends Component{
	constructor(props){
		super(props);
		this.state={
			logInOut:true
		};
		this.handleClick=this.handleClick.bind(this);
	}
	handleClick(e){
		e.preventDefault();
		this.setState((prevState)=>({
			logInOut:!prevState.logInOut
		}));
	}
	render() {
		return (
			<div className="user">
				<span className="user-name">
					{this.state.logInOut ? 'Login' :'Logout'}
					<a href="#" className="fa fa-user" id="js_loginout"  onClick={this.handleClick}></a>
				</span>
			</div>
		);
		
	}	
}

function HeaderTabList(props){
	const attr=props.attr;
	const listItem=attr.map((item)=>(
		<li key={item.id} onClick={props['handleClick'+item.type]}>
			<a href="#" id={item.id}>{item.text}</a>
		</li>
	));
	return (
		<ul className="list clearfix">{listItem}</ul>
	);
}

class ContentMaterial extends Component{
	constructor(props){
		super(props);
		this.state={
			progamaData:{
			    "code": 0, 
			    "data": {
			        "totalLines": 2, 
			        "list": [
			            {
			                "assetid": "32b90473-023d-4bbc-8a39-58cefa205a97", 
			                "duration": 935, 
			                "name": "习近平", 
			                "thumbnail": "http://112.126.71.150:82//THUMB/2017/1019/32b90473-023d-4bbc-8a39-58cefa205a97.JPG"
			            }, 
			            {
			                "assetid": "92b90c3d-bac1-40b7-b74e-8d74893b8a89", 
			                "duration": 2712, 
			                "name": "000", 
			                "thumbnail": "http://112.126.71.150:82//THUMB/92b90c3d-bac1-40b7-b74e-8d74893b8a89.JPG"
			            }
			        ]
			    }
			}
		}
	}
	/*componentDidMount() {
		const s=require('qs').stringify({
		    	currentPage:1,
				pageSize:36,
				name:'',
				provider:'',
				programType:'',
				from:'',
				to:''
		});
		axios.get(`http://112.126.71.150/fastcarve/api/program/list?${s}`)
	  	.then((res)=>{
	    	this.setState({
	    		progamaData:res.data
	    	});
	  	})
	  	.catch(function (error) {
	    	console.log(error);
	  	});
	}*/
	render(){

		let list=this.state.progamaData.data.list.map((item,index)=>(
			<div className="col-md-3 col-sm-3 col-lg-3" draggable="true" id={item.assetid} key={item.assetid}>
				<a className="thumbnail">
					<img src={item.thumbnail} alt=""/>
					<span className="thumbnail_name">{item.name}</span>
					<span>{item.duration}</span>
				</a>
			</div>
		));
		return(
			<div className="tabs" id="tabMaterial">
				<div className="meterial_thumbnail_box" id="js_thumbnail_box">{list}</div>
			</div>
		);
	}
	
}
function ContentSubtitle(props){
	return(
		<div>this is Subtitle</div>
	);
}
function ContentEffect(props){
	return(
		<div>this is Effect</div>
	);
}
function ContentImages(props){
	return(
		<div>this is Images</div>
	);
}

export class HeaderLeft extends Component {
	constructor(props){
		super(props);
		this.handleClickm=this.handleClickm.bind(this);
		this.handleClicks=this.handleClicks.bind(this);
		this.handleClicke=this.handleClicke.bind(this);
		this.handleClicki=this.handleClicki.bind(this);
		this.state={type:'m'};
	}
	handleClickm(e){
		e.preventDefault();
		this.setState({
			type:'m'
		});
	}
	handleClicks(e){
		e.preventDefault();
		this.setState({
			type:'s'
		});
	}
	handleClicke(e){
		e.preventDefault();
		this.setState({
			type:'e'
		});
	}
	handleClicki(e){
		e.preventDefault();
		this.setState({
			type:'i'
		});
	}
	
	render() {
		const attrs=[
			{
				id:'tab_material',
				text:'视频库',
				type:'m'
			},{
				id:'tab_subtitle',
				text:'字幕库',
				type:'s'
			},{
				id:'tab_effect',
				text:'特技库',
				type:'e'
			},{
				id:'tab_images',
				text:'图片库',
				type:'i'
			}
		];
		let type=this.state.type;
		
		function checkType(type){
			let content=null;
			switch (type){
				case 'm':
					content=<ContentMaterial />;
				break;
				case 's':
					content=<ContentSubtitle />;
				break;
				case 'e':
					content=<ContentEffect />;
				break;
				case 'i':
					content=<ContentImages />;
				break;
			}
			return content;	
		}
		let content=checkType(type);

		return (
			<div className="col-md-6 carve">
				<div className="carve_header">
					<HeaderLogo title="任务详情" />
					<HeaderUser  />
					<HeaderTabList attr={attrs} 
						handleClickm={this.handleClickm}
						handleClicks={this.handleClicks}
						handleClicke={this.handleClicke}
						handleClicki={this.handleClicki}
					/>
				</div>
				<div className="row carve_content">
					{content}
				</div>
			</div>
		);
	}
}
