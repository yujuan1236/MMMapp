/**
 * Created by Administrator on 2017/2/17.
 */
$(function () {
    var page = 1;
    var str;
    product();

    $('#down').click(function () {
        if (page == 3) {
            page = 1;
        } else {
            page++;
        }
        $('#select>option[value=' + page + ']').prop('selected','selected');
        product();
    })

    $('#up').click(function () {
        if (page == 1) {
            page = 3
        } else {
            page--;
        }
       $('#select>option[value=' + page + ']').prop('selected','selected');
        product();
    })

    $('#select').change(function () {
        page = parseInt($('#select option:selected').attr('value'));
        product();
    })


    function product() {
        var patt = /\=[^\&]+\&/g;
        var arr = window.location.href.match(patt)
        var index = parseInt(arr[0].slice(1, -1));
        var f = arr[1].slice(1, -1);
        var ff = arr[2].slice(1, -1);
        $('#cat').text(decodeURIComponent(f));
        $('#det').text(decodeURIComponent(ff));

        str = 'http://139.199.157.195:9090/api/getproductlist?categoryid=' + index + '&pageid=' + page + '';
        var titName;
        $.get(str, function (result) {
            titName = $("#cat").text();
            console.log(titName);
            var arr = result.result;
            for (var i = 0; i < arr.length; i++) {
                arr[i].titName = titName;
            }
            console.log(arr);
            var html = template('boxlist', result);
            $('#box').html(html);
        });
    }
})