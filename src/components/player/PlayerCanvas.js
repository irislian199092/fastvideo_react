import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {findDOMNode} from 'react-dom';
import {MillisecondsToTimeFrame}  from '../../public';
import styles from './index.scss';


export class PlayerCanvas extends Component{
	constructor(props){
		super(props);
		this.initDrawCanvas=this.initDrawCanvas.bind(this);
		this.state={
            config:this.props.config
        };
	}
	componentWillReceiveProps(nextProps){
		this.setState({
            config:nextProps.config
        });
	}
	componentDidMount(){
		const context=findDOMNode(this).getContext('2d');
        this.initDrawCanvas(context,this.state.config);
	}
	initDrawCanvas(context,state){

		const _width=state.width;
		const _height=state.height-2;
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
	render(){
		const {config,rulerPrefix,height,width}=this.props.config;
		return (
			<canvas className={styles[`${rulerPrefix}_canvas`]} height={height} width={width}></canvas>
		);
	}
}


