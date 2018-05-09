/**
 * Created by Administrator on 2017/9/18.
 */
/***
 * 记住密码
 */
(function rememberPwd(){
    var $rememberBtn = $(".remember_pwd_text");
    var $rememberPwd = $(".suo-remember-input");
    var sj_pwd = $("#pwd");
    var pwd = $(".pwd_password");
    $rememberBtn.click(function(){
        var $suoPwd = pwd.val();
        var $sj_suoPwd = sj_pwd.val();
        var boo = $rememberPwd.prop("checked");
        boo = !boo;
        $rememberPwd.prop("checked",boo);
        if(boo){
            $.cookie('suoNum', $.base64.encode($suoPwd), { expires: 7 });
            $.cookie('sj_suoNum', $.base64.encode($sj_suoPwd), { expires: 7 });
        }else {
            $.cookie('suoNum', "");
            $.cookie('sj_suoNum', "");
        }
    });
    $rememberPwd.click(function(){
        var boo = $rememberPwd.prop("checked");
        var $suoPwd = pwd.val();
        var $sj_suoPwd = sj_pwd.val();
        if(boo){
            $.cookie('suoNum', $.base64.encode($suoPwd), { expires: 7 });
            $.cookie('sj_suoNum', $.base64.encode($sj_suoPwd), { expires: 7 });
        }else {
            $.cookie('suoNum', "");
            $.cookie('sj_suoNum', "");
        }
    })
})();