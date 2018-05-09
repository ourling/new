/**
 * CREATE CARDITEM
 */
class DonutItem {
    constructor(obj) {
        this.obj = obj;
        this.obj.el = $(obj.el);
        this.obj.COL = obj.col || 3;               //列数
        this.obj.radius = obj.radius || 15;               //列数
        this.obj.link = obj.link;               //icon 路径
        this.obj.containerObj = obj.containerObj || {};
        this.obj.iconObj = obj.iconObj || {};
        this.obj.iconArr = obj.iconArr || [];
        this.obj.title = obj.title || {};
        this.obj.imgObg = obj.imgObg || {};
        this.obj.textObj = obj.textObj || {};
        this.init();
    }
    init() {
        let out = {className: `donut-${this.obj.COL}`,row: this.obj.ROW,col: this.obj.COL};
        let $out =  $(`.${out.className}`);
        $out.css({
            height: this.obj.containerObj.height,
            background: this.obj.containerObj.background,
            borderRadius: this.obj.radius
        });
        $out.find('.donut-img').css({
            fontSize: this.obj.imgObg.fontSize,
            color: this.obj.imgObg.fontSize,
            background: this.obj.imgObg.background,
            borderRadius: this.obj.radius
        });
        $out.find('.icon').css({
            height: this.obj.iconObj.height,
            width: this.obj.iconObj.width,
            top: this.obj.iconObj.top
        });
        $out.find('.title-bar').css({
            top: this.obj.title.top
        });
        $out.find('.donut-txt').css({
            fontSize: this.obj.textObj.fontSize,
            color: this.obj.textObj.color,
            background: this.obj.textObj.background,
            borderRadius: this.obj.radius
        });
        this.iconFor($out);
    }
    iconFor(ele){
        let _self = this.obj.iconArr;
        let length = _self.length;
        for(let i=0; i< length; i++){
            ele.find(`.icon-${i+1}`).css({
                background:`url(${this.obj.link}${_self[i]}) no-repeat center center`,
                backgroundSize: 'contain'
            });
        }
    }
}
