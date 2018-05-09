let agentShow = {
    template: `
            <div class="container card-container agent-swiper">
                <div class="swiper-container agent-swiper-container">
                    <div class="swiper-wrapper">
                        <div v-for="item in arr" :class="['swiper-slide','icon-' + item.id]">
                            <div class="swiper-icon-container">
                                <h4 class="card-title">{{item.title}}</h4>
                                <p class="card-text">{{item.txt}}</p>
                            </div>
                        </div>
                    </div>
                    <!-- Add Arrows -->
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
    `,
    props:{
        arr: Array
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
            new Swiper('.agent-swiper-container', {
                spaceBetween: 30,
                slidesPerView: 4,
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