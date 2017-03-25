$(function () {
    mmbApp();

    function mmbApp(){
        getIndexMenu();
        getInterMenu();
    }

    function getIndexMenu(){
        $.ajax({
            url:"http://139.199.157.195:9090/api/getindexmenu",
            success: function (info) {
                //console.log(info);
                var html = template('tpl',info);
                $('#menu .row').html(html);
                //console.log(html);
                $('#menu>.row>div:nth-last-child(-n+4)').hide();
                addEvent();
            }
        })
    }
    function addEvent(){
        $('#menu>.row>div:nth-child(8)').click(function () {
            $('#menu>.row>div:nth-last-child(-n+4)').slideToggle();
        })
    }
    function getInterMenu() {
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getmoneyctrl',
            success: function (res) {
                //$.get('http://139.199.157.195:9090/api/getmoneyctrl',function(res){
                    var html =   template('html',res)
                    $('section>ul').html(html)
                //})
            }
        })
    }
})


