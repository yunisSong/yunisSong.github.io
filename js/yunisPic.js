$(function () {
  function mouseWheel(e) {
    e.preventDefault();
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
    $(document).addEventListener("wheel", mouseWheel, { passive: false });
  }

  function removeBigPic() {
    $("#YunisTestImage").removeClass("SYYImageShow");
    $("#YunisTestImage").addClass("SYYImageDiss");
    $("#SSYLargeImage").removeClass("animate-scale1");
    $("#SSYLargeImage").addClass("animate-scale0");
    $("html,body").removeClass("none-scroll");

    $(document).unbind("mousewheel");
    $(document).removeEventListener("wheel", mouseWheel, { passive: false });
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
