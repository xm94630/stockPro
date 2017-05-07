import $ from 'jquery';
var l = function(){return console.log.apply(console,arguments)}

var data = [];
data = [{
    name:'中国神华',
    nowPrice:'10',
    price:'8.8|8.9|4.1|1.3|5.5|6.1',
    percent:'30|34|38|40|45|60',
    date:'2017/5/1',
    min:'30',
    max:'60',
    isOK:true,
    result:'45'
},{
    name:'华西股份',
    nowPrice:'10',
    min:'40',
    max:'110',
    price:'10|8.9|4.1|1.3|5.5|6.1',
    percent:'40|50|56|60|120|66',
    date:'2017/5/2',
    isOK:false,
    result:'60'
}]
function selesctDataByType(type,data){
    if(type=='0'){
        return data;
    }else if(type=='1'){
        return data;
    }else if(type=='2'){
        return data;
    }
}
function randerData(type,data){
    var data = selesctDataByType(type,data);
    if(data.length==0){
        $('.wu').show();
    }
    var html='';
    for(var i=0;i<data.length;i++){

        var p = data[i].isOK?data[i].result+'%':'不合格';

        html+= ['<div node-type="more" name="'+data[i].name+'" class="item">',
          '<div class="floatL">'+data[i].name+' '+p+'（'+data[i].date+')'+'</div>',
          '<div class="floatR" node-type="del" name="'+data[i].name+'">删除</div>',
          '<div class="blankBox"></div>',
        '</div>'].join('');
    }
    $('.lists').html('').append(html);

    $('[node-type="more"]').off('click').on('click',function(){
        var name = $(this).attr('name');
        $('[node-type="page2"]').hide();
        $('[node-type="page3"]').show();
        detail(name);
    })
    //删除
    $('[node-type="del"]').each(function(i){
        $(this).on('click',function(e){
            e.stopPropagation();
            var name = $(this).attr('name');
            var a=confirm("确认要删除？");
            if(a==true){
                var stockData;
                for(var i=0;i<data.length;i++){
                    if(data[i].name==name){
                        data.splice(i,1);
                    }
                }
                $('[node-type="more"]').each(function(){
                    if($(this).attr('name')==name){
                        $(this).remove();
                    }
                })
                if($('[node-type="more"]').length==0){
                    $('.wu').show();
                }
            }
        })
    })
}

function detail(name){
    var stockData;
    for(var i=0;i<data.length;i++){
        if(data[i].name==name){
            stockData = JSON.parse(JSON.stringify(data[i]));
        }
    }

    if(stockData.isOK){
        $('[node-type="isOK"]').show();
        $('[node-type="isNotOK"]').hide();
    }else{
        $('[node-type="isOK"]').hide();
        $('[node-type="isNotOK"]').show();   
    }

    $('[node-type="stockName"]').text(stockData.name);
    $('[node-type="average"]').text(stockData.result+"%");
    $('.end').css({width:stockData.max<100?stockData.max+'%':'100%'});
    $('.start').css({width:stockData.min<100?stockData.min+'%':'100%'});
    var percent = stockData.percent;
    var a1 = percent.split('|')[0];
    var a2 = percent.split('|')[1];
    var a3 = percent.split('|')[2];
    var a4 = percent.split('|')[3];
    var a5 = percent.split('|')[4];
    var a6 = percent.split('|')[5];
    $('.y1').css({left:a1<100?a1+'%':'100%'});
    $('.y2').css({left:a2<100?a2+'%':'100%'});
    $('.y3').css({left:a3<100?a3+'%':'100%'});
    $('.y4').css({left:a4<100?a4+'%':'100%'});
    $('.y5').css({left:a5<100?a5+'%':'100%'});
    $('.y6').css({left:a6<100?a6+'%':'100%'});
    l(a1)
    $('[node-type="v1"]').text(a1<=100?a1+'%':'不合格');
    $('[node-type="v2"]').text(a2<=100?a2+'%':'不合格');
    $('[node-type="v3"]').text(a3<=100?a3+'%':'不合格');
    $('[node-type="v4"]').text(a4<=100?a4+'%':'不合格');
    $('[node-type="v5"]').text(a5<=100?a5+'%':'不合格');
    $('[node-type="v6"]').text(a6<=100?a6+'%':'不合格');

    //编辑
    $('[node-type="stockEdit"]').on('click',function(){
        $('[node-type="page3"]').hide();
        $('[node-type="add"]').trigger('click',name);
    });

}


$('[node-type="startBtn"]').on('click',function(){
    $('[node-type="page1"]').hide();
    $('[node-type="page2"]').show();
});


$('.bar .tab').each(function(i){
    $(this).on('click',function(){
        $('.bar .tab').removeClass('active')
        $(this).addClass('active');
        randerData(i,data);
    })
})
$($('.bar .tab')[0]).trigger('click');



