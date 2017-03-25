/**
 * Created by Administrator on 2017-2-14.
 */
$(function () {
        var num = 1

        console.log($('.right')[0])

        getInterMenu($('.money'), 1)
        function getInterMenu(dom, pageid) {
            var str = 'http://139.199.157.195:9090/api/getmoneyctrl?pageid=' + (pageid);
            $.get(str, function (res) {
                    res.num = Math.floor(res.totalCount / res.pagesize)
                    res.pageid = pageid || 1;
                    res.page = []
                    for (var i = 0; i < res.num; i++) {
                        res.page.push({'pageid': i + 1, 'pageCount': res.num})
                        var html = template('html', res)
                        dom.html(html)

                    }
                    $('.right').on('click', function () {
                        getInterMenu($('.money'), ++num)
                        console.log(pageid)
                    })
                    $('.left').on('click', function () {
                        getInterMenu($('.money'), --num)
                        console.log(pageid)
                    })
                    $('#selectPage').on('change', function (e) {
                        num = $(this).val();
                        $(this).attr('selected', "selected");
                            getInterMenu($('.money'), num);
                    })
                }
            )
        }

    }
)