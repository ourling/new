/**
 * Created by Administrator on 2017/10/31.
 */

//-------------------------------------------------------------------------//
(function ($) {
    // 创建构造函数
    function Slide(ele, options) {
        this.$ele = $(ele)//this. 构造函数的实例对象
        this.options = $.extend({
            speed: 1000,
            delay: 3000
        }, options)//拓展
        this.states = [
            { '&zIndex': 1, width: 156, height: 156, top: 71, left: '11%', $opacity: 1 , transform: 'translateX(-50%)'},
            { '&zIndex': 2, width: 188, height: 188, top: 61, left: '22.5%', $opacity: 1 , transform: 'translateX(-50%)'},
            { '&zIndex': 3, width: 222, height: 222, top: 37, left: '34.5%', $opacity: 1 , transform: 'translateX(-50%)'},
            { '&zIndex': 4, width: 269, height: 269, top: 0,  left: '50%', $opacity: 1, transform: 'translateX(-50%)'},
            { '&zIndex': 3, width: 222, height: 222, top: 37, left: '64.5%', $opacity: 1 , transform: 'translateX(-50%)'},
            { '&zIndex': 2, width: 188, height: 188, top: 61, left: '77%', $opacity: 1 , transform: 'translateX(-50%)'},
            { '&zIndex': 1, width: 156, height: 156, top: 71, left: '87.5%', $opacity: 1 , transform: 'translateX(-50%)'}
        ]
        this.lis = this.$ele.find('li')
        this.interval
        // 点击切换到下一张

        this.$ele.find('section:nth-child(2)').on('click', function () {
            this.stop()
            this.next()
            this.play()
        }.bind(this))
        // 点击切换到上一张
        this.$ele.find('section:nth-child(1)').on('click', function () {
            this.stop()
            this.prev()
            this.play()
        }.bind(this))
        this.move()
        // 让轮播图开始自动播放
        this.play()
    }


    Slide.prototype = {


        // 原型是一个对象，所以写成一个花括号

        // move()方法让轮播图到达states指定的状态
        // <1>当页面打开时将轮播图从中心点展开
        // <2>当轮播图已经展开时，会滚动轮播图(需要翻转states数组中的数据)
        move: function () {

            this.lis.each(function (i, el) {
                $(el)
                    .css('z-index', this.states[i]['&zIndex'])
                    .css('transform', this.states[i]['transform'])
                    .finish().animate(this.states[i], this.options.speed)
                    // .stop(true,true).animate(states[i], 1000)
                    .find('img').css('opacity', this.states[i].$opacity)
            }.bind(this))
        },
        // 让轮播图切换到下一张
        next: function () {

            this.states.unshift(this.states.pop())
            this.move()
        },
        // 让轮播图滚动到上一张
        prev: function () {

            this.states.push(this.states.shift())
            this.move()
        },
        play: function () {

            this.interval = setInterval(function () {//这个this指window
                // setInterval、setTimeOut 中的this指向window

                // states.unshift(states.pop())       //从后往前走
                // states.push(states.shift())     //从前往后走
                this.next()
            }.bind(this), this.options.delay)
        },
        // 停止自动播放
        stop: function () {
            // var _this = this
            clearInterval(this.interval)
        }

    }
    $.fn.zySlide = function (options) {
        this.each(function (i, ele) {
            new Slide(ele, options)
        })
        return this
    }
})(jQuery)