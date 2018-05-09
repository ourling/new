let Dropdown = {
    template: `
            <div class="dropDownList">
                <div class="menuSystemList">
                    <ul class="clearfix width1200 border">
                        <li :class="['item-drop',item.className]" v-for="(item,idx) in nav">
                            <a :href="item.link" class="url"><i :class="['s-icon','s'+idx]"></i>{{item.navName}}</a>
                            <span class="li" v-for="(sItem,index) in item.container"><i>■</i><a :href="sItem.link" target="_blank">{{sItem.name}}</a></span>
                        </li>
                    </ul>
                </div>
            </div>
    `,
    props: {
        nav: Array
    }
};
let FixNav = {
    template: `
    <div class="fix-nav">
        <div class="nav-container clear">
            <span class="logo fl">
                <img :src="fixnav.logo" alt="">
            </span>
            <div class="tip-block fr">
                <span>{{fixnav.txt}}</span>
                <a class="btn btn-danger" :href="fixnav.loginLink" target="_blank">免费试用</a>
                <a class="btn btn-warning" :href="fixnav.registerLink" target="_blank">代理合作</a>
            </div>
        </div>
    </div>
    `,
    props: {
        fixnav: Object
    }
};
let StaticNav = {
    template: `
        <div class="static-nav">
            <div class="nav-container clear" v-cloak>
                <div class="dropdown fl toggle-nav">
                    <span class="dropdown-toggle" data-toggle="dropdown">{{toggleNav.txt}}<i class="icon icon-sort-down"></i></span>
                    <ul class="dropdown-menu">
                        <li><a class="border-line" :href="toggleNav.linkAiiju">{{toggleNav.txtAiiju}}</a></li>
                        <li><a :href="toggleNav.linkEc">{{toggleNav.txtEc}}</a></li>
                    </ul>
                </div>
                <ul class="head-middle">
                    <li class="item"><a :href="mainNav[0].link">{{mainNav[0].navName}}</a></li>
                    <li @mouseenter="open($event)" @mouseleave="close($event)" class="item">
                        <a :href="mainNav[1].link">{{mainNav[1].navName}} <span class="icon icon-sort-down"></span></a>
                        <dropMenu :nav="navObjOne"></dropMenu>
                    </li>
                    <li @mouseenter="open($event)" @mouseleave="close($event)" class="item">
                        <a :href="mainNav[2].link">{{mainNav[2].navName}} <span class="icon icon-sort-down"></span></a>
                        <dropMenu :nav="navTwo"></dropMenu>
                    </li>
                    <li @mouseenter="open($event)" @mouseleave="close($event)" class="item">
                        <a :href="mainNav[3].link">{{mainNav[3].navName}} <span class="icon icon-sort-down"></span></a>
                        <dropMenu :nav="navThree"></dropMenu>
                    </li>
                    <li class="item"><a :href="mainNav[4].link" target="_blank">{{mainNav[4].navName}}</a></li>
                    <li class="item">
                        <a :href="mainNav[5].link" target="_blank">{{mainNav[5].navName}}</a>
                        <img style="position: relative;top: -13px;" src="../images/nav/hot.gif" alt="">
                    </li>
                </ul>
                <div class="head-rt fr">
                    <a href="http://www.ecbao.cn/dsb/home_login?from=aiiju&source=&redirect=http://ls.aiiju.com"
                       target="_blank" class="nav-login">立即登录</a>
                    <a href="http://dian.ecbao.cn/form.php" target="_blank" id="registerBtn" class="nav-register">免费体验</a>
                </div>
            </div>
        </div>
        `,
    props: {
        staticnav: Object
    },
    data(){
        return {
            navObjOne: this.staticnav.navObjOne,
            navTwo: this.staticnav.navTwo,
            navThree: this.staticnav.navThree,
            toggleNav: {
                txt: "官网切换",
                linkAiiju: "https://aiiju.com/",
                txtAiiju: "爱聚新零售版",
                linkEc: "http://www.ecbao.cn/",
                txtEc: "电商全渠道版"
            },
            mainNav: [
                {navName: "首页", link: 'https://aiiju.com/'},
                {navName: "产品", link: 'javascript:;'},
                {navName: "移动端产品", link: 'javascript:;'},
                {navName: "新零售解决方案", link: 'javascript:;'},
                {navName: "用户案例", link: 'http://www.ecbao.cn/case'},
                {navName: "代理加盟", link: './agency.html'}
            ]
        }
    },
    components: {
        'dropMenu': Dropdown
    },
    methods: {
        open(e){
            this.$emit('drop-open', e)
        },
        close(e){
            this.$emit('drop-close', e)
        }
    }
};
let app = new Vue({
    el: '#head',
    data: {
        fixNav: {
            logo: "../images/nav/aiiju_header_logo.png",
            txt: `支持多门店统一管理，定制新零售O2O解决方案，10000 家门店正使用`,
            loginLink: "http://dian.ecbao.cn/form.php",
            registerLink: "./agency.html"
        },
        staticNav: {
            navObjOne: [
                {
                    navName: "管货",
                    container: [
                        {name: "爱聚ERP", link: "javascript:;"},
                        {name: "爱聚OMS", link: "javascript:;"},
                        {name: "微商城", link: "javascript:;"},
                        {name: "微分销", link: "javascript:;"}],
                    link: "javascript:;",
                    className: "one"
                },
                {
                    navName: "管钱",
                    container: [
                        {name: "爱聚收银", link: "https://pay.ecbao.cn/"},
                        {name: "爱聚财务", link: "http://www.ecbao.cn/product-dsb"},
                        {
                            name: "智能POS",
                            link: "https://item.taobao.com/item.htm?spm=a1z10.1-c.w4004-16383914202.4.203e3891YW43so&id=551309521277"
                        },
                        {name: "智能收银台", link: "javascript:;"}],
                    link: "javascript:;",
                    className: "one"
                },
                {
                    navName: "管客",
                    container: [
                        {name: "爱聚SCRM", link: "http://scrm.aiiju.com/"},
                        {name: "互动营销", link: "javascript:;"},
                        {name: "小程序", link: "http://www.xcx.aiiju.com/"},
                        {name: "社群营销", link: "javascript:;"}],
                    link: "javascript:;",
                    className: "one"
                },
                {
                    navName: "管人",
                    container: [
                        {name: "爱聚HR", link: "https://hr.ecbao.cn/"},
                        {name: "人事管理", link: "https://hr.ecbao.cn/pc/#page4"},
                        {name: "招聘管理", link: "https://hr.ecbao.cn/pc/#page2"},
                        {name: "OA管理", link: "https://hr.ecbao.cn/pc/#page5"}],
                    link: "javascript:;",
                    className: "one"
                }
            ],
            navTwo: [
                {
                    navName: "爱聚门店移动版",
                    container: [],
                    link: "http://dian.ecbao.cn/app.php",
                    className: "two"
                },
                {
                    navName: "爱聚ERP移动版",
                    container: [],
                    link: "http://www.ecbao.cn/product-app/",
                    className: "two"
                },
                {
                    navName: "爱聚HR移动版",
                    container: [],
                    link: "https://hr.ecbao.cn/mobile/#page2",
                    className: "two"
                }
            ],
            navThree: [
                {
                    navName: "行业解决方案",
                    container: [],
                    link: "javascript:;",
                    className: "three"
                },
                {
                    navName: "类目解决方案",
                    container: [],
                    link: "javascript:;",
                    className: "three"
                },
                {
                    navName: "零售解决方案",
                    container: [],
                    link: "javascript:;",
                    className: "three"
                }
            ]
        }
    },
    components: {
        "fix-nav": FixNav,
        "static-nav": StaticNav
    },
    methods: {
        dropOpen(e){
            navDropmenu(e.target, true)
        },
        dropClose(e){
            navDropmenu(e.target, false)
        }
    }
});
function navDropmenu(ele, boo) {
    let _this = $(ele);
    let $container = $(_this).find('.dropDownList');
    if (boo) {
        let $item = $(_this).find('.menuSystemList');
        let boo_c = $container.is(":animated");
        if (!boo_c) {
            $container.animate({height: $item.height()}, 300);
        }
    } else {
        $container.animate({height: 0}, 200);
    }
}