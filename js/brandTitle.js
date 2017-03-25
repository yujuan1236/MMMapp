/**
 * Created by lenovo on 2017/2/15.
 */
$(function () {




    mnBrand();
    brandTitleClick();
    function mnBrand() {
        mnBrandData();
    }
});
function brandTitleClick() {
    $('.mn_tenbrand').on('click','.brand_title a',function () {
       var data=$(this).attr('brandtitleid');
        window.location='brand.html?brandtitleid='+data+'&s=1';
    })
}
//function click() {
//    $('.mn_tenbrand').on('click','.brand_title a',function () {
//        var data=$(this).attr('brandTitleId');
//        window.location='brand.html?categoryId='+data;
//        window
//    })
//}
function  mnBrandData() {
    $.ajax({
        url:'http://139.199.157.195:9090/api/getbrandtitle',
        success:function (ges) {
            var html=template('brand_title',ges);
            console.log(html);
            $('.mn_tenbrand').html(html);
        }
    })
}


