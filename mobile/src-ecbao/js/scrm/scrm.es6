 new Swiper('.swiper-container-2', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false,
    loop: true,
    grabCursor: true
});
 let ajaxUrl = {
     companyNews: '//ketang.ecbao.cn/video?page=1&orderby=id&order=desc&json=1'
 };
 for (let key in ajaxUrl) {
     if (ajaxUrl.hasOwnProperty(key)) {
         getAndRenderNews(key, ajaxUrl[key]);
     }
 }
 function getAndRenderNews(domId, url) {
     $.ajax({
         "url": url,
         "dataType": "jsonp",
     }).done(function (obj) {
         if (obj.status === 'ok' && obj.count > 0) {
             let newsLists = obj.posts;
             let html = '';
             for (let i in newsLists) {
                 if (i > 3) {
                     break;
                 }
                 let newsTitle = newsLists[i].title;
                 let newsLink = newsLists[i].url;
                 html += `<div class="item-content"><a href="http://${newsLink.split("//")[1]}" class="item">${newsTitle}</a></div>`;
             }
             $("#newsContainer").html(html);
         }
     });
 }

 new Swiper('.container-swiper', {
     pagination: '.swiper-pagination',
     nextButton: '.swiper-button-next',
     prevButton: '.swiper-button-prev',
     slidesPerView: 3,
     paginationClickable: true,
     spaceBetween: 0,
     autoplay: 2500,
     autoplayDisableOnInteraction: false,
     loop: true,
     grabCursor: true
 });

 //焦点事件
 $("#blur").on('blur','input',function(){
     var _val = $(this).val();
     if(_val == ''){
         $(this).parent('.input-group').addClass('waring');
     }else{
         $(this).parent('.input-group').removeClass('waring');
         $(".phone_tips").text("").fadeOut();
     }
 });
 //申请按钮
 $("#apply_btn").click(function () {
     var $name = $("#userName");
     var _name = $name.val();
     var $city = $("#demo1");
     var _city = $city.val();
     var $phone = $("#phoneId");
     var _phone = $phone.val();
     var $qq = $("#agQQ");
     var _qq = $qq.val();
     var $company = $("#agCompany");
     var _company = $company.val();
     var _province = 1;
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
             $(".phone_tips").text("手机号不正确！").fadeIn();
             return;
         }
     }
     if(_qq==''){
         $qq.focus();
         $qq.parent('.input-group').addClass('waring');
         return;
     }
     if(_company == ''){
         $company.focus();
         $company.parent('.input-group').addClass('waring');
         return;
     }
     if(_city==''){
         $('#province_id').addClass('waring');
         return;
     }else{
         $('#province_id').removeClass('waring');
     }
     if(_province==''){
         $(".phone_tips").text("地区不能为空！").fadeIn();
         return;
     }
     var citySplit = _city.split(",");
     _province = citySplit[0];
     _city = citySplit.slice(1).join(",");
     var makerData={
         contact:_name,
         contact_way:_phone,
         company_name:_company,
         qq:_qq,
         province:_province,
         city:_city,
         from: "scrm"
     };
     $.ajax({
         url:"http://oa.ecbao.cn/dsb/Maker_apply/create",
         type:'get',
         dataType:'jsonP',
         data:makerData,
         success:function(data){
             if(data.code=='200'){
                 $(".phone_tips").text("恭喜您，提交成功！").fadeIn();
             }else if(data.code=='400'){
                 $(".phone_tips").text("已提交成功，不可重复提交！").fadeIn();
             }else {
                 $(".phone_tips").text(data.msg).fadeIn();
             }
         }
     });
 });