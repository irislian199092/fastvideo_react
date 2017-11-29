import React, { Component } from 'react';
import * as config from './timeRuler.config';
import Canvas from './canvas.js';


class TrimInOut extends Component{
	constructor(props){
		super(props);
		const targetConfig=config.CANVAS_ATTR;
		this.state={
			height:targetConfig.height
		}
	}
	render(){
		
		const props=this.props;
		const _height=this.state.height;
		return(
			<div className={props.prefix+"_trimInOut"} style={{height:_height}}>
				<div className={props.prefix+"_trimIn"} style={{height:_height}}></div>
				<div className={props.prefix+"_trimOut"} style={{height:_height}}></div>
			</div>
		);
	}
}

function CanvasContainer(props){
	return (
		<div className={props.prefix+'_container'}>
			<Canvas prefix={props.prefix+'_canvas'} />
			<TrimInOut prefix={props.prefix} />
		</div>
	);
}
class Track extends Component{
	constructor(props){
		super(props);

		this.initTrack=this.initTrack.bind(this);
		this.state={
			domStyle:this.props.domStyle,
			canvasConfig:this.props.canvasConfig
		}
	}
	componentDidMount(){
		const domStyle=this.state.domStyle;
		const canvasConfig=this.state.canvasConfig;
		this.initTrack(domStyle,canvasConfig);
	}
	initTrack(domStyle,canvasConfig){
        //初始化滚动条宽度和左右放大按钮的位置
        const scrollLeftWidth=domStyle.barWidth;
        const scrollRightWidth=domStyle.barWidth; 
	}
	render(){
		const props=this.props;
		const domStyle=this.state.domStyle;
		const canvasConfig=this.state.canvasConfig;
		return (
			<div className={props.prefix+'_slider_track'}>
				<div className={props.prefix+'_slider_scroll_total'} style={{width:domStyle.sliderTotalBarWidth,left:0}}>
					<div className={props.prefix+'_slider_scroll_left'} style={{left:0}}></div>
					<div className={props.prefix+'_slider_scroll_middle'} style={{width:domStyle.sliderMiddleBarWidth,left:domStyle.barWidth}}></div>
					<div className={props.prefix+'_slider_scroll_right'} style={{left:domStyle.sliderTotalBarWidth-domStyle.barWidth}}></div>
				</div>
			</div>
		);
	}
}


export class TimerRuler extends Component{
	constructor(props){
		super(props);
	}
	render(){
		const prefix=this.props.prefix;
		const domStyle=this.props.domStyle;
		const canvasConfig=this.props.canvasConfig;
		return (
			<div className={prefix}>
				<CanvasContainer prefix={prefix} domStyle={domStyle} canvasConfig={canvasConfig} />
				<Track prefix={prefix} domStyle={domStyle} canvasConfig={canvasConfig} />
			</div>
		);
	}
}


export class PlayerTimeRuler extends Component{
	constructor(props){
		super(props);
		
		this.initCanvasConfig=this.initCanvasConfig.bind(this);
		this.initDomStyle=this.initDomStyle.bind(this);
		this.resizeWindow=this.resizeWindow.bind(this);

		this.getUnitInfo=this.getUnitInfo.bind(this);
		const targetConfig=config.CANVAS_ATTR;

		this.state={
			canvasConfig:{
				height:targetConfig.height,
				backgroundColor: targetConfig.backgroundColor,
				scaleColor:targetConfig.scaleColor,
				fontColor:targetConfig.fontColor,
				fontSize:targetConfig.fontSize,
				fontFamily:targetConfig.fontFamily,
				largeScaleHeight: targetConfig.largeScaleHeight,       //每个大格高度         
	    		smallScaleHeight: targetConfig.smallScaleHeight,     //每个小个高度
				maxTime:targetConfig.maxTime,
				framePerPixel:targetConfig.framePerPixel,                    //默认比率
		        max_fpp:targetConfig.max_fpp,
		        min_fpp:targetConfig.min_fpp,
		        smallScaleNumsPerLargeScale: targetConfig.smallScaleNumsPerLargeScale,    //每个大格包含多少小格 
		        smallScaleFrame:targetConfig.smallScaleFrame,                  //每小格帧数
		        smallScaleWidth: targetConfig.smallScaleWidth,                 //每小格宽度
		        largeScaleWidth: targetConfig.largeScaleWidth,                 //每大格代表的宽度
		        largeScaleMillisecondInterval: targetConfig.largeScaleMillisecondInterval,   //每大格代表的毫秒数
			},
			domStyle:{
				context:null,
				scrollLeft:0,
				width:window.innerWidth*0.5-30,
				canvasContainerWidth:0,
				sliderTrackWidth:0,
				sliderTotalBarWidth:0,
				sliderMiddleBarWidth:0,
				timeRulerWidth:0,
				barWidth:14
			}
			
		}
	}
	componentWillMount(){
		this.initCanvasConfig(this.state);
		this.initDomStyle(this.state);
	}
	/*组件加载之前，初始化配置*/
	initCanvasConfig(state){
		const canvasConfig=state.canvasConfig;
		const domStyle=state.domStyle;

		canvasConfig.framePerPixel=canvasConfig.maxTime/domStyle.width;//初始化比率(1f/px)
		canvasConfig.smallScaleFrame=this.getUnitInfo(canvasConfig.framePerPixel).smallScaleFrame;//初始化一小格帧数
		canvasConfig.smallScaleNumsPerLargeScale=this.getUnitInfo(canvasConfig.framePerPixel).smallScaleNumsPerLargeScale;//初始化大格里面小格数
		canvasConfig.smallScaleWidth=canvasConfig.smallScaleFrame/canvasConfig.framePerPixel;  //初始化一小格宽度
		canvasConfig.largeScaleWidth=canvasConfig.smallScaleWidth*canvasConfig.smallScaleNumsPerLargeScale;//初始化一大格宽度
		canvasConfig.largeScaleMillisecondInterval=canvasConfig.smallScaleFrame*canvasConfig.smallScaleNumsPerLargeScale*40;//初始化一大格代表的毫秒数
		canvasConfig.max_fpp=Math.min(canvasConfig.maxTime/canvasConfig.width,25*60.0*60*10.0/80);
	}
	
