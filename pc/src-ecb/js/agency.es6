chinaAreaInit(["province", "city"], ["省","市"]);
let boo = false;//是否可以点击提交按钮  true 是    false  不是
function isBlank(letValue) {
    //判断为空
    if (letValue !== null && letValue !== undefined && letValue !== '' && letValue !== 'null') {
        return false;
    }
    return true;
}
function Val(ele){
    //获取输入框中的val值
    return ele.val();
}
function checkPhone(num){
    //电话号码检查
    $.ajax({
        url:"//acrm.ecbao.cn/index.php/api/existMobile",
        type:'get',
        dataType:'jsonP',
        data:{contact_way:num},
        success:function(data){
            if(data == '200'){
                $(".tips").text("");
                boo = true
            }else if(data == '201'){
                $(".tips").text("手机号格式错误！");
                boo = false
            }else {
                $(".tips").text("手机号已经存在！");
                boo = false
            }
        }
    });
}
function Submit(obj){
    //代理加盟商加盟
    $.ajax({
        url:"//acrm.ecbao.cn/index.php/api/insertAgent",
        type:'get',
        dataType:'jsonP',
        data: obj,
        success:function(data){
            if(data == '200'){
                $(".tips").text("恭喜您，提交成功！");
                boo = false
            }else if(data == '201'){
                $(".tips").text("手机号格式错误！");
            }
        }
    });
}
$(function () {
    //提示文本
    let $txt = $(".tips");
    //输入框获取焦点，提示消息
    $("#contact","#province","#contact_way","#qq","#company_name").focus(function(){
        $(".tips").text("");
    });
    //输入框失去焦点事件
    $('#contact_way').blur(function(){
        let val = $(this).val();
        if(isBlank(val)) return $txt.text('手机号不能为空！');
        if(!(/^1(3|4|5|7|8)\d{9}$/).test(val)) return $txt.text("手机号不正确！");
        checkPhone(val);
    })
    //提交按钮点击事件
    $('#submit').click(function(){
        //姓名
        let $contact = $('#contact');
        //联系方式
        let $contact_way = $('#contact_way');
        //qq
        let $qq = $('#qq');
        //公司名字
        let $company_name = $('#company_name');
        //省会
        let $province = $('#province');
        //城市
        let $city = $('#city');
        console.log(2);
        if(isBlank(Val($contact))) return $txt.text('姓名不能为空！');
        if(isBlank(Val($contact_way))) return $txt.text('手机号不能为空！');
        if(!(/^1(3|4|5|7|8)\d{9}$/).test(Val($contact_way))) return $txt.text("手机号格式不正确！");
        if(!boo) return $txt.text("手机号已经存在！");
        if(isBlank(Val($qq))) return $txt.text('QQ不能为空！');
        if(isBlank(Val($company_name))) return $txt.text('公司名称不能为空！');
        if(isBlank(Val($province))) return $txt.text('省会不能为空！');
        if(isBlank(Val($city))) return $txt.text('城市不能为空！');
        let arg = {
            contact: Val($contact),
            contact_way: Val($contact_way),
            qq: Val($qq),
            company_name: Val($company_name),
            province: Val($province),
            city: Val($city),
            from: 'dsb'
        };
        Submit(arg);
    })
});