let app = new Vue({
    el: "#app",
    components: {
        'app-head': Head,
        'app-foot': Foot,
        'app-mask-tel': MaskTel,
        'app-mask-menu': MaskMenu
    },
    mixins: [mixinMask,mixin],
    data: {
        arr: [
            {id: 1,title: "服装鞋帽解决方案",text: "一个微商城内包含多个门店，且每个门店可根据权限管理独立操作，LBS自动定位最近门店进行接单配送。",btn: "了解详情", url : "javascript:;"},
            {id: 2,title: "聚合收银台",text: "多主体的聚合收银，适合直营加盟混合管理多种订单管理：食堂、外卖订单均可管理",btn: "了解详情", url : "javascript:;"},
            {id: 3,title: "对接第三方外卖平台",text: "可对接美团、饿了么、百度等外卖平台，实时同步各平台订单与财务数据",btn: "了解详情", url : "javascript:;"},
            {id: 4,title: "对接第三方配送平台",text: "可对接达达、点我达等第三方配送平台，商户可直接发单。",btn: "了解详情", url : "javascript:;"},
            {id: 5,title: "会员营销管理",text: "强大的吸粉和营销功能：支持多种营销手段优惠券、带参二维码、客户达标。",btn: "了解详情", url : "javascript:;"}
        ],
        banner : {
            title: "云店宝 提高外卖营收五大神器",
            titleBar: "国内首款外卖行业新零售管理系统"
        }
    },
    mounted(){

    },
    methods: {
        linkUrl(url){
            window.location.href = url
            console.log(url);
        }
    }
})