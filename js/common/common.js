if(!sessionStorage.getItem("userId")){
    if(window.location.href.indexOf("index.html")==-1&&window.location.href.indexOf("indexE.html")==-1&&window.location.href.indexOf("indexES.html")==-1){
        window.location.href="index.html";
    }
}

var langList={
    "en":"en_US",
    "zh":"zh_TW",
    "ja":"ja_JP"
}

if(getParam("lang")){
    var langBackend={
        "en_US":"en",
        "zh_TW":"zh",
        "ja_JP":"ja"
    }
    $.cookie("lang",langBackend[getParam("lang")]);
}

var lang_ = $.cookie("lang");

var isInside = false;
for(var lang in langList){
    if(lang===lang_){
        isInside = true;
        break;
    }
}
//显示当前语言
if(!isInside){
    $.cookie("lang","zh");
}

console.info(lang_+"|"+$.cookie("lang"))

//切换语言栏
$(function () {

    i18n.init({
        lng : $.cookie("lang"),
        resGetPath: 'locales/__lng__/__ns__.json'
    }, function(t) {
        $('body').i18n();
        $("body").append("<div style='position: fixed;top: 9px;left: 10px;z-index: 100000;color: #FFFFFF;font-size: 13px;'>"+$.t("ie_notice")+"</div>");
        $(".image_wrapper").css("background-image","url("+$.t('image_wrapper')+")");
    });



    if($.cookie("lang")=="zh"){
        $($(".social a")[1]).prop("href","https://t.me/cpg_cn");
        $($(".left-layer a")[1]).prop("href","https://t.me/cpg_cn");
        $($(".icon-list a")[1]).prop("href","https://t.me/cpg_cn");
    }else{
        $($(".social a")[1]).prop("href","https://t.me/cpg_en");
        $($(".left-layer a")[1]).prop("href","https://t.me/cpg_en");
        $($(".icon-list a")[1]).prop("href","https://t.me/cpg_en");
    }
    $($(".social a")[2]).prop("href","https://www.facebook.com/castlepeakworld/");
    $($(".left-layer a")[2]).prop("href","https://www.facebook.com/castlepeakworld/");
    $($(".icon-list a")[2]).prop("href","https://www.facebook.com/castlepeakworld/");

})


function icoAlert(message,backfun){

    var width = $(window).width();
    var height = $(window).height();
    var topHeight = $(window).scrollTop();

    console.info(topHeight+"|"+height)

    $(".Verfy_zq100").remove();

    lockDiv()

    $("body").append("<div class=\"Verfy_zq100\">\n" +
        "<span></span>\n" +
        "<button class=\"btn_zqq100\" style='border-radius: 5px;'>"+$.t('index.indexmess08')+"</button>\n" +
        "</div>");

    $(".Verfy_zq100").css("left",(width/2-200)+"px");
    $(".Verfy_zq100").css("top",(topHeight+height/2-100)+"px");

    $(".Verfy_zq100").find("span").html(message);
    $(".Verfy_zq100").show();
    $(".btn_zqq100").click(function () {
        $(".Verfy_zq100").remove()
        $('#divLocker').remove();

        if(backfun){
            backfun();
        }
    });
}

$('#menu-language li').on('click',function(){
    $(this).siblings().removeClass('current-menu-item')
    $(this).addClass('current-menu-item')
    var lang = $(this).prop('id');
    $.cookie("lang", lang);  //存储当前语言

    var thisUrl = window.location.href

    var urlArray=thisUrl.split("?")
    var url = urlArray[0]
    var params=urlArray[1]; //取得所有参数

    if(params){
        url = url +"?"

        var arr=params.split("&"); //各个参数放到数组里
        for(var i=0;i < arr.length;i++){
            if(arr[i].indexOf("lang")==-1){
                url = url + arr[i]
            }
        }
    }
    window.location.href = url


});

function  sessionUnload(r) {
    if(!r.success&&r.error.code=="1030"){
        if(window.location.href.indexOf("index.html")==-1&&
            window.location.href.indexOf("indexE.html")==-1&&
            window.location.href.indexOf("indexES.html")==-1) {
            window.location.href = "../../index.html";
        }
    }
}

//GET请求
function getService(serviceName,url,param) {
    var param=param||{};
    var usrId=sessionStorage.getItem("userId")||"";
    $.ajax({
        url:url,
        cache:false,
        type:"GET",
        beforeSend: function(xhr){xhr.setRequestHeader('x-access-userid', usrId)},
        dataType : 'json',
        contentType : 'application/json',
        success:function (r) {
            sessionUnload(r)
            return getserviceCallBack(serviceName,r);
        }

    })
}
function getserviceCallBack (serviceName,r) {
    var fun=serviceName+'CallBack';
    var resFun=eval(fun);
    return resFun(r);
}
//POST请求
function callService(serviceName,url,param) {
    $(".bgloading").show();
    var param=param||{};
    var url=url+"?lang="+langList[$.cookie("lang")];
    $.ajax({
        url:url,
        cache:false,
        type:"POST",
        data:JSON.stringify(param),
        dataType : 'json',
        contentType : 'application/json',
        success:function (r) {
            sessionUnload(r)
            $(".bgloading").hide();
            return serviceCallBack(serviceName,r);
        }

    })
}
function serviceCallBack (serviceName,r) {
    var fun=serviceName+'CallBack';
    var resFun=eval(fun);
    return resFun(r);
}
//AC和ACPI页面的提交显示
$('#submit_zq').click(function () {
    var k=$('#Side_zq').val();
   if(k!=""){
       if(isOtherAdress(k)){
           $('#submit_zqq').show();
           lockDiv()
           var width = $(window).width();
           var height = $(window).height();
           var topHeight = $(window).scrollTop();

           $("#submit_zqq").css("left",(width/2-300)+"px");
           $("#submit_zqq").css("top",(topHeight+height/2-100)+"px");


           $('#Side_zqq').html($('#Side_zq').val())
       }else{
           icoAlert($.t("index.indexmess09"))
       }
   }else {
       icoAlert($.t("index.indexmess09"))
   }
})
$('#Sure_zq').click(function () {
    $('#submit_zqq').hide()
    $('#Side_zq').attr("disabled","false")
    $('#submit_zq').hide()
})

