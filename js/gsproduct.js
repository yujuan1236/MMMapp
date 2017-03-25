/**
 * Created by Administrator on 2017/2/14.
 */
$(function () {
    //标记区域商铺名称点击的this
    var that;
    //标记areaId shopId，用来取出自己设定在模板中的id，给后面渲染网页的网站用。
    var areaId = 0,
        shopId = 0,
    //定义numshop，为选中单条目打的红沟被标记,
    // 初始值等于0，即默认点开时第一项打红沟
        numshop = 0,
    //定义numarea，为选中单条目打的红沟被标记
    // 初始值等于0，即默认点开时第一项打红沟
        numarea = 0,
    //定义str,用来拼接渲染产品页面的url地址
        str;
    //商铺点击出来下拉菜单
    $('#shop').click(function () {
        if ($('#down>a').attr('shopid') && $('#down').css('display') == 'block') {
            $('#shop>span').css('transform', 'rotate(0deg)');
            $('#down').hide()
        } else {
            $('#down').show();
            $('#area>span').css('transform', 'rotate(0deg)');
            $('#shop>span').css('transform', 'rotate(60deg)');
        }
        //标记点击的this
        that = this;
        //第一种数据请求方法
        //$.get('http://139.199.157.195:9090/api/getgsshop', function (result) {
        //    var html = template('downlist', result);
        //    $('#down').html(html);
        //
        //})
        //第二种数据请求方法
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getgsshop',
            success: function (result) {
                var html = template('downlist', result);
                //用html方法写入，即每次列表都被清空重写
                $('#down').html(html);
            },
            complete: function () {
                console.log(numshop);
                var c = numshop + 1;
                $('#down>a:nth-child(' + c + ')').addClass('right');
                //$('#down>a')[0].classList.add('right');
            }
        })
    });
    //全国区域点击出来下拉菜单
    $('#area').click(function () {
        if ($('#down>a').attr('areaid') && $('#down').css('display') == 'block') {
            $('#area>span').css('transform', 'rotate(0deg)');
            $('#down').hide()
        } else {
            $('#shop>span').css('transform', 'rotate(0deg)');
            $('#area>span').css('transform', 'rotate(60deg)');
            $('#down').show()
        }
        that = this;
        //第一种数据请求写法
        //$.get('http://139.199.157.195:9090/api/getgsshoparea', function (result) {
        //    var html = template('downlistare', result);
        //    $('#down').html(html);
        //});
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getgsshoparea',
            success: function (result) {
                var html = template('downlistare', result);
                $('#down').html(html);
            },
            complete: function () {
                //不能在下面的拼接中进行数字运算，因为前面是字符串会运算成字符串拼接
                //所以先用b运算好再传进去拼接
                var b = numarea + 1
                //jquery获取的元素伪数组，用[i]和get[i]取出的是原生jsDom元素不是jquery元素
                //$('#down>a')[0].classList.add('right');
                //$('#down>a:first-child').addClass('right');//jquery元素
                $('#down>a:nth-child(' + b + ')').addClass('right');
            }
        })
    });
    //商铺及区域点击之后再点击选中条目
    $('#down').on('click', 'a', function () {
        //利用第一次点击标记的that来获取第二次点击的文本
        $(that).children('span:nth-child(1)').text($(this).text().slice(0, $(this).text().length > 4 ? 2 : 10));
        //获取之后隐藏，上面再次第一次点击时显示出来
        $('#down').hide();
        //利用页面模板给a标签增加的属性，获取每次输入框改变时店铺及地址的id，用来改变获取后台数据的网址
        if ($(this).attr('shopid')) {
            //模板中手动加上shopid及areaid属性，在此获取以便以后拼接渲染
            // product页面的网址利用。
            shopId = $(this).attr('shopid');
            //shopId、areaId取得的是字符串不是number
            $('#shop>span').css('transform', 'rotate(0deg)');
        } else {
            areaId = $(this).attr('areaid');
            $('#area>span').css('transform', 'rotate(0deg)');
        }
        //每次执行之后店铺及地址会改变改变之后后台数据更新从新执行渲染页面函数
        product();
        //每次点击后的“√”
        for (var i = 0; i < $('#down>a').length; i++) {
            $('#down>a').removeClass('right');
        }
        $(this).addClass('right');

        if ($(this).attr('shopid')) {
            //获取的$(this).attr('shopid')是字符串需要转换
            numshop = parseInt($(this).attr('shopid'));
        }
        if ($(this).attr('areaid')) {
            numarea = parseInt($(this).attr('areaid'));
        }
    })
    //利用上面每次输入框点击变换选项时渲染产品页面
    function product() {
        //利用商铺及区域点击获取的id更新str(即后台数据网址)
        str = 'http://139.199.157.195:9090/api/getgsproduct?shopid=' + shopId + '&areaid=' + areaId + '';
        $.get(str, function (result) {
            //因为获取的json数据￥和钱数在一起，所以必须对result进行字符串处理，将￥符号和钱数分开，
            //result为对象，result.result是含有数据的数组
            var arr=result.result;
            arr.forEach(function(b){
                //钱数    replace及slice只能字符串使用,数组对象等不能使用
                var sss = b.productPrice.replace(b.productPrice,b.productPrice.slice(1, 10));
                //￥符号
                var bb =b.productPrice.replace(b.productPrice,b.productPrice.slice(0, 1));
                //对数据切割替换后再放到原对象里。
                b.productPrice = sss;
                //在数组里创建一个k及value值把￥符号放进去
                b.bb = bb;
            })
            //用处理过后的result参加运算
            var html = template('productare', result);
            $('#box').html(html);
        });
    }
    product();

})