	getUnitInfo(_m){
		const unitTablePal=[
	        {
	            smallScaleFrame:1,    //  1f:1f
	            smallScaleNumsPerLargeScale:1
	        },
	        {
	            smallScaleFrame:1,    //  1f:2f
	            smallScaleNumsPerLargeScale:2
	        },
	        {
	            smallScaleFrame:1,    //  1f:5f
	            smallScaleNumsPerLargeScale:5
	        },
	        {
	            smallScaleFrame:1,    //  1f:10f
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:5,    //  5f:1s
	            smallScaleNumsPerLargeScale:5
	        },
	        {
	            smallScaleFrame:5,    //  5f:2s
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:10,    //  10f:4s
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25,       //  1s:10s
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*3,     //  3s:30s
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*6,     //  6s:1min
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*12,     //  12s:2min
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*30,     //  30s:5min
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*60,     //  1min:10min
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*60*3,   //  3min:30min
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*60*6,     //  6min:1h
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*60*30,     //  30min:5h
	            smallScaleNumsPerLargeScale:10
	        },
	        {
	            smallScaleFrame:25*60*60,     //  1h:10h
	            smallScaleNumsPerLargeScale:10
	        }];
		const arr=[];
		const obj={};
		for (let i = 0; i < unitTablePal.length; i++) {
		    let dMinFPP=(unitTablePal[i].smallScaleFrame*unitTablePal[i].smallScaleNumsPerLargeScale)/80;
		    if(_m<=dMinFPP){
		        arr.push(i);
		    } 
		}
		obj.smallScaleFrame=unitTablePal[arr[0]].smallScaleFrame;
		obj.smallScaleNumsPerLargeScale=unitTablePal[arr[0]].smallScaleNumsPerLargeScale;
		return obj;
	}
	componentDidMount() {
	 	this.resizeWindow();
	  	window.addEventListener('resize', this.resizeWindow);
	  	
	}
	initDomStyle(state){
		const canvasConfig=state.config;
		const domStyle=state.domStyle;

		this.setState((prevState)=>{
			const canvasConfig=prevState.canvasConfig;
			const domStyle=prevState.domStyle;
			domStyle.canvasContainerWidth=Math.floor(canvasConfig.maxTime/canvasConfig.framePerPixel);
			domStyle.sliderTrackWidth=domStyle.width;
			domStyle.timeRulerWidth=domStyle.width;
			domStyle.sliderTotalBarWidth=domStyle.timeRulerWidth*domStyle.sliderTrackWidth/domStyle.canvasContainerWidth;
			
			domStyle.sliderMiddleBarWidth=domStyle.sliderTotalBarWidth-2*domStyle.barWidth;
			return {
				domStyle:domStyle
			};
		});
		
	}
	componentWillUnmount() {
	  window.removeEventListener('resize', this.resizeWindow);
	}

	resizeWindow(){
		this.setState({
			boxwidth:window.innerWidth*0.5-30
		});
	}
	render(){
		const canvasConfig=this.state.config;
		const domStyle=this.state.domStyle;
		return(
			<div className={config.RULER_PREFIX+"_box"} style={{width:domStyle.width,height:config.WARP_HEIGHT}}>
				<TimerRuler prefix={config.RULER_PREFIX} domStyle={domStyle} canvasConfig={canvasConfig} />
			</div>
		);
	}
}

export default PlayerTimeRuler;
