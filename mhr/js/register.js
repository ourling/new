'use strict';
function isBlank(varValue) {
    if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
        return false;
    }
    return true;
}
//var Local =  'http://121.199.182.2:30004';
var Local =  'https://aijuhr.com';
var app = new Vue({
    el: "#app",
    data: {
        https: {
            register: Local + '/hrm/account/register.do',
            getCode: Local + '/hrm/account/getRegisterCode.do',
            checkCode: Local + '/hrm/account/checkRegisterCode.do',
            checkEmail: Local + '/hrm/account/checkEmailExist.do',
            index: './index.html'
        },
        arg: {
            phone: '',
            email: '',
            code: '',
            userName: '',
            password: '',
            shopName: ''
        },
        isStep1: true, //是否为第一步
        isOver: false, //本步表单是否填完
        btnTxt: '下一步', //按钮文本
        codeTxt: '', //code倒计时文本
        isAgree: false, //是否同意协议
        isCodeBtn: true, //是否显示code  BTN
        hasEmail: false//邮箱是否已经存在
    },
    methods: {
        contentUpdate: function contentUpdate() {
            /* input文字修改 */
            if (this.isStep1 && !this.hasEmail) {
                this.isOver = !isBlank(this.arg.email) && !isBlank(this.arg.phone) && !isBlank(this.arg.code) && !isBlank(this.arg.password) && this.arg.password.length >= 8 ? true : false;
            } else {
                this.isOver = !isBlank(this.arg.shopName) && !isBlank(this.arg.userName) ? true : false;
            }
        },
        blurEvent: function blurEvent(e, type) {
            /****
             * 失去焦点判断事件
             */
            var target = void 0,
                text = void 0;
            target = e.currentTarget;
            text = $(target).val();
            var $parent = $(target).parent('.input-group');
            if (isBlank(text)) {
                $(target).siblings('.txt').fadeIn();
                return $parent.addClass('error');
            } else {
                this.type(text, type, $parent);
            }
        },
        type: function type(val, _type, ele) {
            //表单数据判断
            switch (_type) {
                case 'email':
                    this.checkEmail(val, ele);
                    break;
                case 'phone':
                    if (!/^1(3|4|5|7|8)\d{9}$/.test(val)) {
                        this.arg.phone = '';
                        ele.addClass('error');
                        layer.msg('手机号码错误', { icon: 5, time: 1000 });
                    } else {
                        ele.removeClass('error').children('.txt').fadeOut();
                    }
                    break;
                case 'password':
                    if (val.length < 8) {
                        this.arg.password = '';
                        ele.addClass('error');
                        layer.msg('密码长度不能少于8位数', { icon: 5, time: 1000 });
                        return;
                    } else {
                        ele.removeClass('error').children('.txt').fadeOut();
                    }
                    break;
                case 'code':
                    var arg = {
                        phone: this.arg.phone,
                        code: val
                    };
                    this.checkCode(arg, ele);
                    break;
                case 'shopName':
                    ele.removeClass('error').children('.txt').fadeOut();
                    break;
                case 'userName':
                    ele.removeClass('error').children('.txt').fadeOut();
                    break;
            }
        },
        submit: function submit() {
            if(this.hasEmail) return layer.msg('邮箱已注册！', { icon: 5, time: 1000 });
            if (!this.isOver) return;
            if (this.isStep1) {
                this.btnTxt = '完成';
                this.isStep1 = false;
                this.isOver = false;
            } else {
                this.http(this.arg);
            }
        },
        http: function http(arg) {
            var _self = this;
            this.$http.post(_self.https.register, arg, { emulateJSON: true }).then(function (res) {
                res = res.body;
                if (res.code == '0') {
                    _self.arg = {
                        phone: '',
                        email: '',
                        code: '',
                        userName: '',
                        password: '',
                        shopName: ''
                    };
                    setTimeout(function(){
                        window.location.href = _self.https.index;
                    },2000);
                    return layer.msg('注册成功！', { icon: 1, time: 1000 });
                } else if (res.code == '1') {
                    _self.arg.email = '';
                    _self.isOver = false;
                    _self.isStep1 = true;
                    $('#email').addClass('error');
                    layer.msg(res.message, { icon: 5, time: 1000 });
                } else {
                    layer.msg(res.message, { icon: 5, time: 1000 });
                }
            }, function (err) {
                layer.msg('网络连接超时，请稍候重试', { icon: 5, time: 1000 });
            });
        },
        getCode: function getCode(tel) {
            var _self = this;
            var timeTotal = 59;
            var timeId = '';
            this.$http.post(this.https.getCode, { phone: tel }, { emulateJSON: true }).then(function (res) {
                res = res.body;
                if (res.code == '0') {
                    _self.isCodeBtn = false;
                    if (timeTotal >= 1) {
                        _self.codeTxt = timeTotal + 's\u540E\u53EF\u91CD\u53D1';
                        timeId = setInterval(function () {
                            timeTotal -= 1;
                            _self.codeTxt = timeTotal + 's\u540E\u53EF\u91CD\u53D1';
                            if (timeTotal == 0) {
                                clearInterval(timeId);
                                _self.codeTxt = '';
                                _self.isCodeBtn = true;
                            }
                        }, 1000);
                    }
                } else {
                    //_self.arg.phone = ''
                    $('#phone').addClass('error');
                    layer.msg(res.message, { icon: 5, time: 1000 });
                }
            }, function (err) {
                layer.msg('网络连接超时，请稍候重试', { icon: 5, time: 1000 });
            });
        },
        checkCode: function checkCode(arg, ele) {
            var _self = this;
            this.$http.post(_self.https.checkCode, arg, { emulateJSON: true }).then(function (res) {
                res = res.body;
                if (res.code == '0') {
                    ele.removeClass('error').children('.txt').fadeOut();
                } else {
                    _self.arg.code = '';
                    ele.addClass('error');
                    layer.msg(res.message, { icon: 5, time: 1000 });
                }
            }, function (err) {
                layer.msg('网络连接超时，请稍候重试', { icon: 5, time: 1000 });
            });
        },
        checkEmail: function checkEmail(arg, ele) {
            var _self = this;
            this.$http.post(_self.https.checkEmail, {email: arg}, { emulateJSON: true }).then(function (res) {
                res = res.body;
                if (res.code == '0') {
                    ele.removeClass('error').children('.txt').fadeOut();
                    _self.hasEmail = false
                    _self.contentUpdate();
                } else {
                    _self.hasEmail = true
                    _self.isOver = false
                    _self.isStep1 = true
                    ele.addClass('error');
                    layer.msg(res.message, { icon: 5, time: 1000 });
                }
            }, function (err) {
                layer.msg('网络连接超时，请稍候重试', { icon: 5, time: 1000 });
            });
        },
        countDown: function countDown() {
            var _self = this;
            if (isBlank(_self.arg.phone)) {
                layer.msg('请输入您的手机号码', { icon: 5, time: 1000 });
                $('#phone').addClass('error');
                return;
            }
            _self.getCode(_self.arg.phone);
        }
    }
});