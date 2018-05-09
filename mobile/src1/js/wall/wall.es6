var addEvent, deviceState, generateCard, getDeviceState, isLoading, photoWall, vueObj;

deviceState = 0;

photoWall = null;

isLoading = false;

vueObj = null;

$(function() {
    $('#nav-remove-top').removeClass('on');
    $('.menu-bar li').removeClass('active');
    $('#channel').addClass('active');
    deviceState = getDeviceState();
    photoWall = new PhotoWall(deviceState);
    photoWall.generationLayout(photoData, generateCard);
    Vue.http.options.emulateJSON = true;
    vueObj = new Vue({
        el: '#app',
        data: {
            http: {
                start: 20,
                length: 20,
                url: GLOBAL_HOME_URL + "/open/queryPanoList?",
                arg1: -1,

                /* 第一个请求参数 */
                arg2: ' ',

                /* 第二个请求参数 */
                searchText: ''

                /* 搜索用参数 */
            }
        },
        methods: {
            reset: function() {

                /* 调整窗口大小 */
                if (deviceState !== getDeviceState()) {
                    deviceState = getDeviceState();
                    return photoWall.reCountLayout(deviceState);
                }
            },
            loadPhoto: function(reload, arg1, arg2, searchText) {

                /*
                 发起请求获取图片对象
                 @param reload     是否刷新加载 type:Boolean
                 @param arg1       所属分类id  type:String
                 @param arg2       住房类型id  type:String
                 @param searchText 搜索关键字  type:String
                 */
                var _self, tmpUrl;
                _self = this;
                reload = reload || false;
                if (reload) {
                    _self.http.start = 0;
                    photoWall.clear();
                }
                _self.http.arg1 = arg1 !== null && arg1 !== void 0 ? arg1 : _self.http.arg1;
                _self.http.arg2 = arg2 !== null && arg2 !== void 0 ? arg2 : _self.http.arg2;
                _self.http.searchText = searchText !== null && searchText !== void 0 ? searchText : _self.http.searchText;
                tmpUrl = _self.http.url;
                if (!isBlank(_self.http.arg1)) {
                    tmpUrl += "&panoBusiId=" + _self.http.arg1;
                }
                if (!isBlank(_self.http.arg2)) {
                    tmpUrl += "&houseTypeId=" + _self.http.arg2;
                }
                _self.http.searchText = _self.http.searchText.trim();
                if (!isBlank(_self.http.searchText)) {
                    tmpUrl += "&searchKey=" + _self.http.searchText;
                }
                $('#load-more').show();
                $('#no-more').hide();
                return _self.$http.post(tmpUrl.trim(), {
                    'start': _self.http.start + '',
                    'length': _self.http.length + ''
                }).then(function(res) {
                    var hasMore, panoList;
                    res = JSON.parse(res.body);
                    panoList = res.data.panoList;
                    hasMore = res.data.hasMore;
                    if (res.retCode === '0') {
                        _self.http.start += _self.http.length;
                        isLoading = false;
                        return _self.loadSuccess(panoList, hasMore);
                    } else {
                        return _self.loadFailure(res);
                    }
                }, function(err) {
                    return _self.loadFailure(err);
                });
            },
            loadFailure: function(err) {

                /* 加载失败 */
                errorToast('你的请求失败了', 2);
                isLoading = false;
                $('#load-more').hide();
                return $('#no-more').hide();
            },
            loadSuccess: function(data, hasMore) {

                /*
                 加载成功
                 @param data    获取到的数据对象 type:Object
                 @param hasMore 是否还有更多    type:Boolean
                 */
                photoWall.generationLayout(data, generateCard);
                isLoading = false;
                if (!hasMore) {
                    isLoading = true;
                    $('#load-more').hide();
                    return $('#no-more').show();
                }
            }
        }
    });
    return addEvent();
});

