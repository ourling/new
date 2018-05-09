/**
 * Created by suoLong on 2017/9/26.
 */
//字体尺寸转化
(function (doc, win, undefined) {
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (clientWidth === undefined) return;
            //字体转换  当前屏幕宽度 / 设计稿尺寸的一半  100px == 1rem
            docEl.style.fontSize = clientWidth / 7.5 + 'px';
        };
    if (doc.addEventListener === undefined) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);
let mixin = {
    methods: {
        login(){
            window.location.href = "http://fw.waimaishop.com"
        },
        qq(){
            $('.class_qidian_wpa')[0].contentWindow.document.getElementsByClassName("wpa-container")[0].click()
        }
    }
};
let mixinMask = {
    data : {
        hasMark: false
    },
    methods : {
        mask(){
            this.hasMark = !this.hasMark
            $(".dropdown-menu").animate({height: 0},300);
            $(".mask-foot-nav").fadeOut();
        },
        maskTel(){
            $('.mask-tel').fadeOut();
        }
    }
}
let Head = {
    template: `
        <header id="head">
            <div class="nav">
                <span class="logo"></span>
                <span class="head-btn fr" @click="login">免费体验</span>
            </div>
        </header>
    `,
    mixins: [mixin]
}
let Foot = {
    template : `
        <footer id="foot" class="static-foot mobile-foot">
            <div class="card-5 diver" @click='menu($event)'>
                <i class="icon icon-1"></i>
                <ul :class="['dropdown-menu',hasMaskMenu ? 'active': '']">
                    <li v-for="item in menuArr"><a class="item" :href="item.url">{{item.title}}</a></li>
                </ul>
            </div>
            <span class="card-5 diver" @click="qq">
                <i class="icon icon-2"></i>
            </span>
            <span class="card-5 diver" @click="tel($event)">
                <i class="icon icon-3"></i>
            </span>
            <span class="card-5">
                <i class="icon icon-4"></i>
            </span>
            <span class="card-5">
                <span class="btn" @click="login">立即注册</span>
            </span>
        </footer>
    `,
    props: {
        active: Boolean
    },
    watch: {
        'active':{
            //将mask初始化false
            handler(val,oldVal){
                this.hasMaskMenu = false;
            },
            // 深度观察
            deep:true
        }
    },
    mixins: [mixin],
    data(){
        return {
            menuArr: [
                {title: "返回首页",url: "./index.html"},
                {title: "新零售解决方案",url: "./solution.html"},
                {title: "新零售产品中心",url: "./product.html"}
            ],
            hasMaskMenu: this.active
        }
    },
    mounted(){
        //console.log($(".dropdown-menu li"));
    },
    methods: {
        menu(e){
            let _self = this;
            let $mask = $(".mask-foot-nav");
            let h = $(".dropdown-menu li").height();
            $(".mask-tel").fadeOut();
            if(_self.hasMaskMenu){
                $mask.fadeOut();
                $(".dropdown-menu").animate({height: 0},300);
            }else{
                $mask.fadeIn();
                $(".dropdown-menu").animate({height: h*_self.menuArr.length},300)
            }
            _self.hasMaskMenu = !_self.hasMaskMenu;
        },
        tel(){
            $(".mask-foot-nav").fadeOut();
            $(".mask-tel").fadeIn();
            $(".dropdown-menu").animate({height: 0},300);
            this.hasMaskMenu = false
        }
    }
}
let MaskTel = {
    template : `
        <div @click='maskTel' class="mask mask-tel">
            <div class="tel-alert">
                <p class="title">提示</p>
                <p class="info">确定拨打电话：0571-89935939吗？</p>
                <div class="tel-btn-container">
                    <span class="tel-btn remove">取消</span>
                    <a href="tel:0571-89935939" class="tel-btn sure">确定</a>
                </div>
            </div>
        </div>
    `,
    methods : {
        maskTel(){
            $('.mask-tel').fadeOut();
        }
    }
}
let MaskMenu = {
    template : `
        <div @click="mask" class="mask mask-foot-nav"></div>
    `,
    methods : {
        mask(){
            this.$emit('mask')
        }
    }
}