//AC页面的input点击事件
$('#submitETH_zq').click(function () {
    isAddress($('#SideETH_zq').val())

});
//验证ETH数据
var isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        icoAlert($.t("index.indexmess09"))
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        icoAlert($.t("index.indexmess09"))
        return true;
    } else {
        $('#submits_zqq').show();
        $('#Sides_zqq').html($('#SideETH_zq').val())
        // return isChecksumAddress(address);
    }
};

function isOtherAdress(address){
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        return false;
    }
    return true;
}


$('#submitHC_zq').click(function () {
    var k=$('#SideHC_zq').val();
   if(k!=""){
       $('#submitsHC_zqq').show();
       $('#SidesHC_zqq').html($('#SideHC_zq').val())
   }else {
       icoAlert($.t("index.indexmess09"))
   }
})
$('#submitQT_zq').click(function () {
    var k=$('#SideQT_zq').val();
   if(k!=""){
       $('#submitsQT_zqq').show();
       $('#SidesQT_zqq').html($('#SideQT_zq').val())
   }else {
       icoAlert($.t("index.indexmess09"))
   }
})
$('#submitSAN_zq').click(function () {
    var k=$('#SideSAN_zq').val();
   if(k!=""){
       $('#submitsSAN_zqq').show();
       $('#SidesSAN_zqq').html($('#SideSAN_zq').val())
   }else {
       icoAlert($.t("index.indexmess09"))
   }
})

//点击弹框的确认隐藏提交按钮以及整个弹框并让input不可选中
$('#Sures_zq').click(function () {
    $('#submits_zqq').hide();
    $('#SideETH_zq').attr("disabled","false")
    $('#submitETH_zq').hide()
    $('#divLocker').remove();
})
$('#SuresHC_zq').click(function () {
    $('#submitsHC_zqq').hide();
    $('#SideHC_zq').attr("disabled","false")
    $('#submitHC_zq').hide()
})
$('#SuresQT_zq').click(function () {
    $('#submitsQT_zqq').hide();
    $('#SideQT_zq').attr("disabled","false")
    $('#submitQT_zq').hide()
})
$('#SuresSAN_zq').click(function () {
    $('#submitsSAN_zqq').hide();
    $('#SideSAN_zq').attr("disabled","false")
    $('#submitSAN_zq').hide()
})

//点击修改隐藏弹框
$('#Mod_zq').click(function () {
    $('#submit_zqq').hide()
    $('#divLocker').remove();
});
$('#Mods_zq').click(function () {
    $('#submits_zqq').hide()
    $('#divLocker').remove();
})
$('#ModsHC_zq').click(function () {
    $('#submitsHC_zqq').hide()
    $('#divLocker').remove();
})
$('#ModsQT_zq').click(function () {
    $('#submitsQT_zqq').hide()
    $('#divLocker').remove();
})
$('#ModsSAN_zq').click(function () {
    $('#submitsSAN_zqq').hide()
    $('#divLocker').remove();
})


function getParam(name){
    var Locationurl;
    Locationurl =  location.href;
    var r = new RegExp('(\\?|#|&)' + name + '=([^&#]*)(&|#|$)');
    var m = Locationurl.match(r);
    return m ? decodeURIComponent(m[2]) : null;
}

var isChecksumAddress = function (address) {
    address = address.replace('0x','');
    var addressHash = sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};

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


function initQrcode(id,code) {
    $('#'+id).qrcode({width: 127,height: 127,text: code});
}

function ethCallBack(r){

}

function UserTokenCallBack (r){

}

function lockDiv() {
    $("body").append("<div id=\"divLocker\"></div>");
    $('#divLocker').css({
        "position": "absolute",
        "left": "0",
        "top": "0",
        "background-color": "#000000",
        "height": function () { return $(document).height(); },
        "filter": "alpha(opacity=30)",
        "opacity": "0.3",
        "overflow": "hidden",
        "width": function () { return $(document).width(); },
        "z-index": "999"
    });
}

function imgAlert(){

    i18n.init({
        lng : $.cookie("lang"),
        resGetPath: 'locales/__lng__/__ns__.json'
    }, function(t) {
        var width = $(window).width();
        var height = $(window).height();
        var topHeight = $(window).scrollTop();


        $(".Verfy_zq100").remove();

        lockDiv();

        $("body").append("<div class=\"Verfy_zq100\" style='width: 805px; height: 530px;word-wrap: break-word;'>\n" +
            "<span></span>\n" +
            "<button class=\"btn_zqq100\" style='border-radius: 5px;'>"+$.t("index.indexmess08")+"</button>\n" +
            "</div>");

        $(".Verfy_zq100").css("left",(width/2-400)+"px");
        $(".Verfy_zq100").css("top",(topHeight+height/2-250)+"px");
        $(".Verfy_zq100").find("span").html("<img src='' data-i18n='[src]indexAC.acou23'>");
        $(".Verfy_zq100").show();
        $(".btn_zqq100").click(function () {
            $(".Verfy_zq100").remove();
            $('#divLocker').remove();
        });

        $(".Verfy_zq100").i18n();
    });


}


