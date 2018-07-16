var Attzq="CPG";
$('#LogoHome').click(function () {
    window.location.href="indexL.html"
})

function getFulldateFormate(str){
    if(!str){
        return;
    }
    var time=new Date(str);
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    var hour=time.getHours();
    var min=time.getMinutes();
    var ss=time.getSeconds();
    if(month<10){
        month="0"+month;
    }
    if(day<10){
        day="0"+day;
    }
    if(min<10){
        min="0"+min;
    }
    if(ss<10){
        ss="0"+ss;
    }
    return year+"."+month+"."+day+" "+hour+":"+min;
}


$(function () {
    initQrcode("hcash_code_eth","0x5aA4fC79CAda39B2CF69623555D4Bce6CcA23F8e");

    $(".blist-zq li").on("click",function(){
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(this).parents(".Subscribe-zq").find(".blsit-list-zq li").eq(index).show().siblings().hide();
    })

    imgAlert();
    $('#Side_zq').val(sessionStorage.getItem("cpgToken").replace("\"","").replace("\"",""))
    $('#SideETH_zq').val(sessionStorage.getItem("ethToken").replace("\"","").replace("\"",""));


    //ICO input的值被seesion映射
    $("#Sure_zq").on("click",function () {
        tokeyType = "cpg";
        $('#divLocker').remove();
        getService("backAddress",'/api/game/saveUserToken?token='+$('#Side_zq').val()+'&type=cpg',null,{'x-access-userid':sessionStorage.getItem("userId")});
        sessionStorage.setItem("cpgToken",$('#Side_zq').val());
    });
//第一个ETH input的值
    $("#Sures_zq").on("click",function () {
        tokeyType = "eth";
        getService("backAddress",'/api/game/saveUserToken?token='+$('#SideETH_zq').val()+'&type=eth',null,{'x-access-userid':sessionStorage.getItem("userId")});
        sessionStorage.setItem("ethToken",$("#SideETH_zq").val());
    });

    $("#preicoOneCountMinEth").text(opgCount.preicoOneCountMinEth);
    $("#preicoOneCountMaxEth").text(opgCount.preicoOneCountMaxEth);

})

