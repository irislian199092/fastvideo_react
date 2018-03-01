import {
	RESIZE_TIMER_WIDTH,
} from '../actions';

import {getUnitInfo} from '../public';

const initialState={
	rulerPrefix:'player_time_ruler',
	height:67,
	scrollLeft:0,
	width:(window.innerWidth-190),
	context:null,
	backgroundColor: "#262626",        //刻度背景颜色
	scaleColor: "#929293",             //线性样式    
    fontColor: "#929293",              //字体样式
    fontSize: 12,                      //字体大小
    fontFamily: "微软雅黑",            //字体样式,
    largeScaleHeight: 30,              //每个大格高度         
    smallScaleHeight: 12.5,            //每个小个高度
    maxTime:15000,
    framePerPixel:0,                    //默认比率
    max_fpp:0,
    min_fpp:0.125,
    smallScaleNumsPerLargeScale: 10,    //每个大格包含多少小格 
    smallScaleFrame:0,                  //每小格帧数
    smallScaleWidth: 0,                 //每小格宽度
    largeScaleWidth: 0,                 //每大格代表的宽度
    largeScaleMillisecondInterval: 0   //每大格代表的毫秒数
}

initialState.framePerPixel=initialState.maxTime/initialState.width;//初始化比率(1f/px)
initialState.smallScaleFrame=getUnitInfo(initialState.framePerPixel).smallScaleFrame;//初始化一小格帧数
initialState.smallScaleNumsPerLargeScale=getUnitInfo(initialState.framePerPixel).smallScaleNumsPerLargeScale;//初始化大格里面小格数
initialState.smallScaleWidth=initialState.smallScaleFrame/initialState.framePerPixel;  //初始化一小格宽度
initialState.largeScaleWidth=initialState.smallScaleWidth*initialState.smallScaleNumsPerLargeScale;//初始化一大格宽度
initialState.largeScaleMillisecondInterval=initialState.smallScaleFrame*initialState.smallScaleNumsPerLargeScale*40;//初始化一大格代表的毫秒数
initialState.max_fpp=Math.min(initialState.maxTime/initialState.width,25*60.0*60*10.0/80);



export function timeRulerConfig(state=initialState,action){
	switch (action.type) {
	  case RESIZE_TIMER_WIDTH:
	    return Object.assign({},state,{width:action.width});
	  default:
	    return state;
	}
}