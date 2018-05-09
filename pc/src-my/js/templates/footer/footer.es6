let ecbaoFoot = {
    template : `
        <div>
            <div class="information">
                <div class="footer-container card-container">
                    <div class="card-4" v-for="(item,index) in information">
                        <i :class="['my-icon my-icon-'+item.id]"></i>
                        <h4 class="footer-title">{{item.title}}</h4>
                    </div>
                </div>
            </div>
            <div class="partner">
                <div class="footer-container ">
                    <div class="partner-top">
                        <h3 class="partner-title">合作伙伴</h3>
                        <span class="partner-img"></span>
                    </div>
                    <div class="card-container">
                        <div class="card-2-spe">
                            <div class="card-5" v-for="(item,index) in partnerLeft">
                                <h5 class="partner-title-bar">{{item.title}}</h5>
                                <span class="partner-title-li" v-for="(data,idx) in item.list">{{data}}</span>
                            </div>
                        </div>
                        <div class="card-2-spe right">
                            <p class="footer-logo"></p>
                            <p class="tel-desc">咨询电话：(周一至周五9:00-18:00)</p>
                            <h4 class="tel">{{partnerRight.tel}}</h4>
                            <p class="mail">邮箱：{{partnerRight.mail}}</p>
                            <p class="mail-num">邮编：{{partnerRight.nailNum}}</p>
                            <p class="address">地址：{{partnerRight.address}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="down-icon">
                <div class="footer-container">
                    <p>爱聚科技旗下：
                        <a v-for="(item,index) in downicon" :href="item.href" target="_blank">{{item.title}} <span v-if="item.hasBar"> | </span> </a>
                    </p>
                    <p>软件证书编号：浙RC-2016-0918  |  软件著作权登记号：2016SR285973 |  浙ICP备12032625号-3 | <a style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color:#9e9e9e;" :href="lastLink.href" target="_blank"><img  :src="lastLink.url">  {{lastLink.title}}</a></p>
                    <p>Copyright@ 2012 - 2017 Aiiju inc. All Rights Reserved 爱聚公司版权所有</p>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            information: [
                {title: "支持30多家电商平台",id: 1},
                {title: "超60万+电商用户",id: 2},
                {title: "千万级订单处理量",id: 3},
                {title: "百人技术团队竭诚为您服务",id: 4}
            ],
            partnerLeft: [
                {title: "用户中心",list: ['产品中心','用户案例','解决方案']},
                {title: "开发与合作",list: ['合作伙伴登录','开放平台']},
                {title: "技术支持",list: ['帮助中心','爱聚学堂','在线咨询']},
                {title: "关于爱聚科技",list: ['公司介绍','荣誉奖项','企业文化','企业招聘']},
                {title: "关注电商宝",list: ['微信关注','微博关注']}
            ],
            partnerRight: {
                tel: "0571-89935939",
                mail: "biz@iyenei.com",
                nailNum: "310000",
                address: "杭州市西湖区文一西路崇义路口公元里7幢6楼"
            },
            downicon: [
                {hasBar: true,href: "//www.ecbao.cn/product-erp/",title: "电商宝ERP"},
                {hasBar: true,href: "//www.ecbao.cn/product-dsb/",title: "电商宝财务"},
                {hasBar: true,href: "//www.ecbao.cn/product-crm",title: "电商宝SCRM"},
                {hasBar: true,href: "//dian.ecbao.cn/",title: "爱聚门店"},
                {hasBar: true,href: "//pay.aiiju.com",title: "爱聚收银记账"},
                {hasBar: true,href: "//aiiju.com/",title: "爱聚新零售"},
                {hasBar: false,href: "//hr.ecbao.cn",title: "爱聚HR"},
            ],
            lastLink: {
                href: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602004534",
                url: "http://www.ecbao.cn/dsb/assert/home_login/images/safe.png",
                title: "浙公网安备 33010602004534号"
            }
        }
    }
}
let foot = new Vue({
    el: "#foot",
    components: {
        'ecbao-foot': ecbaoFoot
    }
});