$('.back1').on('click',function(){
    $('[node-type="page2"]').show();
    $('[node-type="page3"]').hide();
    $('.tab.active').trigger('click');
})

$('[node-type="add"]').on('click',function(e,editName){

    $('[node-type="page2"]').hide();
    $('[node-type="page4"]').show();

    //如果是编辑状态
    if(editName){

        var stockData;
        for(var i=0;i<data.length;i++){
            if(data[i].name==editName){
                stockData = JSON.parse(JSON.stringify(data[i]));
            }
        }
        $('[node-type="addName"]').val(stockData.name).attr('disabled','disabled');
        $('[node-type="addPrice"]').val(stockData.nowPrice);
        var arr = stockData.price.split('|');
        $('[node-type="addLow1"]').val(arr[0]);
        $('[node-type="addLow2"]').val(arr[1]);
        $('[node-type="addLow3"]').val(arr[2]);
        $('[node-type="addLow4"]').val(arr[3]);
        $('[node-type="addLow5"]').val(arr[4]);
        $('[node-type="addLow6"]').val(arr[5]);
    }else{
        $('[node-type="addName"]').val('').removeAttr("disabled");
        $('[node-type="addPrice"]').val('');
        $('[node-type="addLow1"]').val('');
        $('[node-type="addLow2"]').val('');
        $('[node-type="addLow3"]').val('');
        $('[node-type="addLow4"]').val('');
        $('[node-type="addLow5"]').val('');
        $('[node-type="addLow6"]').val('');
    }


});

$('.okBtn').on('click',function(){
    var name = $('[node-type="addName"]').val();
    var price = parseFloat($('[node-type="addPrice"]').val());
    var low1 = parseFloat($('[node-type="addLow1"]').val());
    var low2 = parseFloat($('[node-type="addLow2"]').val());
    var low3 = parseFloat($('[node-type="addLow3"]').val());
    var low4 = parseFloat($('[node-type="addLow4"]').val());
    var low5 = parseFloat($('[node-type="addLow5"]').val());
    var low6 = parseFloat($('[node-type="addLow6"]').val());

    if($.trim(name)==''){alert('名称不能为空!');return;}
    if($.trim(price)=='NaN'){alert('当前每股市价不能为空，或者输入值有误!');return;}
    if($.trim(low1)=='NaN'){alert('低点1不能为空，或者输入价格有误!');return;}
    if($.trim(low2)=='NaN'){alert('低点2不能为空，或者输入价格有误!');return;}
    if($.trim(low3)=='NaN'){alert('低点3不能为空，或者输入价格有误!');return;}
    if($.trim(low4)=='NaN'){alert('低点4不能为空，或者输入价格有误!');return;}
    if($.trim(low5)=='NaN'){alert('低点5不能为空，或者输入价格有误!');return;}
    if($.trim(low6)=='NaN'){alert('低点6不能为空，或者输入价格有误!');return;}

    var object = {
        name:name,
        nowPrice:price,
        price:low1+'|'+low2+'|'+low3+'|'+low4+'|'+low5+'|'+low6,
        date:(new Date()).toLocaleDateString()
    };

    var p1 = parseFloat((price*100 / (low1*2)).toFixed(1));
    var p2 = parseFloat((price*100 / (low2*2.4)).toFixed(1));
    var p3 = parseFloat((price*100 / (low3*2.8)).toFixed(1));
    var p4 = parseFloat((price*100 / (low4*3.2)).toFixed(1));
    var p5 = parseFloat((price*100 / (low5*3.6)).toFixed(1));
    var p6 = parseFloat((price*100 / (low6*4)).toFixed(1));

    object.percent = p1+'|'+p2+'|'+p3+'|'+p4+'|'+p5+'|'+p6;
    object.result = parseFloat(((p1+p2+p3+p4+p5+p6)/6).toFixed(0));
    object.max = Math.max(p1,p2,p3,p4,p5,p6);
    object.min = Math.min(p1,p2,p3,p4,p5,p6);
    object.isOK = object.max<100;

    var isEdit;
    var index;
    for(var i=0;i<data.length;i++){
        if(data[i].name==name){
            isEdit = true;
            index=i;
            break;
        }else{
            isEdit = false;
        }
    }
    if(isEdit){
        data[i] = object;
    }else{
        data.push(object);
    }

    $('[node-type="page4"]').hide();
    $('[node-type="page2"]').show();
    $('.tab.active').trigger('click');
    $('[node-type="more"]').each(function(){
        if($(this).attr('name')==name){
            $(this).trigger('click');
        }
    })

});

$('.back2').on('click',function(){
    var isEdit = $('[node-type="addName"]').prop("disabled");
    if(isEdit){
        $('[node-type="page2"]').hide();
        $('[node-type="page3"]').show();
        $('[node-type="page4"]').hide();        
    }else{
       $('[node-type="page2"]').show();
       $('[node-type="page3"]').hide();
       $('[node-type="page4"]').hide(); 
    }
})














