/*initNECaptcha({
    captchaId: 'e57f71e0aa954467aad84abca10fe328',
    element: '#codeCheck',
    mode: 'float',
    width: 340,
    onReady: function (instance) {
        var lang=$.cookie('lang');
        if(typeof(lang)=="undefined"){
            $(".tips__text").text("Slide to the right to complete");
        }else if(lang=="zh"){
            $(".tips__text").text(" 向右滑動滑塊完成拼圖");
        }else if(lang=="en") {
            $(".tips__text").text("Slide to the right to complete");
        } else if(lang=="ja") {
            $(".tips__text").text("右にスライドして、パズルを完成する");
        }
    },
    onVerify: function (err, data) {
        if(data){
            var reg = new RegExp(/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).*$/);
            $("#regist_zq").on("click",function () {
                if ($("#registPS_zq").val()!==$("#confirmPwd_zq").val()){
                    $(".Verfy22_zq").show();
                    $(".btn22_zq").click(function () {
                        $(".Verfy22_zq").hide()
                    });
                    return;
                }
                if ($("#registPS_zq").val() == null || $("#registPS_zq").val().length <8) {
                    $(".Verfy_zq11").show();
                    $(".btn_zqq").click(function () {
                        $(".Verfy_zq11").hide()
                    });
                    return;
                }
                if(!reg.test($("#registPS_zq").val())){
                    $(".Verfy_zq").show();
                    $(".btn11_zq").click(function () {
                        $(".Verfy_zq").hide()
                    });
                    return;
                }

                callService("regist",'/api/nologin/register',{
                    "confirmPwd": $('#confirmPwd_zq').val(),
                    "password": $('#registPS_zq').val(),
                    "username": $('#registE_zq').val(),
                    "validate": data.validate
                })
            });
            $("#longins_zq").on("click",function () {
                callService("login",'/api/nologin/login',{
                    "password": $('#registPS_zq').val(),
                    "username": $('#registE_zq').val(),
                    "validate": data.validate
                })
            })

        }
    }
}, function onload (instance) {

}, function onerror (err) {
});*/
var yuValidate = "";
//var reg = new RegExp(/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).*$/);
var reg = new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/);

function isEmail(str){
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return reg.test(str);
}

