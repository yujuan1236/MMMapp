/**
 * Created by Administrator on 2017/2/14.
 */
$(function () {
    //��������������Ƶ����this
    var that;
    //���areaId shopId������ȡ���Լ��趨��ģ���е�id����������Ⱦ��ҳ����վ�á�
    var areaId = 0,
        shopId = 0,
    //����numshop��Ϊѡ�е���Ŀ��ĺ칵�����,
    // ��ʼֵ����0����Ĭ�ϵ㿪ʱ��һ���칵
        numshop = 0,
    //����numarea��Ϊѡ�е���Ŀ��ĺ칵�����
    // ��ʼֵ����0����Ĭ�ϵ㿪ʱ��һ���칵
        numarea = 0,
    //����str,����ƴ����Ⱦ��Ʒҳ���url��ַ
        str;
    //���̵�����������˵�
    $('#shop').click(function () {
        if ($('#down>a').attr('shopid') && $('#down').css('display') == 'block') {
            $('#shop>span').css('transform', 'rotate(0deg)');
            $('#down').hide()
        } else {
            $('#down').show();
            $('#area>span').css('transform', 'rotate(0deg)');
            $('#shop>span').css('transform', 'rotate(60deg)');
        }
        //��ǵ����this
        that = this;
        //��һ���������󷽷�
        //$.get('http://139.199.157.195:9090/api/getgsshop', function (result) {
        //    var html = template('downlist', result);
        //    $('#down').html(html);
        //
        //})
        //�ڶ����������󷽷�
        $.ajax({
            url: 'http://139.199.157.195:9090/api/getgsshop',
            success: function (result) {
                var html = template('downlist', result);
                //��html����д�룬��ÿ���б��������д
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
    //ȫ�����������������˵�
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
        //��һ����������д��
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
                //�����������ƴ���н����������㣬��Ϊǰ�����ַ�����������ַ���ƴ��
                //��������b������ٴ���ȥƴ��
                var b = numarea + 1
                //jquery��ȡ��Ԫ��α���飬��[i]��get[i]ȡ������ԭ��jsDomԪ�ز���jqueryԪ��
                //$('#down>a')[0].classList.add('right');
                //$('#down>a:first-child').addClass('right');//jqueryԪ��
                $('#down>a:nth-child(' + b + ')').addClass('right');
            }
        })
    });
    //���̼�������֮���ٵ��ѡ����Ŀ
    $('#down').on('click', 'a', function () {
        //���õ�һ�ε����ǵ�that����ȡ�ڶ��ε�����ı�
        $(that).children('span:nth-child(1)').text($(this).text().slice(0, $(this).text().length > 4 ? 2 : 10));
        //��ȡ֮�����أ������ٴε�һ�ε��ʱ��ʾ����
        $('#down').hide();
        //����ҳ��ģ���a��ǩ���ӵ����ԣ���ȡÿ�������ı�ʱ���̼���ַ��id�������ı��ȡ��̨���ݵ���ַ
        if ($(this).attr('shopid')) {
            //ģ�����ֶ�����shopid��areaid���ԣ��ڴ˻�ȡ�Ա��Ժ�ƴ����Ⱦ
            // productҳ�����ַ���á�
            shopId = $(this).attr('shopid');
            //shopId��areaIdȡ�õ����ַ�������number
            $('#shop>span').css('transform', 'rotate(0deg)');
        } else {
            areaId = $(this).attr('areaid');
            $('#area>span').css('transform', 'rotate(0deg)');
        }
        //ÿ��ִ��֮����̼���ַ��ı�ı�֮���̨���ݸ��´���ִ����Ⱦҳ�溯��
        product();
        //ÿ�ε����ġ��̡�
        for (var i = 0; i < $('#down>a').length; i++) {
            $('#down>a').removeClass('right');
        }
        $(this).addClass('right');

        if ($(this).attr('shopid')) {
            //��ȡ��$(this).attr('shopid')���ַ�����Ҫת��
            numshop = parseInt($(this).attr('shopid'));
        }
        if ($(this).attr('areaid')) {
            numarea = parseInt($(this).attr('areaid'));
        }
    })
    //��������ÿ����������任ѡ��ʱ��Ⱦ��Ʒҳ��
    function product() {
        //�������̼���������ȡ��id����str(����̨������ַ)
        str = 'http://139.199.157.195:9090/api/getgsproduct?shopid=' + shopId + '&areaid=' + areaId + '';
        $.get(str, function (result) {
            //��Ϊ��ȡ��json���ݣ���Ǯ����һ�����Ա����result�����ַ��������������ź�Ǯ���ֿ���
            //resultΪ����result.result�Ǻ������ݵ�����
            var arr=result.result;
            arr.forEach(function(b){
                //Ǯ��    replace��sliceֻ���ַ���ʹ��,�������Ȳ���ʹ��
                var sss = b.productPrice.replace(b.productPrice,b.productPrice.slice(1, 10));
                //������
                var bb =b.productPrice.replace(b.productPrice,b.productPrice.slice(0, 1));
                //�������и��滻���ٷŵ�ԭ�����
                b.productPrice = sss;
                //�������ﴴ��һ��k��valueֵ�ѣ����ŷŽ�ȥ
                b.bb = bb;
            })
            //�ô�������result�μ�����
            var html = template('productare', result);
            $('#box').html(html);
        });
    }
    product();

})
