window.onload=function () {
    var token=getParam("token");
    function getParam(name){
        var Locationurl;
        Locationurl =  location.href;
        var r = new RegExp('(\\?|#|&)' + name + '=([^&#]*)(&|#|$)');
        var m = Locationurl.match(r);
        return m ? decodeURIComponent(m[2]) : null;
    }
    getService("Param","/api/nologin/active-account?token="+token,"");

};
function ParamCallBack(r) {

    if(!r.success){
        icoAlert($.t("EmailS.etszq04"))
    }
    console.log(r);
    getService("EST","/api/game/checkICOStage",{
        "x-access-userid":sessionStorage.getItem("userId")
    });
}
$("#cdAC_zq").click(function () {
    icoAlert($.t("EmailS.etszq05"),function () {
        window.location.href="index.html"
    })
})

function ESTCallBack(b) {

    if(!b.success){
        return
    }
    console.log(b);

    $("#LogoHome").click(function () {
        window.location="index.html"
    });
    $("#cdAC_zq").click(function () {
        window.location="index.html"
    })

}