$(function () {
    initYuDun();
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

    $("#regist_zq").on("click",function () {
        if ($("#registE_zq").val()===""||!isEmail($("#registE_zq").val())){
            icoAlert($.t("index.indexmess01"))
            return false;
        }
        if ($("#registPS_zq").val()!==$("#confirmPwd_zq").val()){

            icoAlert($.t("index.indexmess02"))
            return false;
        }
        if ($("#registPS_zq").val() == null || $("#registPS_zq").val().length <8) {

            icoAlert($.t("index.indexmess03"))
            return false;
        }
        if(!reg.test($("#registPS_zq").val())){

            icoAlert($.t("index.indexmess04"))
            return false;
        }
        if (yuValidate===""){
            icoAlert($.t("index.indexmess05"))
            return false;
        }
        confirmAlert("<div style='line-height: 27px;padding:20px;text-align: left'>You represent and warrant that you are not a citizen or resident of any jurisdiction, (i) where cryptographic token is considered security or other regulated instrument or (ii) where acquiring of cryptographic tokens in possession and exchanging them for other cryptographic tokens, money or regulated instruments is restricted by law or regulatory bodies, or is subject to special permission, licence or regulatory framework, or (iii) where cryptographic tokens are not legal. If you are citizen or resident of such a jurisdiction, you must not use the services provided by the Castle Peak Game platform. Each user of the Castle Peak Game platform shall bear its own legal and financial risks of using this platform and cryptographic tokens.</div>" +
            "<div style='height: 35px; display: block;line-height:30px'>Confirm <input type='checkbox' value='' id='reg_confirm_box'></div>");
    })

    $("#longins_zq").on("click",function () {
        if ($("#registE_zq").val()===""||!isEmail($("#registE_zq").val())){
            icoAlert($.t("index.indexmess06"))
            return false;
        }
        if (yuValidate===""){
            icoAlert($.t("index.indexmess05"))
            return false;
        }
        callService("login",'/api/nologin/login',{
            "password": $('#registPS_zq').val(),
            "username": $('#registE_zq').val(),
            "validate": yuValidate
        })
    })

});
function initYuDun(){
    yuValidate="";
    initNECaptcha({
        captchaId: 'e57f71e0aa954467aad84abca10fe328',
        element: '#codeCheck',
        mode: 'float',
        width: 340,
        onReady: function (instance) {
            $(".yidun_refresh").attr("title","");
            $(".yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
            $(".yidun_tips .tips__text,.yidun_tips__text").attr("data-i18n","yundunbtn");
            $(".yidun_tips__text").i18n();
        },
        onVerify: function (err, data) {
            if (err) {
                $(".yidun_tips .tips__text,.yidun_tips__text").hide();
                setTimeout(function(){
                    $(".yidun_refresh").attr("title","");
                    $(".yidun_loadtext").css({"text-indent":"200000px","opacity":0}).html("");
                    $(".yidun_tips .tips__text,.yidun_tips__text").attr("data-i18n","yundunbtn").show();
                    $(".yidun_tips__text").i18n();
                },1000);
            } else {
                $(".yidun_tips .tips__text,.yidun_tips__text").hide();
                if (data.validate) {
                    yuValidate = data.validate;
                }
            }
        }
    }, function onload (instance) {
    }, function onerror (err) {
    });
}

function registSubmit() {

    callService("regist",'/api/nologin/register',{
        "confirmPwd": $('#confirmPwd_zq').val(),
        "password": $('#registPS_zq').val(),
        "username": $('#registE_zq').val(),
        "validate": yuValidate
    })
}

function confirmAlert(message){

    var width = $(window).width();
    var height = $(window).height();
    var topHeight = $(window).scrollTop();

    console.info(topHeight+"|"+height)

    lockDiv()

    $(".Verfy_zq100").remove();
    $("body").append("<div class=\"Verfy_zq100\" style='width: 600px;word-wrap: break-word;'>\n" +
        "<span></span>\n" +
        "<button class=\"btn_zqq100\" style='border-radius: 5px;'>"+$.t("index.indexmess08")+"</button>\n" +
        "</div>");

    $(".Verfy_zq100").css("left",(width/2-300)+"px");
    $(".Verfy_zq100").css("top",(topHeight+height/2-230)+"px");

    $(".Verfy_zq100").find("span").html(message);
    $(".Verfy_zq100").show();
    $(".btn_zqq100").click(function () {

        $('#divLocker').remove();
        if($("#reg_confirm_box").prop("checked")){

            sessionStorage.setItem("username",$('#registE_zq').val());
            registSubmit();
        }else{
            icoAlert("Please check confirm.")
        }
    });
}


// window.onload=function () {
//     getService("Determine", "/api/game/checkICOWaitTag", "");
// }

//注册阶段
function registCallBack(r) {
    initYuDun();
    if(!r.success){
        // if(r.error.detail=="USER_EXITS") {
        //     $(".Verfy33_zq").show();
        //     $(".btn33_zq").click(function () {
        //         $(".Verfy33_zq").hide()
        //     });
        // }

        icoAlert(r.error.detail)
        return true;
    }
    window.location="indexE.html";
    sessionStorage.setItem("userE",$('#registE_zq').val())
}


//登录阶段
function loginCallBack(r) {
    initYuDun();
    if(!r.success){
        icoAlert(r.error.detail)
        return
    }

    //设置用户id
    sessionStorage.setItem("userId",r.data.id);
    sessionStorage.setItem("userId",r.data.id);
    //判定登录状态
    setTimeout( getService("ICOS","/api/game/checkICOStage",{
        "x-access-userid":sessionStorage.getItem("userId")
    }) ,100)


    if(r.data.qtumAddress){
        sessionStorage.setItem("qtumAddress",r.data.qtumAddress)
    }else {
        sessionStorage.setItem("qtumAddress","")
    };


    if(r.data.hcashAddress){
        sessionStorage.setItem("hcashAddress",r.data.hcashAddress)
    }else {
        sessionStorage.setItem("hcashAddress","")
    }


    if(r.data.cpgToken){
        sessionStorage.setItem("cpgToken",r.data.cpgToken)
    }else {
        sessionStorage.setItem("cpgToken","")
    }

    if(r.data.ethToken){
        sessionStorage.setItem("ethToken",r.data.ethToken)
    }else {
        sessionStorage.setItem("ethToken","")
    }

    if(r.data.hcashToken){
        sessionStorage.setItem("hcashToken",r.data.hcashToken)
    }else {
        sessionStorage.setItem("hcashToken","")
    }

    if(r.data.qtumToken){
        sessionStorage.setItem("qtumToken",r.data.qtumToken)
    }else {
        sessionStorage.setItem("qtumToken","")
    }

    if(r.data.sanToken){
        sessionStorage.setItem("sanToken",r.data.hcashToken)
    }else {
        sessionStorage.setItem("sanToken","")
    }

}
function ICOSCallBack(b) {

    if(!b.success){
        return
    }
    console.log(b);

    window.location.href="indexL.html"
    $("#LogoHome").click(function () {
        window.location="ndexL.html"
    })


}

$(function () {

    //登录框点击
    $('#login_zq').click(function () {
        $('#regist_zq').hide();
        $('#hide_zq').hide();
        $('#confirmPwd_zq').hide();
        $('#longins_zq').show()
        $('#fogPS_zq').show()
    });

//立即注册
    $('#Fastres_zq').click(function () {
        $('#regist_zq').show();
        $('#hide_zq').show();
        $('#confirmPwd_zq').show();
        $('#longins_zq').hide()
        $('#fogPS_zq').hide()
    })

})