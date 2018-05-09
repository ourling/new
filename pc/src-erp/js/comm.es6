let Foot = {
    template: `
        <footer>
            <div class="partner">
                <div class="footer-container ">
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
                    <div class="partner-top">
                        <span class="partner-text">合作伙伴</span>
                        <span class="partner-img"></span>
                    </div>
                </div>
            </div>
            <div class="down-icon">
                <div class="footer-container">
                    <p class="item">爱聚科技旗下：
                        <a v-for="(item,index) in downicon" :href="item.href" target="_blank">{{item.title}} <span v-if="item.hasBar"> | </span> </a>
                    </p>
                    <p class="item">软件证书编号：浙RC-2016-0918  |  软件著作权登记号：2016SR285973 |  浙ICP备12032625号-3 | <a style="display:inline-block;text-decoration:none;height:20px;line-height:20px;color:#9e9e9e;" :href="lastLink.href" target="_blank"><img  :src="lastLink.url">  {{lastLink.title}}</a></p>
                    <p class="item">Copyright@ 2012 - 2017 Aiiju inc. All Rights Reserved 爱聚公司版权所有</p>
                </div>
            </div>
        </footer>
    `,
    data(){
        return {
            partnerLeft: [
                {title: "用户中心", list: ['产品中心', '用户案例', '解决方案']},
                {title: "开发与合作", list: ['合作伙伴登录', '开放平台']},
                {title: "技术支持", list: ['帮助中心', '爱聚学堂', '在线咨询']},
                {title: "关于爱聚科技", list: ['公司介绍', '荣誉奖项', '企业文化', '企业招聘']},
                {title: "关注爱聚科技", list: ['微信关注', '微博关注']}
            ],
            partnerRight: {
                tel: "0571-89935939",
                mail: "biz@iyenei.com",
                nailNum: "310000",
                address: "杭州市西湖区文一西路崇义路口公元里7幢6楼"
            },
            downicon: [
                {hasBar: true, href: "//www.ecbao.cn/product-erp/", title: "电商宝ERP"},
                {hasBar: true, href: "//www.ecbao.cn/product-dsb/", title: "电商宝财务"},
                {hasBar: true, href: "//www.ecbao.cn/product-crm", title: "电商宝SCRM"},
                {hasBar: true, href: "//dian.ecbao.cn/", title: "爱聚门店"},
                {hasBar: true, href: "//pay.aiiju.com", title: "爱聚收银记账"},
                {hasBar: true, href: "//aiiju.com/", title: "爱聚新零售"},
                {hasBar: false, href: "//hr.ecbao.cn", title: "爱聚HR"},
            ],
            lastLink: {
                href: "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602004534",
                url: "http://www.ecbao.cn/dsb/assert/home_login/images/safe.png",
                title: "浙公网安备 33010602004534号"
            }
        }
    }
}
let Menu = {
    template: `
        <div id="product" class="dropDownList">
            <div class="menuSystemList">
                <ul class="clearfix width1200 border">
                    <li v-for="(items,index) in arritem" class="item-drop one">
                        <a href="javascript:;" class="url"><i :class="['icon','icon-'+items.id]"></i>{{items.title}}</a>
                        <span v-for="item in items.itemArr" class="li"><a :href="item.href" target="_blank">{{item.name}}</a></span>
                    </li>
                </ul>
            </div>
        </div>
    `,
    props: {
        arritem: Array
    }
}
let Head = {
    template: `
        <header id="head" class="nav">
            <div class="nav-container clearfix">
                <span class="logo"></span>
                <div class="nav-content">
                    <div v-for="(item,index) in navObj" :class="['item',item.hasMenu ? 'dropmenu ': '']">
                        <a :class="['a',index == num ? 'active' : '' ]" :href="item.href" target="_blank">{{item.name}}</a>
                        <menu-item v-if="item.hasMenu" :arritem="navItem"></menu-item>
                    </div>
                </div>
                <div class="login-container">
                    <a href="javascript:;" target="_blank" class="item">注册 &nbsp;&nbsp;</a> |
                    <a href="javascript:;" target="_blank" class="item"> &nbsp;&nbsp;登录</a>
                </div>
            </div>
        </header>
    `,
    props: {
        num : Number
    },
    components: {
        'menu-item': Menu
    },
    data(){
        return {
            navObj: [
                {name: "首页", href: "index.html", hasMenu: false},
                {name: "产品中心", href: "javascript:;", hasMenu: false},
                {name: "产品价格", href: "javascript:;", hasMenu: false},
                {name: "合作案例", href: "javascript:;", hasMenu: false}
            ],
            navItem: [
                {id: 1, title: "外卖微商城", itemArr: [
                    {name: "门店管理", href: "javascript:;"},
                    {name: "微商城", href: "javascript:;"},
                    {name: "配送平台", href: "javascript:;"},
                    {name: "数据分析", href: "javascript:;"}
                ]},
                {id: 2, title: "外卖收银平台", itemArr: [
                    {name: "聚合收银", href: "javascript:;"},
                    {name: "后台管理", href: "javascript:;"},
                    {name: "储值卡管理", href: "javascript:;"},
                    {name: "订单处理", href: "javascript:;"}
                ]},
                {id: 3, title: "互动营销", itemArr: [
                    {name: "优惠券营销", href: "javascript:;"},
                    {name: "粉丝营销", href: "javascript:;"},
                    {name: "积分管理", href: "javascript:;"},
                    {name: "用户分析", href: "javascript:;"}
                ]},
                {id: 4, title: "智能硬件", itemArr: [
                    {name: "智能扫码抢", href: "javascript:;"},
                    {name: "智能收银台", href: "javascript:;"},
                    {name: "智能POS机", href: "javascript:;"},
                    {name: "钱箱和电子称", href: "javascript:;"}
                ]}
            ]
        }
    }
}
$(window).scroll(function () {
    var winPos = $(window).scrollTop();
    if (winPos >= 200) {
        $(".nav").addClass("fix-nav");
    } else {
        $(".nav").removeClass("fix-nav");
    }
});