$(function() {
    $('p img').click(function () {
            let imageStr = document.querySelector("#YunisTestImage").getAttribute("class");
            console.log(`${imageStr}`);
        if (`${imageStr}` == "SYYImageDiss") {
             $("#YunisTestImage").removeClass('SYYImageDiss');
             $("#YunisTestImage").addClass('SYYImageShow');
             $("#SSYLargeImage").attr({ "src": $(this).attr("src") });

            //禁止响应鼠标滚动事件
            $(document).bind('mousewheel', function(event, delta) {return false;});

       }else {
            $("#YunisTestImage").removeClass('SYYImageShow');
            $("#YunisTestImage").addClass('SYYImageDiss');
            $("#SSYLargeImage").attr({ "src": "" });

            //恢复响应鼠标滚动事件
            $(document).unbind('mousewheel');


       }
        });

    $('#YunisTestImage').click(function () {
        $("#YunisTestImage").removeClass('SYYImageShow');
        $("#YunisTestImage").addClass('SYYImageDiss');
        $("#SSYLargeImage").attr({ "src": "" });
        //恢复响应鼠标滚动事件
        $(document).unbind('mousewheel');

    });
   
});