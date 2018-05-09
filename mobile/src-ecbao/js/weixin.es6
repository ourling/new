//function initWxConfig(data) {
//    var wxParam = data.wxParam;
//    var timestampSave = wxParam.timestampSave;
//    var signature = wxParam.signature1;
//    var nonceStr = wxParam.nonceStr;
//    var appId = wxParam.appId;
//    var link = wxParam.link;
//    wx.config({
//        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//        appId: appId, // 必填，公众号的唯一标识
//        timestamp: timestampSave, // 必填，生成签名的时间戳
//        nonceStr: nonceStr, // 必填，生成签名的随机串
//        signature: signature,// 必填，签名
//        jsApiList: [
//            'checkJsApi',
//            'onMenuShareTimeline',
//            'onMenuShareAppMessage',
//            'onMenuShareQQ',
//            'onMenuShareWeibo',
//            'onMenuShareQZone'
//        ] // 必填，需要使用的JS接口列表
//    });
//    wx.ready(function () {
//        wx.onMenuShareAppMessage({
//            title: data.basic.panoTitle, // 分享标题
//            desc: data.basic.panoDesc, // 分享描述
//            link: link, // 分享链接
//            imgUrl: data.basic.panoPic, // 分享图标
//            type: 'link', // 分享类型,music、video或link，不填默认为link
//            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//            success: function () {
//                // 用户确认分享后执行的回调函数
//                alert('分享朋友成功!');
//            },
//            cancel: function () {
//                // 用户取消分享后执行的回调函数
//            }
//        });
//        wx.onMenuShareTimeline({
//            title: data.basic.panoTitle, // 分享标题
//            link: link, // 分享链接
//            imgUrl: data.basic.panoPic, // 分享图标
//            success: function () {
//                // 用户确认分享后执行的回调函数
//                alert('分享朋友圈成功!');
//            },
//            cancel: function () {
//                // 用户取消分享后执行的回调函数
//            }
//        });
//        wx.error(function (res) {
//            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//            alert("errorMSG:" + res);
//        });
//    });
//}
//init = {
//    title: '微信营销 淘宝成交技巧书籍众筹火热开启！',
//    desc: '30余位行业大咖倾力推荐，60万卖家正在阅读......',
//    link: 'aiiju.m.wadao.com',
//}

