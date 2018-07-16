$('#LogoHome').click(function () {
    window.location.href="indexL.html"
})

$(function () {
    initQrcode("hcash_code_eth","0x5aA4fC79CAda39B2CF69623555D4Bce6CcA23F8e");

    imgAlert();
    $('#Side_zq').val(sessionStorage.getItem("cpgToken").replace("\"","").replace("\"",""))
    $('#SideETH_zq').val(sessionStorage.getItem("ethToken").replace("\"","").replace("\"",""));

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

    $("#angleOneCountMinEth").text(opgCount.angleOneCountMinEth);

})

function backAddressCallBack(r){
    if(tokeyType=="cpg"){
        sessionStorage.setItem("cpgToken",$('#Side_zq').val());
    }
    if(tokeyType=="eth"){
        sessionStorage.setItem("ethToken",$("#SideETH_zq").val());
    }
}