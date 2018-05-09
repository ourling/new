/**
 * Prompt message
 * @param  {[type]} msg  [提示信息]
 * @param  {[type]} time [显示时间 单位s]
 */
window.tipsToast = function (msg, time = 2000) {
    new $.zui.Messager(msg, {
        type: 'special',
        placement: 'center', // 定义显示位置
        time: time,
        actions: [{
            text: '确认',
            action: function () {
                return false
            }
        }]
    }).show();
}

/**
 * Error message
 * @param  {[type]} msg  [提示信息]
 * @param  {[type]} time [显示时间 单位s]
 */
window.errorToast = function (msg, time) {
    new $.zui.Messager(msg, {
        type: 'danger',
        placement: 'center', // 定义显示位置
        time: time || '2000',
        actions: [{
            text: '确认',
            action: function () {
                return false
            }
        }]
    }).show();
}

/**
 * Warning message
 * @param msg 提示内容
 * @param time 显示时间
 */
window.warnToast = function (msg, time) {
    new $.zui.Messager(msg, {
        type: 'warning',
        placement: 'center', // 定义显示位置
        time: time || '2000',
        icon: 'warning-sign',
        actions: [{
            text: '确认',
            action: function () {
                return false
            }
        }]
    }).show();
}

/**
 * Successful message
 * @param msg 提示内容
 * @param time 显示时间
 */
window.successToast = function (msg, time) {
    new $.zui.Messager(msg, {
        type: 'success',
        placement: 'center', // 定义显示位置
        time: time || '2000',
        actions: [{
            text: '确认',
            action: function () {
                return false
            }
        }]
    }).show();
}

/**
 * Error window prompt
 * @param title 错误标题
 * @param msg 错误消息
 */
window.errorPopUps = function (title, msg) {
    console.log('error title:' + title + '\nmsg:' + msg)
}

/**
 * Copy the Obj object
 * @param obj 需要復制的對象
 */
window.cloneObj = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Throttling realization
 * @param fn 调用的方法
 * @param delay 延时
 * @param interval 多少时间必须执行一次
 */
window.throttle = function (fn, delay, interval) {
    let _timer = null;
    let _old = null;

    return function () {
        let _now = new Date();

        if (!_old) _old = _now;

        /* 必须执行 */
        if (_now - _old > interval) {
            fn();
            _old = _now
        }
        /* 用户不再调整 */
        else {
            clearTimeout(_timer);
            _timer = setTimeout(function () {
                fn();
            }, delay);
        }
    }
}

/**
 * Determine if it is an empty string
 * @param text
 * @returns {boolean}
 */
window.isBlank = function (text) {
    return !(text && text !== '' && text !== ' ');
}

/**
 * Determine whether the value is empty
 * @param obj
 * @returns {boolean}
 */
window.isNull = function (obj) {
    return obj === null || typeof(obj) === 'undefined'
}

/**
 * Boolean 转化 Int
 * @param flag
 * @returns {number}
 */
window.bool2Int = function (flag) {
    return flag ? 1 : 0;
}

/**
 * Int 转 boolean值
 * @param number
 * @returns {boolean}
 */
window.int2Bool = function (number) {
    return number !== 0;
}

/**
 * Parses the url and returns the corresponding value according to the parameter name
 * @param name
 * @returns {*}
 */
window.queryUrl = function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURI(r[2]);
    return null;
}

/**
 * Format the time
 * @param date
 * @param formatStr
 * @returns {XML|string}
 */
window.formatDate = function (date, formatStr) {
    let res = formatStr;
    let year = date.getYear() % 100;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let second = date.getSeconds();
    return res
        .replace('yyyy', date.getFullYear())
        .replace('yy', year > 9 ? year : '0' + year)
        .replace('MM', month > 9 ? month : '0' + month)
        .replace('dd', day > 9 ? day : '0' + day)
        .replace('hh', hours > 9 ? hours : '0' + hours)
        .replace('mm', minutes > 9 ? minutes : '0' + minutes)
        .replace('ss', second > 9 ? second : '0' + second);
}

/**
 * Flash check
 */
window.flashChecker = function () {
    let isIE = !-[1,];
    if (isIE) {
        try {
            let swf1 = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        }
        catch (e) {
            alert('没有安装Flash, 部分功能将失效');
        }
    }
    else {
        try {
            let swf2 = navigator.plugins['Shockwave Flash'];
            if (typeof swf2 === 'undefined') {
                alert('没有安装Flash, 部分功能将失效');
            }
        }
        catch (e) {
            alert('没有安装Flash, 部分功能将失效');
        }
    }
}

