


var wait=60;
function time(o) {
    if (wait == 0) {
        o.removeAttribute("disabled");
        o.value=$.t("Emai.etczq06");
        wait = 60;
    } else {
        o.setAttribute("disabled", true);
        o.value="(" + wait + ")S";
        wait--;
        setTimeout(function() {
                time(o)
            },
            1000)
    }
}
$("#Pour_zq").click(function(){
    time(this);
    callService("sendMail","/api/nologin/send-active-email?toUser="+sessionStorage.getItem("username"),{toUser:sessionStorage.getItem("username")});
})
function sendMailCallBack(r){

}

