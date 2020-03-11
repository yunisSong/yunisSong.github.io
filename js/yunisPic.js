$(function() {
    $('p img').click(function () {
        let imageStr = document.querySelector("#YunisTestImage").getAttribute("class");
        console.log(`${imageStr}`);
        if (`${imageStr}` == "SYYImageDiss") {
            $("#YunisTestImage").removeClass('SYYImageDiss');
            $("#YunisTestImage").addClass('SYYImageShow');
            $("#SSYLargeImage").attr({ "src": $(this).attr("src") });

            //禁止响应鼠标滚动事件
            // $(document).bind('mousewheel', function(event, delta) {return false;});
            $("html,body").addClass("none-scroll");//下层不可滑动

        }else {
                $("#YunisTestImage").removeClass('SYYImageShow');
                $("#YunisTestImage").addClass('SYYImageDiss');
                $("#SSYLargeImage").attr({ "src": "" });

                //恢复响应鼠标滚动事件
                // $(document).unbind('mousewheel');
                $("html,body").removeClass("none-scroll");

        }
    
        $(document).bind('mousewheel', function(event, delta) {return false;});

        });

    $('#YunisTestImage').click(function () {
        $("#YunisTestImage").removeClass('SYYImageShow');
        $("#YunisTestImage").addClass('SYYImageDiss');
        $("#SSYLargeImage").attr({ "src": "" });
        //恢复响应鼠标滚动事件
        // $(document).unbind('mousewheel');
        $("html,body").removeClass("none-scroll");

    });
   
});