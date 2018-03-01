export const  MillisecondsToTimeFrame = (milliseconds)=>{
    var hour = parseInt(milliseconds / (60 * 60 * 1e3));
    var minutes = parseInt((milliseconds - hour * 60 * 60 * 1e3) / (60 * 1e3));
    var second = parseInt((milliseconds - hour * 60 * 60 * 1e3 - minutes * 60 * 1e3) / 1e3);
    var minsSecond = Math.round((milliseconds - hour * 60 * 60 * 1e3 - minutes * 60 * 1e3 - second * 1e3) / (1e3 / 25));
    if (minsSecond == 25) {
        second += 1;
        minsSecond = 0;
    }
    if (hour < 10) hour = "0" + hour;
    if (minutes < 10) minutes = "0" + minutes;
    if (second < 10) second = "0" + second;
    if (minsSecond < 10) minsSecond = "0" + minsSecond;
    var result = hour + ":" + minutes + ":" + second + ":" + minsSecond;
    return result;
};

export const getUnitInfo=(_m)=>{
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