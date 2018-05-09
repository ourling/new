/**
 * Created by suoLong on 2017/9/26.
 */
let FontSize = 0;
//字体尺寸转化
(function (doc, win, undefined) {
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
            FontSize = docEl.style.fontSize
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);

//注册跳转
$(".register").click(function(){
    window.location.href = "//www.ecbao.cn/mobileWebsite/fifth_anniversary/reg.html"
});

$('.contact-btn').click(function(){
    let phone = $(this).attr('data-phone');
    let $alertNum = $('#alertNum');
    let $alertA = $('#alertA');
    $alertNum.text(phone);
    $alertA.attr({href: `tel:${phone}`});
    $(".mask-tel").fadeIn();
    $(".mask-foot-nav").fadeOut();
    $(".dropdown-menu").animate({height: 0},300).removeClass("active");
});


//底部导航交互
$("#foot").on("click",".bottom-menu",function(){
    let $li = $(".dropdown-menu li");
    let $mask = $(".mask-foot-nav");
    let boo = $(this).children(".dropdown-menu").hasClass("active");
    $li.h = $li.height();
    $li.num = $li.length;
    $(".mask-tel").fadeOut();
    if(boo){
        $mask.fadeOut();
        $(".dropdown-menu").animate({height: 0},300).removeClass("active");
    }else{
        $mask.fadeIn();
        let H = $li.h * $li.num + 10;
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
    let $a = e.target.nodeName;
    let $c = e.target.classList[1];
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