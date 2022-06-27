$(function() {
    $('p img').click(function () {
        let imageStr = document.querySelector("#YunisTestImage").getAttribute("class");
        console.log(`${imageStr}`);
        if (`${imageStr}` == "SYYImageDiss") {
            showBigImage($(this).attr("src"))
        }else {
            removeBigPic ()
        }
    
        $(document).bind('mousewheel', () => {return false;});

    });
    function  showBigImage(imgPath) {
        $("#YunisTestImage").removeClass('SYYImageDiss');
        $("#YunisTestImage").addClass('SYYImageShow');
        $("#SSYLargeImage").attr({ "src": imgPath });
        $("#SSYLargeImage").addClass('d-block');
        $("html,body").addClass("none-scroll");//下层不可滑动
    }

    function removeBigPic () {
        $("#YunisTestImage").removeClass('SYYImageShow');
        $("#YunisTestImage").addClass('SYYImageDiss');

        setTimeout(() => {
            $("#SSYLargeImage").attr({ "src": "" });
            $("#SSYLargeImage").addClass('d-none');

        }, 600);
        //恢复响应鼠标滚动事件
        // $(document).unbind('mousewheel');
        $("html,body").removeClass("none-scroll");
    }

    $('#YunisTestImage').click(function () {
        removeBigPic();
    });
    $(document).keydown(function(event){
        //判断当event.keyCode 为37时（即左方面键），执行函数to_left();
        //判断当event.keyCode 为39时（即右方面键），执行函数to_right();
        if(event.keyCode == 27){
        //do somethings;
            removeBigPic();
        }
    });
   
});