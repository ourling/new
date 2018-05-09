function isBlank(varValue) {
    if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
        return false;
    }
    return true;
}
let Local =  'http://121.199.182.2:30004';
//let Local =  'http://aijuhr.com';
let app = new Vue({
    el: "#app",
    data: {
        https: {
            register:`${Local}/hrm/account/register.do`,
            getCode: `${Local}/hrm/account/getRegisterCode.do`,
            checkCode: `${Local}/hrm/account/checkRegisterCode.do`,
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
        codeTxt: '',//code倒计时文本
        isAgree: false, //是否同意协议
        isCodeBtn: true//是否显示code  BTN
    },
    methods: {
        contentUpdate() {
            /* input文字修改 */
            if (this.isStep1) {
                this.isOver = !isBlank(this.arg.email) && !isBlank(this.arg.phone) && !isBlank(this.arg.code) && !isBlank(this.arg.password) && this.arg.password.length >= 8 ? true : false;
            } else {
                this.isOver = !isBlank(this.arg.shopName) && !isBlank(this.arg.userName) ? true : false;
            }
        },
        blurEvent(e, type){
            /****
             * 失去焦点判断事件
             */
            let target, text;
            target = e.currentTarget;
            text = $(target).val();
            let $parent = $(target).parent('.input-group')
            if (isBlank(text)) {
                $(target).siblings('.txt').fadeIn();
                return $parent.addClass('error');
            } else {
                this.type(text, type,$parent);
            }
        },
        type(val, type,ele){
            //表单数据判断
            switch (type) {
                case 'email':
                    if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val))) {
                        this.arg.email = '';
                        ele.addClass('error')
                        layer.msg('邮箱输入错误', {icon: 5, time: 1000});
                    }else{
                        ele.removeClass('error').children('.txt').fadeOut()
                    }
                    break;
                case 'phone':
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(val))) {
                        this.arg.phone = '';
                        ele.addClass('error')
                        layer.msg('手机号码错误', {icon: 5, time: 1000});
                    }else{
                        ele.removeClass('error').children('.txt').fadeOut()
                    }
                    break;
                case 'password':
                    if (val.length < 8) {
                        this.arg.password = '';
                        ele.addClass('error')
                        layer.msg('密码长度不能少于8位数', {icon: 5, time: 1000});
                        return;
                    }else{
                        ele.removeClass('error').children('.txt').fadeOut()
                    }
                    break;
                case 'code':
                    let arg = {
                        phone: this.arg.phone,
                        code: val
                    }
                    this.checkCode(arg,ele);
                    break;
                case 'shopName':
                    ele.removeClass('error').children('.txt').fadeOut()
                    break;
                case 'userName':
                    ele.removeClass('error').children('.txt').fadeOut()
                    break;
            }
        },
        submit(){
            if (!this.isOver) return;
            if (this.isStep1) {
                this.btnTxt = '完成'
                this.isStep1 = false
                this.isOver = false
            } else {
                this.http(this.arg)
            }
        },
        http(arg){
            let _self = this
            this.$http.post(_self.https.register,arg,{emulateJSON:true}).then(
                (res)=>{
                    res = res.body
                    if(res.code == '0'){
                        _self.arg = {
                            phone: '',
                            email: '',
                            code: '',
                            userName: '',
                            password: '',
                            shopName: ''
                        }
                        window.location.href = _self.https.index
                        return layer.msg(res.message, {icon: 1, time: 1000});
                    }else if(res.code == '1'){
                        _self.arg.email = ''
                        _self.isOver = false
                        _self.isStep1 = true
                        $('#email').addClass('error')
                        layer.msg(res.message, {icon: 5, time: 1000});
                    }else{
                        layer.msg(res.message, {icon: 5, time: 1000});
                    }
                },
                (err)=>{
                    layer.msg('网络连接超时，请稍候重试', {icon: 5, time: 1000});
                }
            )
        },
        getCode(tel){
            let _self = this
            let timeTotal = 59;
            let timeId = '';
            this.$http.post(this.https.getCode,{phone:tel},{emulateJSON:true}).then(
                (res)=>{
                    res = res.body
                    if(res.code == '0'){
                        _self.isCodeBtn = false;
                        if (timeTotal >= 1) {
                            _self.codeTxt = `${timeTotal}s后可重发`
                            timeId = setInterval(function () {
                                timeTotal -= 1;
                                _self.codeTxt = `${timeTotal}s后可重发`
                                if (timeTotal == 0) {
                                    clearInterval(timeId);
                                    _self.codeTxt = ``
                                    _self.isCodeBtn = true;
                                }
                            }, 1000);
                        }
                    }else{
                        //_self.arg.phone = ''
                        $('#phone').addClass('error');
                        layer.msg(res.message, {icon: 5, time: 1000});
                    }
                },
                (err)=>{
                    layer.msg('网络连接超时，请稍候重试', {icon: 5, time: 1000});
                }
            )
        },
        checkCode(arg,ele){
            let _self = this
            this.$http.post(_self.https.checkCode,arg,{emulateJSON:true}).then(
                (res)=>{
                    res = res.body
                    if(res.code == '0'){
                        ele.removeClass('error').children('.txt').fadeOut()
                    }else{
                        _self.arg.code = ''
                        ele.addClass('error')
                        layer.msg(res.message, {icon: 5, time: 1000});
                    }
                },
                (err)=>{
                    layer.msg('网络连接超时，请稍候重试', {icon: 5, time: 1000});
                }
            )
        },
        countDown() {
            let _self = this
            if(isBlank(_self.arg.phone)) {
                layer.msg('请输入您的手机号码', {icon: 5, time: 1000});
                $('#phone').addClass('error');
                return;
            }
            _self.getCode(_self.arg.phone);
        }
    }
})