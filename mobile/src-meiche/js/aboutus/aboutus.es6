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
        banner: {url: `${GLOBAL_STATIC_URL}/images/aboutus/banner.png`},
        part01: {title: '优质车源',url: `${GLOBAL_STATIC_URL}/images/chain/part01-bg.png`},
        part02: {title: '优质车源',url: `${GLOBAL_STATIC_URL}/images/chain/part02-bg.png`,txt: '直接点，放心拍！'},
        part03: {title: '优质车源',url: `${GLOBAL_STATIC_URL}/images/chain/part03-bg.png`},
        part04: {
            url: `${GLOBAL_STATIC_URL}/images/chain/part04-bg.png`,
            phone: '联系方式：17621866526',
            date: '客服工作时间：9:30-17:30',
            address: '地址：上海市虹口区东大名路501号白玉兰广场12层',
            mailNum: '邮编：200080021',
            mail: '邮箱：593567893@qq.com'
        }
    },
    mounted(){

    },
    methods: {
        linkUrl(url){
            //location.href = url
            console.log('跳转链接')
        }
    }
});