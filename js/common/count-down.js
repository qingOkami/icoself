
function GetRTime(){

    console.info("newTime1:"+newTime1)
    var EndTime= new Date(newTime1);
    var NowTime = getLocalTime(4);
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var h=0;
    var m=0;
    var s=0;
    if(t>=0){
        d=Math.floor(t/1000/60/60/24);
        h=Math.floor(t/1000/60/60%24);
        m=Math.floor(t/1000/60%60);
        s=Math.floor(t/1000%60);
    }
    if (d <= 9) d = '0' + d;
    if (h <= 9) h = '0' + h;
    if (m <= 9) m = '0' + m;
    if (s <= 9) s = '0' + s;
    document.getElementById("day_show").innerHTML = d + "";
    document.getElementById("hour_show").innerHTML = h + "";
    document.getElementById("minute_show").innerHTML = m + "";
    document.getElementById("second_show").innerHTML = s + "";

    console.info(d+"|"+h+"|"+m+"|"+s)
}

function getLocalTime(i) {
    //参数i为时区值数字，比如北京为东八区则输入8,西5输入-5,现默认东八区北京时间
    var i=i?parseFloat(i):8;

    //得到本地时间
    var d = new Date();

    //得到1970年一月一日到现在的秒数
    var local = d.getTime();

    //本地时间与GMT时间的时间偏移差
    var offset = d.getTimezoneOffset() * 60000;

    //得到现在的格林尼治时间
    var utcTime = local + offset;

    return new Date(utcTime + 3600000 * i);
}