/**
 * Determine whether the user is logged in
 * @returns {boolean|*}
 */
window.isLogin = function () {
    let isLogin = addCookie.getCookie('isLogin') || '0';
    return isLogin == '1' || (getBrowserType() === 'wx' && isSlientLogin)
}

/**
 * Replace the escape character in the string with HTML content
 * @param htmlString
 */
window.stringToHTML = function (htmlString) {
    return htmlString.replace(/\x20/g, "&nbsp;").replace(/\r?\n/gi, "<br>");
}

/**
 * Determines whether the object is an array
 * @param obj
 * @returns {boolean}
 */
window.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

/**
 * Random string
 * @param len Generated random string length
 * @returns {string}
 */
window.randomString = function (len) {
    len = len || 32;
    /* 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1 */
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd.toLowerCase();
}

/**
 * Cookie settings tool
 * @type {{getsec: Window.addCookie.getsec, setCookie: Window.addCookie.setCookie, getCookie: Window.addCookie.getCookie, delCookie: Window.addCookie.delCookie}}
 */
window.addCookie = {
    // Set expiration time
    getsec: function (str) {
        let str1 = str.substring(1, str.length) * 1;
        let str2 = str.substring(0, 1);
        if (str2 == "s") {
            return str1 * 1000;
        } else if (str2 == "h") {
            return str1 * 60 * 60 * 1000;
        } else if (str2 == "d") {
            return str1 * 24 * 60 * 60 * 1000;
        }
    },
    // Set the cookie
    setCookie: function (name, value, time, path, domain) {
        let strsec = this.getsec(time);
        let exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path + ";domain=" + domain;
    },
    // Read cookies
    getCookie: function (name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    },
    // Remove cookies
    delCookie: function () {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie(name);
        if (cval !== null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};

function isBlank(varValue) {
    let boo = varValue !== null && varValue !== 'undefined' && varValue !== '' && varValue !== 'null';
    return boo ? false : true;
}

//获取URL地址参数
function getQueryString(name, url) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if (!url || url == "") {
        url = window.location.search;
    } else {
        url = url.substring(url.indexOf("?"));
    }
    let r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/* 判断是否是pc端 */
function getBrowserType() {
    var browser = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {     //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {//在微信中打开
            return "wx";
        }
        if (ua.match(/WeiBo/i) == "weibo") {//在新浪微博客户端打开
            return "weibo";
        }
        if (ua.match(/QQ/i) == "qq") {//在QQ空间打开
            return "qq";
        }
        if (browser.versions.ios) {//是否在IOS浏览器打开
            return "ios safari";
        }
        if (browser.versions.android) {//是否在安卓浏览器打开
            ///alert("android浏览器");
            return "android browser";
        }
    } else {//否则就是PC浏览器打开
        return "pc";
    }
}

(function (w, d, $) {
    let progress = 0;
    w.Base = {
        getId(id) {
            /**
             * Return id
             * @param id
             */
            return d.getElementById(id);
        },
        getName(name) {
            /**
             * Return name
             * @param name
             */
            return d.getElementsByName(name);
        },
        getTagName(tagName) {
            /**
             * Return tagName
             * @param tagName
             */
            return d.getElementsByTagName(tagName);
        },
        getClassName(className) {
            /**
             * Return className
             * @param className
             */
            return d.getElementsByClassName(className);
        },
        uuid(){
            return Math.random().toString(36).substring(3, 8);
        },
        getFile(sUrl){
            /**
             * Get file
             * @param sUrl
             */
            let ie = navigator.userAgent.indexOf('MSIE') > 0;
            let o = ie ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
            o.open('get', sUrl, false);
            o.send(null);
            return {body: o.responseText};
        },
        isPc(){
            /**
             * To determine whether it is pc || mobile
             * @param flag true则pc，false则mobile
             */
            let userAgentInfo = navigator.userAgent;
            let Agents = ["Android", "iPhone", "webOS", "BlackBerry",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            let flag = true;
            for (let v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        /**
         * Loop animation
         * @param count
         * @param loop　default(false)
         * @param cb　do samething
         */
        reqAnimationFrame(count, cb, loop = false){
            let vendors = ['ms', 'moz', 'webkit', 'o'];
            let requestId, cancalRequestId;
            for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                requestId = window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                cancalRequestId = window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
            }

            const step = () => {
                if (loop) {
                    requestAnimationFrame(step)
                } else {
                    progress += 1;
                    if (progress < count) requestAnimationFrame(step);
                }
                cb();
            }

            if (requestAnimationFrame) {
                progress = 0;
                requestAnimationFrame(step);
            }
        },
        /**
         * Create a sleep task
         * @param time
         * @param cb
         */
        sleep(time, cb) {
            if (cb) setTimeout(cb, time);
        },
        destroyIframe(iframe){
            /**
             * Destroy iframe, free memory.
             * @param iframe Need to destroy the iframe object
             */
            let el = document.getElementById(iframe);
            if (el) {
                try {
                    el.src = 'about:blank';
                    el.contentWindow.document.write('');
                    el.contentWindow.document.clear();
                } catch (e) {
                }
                el.parentNode.removeChild(el);
            }
        },
        /**
         * Remove the string space
         * @param str
         * @param type
         */
        trim(str, type = 'Trim'){
            switch (type) {
                case 'Trim':
                    return str.replace(/(^\s*)|(\s*$)/g, "");
                    break;
                case 'LTrim':
                    return str.replace(/(^\s*)/g, "");
                    break;
                case 'RTrim':
                    return str.replace(/(\s*$)/g, "");
            }
        },
        /**
         * Serialize form
         * @param formId
         * @returns {*}
         */
        serializeForm(formId){
            const evt = {
                /**
                 * Gets all the <input> objects in the specified form
                 * @param formId
                 * @returns {Array}
                 */
                getElements(formId){
                    let form = document.getElementById(formId),
                        tagElements = form.getElementsByTagName('input'),
                        elements = new Array(null);
                    if (elements.length > 0) elements = [];
                    for (let j = 0, len = tagElements.length; j < len; j++) {
                        elements.push(tagElements[j]);
                    }
                    return elements;
                },
                /**
                 * Gets the array of [name, value] in a single input
                 * @param element
                 * @returns {[*,*]}
                 */
                inputSelector(element){
                    if (element.checked) return [element.name, element.value];
                },
                /**
                 * Get all element tags
                 * @param element
                 * @returns {*}
                 */
                input(element){
                    switch (element.type.toLowerCase()) {
                        case 'submit':
                        case 'hidden':
                        case 'password':
                        case 'text':
                            return [element.name, element.value];
                        case 'checkbox':
                        case 'radio':
                            return this.inputSelector(element);
                    }
                    return false;
                },
                /**
                 * Combination element content
                 * @param element
                 * @returns {*}
                 */
                serializeElement(element){
                    return this.input(element);
                }
            }

            // Call method
            let elements = evt.getElements(formId),
                queryComponents = new Object(null);

            for (let i = 0, len = elements.length; i < len; i++) {
                let queryComponent = evt.serializeElement(elements[i]);
                if (queryComponent) queryComponents[queryComponent[0]] = this.trim(queryComponent[1]);
            }

            return queryComponents;
        },
        /**
         * Init Jmessage and callback
         * @param uid
         * @param callback
         */
        initJMessage(uid,callback){
            let appkey = "944683e646fd594c4420525f",
                random_str = "022cd9fd995849b58b3ef0e943421ed9",
                secret = "a054dd76e11d820d00be3435",
                timestamp = new Date().getTime(),
                signature = hex_md5(`appkey=${appkey}&timestamp=${timestamp}&random_str=${random_str}&key=${secret}`),
                _this = this;


            if (typeof JIM !== 'undefined') {
                JIM.init({
                    "appkey": appkey,
                    "random_str": random_str,
                    "signature": signature,
                    "timestamp": timestamp,
                    "flag": 1
                }).onSuccess((data) => {
                    // console.log('init success');
                    _this.JIMRegister(uid,(flag) => {
                        if (flag) {
                            _this.JIMLogin(uid,(data) => {
                                return callback(data);
                            })
                        }
                    });
                }).onFail((data) => {
                    return callback(data);
                });
            } else {
                throw new Error('PLEASE INIT JIM')
            }
        },
        /**
         * Register JMessage info
         * @param uid
         * @param callback
         * @constructor
         */
        JIMRegister(uid,callback){
            if (typeof JIM !== 'undefined') {
                JIM.register({
                    'username': uid,
                    'password': uid
                }).onSuccess((data) => {
                    return callback(true);
                }).onFail((data) => {
                    return callback(true);
                });
            } else {
                throw new Error('PLEASE INIT JIM')
            }
        },
        /**
         * Login JMessage info
         * @param callback
         * @param uid
         * @constructor
         */
        JIMLogin(uid,callback){
            JIM.login({
                // 'username': 'liufeng',
                // 'password': '123456'
                'username': uid,
                'password': uid
            }).onSuccess(function (data) {
                JIM.onMsgReceive(function (data) {
                    return callback(data);
                });

            }).onFail(function (data) {
                return callback(data)
            }).onTimeout(function (data) {
                return callback(data)
            });
        }
    };
    $.fn.extend({
        /**
         * Implementation class
         * @param event
         * @param selector
         * @param cb
         */
        insertBindOnEvent: function (event, selector, cb) {
            let _this = $(this);
            _this.on(event, selector, cb);
        }
    });


    class Base {
        constructor() {
            this.elements = [];
        }

        getId(id) {
            // Method can add one or more elements to the end of the array and return a new length
            this.elements.push(document.getElementById(id));
            return this;
        }

        getName(nmae) {
            // TagName is a collection of all to be traversed
            let names = document.getElementsByName(nmae);
            for (let i = 0; i < names.length; i++) {
                this.elements.push(names[i]);
            }
            return this;
        }

        getClass(className, idName) {// Add the ID to an ID
            let node = null;// Define a node object
            if (arguments.length === 2) {
                node = document.getElementById(idName);
            } else {
                node = document;
            }
            let all = node.getElementsByTagName('*');
            for (let i = 0; i < all.length; i++) {
                // Judge if you pass over class == class
                if (all[i].className === className) {
                    // So long to go back to pass all the class name
                    this.elements.push(all[i]);
                }
            }
            return this;
        }

        getElement(number) {
            // Get an element The node argument is a number number
            let element = this.elements[number];// Get the object of the element
            this.elements = [];// And then empty the elements
            this.elements[0] = element;// Get an element
            return this;// return
        }

        css(attr, value) {// Two parameter attributes and values
            for (let i = 0; i < this.elements.length; i++) {
                // Get styles inside and outside the chain are available
                if (arguments.length === 1) {
                    if (typeof window.getComputedStyle !== 'undefined') {// W3C standards
                        return window.getComputedStyle(this.elements[i], null)[attr];
                        // Call properties
                    } else if (typeof this.elements[i].currentStyle !== 'undefined') {// IE browser
                        return this.elements[i].style[attr];
                    }
                }
                this.elements[i].style[attr] = value;
            }
            return this
        }

        addClass(className) {
            for (let i = 0; i < this.elements.length; i++) {
                // Judgment Do not repeat the addition of the pattern with a regular representation of the judgment added in the first or last one
                if (!this.elements[i].className.match(new RegExp('(\\s|^)' + className + '(\\s|^)'))) {
                    this.elements[i].className += ' ' + className;// Add to be a cass style
                }
            }
            return this;// Returns a call again or can only be called once
        }

        removeClass(classsName) {
            for (let i = 0; i < this.elements.length; i++) {// Traverse if there are multiple
                // To determine whether the style is added repeatedly
                if (this.elements[i].className.match(new RegExp('(\\s|^)' + classsName + '(\\s|$)'))) {
                    this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + classsName + '(\\s|$)'), ' ');// + = '' + Accumulate multiple styles separated by spaces
                }
            }
            return this;// Return to implementation
        }

        html(str) {
            for (let i = 0; i < this.elements.length; i++) {
                if (arguments.length === 0) {// Get the value of innerHTML
                    return this.elements[i].innerHTML;
                }
                this.elements[i].innerHTML = str;
            }
            return this;
        }

        click(fn) {
            for (let i = 0; i < this.elements.length; i++) {
                this.elements[i].onclick = fn;
            }
            return this;
        }
    }

    $(() => {
        window.JIM = new JMessage({debug: false});
        JIM.onDisconnect(() => console.log("【disconnect】")); // Abnormal disconnection monitoring
    })

    window.$Element = new Base();
})(window, document, jQuery);





