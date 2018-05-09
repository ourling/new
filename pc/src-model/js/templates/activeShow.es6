let activeShow = {
    template: `
        <div class="container card-container active-show">
            <div class="card-2-spe">
                <div class="swiper-container active-show-container swiper-container-horizontal">
                    <div class="swiper-wrapper">
                        <div v-for="(item,index) in imgArr" class="swiper-slide">
                            <img class="response-img" :src="item.src" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
            <div class="card-2-spe">
                <div class="item-title-container">
                    <h5 class="item-title">{{obj.title}}</h5>
                    <a href="//ketang.ecbao.cn/" class="item-more">更多>></a>
                </div>
                <div id="newsContainer" class="item-container">
                    <a v-for="item in warpArr" :href="item.url" class="item">{{item.title}}</a>
                </div>
                <div class="item-btn-container">
                    <a v-for="(item,index) in obj.btnArr" :href="item.href" class="card-3-spe">{{item.title}}</a>
                </div>
            </div>
        </div>
    `,
    props:{
        obj: Object
    },
    data(){
        return {
            http: '//ketang.ecbao.cn/video?page=1&orderby=id&order=desc&json=1',
            warpArr: [],
            imgArr: [
                {id: "1", src: `${GLOBAL_STATIC_URL}/images/activeShow/agent-foot-bg-1.jpg`},
                {id: "2", src: `${GLOBAL_STATIC_URL}/images/activeShow/agent-foot-bg-2.jpg`},
                {id: "3", src: `${GLOBAL_STATIC_URL}/images/activeShow/agent-foot-bg-3.jpg`}
            ]
        }
    },
    mounted(){
        this.$nextTick(function(){
            this.initSwiper();
        })
        this.getData();
    },
    methods : {
        initSwiper(){
            new Swiper('.active-show-container', {
                spaceBetween: 30,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                loop : true
            });
        },
        getData(){
            this.$http.jsonp(this.http).then(function(res){
                res = res.data;
                this.warpArr = res.posts
            },function(err){
                console.log(err)
            })
        }
    }
};
$(()=>{
   let app = new Vue({
       el: '#app',
       components: {
           'active-show': activeShow
       },
       data: {
           activeObj: {
               title: "加盟动态",
               btnArr: [{title: "咖啡", href: "javascript:;"}, {title: "烘焙", href: "javascript:;"}, {
                   title: "便当",
                   href: "javascript:;"
               }]
           }
       }
   })
});