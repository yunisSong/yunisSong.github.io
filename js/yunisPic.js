$(function() {
    $('p img').click(function () {
            let imageStr = document.querySelector("#YunisTestImage").getAttribute("class");
            console.log(`${imageStr}`);
        if (`${imageStr}` == "SYYImageDiss") {
             $("#YunisTestImage").removeClass('SYYImageDiss');
             $("#YunisTestImage").addClass('SYYImageShow');
             $("#SSYLargeImage").attr({ "src": $(this).attr("src") });
             var mo=function(e){passive: false };
             document.body.style.overflow='';//出现滚动条
             document.removeEventListener("touchmove",mo,false);
       }else {
            $("#YunisTestImage").removeClass('SYYImageShow');
            $("#YunisTestImage").addClass('SYYImageDiss');
            $("#SSYLargeImage").attr({ "src": "" });

            var mo=function(e){passive: false ;};
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);//禁止页面滑动
       }
        });

    $('#YunisTestImage').click(function () {
        $("#YunisTestImage").removeClass('SYYImageShow');
        $("#YunisTestImage").addClass('SYYImageDiss');
        $("#SSYLargeImage").attr({ "src": "" });
        var mo=function(e){passive: false };
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    });
   
});