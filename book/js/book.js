'use strict';

//字体尺寸转化
(function (doc, win, undefined) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function recalc() {
            var clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function () {
    var planNum = $('#plan')[0].innerText; //计划筹集资金数目
    var overDate = $('#overDate').attr('data-date'); //截止日期
    var $people = $('#people'); //人数
    IntSession(planNum); //初始化保存的已有资金数
    var hadNum = sessionStorage.getItem("money") + '.00';
    var people = parseInt(sessionStorage.getItem("people") / 8, 10) + '人';
    var num = Math.round(hadNum / planNum * 10000) / 100 + '%';
    var $hadNum = $('#had'); //已筹资金数目
    var $container = $('.let-bar');
    var $date = $('#hasDate');
    $hadNum.text(hadNum);
    $people.text(people);
    $('.num').text(num);
    var $emit = $container.find('.bar-fill-stripes');
    num = hadNum == planNum ? '100%' : num;
    $emit.css({ width: num });
    getNowFormatDate(overDate, $date);
});
function IntSession(planNum) {
    //从2017年11月21号开始统计
    var start = new Date("2017/11/21 00:00:00").getTime(); //得到毫秒数
    var over = new Date("2018/01/31 23:59:59").getTime(); //得到毫秒数
    var leftTime = over - start; //两者时间差
    var minutes = parseInt(leftTime / 1000 / 60 / 5, 10);
    var money = parseInt(planNum / minutes, 10);
    //console.log('一共有 '+minutes+ ' 个5分钟');
    //console.log('每五分钟增加 '+money+ ' 元');
    timeago(start, money);
}
function getNowFormatDate(overDate, $date) {
    var date = new Date();
    var seperator1 = "/";
    var month = date.getMonth() + 1;
    var strDate = checkTime(date.getDate());
    var hours = checkTime(date.getHours());
    var minutes = checkTime(date.getMinutes());
    var seconds = checkTime(date.getSeconds());
    //let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    //console.log(currentdate);
    $date.text(DateDiff(overDate, currentdate));
}
function DateDiff(sDate1, sDate2) {
    var aDate = void 0,
        oDate1 = void 0,
        oDate2 = void 0,
        iDays = void 0;
    aDate = sDate1.split("/");
    oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
    aDate = sDate2.split("/");
    oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
    return iDays;
}
//计算已用多少时间
function timeago(timestamp, money) {
    var leftTime = new Date() - timestamp; //计算已用的毫秒数
    //转化为 分钟
    var minutes = parseInt(leftTime / 1000 / 60 / 5, 10);
    var days = Math.floor(leftTime / (24 * 3600 * 1000));
    //console.log(days);
    $('#date').text(days + '\u5929');
    //console.log('已经过去 ' + minutes + " 个5分钟");
    //    已经增加到的钱数 并保存
    sessionStorage.setItem('money', minutes * money);
    //已经增加的人数   并保存
    sessionStorage.setItem('people', minutes);
}
function checkTime(i) {
    //将0-9的数字前面加上0，例1变为01
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

//底部跳转事件
$('#foot').on('click', '#home', function () {
    location.href = 'http://aiiju.m.wadao.com';
}).on('click', '#qq', function () {
    window.open("//wpa.qq.com/msgrd?v=3&uin=512909&site=qq&menu=yes");
}).on('click', '#share', function () {
    $(".mask-tel").fadeIn();
}).on('click', '#jump', function () {
    $(".mask-tel").fadeOut();
});
function jumpLink($ele, $btn, link) {
    $($ele).on("click", $btn, function () {
        window.location.href = link;
    });
}

//点击其他部分  拨号弹出框消失
$(".mask-tel").click(function (e) {
    var $a = e.target.nodeName;
    var $c = e.target.classList[1];
    if ($c == "mask-tel" || $c == "remove") {
        $(".mask-tel").fadeOut();
    }
});