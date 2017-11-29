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