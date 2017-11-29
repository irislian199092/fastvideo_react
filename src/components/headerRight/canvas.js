import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import {MillisecondsToTimeFrame}  from '../public/millisecondsToTimeFrame';
import * as config from './timeRuler.config';

class Canvas extends Component {
	constructor(props){
		super(props);
		this.initTargetObjectConfig=this.initTargetObjectConfig.bind(this);
		this.getUnitInfo=this.getUnitInfo.bind(this);
		this.initDrawCanvas=this.initDrawCanvas.bind(this);
		this.resizeWindow=this.resizeWindow.bind(this);
		const targetConfig=config.CANVAS_ATTR;

		this.state={
			context:null,
			scrollLeft:0,
			width:window.innerWidth*0.5-30,
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
		}
	}
	componentWillMount(){
		this.initTargetObjectConfig(this.state);
	}
	componentDidMount(){
		const context=findDOMNode(this).getContext('2d');
		this.state.context=context;
		this.initDrawCanvas(this.state);
		window.addEventListener('resize',this.resizeWindow);
	}
	componentWillUnmount() {
	  	window.removeEventListener('resize', this.resizeWindow);
	}
	/*组件加载之前，初始化配置*/
	initTargetObjectConfig(state){
		state.framePerPixel=state.maxTime/state.width;//初始化比率(1f/px)
		state.smallScaleFrame=this.getUnitInfo(state.framePerPixel).smallScaleFrame;//初始化一小格帧数
		state.smallScaleNumsPerLargeScale=this.getUnitInfo(state.framePerPixel).smallScaleNumsPerLargeScale;//初始化大格里面小格数
		state.smallScaleWidth=state.smallScaleFrame/state.framePerPixel;  //初始化一小格宽度
		state.largeScaleWidth=state.smallScaleWidth*state.smallScaleNumsPerLargeScale;//初始化一大格宽度
		state.largeScaleMillisecondInterval=state.smallScaleFrame*state.smallScaleNumsPerLargeScale*40;//初始化一大格代表的毫秒数
		state.max_fpp=Math.min(state.maxTime/state.width,25*60.0*60*10.0/80);
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
	resizeWindow(){
		this.setState({
			width: window.innerWidth*0.5-30
		});
		
		this.initTargetObjectConfig(this.state);
		this.initDrawCanvas(this.state);
	}
	initDrawCanvas(state){
		const context=state.context;
		const _width=state.width;
		const _height=state.height;
		let _scrollLeft=state.scrollLeft;
		const _backgroundColor=state.backgroundColor;

		context.clearRect(0, 0,_width,_height);
        context.fillStyle = _backgroundColor;
        //画正方形
        context.fillRect(0, 0, _width,_height);                   

        //设置画笔线性样式
        context.lineWidth = 1;
        context.strokeStyle = state.scaleColor;
        context.fillStyle = state.fontColor;
        context.font = state.fontSize + "px " + state.fontFamily;
        context.textAlign = "center";

        //添加画笔路径
        context.beginPath();
        context.moveTo(0, _height);     
        context.lineTo(_width, _height); 

        let textPos = parseInt(_scrollLeft / state.largeScaleWidth) * state.largeScaleMillisecondInterval;  //0
        
        let offsetNums = parseInt(_scrollLeft / state.smallScaleWidth) + 1; //1
		
		
        let offsetLeft = offsetNums * state.smallScaleWidth - _scrollLeft; //20

        let beginIndex = offsetNums % state.smallScaleNumsPerLargeScale;   //1

        let lastTopRulerPos = 0;

        let index = 0;
        while (lastTopRulerPos < _width) {

            lastTopRulerPos = index * state.smallScaleWidth + .3 + offsetLeft;   //10.5-20.5-30.5-40.5.......800.5
            
			
            if (beginIndex % state.smallScaleNumsPerLargeScale == 0) {
                //每隔100 画一大格
                context.moveTo(lastTopRulerPos, _height - 1);                       //(100.5,25)
                context.lineTo(lastTopRulerPos, _height - state.largeScaleHeight); //(100.5,12.5)  
                
                textPos += state.largeScaleMillisecondInterval;   //1e4,2e4,3e4,.....            
                var nTime = MillisecondsToTimeFrame(textPos);      //大格上时间文本
                console.log('ff',state.largeScaleHeight)
                context.fillText(nTime, lastTopRulerPos, _height - state.largeScaleHeight - 3);  //(text,x,27.5)
            } else {
                //每隔10距离画小格
                context.moveTo(lastTopRulerPos, _height - 1);                         //(10.5,25)
                context.lineTo(lastTopRulerPos, _height - state.smallScaleHeight);   //(10.5,18.5)  

            }
            index++;
            beginIndex++;
        }
        context.stroke();  
	}
	render() {
		return (
			<canvas className={this.props.prefix} width={this.state.width} height={this.state.height}></canvas>
		);
	}
}

export default Canvas;