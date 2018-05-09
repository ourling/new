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
            {id: 1,title: "智能扫码抢", url : "javascript:;"},
            {id: 2,title: "智能收银台", url : "javascript:;"},
            {id: 3,title: "智能POS机", url : "javascript:;"},
            {id: 4,title: "钱箱和电子称", url : "javascript:;"}
        ],
        banner : {
            title: "互联网+外卖"
        }
    },
    mounted(){

    },
    methods: {}
})