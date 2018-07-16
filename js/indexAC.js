var Attzq="eth";
var TABlIST={
    "qtum":"SideETH_zq",
    "eth":"SideETH_zq",
    "san":"SideETH_zq",
    "hcash":"SideETH_zq"
}

var time=sessionStorage.getItem("ICOEndTime");
var newTime1=getFulldateFormate(time);
$("#ICOEndTime").html(newTime1+" (Dubai Time)");

$(function(){
    var stk=sessionStorage.getItem("userId");
    getService("check",'/api/game/checkICOStage',null,{'x-access-userid':sessionStorage.getItem("userId")})
    $(".blist-zq li").on("click",function(){
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        // Attzq=$(this).attr("data-zq");
        // console.log(Attzq);
        // var id=TABlIST[Attzq];
        // $("#"+id).val(sessionStorage.getItem(Attzq));
        $(this).parents(".Subscribe-zq").find(".blsit-list-zq li").eq(index).show().siblings().hide();

    })


    var hcashCode = sessionStorage.getItem("hcashAddress").replace("\"","").replace("\"","");
    var qtumCode = sessionStorage.getItem("qtumAddress").replace("\"","").replace("\"","");

    initQrcode("hcash_code_eth","0x5aA4fC79CAda39B2CF69623555D4Bce6CcA23F8e");
    initQrcode("hcash_code_sanc","sH741Us7u3wdgMQsAx5iVCF841QXo8VqVu");

    $("#hcash_code").html(hcashCode);
    initQrcode("hcash_code_qr",hcashCode);

    $("#qtum_code").html(qtumCode);
    initQrcode("qtum_code_qr","qtum:"+qtumCode+"?label=ufo&message=Payment Request");
    $('#Side_zq').val(sessionStorage.getItem("cpgToken").replace("\"","").replace("\"",""))
    $('#SideETH_zq').val(sessionStorage.getItem("ethToken").replace("\"","").replace("\"",""));
    $("#SideQT_zq").val(sessionStorage.getItem("qtumToken").replace("\"","").replace("\"",""));
    $("#SideHC_zq").val(sessionStorage.getItem("hcashToken").replace("\"","").replace("\"",""));
    $("#SideSAN_zq").val(sessionStorage.getItem("sanToken").replace("\"","").replace("\"",""));

    var stage = getParam("stage");

    if(stage=="end"){
        $("#ico_end").show();
    }else{
        $("#ico_ing").show();
    }


    setInterval(GetRTime,1000);

    imgAlert();

    $("#icoOneCountMinEth").text(opgCount.icoOneCountMinEth);
    $("#icoOneCountMinQtum").text(opgCount.icoOneCountMinQtum);
    $("#icoOneCountMinHsr").text(opgCount.icoOneCountMinHsr);
    $("#icoOneCountMinSanc").text(opgCount.icoOneCountMinSanc);

});

function checkCallBack() {
    
}

var tokeyType = "";
//ICO input的值被seesion映射
$("#Sure_zq").on("click",function () {
    tokeyType = "cpg";
    $('#divLocker').remove();
    getService("backAddress",'/api/game/saveUserToken?token='+$('#Side_zq').val()+'&type=cpg',null,{'x-access-userid':sessionStorage.getItem("userId")});

 });
//第一个ETH input的值

$("#Sures_zq").on("click",function () {
    tokeyType = "eth";
    getService("backAddress",'/api/game/saveUserToken?token='+$('#SideETH_zq').val()+'&type=eth',null,{'x-access-userid':sessionStorage.getItem("userId")});

 });
$("#SuresHC_zq").on("click",function () {
    tokeyType = "hcash";
    getService("backAddress",'/api/game/saveUserToken?token='+$('#SideHC_zq').val()+'&type=hcash',null,{'x-access-userid':sessionStorage.getItem("userId")});

 });
$("#SuresQT_zq").on("click",function () {
    tokeyType = "qtum";
    getService("backAddress",'/api/game/saveUserToken?token='+$('#SideQT_zq').val()+'&type=qtum',null,{'x-access-userid':sessionStorage.getItem("userId")});

 });
$("#SuresSAN_zq").on("click",function () {
    tokeyType = "san";
    getService("backAddress",'/api/game/saveUserToken?token='+$('#SideSAN_zq').val()+'&type=san',null,{'x-access-userid':sessionStorage.getItem("userId")});

 });


function backAddressCallBack(r){
    if(tokeyType=="cpg"){
        sessionStorage.setItem("cpgToken",$('#Side_zq').val());
    }
    if(tokeyType=="eth"){
        sessionStorage.setItem("ethToken",$("#SideETH_zq").val());
    }
    if(tokeyType=="hcash"){
        sessionStorage.setItem("hcashToken",$("#SideHC_zq").val());
    }
    if(tokeyType=="qtum"){
        sessionStorage.setItem("qtumToken",$("#SideQT_zq").val());
    }
    if(tokeyType=="san"){
        sessionStorage.setItem("sanToken",$("#SideSAN_zq").val());
    }
}


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