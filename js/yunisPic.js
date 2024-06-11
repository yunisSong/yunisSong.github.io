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
    document.addEventListener("wheel", mouseWheel, { passive: false });
  }

  function removeBigPic() {
    $("#YunisTestImage").removeClass("SYYImageShow");
    $("#YunisTestImage").addClass("SYYImageDiss");
    $("#SSYLargeImage").removeClass("animate-scale1");
    $("#SSYLargeImage").addClass("animate-scale0");
    $("html,body").removeClass("none-scroll");

    // $(document).unbind("mousewheel");
    document.removeEventListener("wheel", mouseWheel, { passive: false });
  }

  $("#YunisTestImage").click(function () {
    removeBigPic();
  });

  function getAllImageSrc() {
    let imgArr = [];
    $("p img").each(function () {
      imgArr.push($(this).attr("src"));
    });
    return imgArr;
  }
  $(".leftButton").click(function (e) {
    e.stopPropagation();
    // 获取当前显示图片的 index
    let currentImgIndex = getAllImageSrc().indexOf(
      $("#SSYLargeImage").attr("src")
    );
    // 获取上一张图片，如果当前图片为第一张图片，则返回最后一张图片
    let prevImg =
      currentImgIndex === 0
        ? getAllImageSrc()[getAllImageSrc().length - 1]
        : getAllImageSrc()[currentImgIndex - 1];

    $("#SSYLargeImage").attr({ src: prevImg });
  });

  $(".rightButton").click(function (e) {
    e.stopPropagation();
    // 获取当前显示图片的 index
    let currentImgIndex = getAllImageSrc().indexOf(
      $("#SSYLargeImage").attr("src")
    );
    // 获取下一张图片，如果当前图片为最后一张图片，则返回第一张图片
    let nextImg =
      currentImgIndex === getAllImageSrc().length - 1
        ? getAllImageSrc()[0]
        : getAllImageSrc()[currentImgIndex + 1];
    $("#SSYLargeImage").attr({ src: nextImg });

    console.log("rightButton stop");
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
