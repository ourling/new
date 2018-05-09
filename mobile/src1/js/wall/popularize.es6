let vm = null
$(() => {
    registerMessageFromFrame()
    const materialModal = new Vue(Material)
    vm = new Vue({
        el: '#app',
        data: {
            dragIndex: 0,
            defaultPage: 1,
            allPage: 1,
            index: "",
            dragDom: null,
            isAddButton: false,
            http: {
                getPano: `${GLOBAL_PANO_URL}/open/queryRecommendPanoList`,
                getAd: `${GLOBAL_PANO_URL}/open/queryAdverList`,
                savePano: `${GLOBAL_PANO_URL}/pano/savePanoRecommendList`,
                saveAd: `${GLOBAL_PANO_URL}/pano/saveAdverList`,
                delItem: `${GLOBAL_PANO_URL}/pano/deletePanoCollect`,
                getPList: `${GLOBAL_PANO_URL}/panoEdit/queryProductionPanoList`,
                album: `${GLOBAL_PANO_URL}/panoEdit/queryProductionPanoAlbumList`
            },
            breadcrumb: {
                album: '',
                pano: '',
                albumName: '',
                panoName: '',
            },
            basic: {
                adverUrl: '',
                adverDesc: '',
                adverDownload: '',
                adverPicUrl: '',
                adverTitle: '',
                adverType: "0",
                adverHtml: "",
                sort: 0
            },
            //向服务器传送的数据
            arg: {
                start: '0',
                panoId: "",
                length: '99999'
            },
            panoArg: {
                panoAlbumId: '',
                start: 0,
                length: 6,
                searchKey: ''
            },
            albumArg: {
                currentNum: 0
            },
            /***
             * 列表数据
             */
            recommendList: [],
            adList: [],
            panoList: [],
            panoAlbums: [{panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}, {panoAlbumTitle: "test"}],
            selePanoList: [],
            addPa: {},
            doAddPano: [],
            doAddAd: [],
            panoListData: {
                isSelectId: 0,
                id: []
            },
            list: []
        },
        mounted: function () {
            const album = queryUrl('album'),
                panoId = queryUrl('id'),
                panoIndex = queryUrl('panoIndex'),
                page = queryUrl('page'),
                search = queryUrl('search'),
                panoAlbumName = queryUrl('panoAlbumName'),
                panoName = queryUrl('panoName')

            this.arg.panoId = panoId
            this.breadcrumb.album = `manager#/work-open?album=${album}&page=${page}&panoId=${panoId}&search=${search}`
            this.breadcrumb.pano = `edit?panoId=${panoId}&panoIndex=${panoIndex}&panoAlbumName=${panoAlbumName}&album=${album}&page=${page}&search=${search}`

            this.breadcrumb.albumName = panoAlbumName
            this.breadcrumb.panoName = panoName
            this.getPanoList()
            this.getAdlist()
        },
        components: {
            'search-layout': SearchLayout,
            'tab-page': TabPage
        },
        methods: {
            /***
             * 拖动特效
             * @param event
             * @param item
             * @param index
             * @param boolean
             */
            drag: function (event, item, index, boolean) {
                /****
                 *拖动开始时触发
                 */
                this.dragIndex = index
                this.dragDom = item
                if (boolean) {
                    this.$refs.addBorderPano[this.dragIndex].classList.value = "list-item-info active"
                } else {
                    this.$refs.addBorderAd[this.dragIndex].classList.value = "list-item-info active"
                }
            },
            drop: function (event, item, index, boolean) {
                /***
                 * 拖动结束时触发
                 */
                event.preventDefault();
                if (boolean) {
                    this.dropUpData(this.recommendList, index, true)
                    this.dropUpSentDataPano(this.recommendList)
                } else {
                    this.dropUpData(this.adList, index, false)
                    this.dropUpSentDataAd(this.adList)
                }
            },
            dropUpData: function (list, index, boolean) {
                /***
                 * 视图更新 添加边框
                 */
                list.splice(this.dragIndex, 1)
                list.splice(index, 0, this.dragDom)
                if (boolean) {
                    this.$refs.addBorderPano[this.dragIndex].classList.value = "list-item-info"
                } else {
                    this.$refs.addBorderAd[this.dragIndex].classList.value = "list-item-info"
                }
            },
            dropUpSentDataPano: function (list) {
                /***
                 * 更新拖动后的  doAddPano 数据
                 */
                this.doAddPano = []
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    this.initDoPano(item.recommendPanoId, i, item.panoFlag)
                    this.doAddPano.push(this.addPa)
                }
            },
            dropUpSentDataAd: function (list) {
                /***
                 * 更新拖动后的  doAddPano 数据
                 */
                this.doAddAd = []
                for (let key in list) {
                    let item = list[key]
                    this.basic = {
                        adverUrl: item.adverUrl,
                        adverDesc: item.adverDesc,
                        adverDownload: item.adverDownload,
                        adverPicUrl: item.adverPicUrl,
                        adverTitle: item.adverTitle,
                        adverType: item.adverType,
                        adverHtml: item.adverHtml,
                        sort: parseInt(key)
                    }
                    this.doAddAd.push(this.basic)
                }
            },
            /***
             * 获取推荐广告和推荐全景作品
             */
            getPanoList: function () {
                /********
                 * 获取全景数据
                 */
                this.$http.post(this.http.getPano, this.arg).then(
                    res => {
                        res = JSON.parse(res.data)
                        if (res.success) {
                            this.recommendList = res.data.panoRecommendList
                        } else errorToast(res.exceptionMsg, 2000)
                    },
                    err => {
                        console.log("失败")
                        errorToast('加载失败')
                        console.log(err)
                    }
                )
            },
            getAdlist: function () {
                /**********
                 * 获取广告数据
                 */
                this.$http.post(this.http.getAd, this.arg).then(
                    res => {
                        res = JSON.parse(res.data)
                        if (res.success) {
                            this.adList = res.data.adverSelfList
                        } else errorToast(res.exceptionMsg, 2000)
                    },
                    err => {
                        errorToast('加载失败')
                        console.log(err)
                    }
                )
            },
            /***
             * 全景推广作品
             * @param item
             */
            initDoPano: function (id, index, flag) {
                this.addPa = {
                    panoFlag: flag,
                    recommendPanoId: id,
                    sort: index
                }
            },
            addPano: function () {
                $("#pano").modal("show")
                this.isAddButton = true
                this.albumArg.currentNum = 0
                this.panoArg.panoAlbumId = ""
                this.panoArg.searchKey = ""
                this.initPList()
                this.getAlbum()
            },
            isSelect: function (item) {
                /***
                 * 全景作品选择时  样式改变
                 */
                this.panoListData.isSelectId = item.panoId
            },
            checkSel: function (item, index) {
                /****
                 * 全景作品选择
                 */
                if (item.index === index) {
                    let id = item.panoId
                    for (let i = 0; i < this.selePanoList.length; i++) {
                        let Id = this.selePanoList[i].panoId
                        if (id == Id) {
                            this.selePanoList.splice(i, 1)
                        }
                    }
                } else {
                    item.index = index
                    this.selePanoList.push(item)
                }

            },
            panoSelectSub: function () {
                /****
                 * 全景作品弹框确定按钮
                 */
                for (let i = 0; i < this.selePanoList.length; i++) {
                    let item = this.selePanoList[i]
                    this.initDoPano(item.panoId, i, 0)
                    this.doAddPano.push(this.addPa)
                }
                if (this.selePanoList.length) {
                    for (let i = 0; i < this.selePanoList.length; i++) {
                        this.recommendList.push(this.selePanoList[i])
                    }
                    $("#pano").modal("hide")
                } else {
                    errorToast("请至少选择一个全景作品")
                }
            },
            isAd: function (msg, index) {
                /******
                 * 广告，全景的判断
                 */
                this.$forceUpdate()
                if (msg.panoFlag) {
                    this.$set(msg, 'panoFlag', 0)
                } else {
                    this.$set(msg, 'panoFlag', 1)
                }
                if (this.isAddButton) {
                    this.doAddPano[index].panoFlag = msg.panoFlag
                } else {
                    this.initDoPano(msg.recommendPanoId, index, msg.panoFlag)
                    this.list.push(this.addPa)
                    for (let i = 0; i < this.list.length; i++) {
                        let f = true
                        for (let j = 0; j < this.doAddPano.length; j++)
                            if (this.list[i].sort === this.doAddPano[j].sort) {
                                f = false
                                break
                            }
                        if (f) this.doAddPano.push(this.list[i])
                    }
                    let id = msg.sort
                    for (let i = 0; i < this.doAddPano.length; i++) {
                        let Id = this.doAddPano[i].sort
                        if (id == Id) {
                            this.doAddPano.splice(i, 1)
                        }
                    }
                    console.log(this.doAddPano)
                }
            },
            /****
             * 广告推广
             */
            addAdButton: function () {
                /****
                 * 推广广告按钮
                 * @type {{adverHtml: string, adverPicUrl: string}}
                 */
                this.basic = {adverHtml: '', adverPicUrl: ""}
                this.isAddButton = true
            },
            addAd: function () {
                /****
                 * 广告添加事件
                 * @type {*}
                 * @private
                 */
                let _self = this.basic
                this.index = this.adList.length
                _self.sort = parseInt(this.adList.length)
                this.adList.push(_self)
                this.doAddAd.push(_self)
            },
            delItem: function (index, msg) {
                /*****
                 * 数据删除事件  msg index    当前编辑的对象及下标
                 */
                if (msg) {
                    this.recommendList.splice(index, 1)
                    this.doAddPano.splice(index, 1)
                } else {
                    this.adList.splice(index, 1)
                }
                return this.$http.post(this.http.delItem, {
                    adverList: JSON.stringify([this.arg.panoId]),
                }).then(function (res) {
                    res = JSON.parse(res.data)
                    if (res.success) {
                        successToast('作品删除成功', 5000)
                    } else {
                        return errorToast('作品删除失败', 5000)
                    }
                }, function (err) {
                    console.log(err)
                    return errorToast('作品删除失败', 5000)
                })
            },
            adEdit: function (msg, index) {
                /*******
                 * 广告编辑按事件
                 * @type {boolean}
                 */
                this.isAddButton = false
                let _self = this.basic
                this.$set(this, 'basic', JSON.parse(JSON.stringify(this.adList[index])))
                this.index = index
                _self.adverHtml = ""
            },
            contentUpdate: function () {
                /* input文字修改 */
                return this.hasModify = true
            },
            blurEvent: function (event) {
                /****
                 * 失去焦点判断事件
                 */
                let target, text;
                target = event.currentTarget;
                text = $(target).val();
                if (isBlank(text)) {
                    return $(target).addClass('error');
                } else {
                    return $(target).removeClass('error');
                }
            },
            editSave: function () {
                /***
                 * 广告编辑保存事件
                 * @type {*}
                 * @private
                 */
                let _self = this.basic
                if (isBlank(_self.adverTitle)) {
                    $('#adTitle').addClass('error')
                    errorToast('广告标题不能为空', 2000)
                    return
                }
                if (isBlank(_self.adverDesc)) {
                    $('#adWord').addClass('error')
                    errorToast('广告介绍不能为空', 2000)
                    return
                }
                if (isBlank(_self.adverUrl)) {
                    $('#adLink').addClass('error')
                    errorToast('链接地址不能为空', 2000)
                    return
                }
                if (this.isAddButton) {
                    this.addAd()
                    this.isAddButton = false
                    $("#adver").modal('hide')
                    return
                }
                this.adList[this.index] = _self
                this.doAddAd[this.index] = _self
                this.doAddAd[this.index].sort = this.index
                this.$forceUpdate()
                $("#adver").modal('hide')
            },
            selectCover: function () {
                /******
                 * 广告封面选择事件
                 * @type {boolean}
                 */
                materialModal.isRadio = true
                materialModal.showPic(data => {
                    this.basic.adverPicUrl = data[0].thumb
                })
            },
            UEditorHtml: function (msg) {
                /****
                 * 富文本编辑事件
                 * @type {*}
                 */
                const html = html || ''
                let $uEditorModal = $('#uEditorModal')
                let $uEditorContainer = $('#uEditorContainer')
                let height = 458
                let width = 983
                $uEditorModal.modal('show', msg)
                $uEditorContainer.height(height)
                $uEditorContainer.width(width)
                sendMessageToFrame('init', {'height': height, 'value': html})
            },
            submit: function (msg) {
                /*** 提交事件
                 *  msg  boolean  判断pano 和 ad
                 *  */
                let _self = this.basic
                if (msg) {
                    return this.$http.post(this.http.savePano, {
                        panoId: this.arg.panoId, panoRecommendList: JSON.stringify(this.doAddPano)
                    }).then(function (res) {
                        res = JSON.parse(res.data)
                        if (res.success) {
                            successToast('全景作品保存成功', 5000)
                            this.list = []
                            if (!this.isAddButton) {
                                this.doAddPano = []
                                this.isAddButton = false
                            }
                        } else {
                            return errorToast('全景作品保存失败', 5000)
                        }
                    }, function (err) {
                        console.log(err)
                        return errorToast('作品保存失败', 5000)
                    })
                } else {
                    _self.sort = this.index
                    console.log(this.doAddAd)
                    return this.$http.post(this.http.saveAd, {
                            panoId: this.arg.panoId, adverList: JSON.stringify(this.doAddAd)
                        }
                    ).then(function (res) {
                        res = JSON.parse(res.data)
                        if (res.success) {
                            successToast('推广作品保存成功', 5000)
                            _self = {adverHtml: '', adverPicUrl: ""}
                        } else {
                            return errorToast('推广作品保存失败', 5000)
                        }
                    }, function (err) {
                        console.log(err)
                        return errorToast('作品保存失败', 5000)
                    })
                }
            },
            /****
             * pano 弹框列表
             */
            initPList: function () {
                let len = this.panoArg.length
                let start = this.panoArg.start
                let search = this.panoArg.searchKey
                let albumId = this.panoArg.panoAlbumId
                return this.$http.post(this.http.getPList, {
                    length: JSON.stringify(len),
                    panoAlbumId: albumId,
                    searchKey: search,
                    start: start
                }).then(
                    res => {
                        res = JSON.parse(res.data)
                        if (res.success) {
                            this.panoList = res.data.panoEditList
                            let all = res.data.count
                            let n = this.panoArg.length
                            this.allPage = Math.ceil(all / n)
                        } else errorToast(res.exceptionMsg, 2000)
                    },
                    err => {
                        console.log("失败")
                        errorToast('加载失败')
                        console.log(err)
                    }
                )
            },
            changPage: function (targetPage) {
                this.panoArg.start = (targetPage - 1) * this.panoArg.length
                this.defaultPage = targetPage
                this.initPList()
            },
            search: function (key) {
                this.panoArg.searchKey = key
                this.initPList()
            },
            /***
             * 相册列表
             */
            getAlbum: function () {
                return this.$http.post(this.http.album).then(
                    res => {
                        res = JSON.parse(res.data)
                        this.panoAlbums = res.data.panoAlbumList
                    },
                    err => {
                        console.log(err)
                        errorToast("相册加载失败")
                    }
                )
            },
            switchAlbum: function (index, item) {
                this.albumArg.currentNum = index
                this.panoArg.panoAlbumId = item.panoAlbumId
                this.initPList()
            },
            move: function () {
                let _self = this
                $("#topMenu").animate({marginLeft: -102}, 500, function () {
                    $(this).css({marginLeft: 0})
                })
            }
        }
    })
})


function sendMessageToFrame(code, data) {
    console.log('发送一次', code)
    data = data || {}
    window.frames[0].postMessage(JSON.stringify({
        'code': code,
        'data': data
    }), 'http://make.westlakevr.cn')
}

function registerMessageFromFrame() {
    window.addEventListener('message', function (e) {
        const res = JSON.parse(e.data)
        vm.basic.adverHtml = res.data
    })
}