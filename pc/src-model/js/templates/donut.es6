let Donut = {
    template: `
        <div class="container donut-container">
            <div :class="['donut-' + obj.col]" v-for="item in arr">
                <div class="donut donut-img">
                    <i :class="['icon','icon-' + item.id]"></i>
                    <p class="title-bar">{{item.title}}</p>
                </div>
                <div class="donut donut-txt">
                    <div class="content">
                        <p class="txt" v-for="txt in item.txtArr">{{txt}}</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    props:{
        arr: Array,
        obj: Object
    },
    mounted(){
        console.log(this.obj);
    },
};
$(()=>{
    let app = new Vue({
        el: '#app',
        components: {
            'donut': Donut
        },
        data: {
            do:{
                col: 0,
                height: 0,
                bg: ''
            },
            donutArr: [
                {id: 1 ,title: '智能化采购管理',txtArr: [ '1、采购单：可按时间点要进行分批次采购建单，也可按多仓库匹配进行采购建单；入库后可进行入库核对，确保采购单是正确哒；','2、采购报表：统计采购单数量，入库的商品种数，商品规格，进货的总价等，方便快捷查看；']},
                {id: 2 ,title: '自动化订单处理',txtArr: [ '1、智能审单：系统支持多平台订单统一处理，后台配有灵活多变的自动审单策略，海量订单集中式管理；','2、智能分配订单：审核过的订单系统支持自动拆单、自动合并订单、自动分配快递公司，自动匹配发货仓库、系统还可手工合并拆分订单，批量修改物流公司等功能。']},
                {id: 3 ,title: '智能化商品管理',txtArr: [ '1、商品库存管理：根据每个商品可按入库批次进行管理，可展示每个商品在哪几个仓库，总库存数，可用数，锁定数，次品数，在采购途中的数等进行智能化管理；','2、商品成本管理：根据每个商品的库存总数，平均单价，可以计算出库存价值，可单个SKU展开查看，进行重算等操作；']},
                {id: 4 ,title: '智能化仓库管理',txtArr: [ ' 1、仓库管理：根据仓库名称，仓库类型，仓库所在地址等进行编辑，还可根据需求进行仓库的货位管理：是否开启；','2、库区货位：根据商品的品类进行仓库货架管理；']},
                {id: 5 ,title: '智能化库存管理',txtArr: [ '1、商品库存同步：多平台多店铺库存自动同步，同步数据精准，稳定；',' 2、预警设置：针对库存的数量我们可以设置库存数预警，防止大促或活动时超卖现象出现；设置好库存预警，在产品首页右侧会有提示库存预警；']},
                {id: 6 ,title: '多店铺/多门店库存调拨',txtArr: [ '库存调拨：调拨货品时，既可以在不同仓库之间调拨，也可以在总部与分支机构调拨，或者在分支机构之间调拨，此外通过仓库调拨单还可以简化业务流程，如：通过调拨可以实现将不合格商品调入废品仓库等。']},
                {id: 7 ,title: '智能化库存盘点',txtArr: ['库存盘点：每个仓库可根据盘点时间和盘点状况进行操作记录，库存盘点操作可根据需求进行日盘点，周盘点，月盘点，大促或者活动前或者结束后进行盘点，提高库存数量的正确性；库存盘点还可在电商宝APP端进行扫码盘点和入库，提升了盘点效率。']},
                {id: 8 ,title: '灵活多变营销策略',txtArr: [ '组合商品管理：在系统中可建立自定义组合商品档案，支持多个店铺关联一套组合商品。通过组合商品的功能进行套餐搭配，从而搭建关联销售及营销活动，带动新品和主推款，处理滞销商品，实现多店铺对应一套组合商品，有利于商品系统化管理，提高仓库管理效率']},
                {id: 9 ,title: '进销存移动端版',txtArr: [ '1、库存查询：两种方式查看库存（1、搜索商品，按商品名称或者编码；2、扫码二维码/条形码或者本地二维码）；','2、商品分析：全部店铺的商品分析表，根据时间点查看商品的排行；','3、采购入库：扫码入库，二维码/条形码/本地二维码进行扫码入库；','4、库存盘点：扫码盘点库存，不需要手工输入的方式，快捷省时；']}
            ],
            donutObj: {}
        },
        created(){
            this.initDonut();
        },
        mounted(){
            let _self = this
            this.$nextTick(function(){
                _self.initDonut();
            });
        },
        methods: {
            initDonut(){
                let _self = this;
                let donut = new DonutItem({
                    el: ".donut-container",
                    col: 3,
                    radius: 10,
                    link: `http://localhost:8999/dist-model/images/donut/`,
                    containerObj: {
                        height: 300,
                        background: '#eee',
                    },
                    imgObj: {
                        fontSize: 20,
                        color: '#333',
                        background: 'transparent'
                    },
                    title: {
                        top: 125
                    },
                    textObj: {
                        fontSize: 14,
                        color: '#fff',
                        background: '#509EFF'
                    },
                    iconObj: {
                        width: 66,
                        height: 66,
                        top: 95
                    },
                    iconArr: [
                        'donut3-icon1.png','donut3-icon2.png','donut3-icon3.png',
                        'donut3-icon4.png','donut3-icon5.png','donut3-icon6.png',
                        'donut3-icon7.png','donut3-icon8.png','donut3-icon9.png'
                    ],
                })
                _self.donutObj = donut.obj
            }
        }
    })
});