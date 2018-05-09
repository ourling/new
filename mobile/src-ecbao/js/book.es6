
//字体尺寸转化
(function (doc, win, undefined) {
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);

$(function () {
    let planNum = $('#plan')[0].innerText; //计划筹集资金数目
    let overDate = $('#overDate').attr('data-date');  //截止日期
    let $people = $('#people');  //人数
    IntSession(planNum);  //初始化保存的已有资金数
    let hadNum = sessionStorage.getItem("money") + '.00';
    let people = parseInt(sessionStorage.getItem("people")/8,10) + '人';
    let  num = Math.round( (hadNum / planNum) * 10000 ) / 100 + '%';
    let $hadNum = $('#had'); //已筹资金数目
    let $container = $('.let-bar');
    let $date = $('#hasDate');
    $hadNum.text(hadNum);
    $people.text(people);
    $('.num').text(num);
    let $emit = $container.find('.bar-fill-stripes');
    num = hadNum == planNum ? '100%' : num;
    $emit.css({ width: num });
    getNowFormatDate(overDate,$date)
});
function IntSession(planNum){
    //从2017年11月21号开始统计
    let start = (new Date("2017/11/21 00:00:00")).getTime(); //得到毫秒数
    let over = (new Date("2018/01/31 23:59:59")).getTime(); //得到毫秒数
    let leftTime = over - start;  //两者时间差
    let minutes = parseInt(leftTime / 1000 / 60 / 5, 10);
    let money = parseInt(planNum / minutes, 10);
    //console.log('一共有 '+minutes+ ' 个5分钟');
    //console.log('每五分钟增加 '+money+ ' 元');
    timeago(start,money);
}
function getNowFormatDate(overDate,$date) {
    let date = new Date();
    let seperator1 = "/";
    let month = date.getMonth() + 1;
    let strDate = checkTime(date.getDate());
    let hours = checkTime(date.getHours());
    let minutes = checkTime(date.getMinutes());
    let seconds = checkTime(date.getSeconds());
    //let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds();
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    //console.log(currentdate);
    $date.text(DateDiff(overDate,  currentdate));
}
function  DateDiff(sDate1,  sDate2){
    let  aDate,  oDate1,  oDate2,  iDays;
    aDate  =  sDate1.split("/");
    oDate1  =  new  Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]);
    aDate  =  sDate2.split("/");
    oDate2  =  new  Date(aDate[1]  +  '/'  +  aDate[2]  +  '/'  +  aDate[0]);
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);
    return iDays;
}
//计算已用多少时间
function timeago(timestamp,money){
    let leftTime = (new Date())- (timestamp); //计算已用的毫秒数
    //转化为 分钟
    let minutes = parseInt(leftTime / 1000 / 60 / 5, 10);
    let days=Math.floor(leftTime/(24*3600*1000));
    //console.log(days);
    $('#date').text(`${days}天`);
    //console.log('已经过去 ' + minutes + " 个5分钟");
//    已经增加到的钱数 并保存
    sessionStorage.setItem('money',minutes * money);
    //已经增加的人数   并保存
    sessionStorage.setItem('people',minutes);
}
function checkTime(i){
    //将0-9的数字前面加上0，例1变为01
    if(i<10)   {
        i = "0" + i;
    }
    return i;
}

//底部跳转事件
$('#foot').on('click','#home',function(){
    location.href = 'http://aiiju.m.wadao.com'
}).on('click','#qq',function(){
    window.open("//wpa.qq.com/msgrd?v=3&uin=512909&site=qq&menu=yes");
}).on('click','#share',function(){
    $(".mask-tel").fadeIn()
}).on('click','#jump',function(){
    $(".mask-tel").fadeOut()
});
function jumpLink($ele,$btn,link){
    $($ele).on("click",$btn,function(){
        window.location.href = link
    })
}

//点击其他部分  拨号弹出框消失
$(".mask-tel").click(function(e){
    let $a = e.target.nodeName;
    let $c = e.target.classList[1];
    if($c == "mask-tel" || $c == "remove"){
        $(".mask-tel").fadeOut()
    }
});