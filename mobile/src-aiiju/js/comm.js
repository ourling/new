/**
 * Created by suoLong on 2017/9/26.
 */
var FontSize = 0;
//字体尺寸转化
(function (doc, win, undefined) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
            FontSize = docEl.style.fontSize
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);

//点击联系  拨打电话
$('.contact-btn').click(function () {
    var phone = $(this).attr('data-phone');
    var $alertNum = $('#alertNum');
    var $alertA = $('#alertA');
    $alertNum.text(phone);
    $alertA.attr({ href: 'tel:' + phone });
    $(".mask-tel").fadeIn();
    $(".mask-foot-nav").fadeOut();
    $(".dropdown-menu").animate({ height: 0 }, 300).removeClass("active");
});

//注册跳转
$(".join").click(function(){
    window.location.href = "./agent.html"
});
$(".register").click(function(){
    window.location.href = "//www.ecbao.cn/mobileWebsite/fifth_anniversary/reg.html"
});


//底部导航交互
$("#foot").on("click",".bottom-menu",function(){
    var $li = $(".dropdown-menu li");
    var $mask = $(".mask-foot-nav");
    var boo = $(this).children(".dropdown-menu").hasClass("active");
    $li.h = $li.height();
    $li.num = $li.length;
    $(".mask-tel").fadeOut();
    if(boo){
        $mask.fadeOut();
        $(".dropdown-menu").animate({height: 0},300).removeClass("active");
    }else{
        $mask.fadeIn();
        var H = $li.h * $li.num + 10;
        $(this).children(".dropdown-menu").animate({height: H},300).addClass("active");
    }
}).on("click",".qq-btn",function(){
    $(".mask-tel").fadeOut();
    $(".mask-foot-nav").fadeOut();
    $(".dropdown-menu").animate({height: 0},300).removeClass("active");
});
$(".mask-foot-nav").click(function(){
    $(this).fadeOut();
    $(".dropdown-menu").animate({height: 0},300).removeClass("active");
});

//点击其他部分  拨号弹出框消失
$(".mask-tel").click(function(e){
    var $a = e.target.nodeName;
    var $c = e.target.classList[1];
    if($c == "mask-tel" || $c == "remove"){
        $(".mask-tel").fadeOut()
    }
});

//qq跳转
$(function () {
    $('.qq-btn').click(function(){
        window.open("//wpa.qq.com/msgrd?v=3&uin=512909&site=qq&menu=yes");
    })
});

//链接跳转
function jumpLink($ele,$btn,link){
    $($ele).on("click",$btn,function(){
        window.location.href = link
    })
}