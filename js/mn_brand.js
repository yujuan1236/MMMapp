/**
 * Created by lenovo on 2017/2/15.
 */
$(function () {
    brandData();
  salesData();
    commentData();

    function brandData() {
        var thisId=document.location.search;
        if(thisId.indexOf('brandtitleid=') !=-1){
            var x=thisId.indexOf('brandtitleid=');
            var l='brandtitleid='.length;
            var y= thisId.slice(x);
            var z =   y.indexOf('&');
            var u = y.slice((l),z);
        }

        $.ajax({
                url:'http://139.199.157.195:9090/api/getbrand?brandtitleid='+u+'',
                success:function (ges) {
                    console.log(ges);
                    var html=template('mn_brabd',ges);
                    $('.mn_tv').html(html);
                    dataColor();
                }
            })

        console.log(u);
    }
})
//¸Ä¶¯
var u;
function getNum() {
    var thisId = document.location.search;
    if (thisId.indexOf('brandtitleid=') != -1) {
        var x = thisId.indexOf('brandtitleid=');
        var l = 'brandtitleid='.length;
        var y = thisId.slice(x);
        var z = y.indexOf('&');
         u = y.slice((l), z);
console.log(u);
    }
    return u;
}
getNum();
function salesData() {
    getNum();
    if (u<=7) {
        u=1;
    }
    else {
        u=2
    }

    console.log('222'+u);
    $.ajax({
url:'http://139.199.157.195:9090/api/getbrandproductlist?brandtitleid='+u+'',
        success:function (res) {
            var html=template('sales',res);
            console.log(html);
            console.log('333'+u);
            $('.mn_sales').html(html);
        }
    })
}
function commentData() {
    getNum();
    $.ajax({
        url:'http://139.199.157.195:9090/api/getproductcom?productid='+u+'',
        success:function (res) {
            var html=template('comment',res);
            $('.mn_comment').html(html);

                setTimeout(function(){
                    var img=document.createElement('img');
                    img.src=$('.media-left').first().children().attr('src');
                    console.log(img.src);
                    $('.pic').append(img)
                },0)
        }
    })
}

function dataColor() {
    $(".brand_color").each(function(){
        $( $(".brand_color")[0]).css({'background':'#f10e0e'});
       $( $(".brand_color")[1]).css({'background':'orange'});
       $( $(".brand_color")[2]).css({'background':'green'});
    });


}