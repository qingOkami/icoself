$(function () {
    getService("ICOS","/api/game/checkICOStage",{
        "x-access-userid":sessionStorage.getItem("userId")
    });
})

function ICOSCallBack(r) {

    if (!r.success) {
        return
    }
    console.log(r);

    var userPageUrl = "";

    var count = 0;

    var icoEthBalance = Number(r.data.ico_EthBalance);
    //公募进行中
    var preIcoEthBalance = Number(r.data.preIco_EthBalance);

    //私募结束募款总数
    var preIcoStageEndEthBalance = Number(r.data.preIco_StageEnd_EthBalance);

    console.info("PreICOEndTime:" + r.data.preIco_end_dateTime)
    sessionStorage.setItem("PreICOEndTime", r.data.preIco_end_dateTime)
    sessionStorage.setItem("ICOEndTime", r.data.ico_endDate)
    sessionStorage.setItem("AngleEndDate", r.data.angle_endDate)


    $("#angle_content").show();
    $("#ico_content").show();
    $("#preico_content").show();

    var angleCount = opgCount.angleCountMaxEth;
    var preicoCount = opgCount.preicoCountMaxEth;


    if (r.data.stage.toLowerCase() === "angle") {
        time = sessionStorage.getItem("AngleEndDate");
        newTime1 = getFulldateFormate(time);
        count = r.data.eth_count;


        $("#eth_line_content").show();

        $("#top_title_angle").show();

        $("#angle_content").hide();

        $("#ico_content .money_").hide();
        $("#ico_content .start_").show();

        $("#preico_content .money_").hide();
        $("#preico_content .start_").show();

        $(".time-item-zq").hide();
        $("#heading").css("height", "900px");

        $("#line_count_money").html(toThousands(angleCount));
        chartLine("chart_line_eth",Number(count),angleCount);

        $('#preETH_zq').html(Number(count).toFixed(4))

        userPageUrl = "indexACT.html"

    }

    if (r.data.stage.toLowerCase() === "preico") {
        time = sessionStorage.getItem("PreICOEndTime");
        newTime1 = getFulldateFormate(time);

        count = Number(r.data.eth_count);

        $(".time-item-zq").hide();
        $("#heading").css("height", "900px");

        $("#eth_line_content").show();

        $("#top_title_preico").show();

        $("#preico_content").hide();

        $("#ico_content .money_").hide();
        $("#ico_content .start_").show();

        $("#angle_content .money_").show();
        $("#angle_content .money_change").text(toThousands(angleCount)+"ETH");
        $("#angle_content .start_").hide();

        $("#line_count_money").html(toThousands(preicoCount));

        chartLine("chart_line_eth",Number(preIcoEthBalance),preicoCount);

        $('#preETH_zq').html(Number(preIcoEthBalance).toFixed(4))

        userPageUrl = "indexACPI.html"
    }

    var icoHsrCount = Number(r.data.ico_hsr_count);
    var icoQtumCount = Number(r.data.ico_qtum_count);
    var icoSanCount = Number(r.data.ico_san_count);

    if (r.data.stage.toLowerCase() === "ico" || r.data.stage.toLowerCase() === "end") {


        time = sessionStorage.getItem("ICOEndTime");
        newTime1 = getFulldateFormate(time);
        count = Number(r.data.ico_ethAll_count);
        if(r.data.stage.toLowerCase() === "ico"){
            //倒计时
            setInterval(GetRTime,1000);
            $("#top_title_ico").show();
        }else{
            $("#top_title_ico_end").show();
        }

        $("#eth_line_content").show();
        $("#qtum_line_content").show();
        $("#hsr_line_content").show();
        $("#san_line_content").show();

        var ethCount = opgCount.icoCountMaxEth;
        var qtumCount = opgCount.icoCountMaxQtum;
        var hsrCount = opgCount.icoCountMaxHsr;
        var sanCount = opgCount.icoCountMaxSanc;


        if(icoEthBalance>=ethCount||r.data.stage.toLowerCase() === "end"){
            $("#eth_line_content .line_result").text($.t("indexL.donations03_1"));
        }
        if(icoQtumCount>=qtumCount||r.data.stage.toLowerCase() === "end") {
            $("#qtum_line_content .line_result").text($.t("indexL.donations03_1"));
        }
        if(icoHsrCount>=hsrCount||r.data.stage.toLowerCase() === "end") {
            $("#hsr_line_content .line_result").text($.t("indexL.donations03_1"));
        }
        if(icoSanCount>=sanCount||r.data.stage.toLowerCase() === "end") {
            $("#san_line_content .line_result").text($.t("indexL.donations03_1"));
        }

        $("#ico_content").hide();

        $("#angle_content .money_").show();
        $("#angle_content .money_change").text(toThousands(angleCount)+"ETH");
        $("#angle_content .start_").hide();

        $("#preico_content .money_").show();

        if(preIcoStageEndEthBalance<preicoCount){
            $("#preico_content .money_change").text(toThousands(preIcoStageEndEthBalance)+"ETH");
        }else{
            $("#preico_content .money_change").text(toThousands(preicoCount)+"ETH");
        }

        $("#preico_content .start_").hide();


        $("#line_count_money").html(toThousands(ethCount));
        chartLine("chart_line_eth",icoEthBalance,ethCount);

        $("#line_count_money_qtum").html(toThousands(qtumCount));
        chartLine("chart_line_qtum",icoQtumCount,qtumCount);

        $("#line_count_money_hsr").html(toThousands(hsrCount));
        chartLine("chart_line_hsr",icoHsrCount,hsrCount);

        $("#line_count_money_san").html(toThousands(sanCount));
        chartLine("chart_line_san",icoSanCount,sanCount);

        $('#preETH_zq').html(icoEthBalance.toFixed(4))

        $('#preETH_zq_qtum').html(icoQtumCount.toFixed(4))
        $('#preETH_zq_hsr').html(icoHsrCount.toFixed(4))
        $('#preETH_zq_san').html(icoSanCount.toFixed(4))

        $("#angle_content").hide();

        $("#heading").css("height", "1400px");

        userPageUrl = "indexAC.html?stage="+r.data.stage.toLowerCase()

    }


    $('#btnACPI_zq').click(function () {
        window.location.href = userPageUrl
    })

    $("#account_url").prop("href",userPageUrl);


    $('#dona-zq').html(Number(count).toFixed(4));


    //进度条和数字显示
    function chartLine(charId,nowCount,topMoney) {
        var charObj = $("#"+charId);

        var a = parseInt(charObj.attr("w"));

        charObj.animate({
            width: Math.floor((nowCount / topMoney) * 100) + "%"
        }, 1000);

    }

}


$(function () {
    $("#demo").jcImgScroll({
        arrow: {
            width: 45,
            height: 400,
            x: 60,
            y: 0
        },
        width: 185, //设置图片宽度
        height: 185, //设置图片高度
        imgtop: 22,//每张图片的上下偏移量
        imgleft: -200,//每张图片的左边偏移量
        imgwidth: 30,//每张图片的宽度偏移量
        imgheight: 27,//每张图片的高度偏移量
        count: 5,
        offsetX: 60,
        NumBtn: false,
        title: false,
        setZoom: .8,
    });
})

function toThousands(num) {
    var num = (num || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
