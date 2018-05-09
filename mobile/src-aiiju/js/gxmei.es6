//字体尺寸转化
(function (doc, win, undefined) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);

new Vue({
    el: '#app',
    data: {
        isShow: false,
        http: {
            path: 'https://aijuhr.com/hrm/weixin/gxm/saveUser.do'
        }
    },
    mounted(){

    },
    methods: {
        submit(){
            let $name = $("#userName");
            let _name = $name.val();
            let $phone = $("#phoneId");
            let _phone = $phone.val();
            let $company = $("#agCompany");
            let _company = $company.val();
            if(_company == ''){
                $company.focus();
                $company.parent('.input-group').addClass('waring');
                return;
            }
            if(_name==''){
                $name.focus();
                $name.parent('.input-group').addClass('waring');
                return;
            }
            if(_phone==''){
                $phone.focus();
                $phone.parent('.input-group').addClass('waring');
                return;
            }
            if(_phone!=''){
                if(!(/^1(3|4|5|7|8)\d{9}$/).test(_phone)){
                    $phone.focus();
                    $phone.parent('.input-group').addClass('waring');
                    return;
                }
            }
            let makerData={
                contact:_name,
                contact_way:_phone,
                company_name:_company
            };
            return this.$http.post(this.http.path, makerData).then(
                res => {
                    console.log(res);
                },
                err => {
                    console.log(err)
                }
            )
        }
    }
});
$(".content").on('blur','input',function(){
    var _val = $(this).val();
    if(_val == ''){
        $(this).parent('.input-group').addClass('waring');
    }else{
        $(this).parent('.input-group').removeClass('waring');
        $(".phone_tips").text("").fadeOut();
    }
});