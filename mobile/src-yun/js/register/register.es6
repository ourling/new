$(function () {
    $("#codeBtn").click(function () {
        let phone_number = $("#phoneNumber").val();
        checkPhone(phone_number);
        if (is_phone) {
            getCode(phone_number);
        }

    });
    $("#submitBtn").click(function () {
        let phone_number = $("#phoneNumber").val(); //手机号
        let security_code = $("#securityCode").val(); //验证码
        let password = $("#password").val();  // 密码
        if (password.length < 8) {
            layer.msg('密码长度不能少于8位数', {icon: 5, time: 1000});
            return;
        }
        if (!security_code) {
            layer.msg('验证码不能为空', {icon: 5, time: 1000});
            return;
        }
        checkPhone(phone_number);
        if (is_phone) {
            stopForm('submitBtn');
            let userFrom = aStart_getCookie('ajtj_from_cookie');
            let param = {
                'shop_name': '',
                'user_name': phone_number,
                'password': password,
                'phone': phone_number,
                'code': security_code,
                'source': 'waimaishop',
                'userFrom': userFrom
            };
            // common_ajax("", param, 'do_register_suc');
            $.ajax({
                url: system_url + 'home_login_opers/register',
                type: 'POST',
                data: param,
                dataType: 'json',
                success: function (obj) {
                    if (obj.result) {
                        //window.location.href = 'http://www.ecbao.cn/mobileWebsite/fifth_anniversary/reg_success.html?num=' + param.user_name;
                        console.log("注册成功");
                    } else {
                        layer.msg(obj.message, {icon: 5, time: 1000});
                    }
                },
                error: function () {
                    layer.msg('连接中断，请重试', {icon: 5, time: 1000});
                }
            });
        }
    })
    /*--------手机号校验-------*/
    let is_phone = true;   //判断手机号
    function checkPhone(phone) {
        if (phone != '') {
            if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
                layer.msg('手机号码错误', {icon: 5, time: 1000});
                is_phone = false;
            } else {
                is_phone = true;
            }
        } else {
            layer.msg('手机号码不能为空', {icon: 5, time: 1000});
            is_phone = false;
        }
    }

    function countDown() {
        let $codeBtn = $("#codeBtn");
        let timeTotal = 59;
        let timeId = '';
        if (timeTotal >= 1) {
            $codeBtn.text(timeTotal + "s后可重发").attr("disabled", true);
            // $codeBtn.css("color","#999");
            $codeBtn.addClass('code-active');
            timeId = setInterval(function () {
                timeTotal -= 1;
                $codeBtn.text(timeTotal + "s后可重发");
                if (timeTotal == 0) {
                    clearInterval(timeId);
                    $codeBtn.text("获取验证码").attr("disabled", false);
                    $codeBtn.removeClass('code-active');
                }
            }, 1000);
        }
    }
    function getCode(phone) {
        let param = {
            'value': $("#phoneNumber").val(),
            'column': 'tel_num'
        };
        $.ajax({
            url: system_url + 'home_login_opers/check_mult',
            type: 'POST',
            data: param,
            dataType: 'json',
            success: function (obj) {
                // let obj = eval('(' + msg + ')');
                if (obj.result) {
                    countDown();
                    sendMessage();
                } else {
                    layer.msg('此手机号已经存在，请换一个重试！', {icon: 5, time: 1000});
                }
            }
        });
    }

    /**
     * 发送验证码到手机
     * @returns {undefined}
     */
    function sendMessage() {
        //向后台发送处理数据
        let param = {'zc_tel': $("#phoneNumber").val()};
        let sign = encode_sign(param);
        let param_data = {'zc_tel': $("#phoneNumber").val(), "sign": sign};

        $.ajax({
            url: system_url + "home_login_opers/reg_check",
            dataType: 'text',
            data: param_data,
            success: function (result) {

            },
            error: function (data) {
                alert("网络连接超时！");
            }
        });
    }
    /**
     * 参数加密函数
     * @param {type} param
     * @returns {unresolved}
     */
    function encode_sign(param) {
        let sign_key = 'ecbao';
        let str = '';
        let value_obj = eval(param);
        for (let i in value_obj) {
            if (value_obj[i] != 'undefined' && value_obj[i] != '' && value_obj[i] != null) {
                str += i + value_obj[i];
            }
        }
        str += sign_key;
        return $.md5(str);
    }
    /*防止频繁提交表单进行http请求*/
    function stopForm(selector) {
        let timeTotal = 5;
        let timer = '';
        if (timeTotal >= 1) {
            $("#" + selector).attr('disabled', true);
            $("#" + selector).css('background', '#c6c6c6');
            let timer = setInterval(function () {
                timeTotal -= 1;
                if (timeTotal == 0) {
                    clearInterval(timer);
                    $("#" + selector).attr('disabled', false);
                    $("#" + selector).css('background', '#4896eb');
                }
            }, 1000);
        }
    }
});
