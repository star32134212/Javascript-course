$ (function(){
    var current = 0;
    var imgs = $('img');
    var total = imgs.length;
    $('#previous').on('click',function(){
        current = (current - 1 + total) % total;
        imgs.hide();
        imgs.eq(current).show();
    });
    $('#next').on('click',function(){
        current = (current + 1) % total;
        imgs.hide();
        imgs.eq(current).show();
    });
});