//(function(window) {
//    let Share={};
//    Share.info = {
//        id: '',
//        name: '',
//        head_image: "_www/images/icon/A/144.png",
//        introduce: ''
//    };
//    /**
//     * 更新分享服务
//     */
//    let shares = null;
//    function getSerivces() {
//        alert('进入方法');
//        plus.share.getServices(function(s) {
//            shares = {};
//            for (let i in s) {
//                let t = s[i];
//                shares[t.id] = t;
//            }
//        }, function(e) {
//            console.log("获取分享服务列表失败：" + e.message);
//        });
//    }
//
//    function shareAction(id, ex) {
//        let s = null;
//
//        if (!id || !(s = shares[id])) {
//            console.log("无效的分享服务！");
//            return;
//        }
//        if (s.authenticated) {
//            console.log("---已授权---");
//            shareMessage(s, ex);
//        } else {
//            console.log("---未授权---");
//            //TODO 授权无法回调，有bug
//            s.authorize(function() {
//                console.log('授权成功...')
//                shareMessage(s, ex);
//            }, function(e) {
//                console.log("认证授权失败：" + e.code + " - " + e.message);
//            });
//        }
//    }
//    let sharecount = 0;
//    /**
//     * 发送分享消息
//     * @param
//     * */
//    function shareMessage(s, ex) {
//        plus.nativeUI.showWaiting();
//        setTimeout(plus.nativeUI.closeWaiting,5000);//TODO 5秒后自动关闭等待，否则如果用户分享出去后选择‘留在微信’，再手动回到app的时候，waiting无法关闭
//        let msg = {
//            extra: {
//                scene: ex
//            }
//        };
//        msg.href = "分享的网址" + "share?hid=" + Share.info.id;
//        msg.title = "我在xxxx等你——" + Share.info._name;
//        msg.content = Share.info.introduce;
//        //取本地图片
//        let img = plus.io.convertAbsoluteFileSystem(Share.info.head_image.replace('file://', ''));
//        console.log(img);
//        msg.thumbs = [img];
//        if (sharecount > 0) {
//            //如果本地图片过大，导致分享失败，递归时重新分享获取默认图片
//            msg.thumbs = ["_www/images/icon/A/144.png"];
//        }
//        console.log(JSON.stringify(msg));
//        s.send(msg, function() {
//            plus.nativeUI.closeWaiting();
//            let strtmp = "分享到\"" + s.description + "\"成功！ ";
//            console.log(strtmp);
//            plus.nativeUI.toast(strtmp, {
//                verticalAlign: 'center'
//            });
//            sharecount = 0;
//        }, function(e) {
//            plus.nativeUI.closeWaiting();
//            if (e.code == -2) {
//                plus.nativeUI.toast('已取消分享', {
//                    verticalAlign: 'center'
//                });
//                sharecount = 0;
//            } else if (e.code == -3 || e.code == -8) {
//                console.log(e.code);
//                if (++sharecount < 2) {
//                    //TODO 分享失败可能是图片过大的问题，递归取默认图片重新分享
//                    shareMessage(s, ex);
//                } else {
//                    sharecount = 0;
//                    plus.nativeUI.toast('分享失败', {
//                        verticalAlign: 'center'
//                    });
//                }
//            }else{
//                console.error('分享失败:'+JSON.stringify(e))
//            }
//            console.log("分享到\"" + s.description + "\"失败: " + e.code + " - " + e.message);
//        });
//    }
//    function share() {
//        bhref = true;
//        let ids = [{
//                id: "weixin",
//                ex: "WXSceneSession"
//            }, {
//                id: "weixin",
//                ex: "WXSceneTimeline"
//            }],
//            bts = [{
//                title: "发送给微信好友"
//            }, {
//                title: "分享到微信朋友圈"
//            }];
//        plus.nativeUI.actionSheet({
//                cancel: "取消",
//                buttons: bts
//            },
//            function(e) {
//                let i = e.index;
//                if (i > 0) {
//                    shareAction(ids[i - 1].id, ids[i - 1].ex);
//                }
//            }
//        );
//    }
//    Share.share=share;
//    window.Share = Share;
//    mui.plusReady(function() {
//        console.log(123);
//        getSerivces();
//    });
//})(window)

//var shares=null;
//// 监听plusready事件
//document.addEventListener( "plusready", function(){
//    // 扩展API加载完毕，现在可以正常调用扩展API
//    plus.share.getServices( function(s){
//        shares = s;
//    }, function(e){
//        alert( "获取分享服务列表失败："+e.message );
//    } );
//}, false )


       //微信分享自定义
     document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
     window.shareData = {
               "timeLineLink": "此处填入需要链接的连接url（也可以通过变量获取本页面的url）", //分享到朋友圈的链接
              "sendFriendLink": "同上",//分享给朋友的链接
              "weiboLink": "",//分享到微博的
              "tTitle": "广东南粤e+直销银行,简化金融服务为您智能理财，让您的生活更轻松！",//朋友圈标题
               "tContent": "简化金融服务为您智能理财，让您的生活更轻松！",//朋友圈摘要内容
              "fTitle": "广东南粤e+直销银行",//朋友标题
              "fContent": "简化金融服务为您智能理财，让您的生活更轻松！", //朋友摘要内容
              "wContent": "简化金融服务为您智能理财，让您的生活更轻松！"  //微博
           };
           // 发送给好友
           WeixinJSBridge.on('menu:share:appmessage', function (argv) {
                WeixinJSBridge.invoke('sendAppMessage', {
                    "img_url": "../images/scrm/banner.png",//分享链接图标的 url
                    "img_width": "80",
                  "img_height": "80",
                   "link": window.shareData.sendFriendLink,
                    "desc": window.shareData.fContent,
                    "title": window.shareData.fTitle
               }, function (res) {
                    _report('send_msg', res.err_msg);
                 })
            });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
            WeixinJSBridge.invoke('shareTimeline', {
                    "img_url": "../images/scrm/banner.png",
                    "img_width": "80",
                    "img_height": "80",
                    "link": window.shareData.timeLineLink,
                    "desc": window.shareData.tContent,
                    "title": window.shareData.tTitle
            }, function (res) {
                    //_report('timeline', res.err_msg);
                console.log(res);
                });
        });

}, false)