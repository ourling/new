/**
 * 照片墙初始化布局
 * @param cardWidth 卡片宽度
 * @param cardCols 卡片列数
 * @param cardMarginHor 卡片水平间距
 * @param cardMarginVer 卡片垂直间距
 * @constructor
 */
var screenW = document.body.clientWidth;
var menuLeft = 0;
var floatWidth = 0;

var PhotoWall = function (cardCols, cardWidth, cardMarginHor, cardMarginVer) {
    console.log(cardCols);
    this.cardCols = cardCols;
    this.cardWidth = cardWidth |= 240;
    this.cardMarginHor = cardMarginHor |= 16; // 水平间距
    this.cardMarginVer = cardMarginVer |= 16; // 垂直间距

    //this.cardCols = 4;
    //this.cardWidth = 240;
    //this.cardMarginHor = 16; // 水平间距
    //this.cardMarginVer = 16; // 垂直间距

    //this.colArray = []; // 记录该列的top值和left值
    this.colArray = []; // 记录该列的top值和left值
    this.nextCol = 0; // 记录下一个li插入的列数
    this.maxHeight = 0;

    /* 计算布局 */
    var list = $('#photo-wall-list');

    // 初始化各列属性
    for (var i = 0; i < cardCols; i++) {
        var initLeft = i * (cardMarginHor + cardWidth);
        this.colArray.push({'top': 0, 'left': initLeft});
    }
};

/**
 * 传入数据生成卡片
 * @param data 得到的数据
 * @param generateCard 传入构造卡片的方法
 */
PhotoWall.prototype.generationLayout = function (data, generateCard) {
    var list = $('#photo-wall-list');
    var tmpArray = this.colArray,
        currentCol = this.nextCol,
        marginVer = this.cardMarginVer,
        maxHeight = this.maxHeight;


    data.forEach(function (bean) {
        var ans = tmpArray[currentCol],
            top = ans['top'],
            left = ans['left'];

        var obj = generateCard(bean, top, left);
        var li = obj['obj'];
        var height = obj['height'];
        $(li).appendTo(list);

        top += height + marginVer; // 计算该列下一张card的top
        tmpArray[currentCol] = {'top': top, 'left': left}; // 并覆盖原来的col

        tmpArray.forEach(function (card, index) {
            var tmp = card.top || 0;
            if (tmp < tmpArray[currentCol]['top']) currentCol = index; // 计算下一个插入列
            if (tmp > maxHeight) maxHeight = tmp; // 计算最大高度
        });
    });
    this.nextCol = currentCol;
    this.maxHeight = maxHeight;

    $(list).height(maxHeight);
    $('#load-more')
        .css('top', $(list).clientTop + maxHeight + 'px')
        .css('width', $(list).width())
};

/* 清空卡片 */
PhotoWall.prototype.clear = function () {
    var list = $('#photo-wall-list');
    list.html('');
    $(list).height(0);

    this.colArray = []; // 记录该列的top值和left值
    this.nextCol = 0; // 记录下一个li插入的列数
    this.maxHeight = 0;

    // 初始化各列属性
    for (var i = 0; i < this.cardCols; i++) {
        var initLeft = i * (this.cardMarginHor + this.cardWidth);
        this.colArray.push({'top': 0, 'left': initLeft});
    }
};

/**
 * 重绘照片墙
 * @param cardWidth 卡片宽度
 * @param cardCols 卡片列数
 * @param cardMarginHor 卡片水平间距
 * @param cardMarginVer 卡片垂直间距
 */
PhotoWall.prototype.reCountLayout = function (cardCols, cardWidth, cardMarginHor, cardMarginVer) {
    this.cardCols = cardCols;
    this.cardWidth = cardWidth |= 240;
    this.cardMarginHor = cardMarginHor |= 16; // 水平间距
    this.cardMarginVer = cardMarginVer |= 16; // 垂直间距

    var maxHeight = 0;
    var tmpArray = [];
    var currentCol = 0;

    /* 计算布局 */
    var list = $('#photo-wall-list');
    var allWidth = cardWidth * cardCols + (cardCols - 1) * cardMarginHor;
    for (var j = 0; j < cardCols; j++) {
        var initLeft = j * (cardMarginHor + cardWidth);
        tmpArray.push({'top': 0, 'left': initLeft});
    }

    /* 获取所有卡片,重新计算top 和 left 位置 */
    var cardList = $('.photo-card');
    for (var i = 0; i < cardList.length; i++) {
        var card = cardList[i];
        var h = $(card).height();

        var ans = tmpArray[currentCol];
        var top = ans['top'], left = ans['left'];

        $(card).css('top', top).css('left', left);
        top += h + cardMarginVer;
        tmpArray[currentCol] = {'top': top, 'left': left}; // 并覆盖原来的col

        tmpArray.forEach(function (card, index) {
            var tmp = card.top || 0;
            if (tmp < tmpArray[currentCol]['top']) currentCol = index; // 计算下一个插入列
            if (tmp > maxHeight) maxHeight = tmp; // 计算最大高度
        });
    }

    this.colArray = tmpArray; // 记录该列的top值和left值
    this.nextCol = currentCol; // 记录下一个li插入的列数
    this.maxHeight = maxHeight; // 存储高度
    $(list).height(maxHeight);
    $('load-more')
        .css('top', $(list).clientTop + maxHeight + 'px')
        .css('width', $(list).width())
};