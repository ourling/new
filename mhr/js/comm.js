'use strict';

//字体尺寸转化
var H = 0;
var W = 0;
(function (doc, win, undefined) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function recalc() {
        var clientWidth = docEl.clientWidth;
            if(typeof Swiper != 'undefined'){
                H = window.innerHeight;
                W = window.innerWidth;
                var $title_bar = $('.index-3 .hr-right .title-bar')
                var boo = H / W;
                if(boo < 1.5){
                    $title_bar.css('font-size','.24rem');
                }else{
                    $title_bar.css('font-size','.28rem');
                }
            }
        if (clientWidth === undefined) return;
        //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
        docEl.style.fontSize = clientWidth / 7.5 + 'px';
    };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


if(typeof Swiper != 'undefined'){
    var mySwiper = new Swiper ('.swiper-container', {
        direction:'vertical',
        initialSlide :0,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    })
}

//获取元素的纵坐标（相对于窗口）
function getTop(e){
    var offset=e.offsetTop;
    if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
    console.log(offset);
    return offset;
}