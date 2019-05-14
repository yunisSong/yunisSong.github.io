$(function() {
    $('p img').click(function () {
            let imageStr = document.querySelector("#YunisTestImage").getAttribute("class");
            console.log(`${imageStr}`);
        if (`${imageStr}` == "SYYImageDiss") {
             $("#YunisTestImage").removeClass('SYYImageDiss');
             $("#YunisTestImage").addClass('SYYImageShow');
             $("#SSYLargeImage").attr({ "src": $(this).attr("src") });
       }else {
            $("#YunisTestImage").removeClass('SYYImageShow');
            $("#YunisTestImage").addClass('SYYImageDiss');
            $("#SSYLargeImage").attr({ "src": "" });
       }
        });

    $('#YunisTestImage').click(function () {
        $("#YunisTestImage").removeClass('SYYImageShow');
        $("#YunisTestImage").addClass('SYYImageDiss');
        $("#SSYLargeImage").attr({ "src": "" });
    });
});