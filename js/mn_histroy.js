/**
 * Created by lenovo on 2017/2/14.
 */
var index = [];
$(function () {
    mn_inti();
    function mn_inti() {
        mn_getData();
    }
});

function clickShow() {
    $('.mn_history_top').click(function () {
        var index = $(this).parent().index();//zheli
        $('.mn_history_bt:eq(' + index + ')').slideToggle('fast').parent().siblings('').children('.mn_history_bt').slideUp('fast');
        //    鍔ㄦ�佺敓鎴愭暟鎹�
        //    attr鏄壘鍒板綋鍓嶅厓绱犵殑灞炴�э紝浼犲叆鐨勫弬鏁版槸瑕佹壘鐨勫睘鎬�
        var str=encodeURIComponent(this.childNodes[0].innerHTML);
        var str=encodeURIComponent(this.childNodes[0].innerHTML);
        var i = $(this).children('span').attr('data');
        var mb = $(this).siblings('.mn_history_bt');
        var that=this;
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getcategory?titleid=' + i + '',
            success: function (ges) {
                ges.result.forEach(function(a){
                    a['sss']=$(that).find('a').text()
                })
                var html = template('mn_detil', ges);
                $(mb).html(html);
            }
        })
    })
}
//鍔ㄦ�佽幏鍙栨暟鎹�
function mn_getData() {
    $.ajax({
        url: 'http://139.199.157.195:9090/api/getcategorytitle',
        success: function (res) {
            var html = template('mn_tmp', res);
            $('.mn_history').html(html);
            clickShow();
            var id = $('.mn_clickshow');
            for (var i = 0; i < id.length; i++) {
            }
        },
        complete: function () {
        }
    })

}