addEvent = function() {

    /* 添加事件 */
    $(window).on('resize', throttle(function() {
        return vueObj.reset();
    }, 200, 400)).on('scroll', throttle(function() {

        /* 滚动监听,加载更多事件 */
        var height;
        if (isLoading) {
            return;
        }
        $('#load-more').show();
        height = Math.floor($(window).height() * 4 / 3);
        if ($(this).scrollTop() + $(window).height() > photoWall.maxHeight - height) {
            isLoading = true;
            return vueObj.loadPhoto(false);
        }
    }, 200, 500));
    $('#photo-wall').on('click', '.photo-card > .mask', function() {

        /* 照片墙 照片点击事件 */
        var height, width;
        height = window.screen.availHeight;
        width = window.screen.availWidth;
        return window.open('/open/nl?id=' + $(this).attr('data-id'), '', "directories:0,toolbar=0,menubar=0,status=0,channelmode=1,fullscreen=1,top=0,left=0,height=" + height + ",width=" + width);
    });

    /* 点击空白事件 */
    return $(document).mouseup(function(e) {
        var _con1, _con2, _con3, _con4, _con5;
        _con1 = $('#nav-header');
        _con2 = $('#second-menu');
        _con3 = $('#third-menu');
        _con4 = $('#fourth-menu');
        _con5 = $('#other-menu');
        if (!_con1.is(e.target) && _con1.has(e.target).length === 0 && !_con2.is(e.target) && _con2.has(e.target).length === 0 && !_con3.is(e.target) && _con3.has(e.target).length === 0 && !_con4.is(e.target) && _con4.has(e.target).length === 0 && !_con5.is(e.target) && _con5.has(e.target).length === 0) {
            $(_con3).removeClass('show');
            $(_con3).css('width', 0);
            $(_con4).removeClass('show');
            $(_con4).css('width', 0);
            $(_con5).removeClass('show');
            return $(_con5).css('width', 0);
        }
    });
};

generateCard = function(bean, top, left) {

    /*
     构造生成卡片
     @param bean 卡片对象 type:Object
     @param top  上边距   type:Number
     @param left 左边距   type:Number
     */
    var actionDiv, actionHtml, btnLayout, cardDiv, content, height, id, imgDiv, imgHtml, like, maskDiv, mirror, src, targetHeight, title, views, width;
    title = bean['panoTitle'];
    content = bean['panoDesc'];
    src = bean['panoPic'];
    id = bean['panoId'];
    like = bean['praiseUserNum'];
    views = bean['totalVisitCount'];
    width = 240;
    height = bean['panoPicHeight'];
    imgHtml = ("<img src=" + src + " style='width:") + width + "px;height:" + height + "px;'>";

    /* 按钮布局 */
    btnLayout = "<div class=\"btn-layout\">\n<div class=\"photo-button\" type=\"like\"><div class=\"photo-wall-btn-like select\"></div>\n<span>" + like + "</span></div>\n<div class=\"photo-button\"><div class=\"photo-wall-btn-views\"></div>\n<span>" + views + "</span></div>\n</div>";

    /* 卡片布局 */
    cardDiv = $("<div />", {
        'class': 'photo-card',
        'style': "overflow: visible; position: absolute; top:" + top + "px; left:" + left + "px;width:" + width + "px"
    });
    actionDiv = $('<div />', {
        'class': 'photo-action'
    });
    mirror = $('#mirror-dom');
    actionHtml = "<div class=\"photo-card-title\">" + title + "</div>\n<div class=\"divider-line\"></div>\n<div class=\"photo-card-content\">" + content + "</div>";

    /* 先在镜像渲染 */
    $(mirror).html(actionHtml);

    /* 依靠镜像获取高度 */
    targetHeight = $(mirror).height() + height;
    maskDiv = "<div class='mask' data-id='" + id + "' style='height:" + targetHeight + "px;'></div>";
    imgDiv = "<div class='photo-card-images'>" + imgHtml + "</div>";
    $(actionDiv).append(actionHtml);
    $(cardDiv).append(imgDiv);
    $(cardDiv).append(actionDiv);
    $(cardDiv).append(maskDiv);
    $(cardDiv).append(btnLayout);
    $(cardDiv).height(targetHeight);
    return {
        'obj': cardDiv,
        'height': targetHeight
    };
};

getDeviceState = function() {

    /* 获取当前设备可见尺寸 */
    var res;
    res = window.getComputedStyle(document.getElementById('photo-wall'), ':before').getPropertyValue('content');
    return parseInt(res[1]);
};
