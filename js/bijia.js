/**
 * Created by yj.
 * 
 */
$(function () {
    var productId = getQueryString('productid') || 0;
    getProduct(productId);
    getCom(productId);
 


    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        // if (r != null) return unescape(r[2]);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    
    
    //获取商品详情的数据
    function getProduct(productId){
        $.get('http://139.199.157.195:9090/api/getproduct?productid='+productId, function (res) {
            console.log(res.length);
            var html=template('productTmp',res);
            var tit=window.location.search;
            var reg=/%\S+/;
            var titName=reg.exec(tit);
            var titName1=decodeURIComponent(titName);
            $('.temp').text(titName1);
            console.log(titName1);
            $(".product-info").html(html);
        })
    }
    //获取评论的数据
function getCom(productId){
    $.get('http://139.199.157.195:9090/api/getproductcom?productid='+productId, function (res) {
        var html=template('comTmp',res);
        //console.log(res);
        $('.com-list>ul').html(html);
    })
}
})