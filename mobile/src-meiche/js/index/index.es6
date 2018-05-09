/**
 * Created by Administrator on 2017/9/7.
 */
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
        url: [
            {banner: `${GLOBAL_STATIC_URL}/images/index/banner.png`},
            {part01_lf: `${GLOBAL_STATIC_URL}/images/index/part01-bg1.png`},
            {part01_fr: `${GLOBAL_STATIC_URL}/images/index/part01-bg2.png`},
            {part02_lf: `${GLOBAL_STATIC_URL}/images/index/part02-bg1.png`},
            {part02_fr: `${GLOBAL_STATIC_URL}/images/index/part02-bg2.png`},
            {part03_lf: `${GLOBAL_STATIC_URL}/images/index/part03-bg1.png`},
            {part03_fr: `${GLOBAL_STATIC_URL}/images/index/part03-bg2.png`}
        ]
    },
    mounted(){

    },
    methods: {
        linkUrl(url){
            if(!isBlank(url)) location.href = url
            //console.log('跳转链接')
        }
    }
});