/**
 * Created by yj.
 */
$(function () {
    var titleid = getQueryString('titleid') || 0;
    getBaiCaiJiaTitle(titleid);
    var index=0;
    getBaiCaiJiaProduct(titleid);


    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // if (r != null) return unescape(r[2]);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

   //获取tab标题数据
    function getBaiCaiJiaTitle(titleid) {
        $.get("http://139.199.157.195:9090/api/getbaicaijiatitle?titleid="+titleid, function (res) {
            var html = template('listTmp', res);
            $('.ul-wapper').html(html);
            var tabs=$('.tabs a');
            //console.log(tabs);
            var w1=0;
            for(var i=0;i<tabs.length;i++){
                w1+=tabs[i].parentNode.offsetWidth;
                tabs[i].index=i;
                tabs[i].onclick= function () {

                    index = this.index;
                    //console.log((this.parentNode).offsetLeft);
                    //console.log((this.parentNode.parentNode).clientWidth);
                    //console.log(document.body.offsetWidth);
                    //var ulWidth=(this.parentNode.parentNode).offsetWidth;
                    //console.log(ulWidth);
                    var bodyWidth=document.body.offsetWidth;
                    var width1=(this.parentNode).offsetLeft;
                    if((bodyWidth+width1)>w1+60){
                        width1=w1+60-bodyWidth;

                    }
                    $('.tabs').get(0).style.transform= "translateX(" + (-width1) + "px)";
                    $('.tabs').get(0).style.webkitTransform = "translateX(" + (-width1) + "px)";

                    getBaiCaiJiaProduct(titleid);
                }
            }
            //设置ul的宽度
            var width=$('.ul-wapper ul li').width();
            //console.log(width);
            var length=$('.ul-wapper ul li').length;
            var ulWidth=width*length;
            //console.log(ulWidth);
            tabSwipe();

        });
    }

    /*获取白菜价列表*/
    function getBaiCaiJiaProduct(titleid) {
        $.get("http://139.199.157.195:9090/api/getbaicaijiaproduct?titleid=" + index, function (res) {
            var html = template("productTmp", res);
            $(".bcj-list").html(html);
            document.querySelector('.gobuy').href = document.querySelector('.g>a').href;

        });
    }

    function tabSwipe() {

        var parentBox = document.querySelector('.ul-wapper');
        var childBox = parentBox.querySelector('ul');
        //console.log(parentBox);
        //console.log(childBox);
        var parentWidth = parentBox.offsetWidth;
        var childWidth = childBox.offsetWidth;
        //console.log(parentWidth);
        //console.log(childWidth);
        //最大定位
        var maxX = 0;
        //最小定位
        var minX = parentWidth - childWidth;
        //定义一个缓冲距离
        var distance = 60;
        //最大滑动定位
        var maxSwipe = maxX + distance;
        //最小滑动定位
        var minSwipe = minX - distance - 50;
        //定义出事变量
        var startX = 0, moveX = 0,
            distanceX = 0, isMove = false;
        var currX = 0;

        //定义公用的方法
        var addTransition = function () {
            childBox.style.webkitTransition = "all .2s";
            childBox.style.transition = "all .2s";
        };
        var removeTransition = function () {
            childBox.style.webkitTransition = "none";
            childBox.style.transition = "none";
        };
        var settranslatex = function (x) {
            childBox.style.webkitTransform = "translateX(" + x + "px)";
            childBox.style.transform = "translateX(" + x + "px)";
        };
        //绑定事件
        childBox.addEventListener('touchstart', function (e) {
            //console.log(123);
            startX = e.touches[0].clientX;
            //console.log(startX);
        });
        childBox.addEventListener('touchmove', function (e) {
            moveX = e.touches[0].clientX;
            distanceX = moveX - startX;
            //清除过渡
            //removeTransition();

            if ((currX + distanceX) < maxSwipe && (currX + distanceX) > minSwipe) {
                settranslatex(currX + distanceX);
            }
        });
        window.addEventListener('touchend', function (e) {
            if ((currX + distanceX) > maxX) {
                currX = maxX;
                addTransition();
                settranslatex(currX);
            }
            else if ((currX + distanceX) < minX) {
                currX = minX;
                addTransition();
                settranslatex(currX);
            }
            else {
                currX = currX + distanceX;
            }

            //重置所有样式
            startX = 0;
            moveX = 0;
            distanceX = 0;
            isMove = 0;
        });


        //tab变换
        var lis = childBox.querySelectorAll('li');
        //定义一个全局对象
        window.yj = {};
        //封装tab事件
        yj.tap = function (dom, callback) {
            /*
             * 要求  没有触发 touchmove 事件
             *       并且响应速度要比click快
             */
            if (dom && typeof  dom == 'object') {
                var isMove = false;
                var startTime = 0;
                dom.addEventListener('touchstart', function (e) {
                    //console.log('touchstart');
                    //console.time('tap');/*记录tap这个参数现在的时间*/
                    startTime = Date.now();

                });
                dom.addEventListener('touchmove', function (e) {
                    //console.log('touchmove');
                    isMove = true;
                });
                dom.addEventListener('touchend', function (e) {
                    //console.log('touchend');
                    //console.timeEnd('tap')/*打印tap这个参数距离上一次记录的时候的时间*/
                    /*判读  是否满足tap 的要求  一般要求tap的响应时间150*/
                    if (!isMove && (Date.now() - startTime) < 150) {
                        /*调用 callback*/
                        callback && callback(e);
                    }
                    /*重置 参数*/
                    isMove = false;
                    startTime = 0;
                });
            }
        };
        //调用tab事件
        yj.tap(childBox, function (e) {
            var li = e.target.parentNode;
            console.log(li);
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
                lis[i].index = i;
                //console.log(i);
            }
            li.className ='active';
            //li.className ='active';
                //console.log(li.index);
                var translateX = -li.index *52;
                if (translateX > minX) {
                    currX = translateX;
                    addTransition();
                    settranslatex(currX);
                }
                else {
                    currX = minX;
                    addTransition();
                    settranslatex(currX);
                }
            });

        }

});

