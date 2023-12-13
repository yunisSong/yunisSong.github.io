$(function () {
  function MouseWheel(e) {
    ///对img按下鼠标滚路，阻止视窗滚动
    e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    if (e.preventDefault) e.preventDefault();
    else e.returnValue = false;

    //其他代码
  }

  $("p img").click(function () {
    let imageStr = document
      .querySelector("#YunisTestImage")
      .getAttribute("class");
    console.log(`${imageStr}`);
    $("#SSYLargeImage").attr({ src: "" });
    if (`${imageStr}` == "SYYImageDiss") {
      showBigImage($(this).attr("src"));
      //   $(this).onmousewheel = MouseWheel;
      //   $(document).off("mousewheel", "**");
      $(document).bind("mousewheel", function (event, delta) {
        return false;
      });
    } else {
      removeBigPic();
    }
  });

  function showBigImage(imgPath) {
    $("#YunisTestImage").removeClass("SYYImageDiss");
    $("#YunisTestImage").addClass("SYYImageShow");
    $("#SSYLargeImage").attr({ src: imgPath });
    $("#SSYLargeImage").addClass("animate-scale1");
    $("#SSYLargeImage").removeClass("animate-scale0");

    $("html,body").addClass("none-scroll"); //下层不可滑动
  }

  function removeBigPic() {
    $("#YunisTestImage").removeClass("SYYImageShow");
    $("#YunisTestImage").addClass("SYYImageDiss");
    $("#SSYLargeImage").removeClass("animate-scale1");
    $("#SSYLargeImage").addClass("animate-scale0");
    $("html,body").removeClass("none-scroll");

    $(document).unbind("mousewheel");
  }

  $("#YunisTestImage").click(function () {
    removeBigPic();
  });
  $(document).keydown(function (event) {
    //判断当event.keyCode 为37时（即左方面键），执行函数to_left();
    //判断当event.keyCode 为39时（即右方面键），执行函数to_right();
    if (event.keyCode == 27) {
      //do somethings;
      removeBigPic();
    }
  });
});
