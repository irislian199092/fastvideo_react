export  const RULER_PREFIX='player_time_ruler';  //刻度线容器
export  const WARP_HEIGHT=66;

export  const CANVAS_ATTR={
	height:50,
	backgroundColor: "#262626",        //刻度背景颜色
	scaleColor: "#929293",             //线性样式    
    fontColor: "#929293",              //字体样式
    fontSize: 12,                      //字体大小
    fontFamily: "微软雅黑",            //字体样式,
    largeScaleHeight: 20,              //每个大格高度         
    smallScaleHeight: 12.5,            //每个小个高度
    maxTime:1000,
    framePerPixel:0,                    //默认比率
    max_fpp:0,
    min_fpp:0.125,
    smallScaleNumsPerLargeScale: 10,    //每个大格包含多少小格 
    smallScaleFrame:0,                  //每小格帧数
    smallScaleWidth: 0,                 //每小格宽度
    largeScaleWidth: 0,                 //每大格代表的宽度
    largeScaleMillisecondInterval: 0   //每大格代表的毫秒数
};
