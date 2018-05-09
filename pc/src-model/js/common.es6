let Menu = {
    template: `
        <div id="product" class="dropDownList">
            <div class="menuSystemList">
                <ul class="clearfix width1200 border">
                    <li v-for="(items,index) in arritem" class="item-drop one">
                        <a :href="items.href" class="url"><i :class="['icon','icon-'+items.id]"></i>{{items.title}}</a>
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
let appNav = {
    template: `
        <header id="head" class="nav">
            <div class="nav-container clear">
                <span class="logo"></span>
                <Select class="nav-select" v-model="city" placeholder="请选择城市" @on-change="selectCity($event)">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <div class="nav-content">
                    <div v-for="(item,index) in navObj" :class="['item',item.hasMenu ? 'dropmenu ': '']" @mouseenter="dropOpen($event)" @mouseleave="dropClose($event)">
                        <a :class="['a',index == num ? 'active' : '' ]" :href="item.href" target="_blank">{{item.name}}</a>
                        <menu-item v-if="item.hasMenu" :arritem="navItem"></menu-item>
                    </div>
                </div>
                <div class="login-container">
                    <a :href="http.register" target="_blank" class="item"><img src="images/comm/nav/login.png" alt="" style="vertical-align: middle"> &nbsp;&nbsp;</a> |
                    <a :href="http.login" target="_blank" class="item"> &nbsp;&nbsp;经销商登录</a>
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
                {name: "首页", href: `${GLOBAL_STATIC_URL}/index.html`, hasMenu: false},
                {name: "美车供应链", href: "javascript:;", hasMenu: false},
                {name: "美车服务", href: `javascript:;`, hasMenu: false},
                {name: "美车销售管理", href: `javascript:;`, hasMenu: false},
                {name: "美车金融", href: "javascript:;", hasMenu: false},
                {name: "关于我们", href: `javascript:;`, hasMenu: false}
            ],
            http: {
                login: 'javascript:;',
                register: 'javascript:;'
            },
            cityList: [
                {value: '热门',label: '热门'},
                {value: '北京',label: '北京'},
                {value: '宁波',label: '宁波'},
                {value: '深圳',label: '深圳'},
                {value: '厦门',label: '厦门'},
                {value: '成都',label: '成都'},
                {value: '杭州',label: '杭州'},
                {value: '华北',label: '华北'},
                {value: '东北',label: '东北'},
                {value: '华中',label: '华中'},
                {value: '华南',label: '华南'},
                {value: '西南',label: '西南'},
                {value: '西北',label: '西北'}
            ],
            city: ''
        }
    },
    mounted(){

    },
    methods :{
        selectCity(val){
            console.log(val);
        },
        dropOpen(e){
            navDropmenu(e.target, true)
        },
        dropClose(e){
            navDropmenu(e.target, false)
        },
    }
}
let floor = {
    template: `
        <div class="floor-container">
            <div class="floor">
                <a class="item" href="javascript:;">我的</a>
                <a v-for="(item,index) in floor" class="item cut-off" :href="item.url" target="_blank">
                    <i :class="['icon','icon-'+item.id]"></i>
                    {{item.name}}</a>
            </div>
            <transition name="fade">
                <a v-show="!Boo.isTop" href="javascript:;" class="return-top" @click="toTop">∧ TOP</a>
            </transition>
        </div>
    `,
    data(){
        return {
            Boo: {
                isTop: true
            },
            floor: [
                {name: '关注',id: 1,url: 'javascript:;'},
                {name: '咨询',id: 2,url: '//wpa.qq.com/msgrd?v=3&uin=512909&site=qq&menu=yes'},
                {name: '估价',id: 3,url: 'javascript:;'},
                {name: '反馈',id: 4,url: 'javascript:;'}
            ]
        }
    },
    mounted(){
        this.initScroll()
    },
    methods:{
        toTop(){
            let _self = this
            $('html,body').animate({scrollTop: '0px'}, 800,function(){
                _self.Boo.isTop = true
            })
        },
        initScroll(){
            let _self = this
            $(window).scroll(function () {
                let winPos = $(window).scrollTop();
                if (winPos >= 200) {
                    _self.Boo.isTop = false;
                }else{
                    _self.Boo.isTop = true;
                }
            });
        }
    }
}
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
$(window).scroll(function () {
    var winPos = $(window).scrollTop();
    if (winPos >= 200) {
        $(".nav").addClass("fix-nav");
    } else {
        $(".nav").removeClass("fix-nav");
    }
});