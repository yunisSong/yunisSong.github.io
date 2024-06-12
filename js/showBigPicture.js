$(function () {
  // 表示大图是否在显示的状态
  let isShowBigPic = false;
  // 大图响应时 禁止滚动事件
  document.addEventListener(
    "wheel",
    (e) => {
      if (!isShowBigPic) {
        return;
      }
      e.preventDefault();
    },
    { passive: false }
  );

  // 为图片添加点击事件
  $("p img").click(function () {
    // 如果大图已经显示隐藏大图，如果大图没有显示，显示大图
    if (isShowBigPic) {
      removeBigPic();
    } else {
      showBigImage($(this).attr("src"));
    }
  });

  // 显示大图片
  function showBigImage(imgPath) {
    $("#YunisTestImage").removeClass("SYYImageDiss");
    $("#YunisTestImage").addClass("SYYImageShow");
    $("#SSYLargeImage").attr({ src: imgPath });
    $("#SSYLargeImage").addClass("animate-scale1");
    $("#SSYLargeImage").removeClass("animate-scale0");

    $("html,body").addClass("none-scroll"); //下层不可滑动
    // document.addEventListener("wheel", mouseWheel, { passive: false });
    isShowBigPic = true;
  }

  // 隐藏大图片
  function removeBigPic() {
    $("#YunisTestImage").removeClass("SYYImageShow");
    $("#YunisTestImage").addClass("SYYImageDiss");
    $("#SSYLargeImage").removeClass("animate-scale1");
    $("#SSYLargeImage").addClass("animate-scale0");
    $("html,body").removeClass("none-scroll");

    // $(document).unbind("mousewheel");
    // document.removeEventListener("wheel", mouseWheel, { passive: false });
    isShowBigPic = false;
  }

  // 为容器添加点击事件
  $("#YunisTestImage").click(function () {
    removeBigPic();
  });

  // 获取全部要显示的图片
  function getAllImageSrc() {
    let imgArr = [];
    $("p img").each(function () {
      imgArr.push($(this).attr("src"));
    });
    return imgArr;
  }
  // 上一个按钮点击事件
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

  // 下一张按钮点击事件
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
  });
  // 键盘响应事件
  $(document).keydown(function (event) {
    if (!isShowBigPic) {
      return;
    }

    // 阻止默认事件传递
    event.preventDefault();

    if (event.keyCode == 27) {
      //do somethings;
      removeBigPic();
    }
    // 方向键 ←  ↑ ，显示上一张图片
    else if (event.keyCode == 37 || event.keyCode == 38) {
      $(".leftButton").click();
      //do somethings;
    }
    // 方向键 →  ↓，显示下一张图片
    else if (event.keyCode == 39 || event.keyCode == 40) {
      $(".rightButton").click();
      //do somethings;
    }
  });
});
