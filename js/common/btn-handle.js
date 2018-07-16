$(function () {
    btnH("Side_zq");
    btnH("SideETH_zq");
    btnH("SideHC_zq");
    btnH("SideQT_zq");
    btnH("SideSAN_zq");
})

function btnH(id){
    var inputObj = $("#"+id);

    if(inputObj.val()!==""){
        inputObj.prop("disabled",true);
        inputObj.parent().find("a").hide();
    }else{
        inputObj.parent().find("a").show()
    }
}