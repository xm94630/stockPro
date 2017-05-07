import $ from 'jquery';


var l = function(){return console.log.apply(console,arguments)}


const fn = () => console.log('啦啦啦，啦啦啦3~'); 
fn();


$(function(){
    $('[node-type="startBtn"]').on('click',function(){
        $('[node-type="page1"]').hide();
        $('[node-type="page2"]').show();
    });
})
