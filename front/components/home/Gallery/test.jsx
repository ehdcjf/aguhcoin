(function nowScroll() {
  var wrap = document.querySelectorAll(".now-wrap");
  var horizontal = document.querySelectorAll(".cont-inner");
  var spaceHolder = document.querySelectorAll(".sticky-elem");
  var scrollCal = $(spaceHolder).offset().top;

  function calcDynamicHeight(ref) {
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var objectWidth = ref.scrollWidth;

    return objectWidth - vw + vh + 150;
  }

  wrap[0].style.height = calcDynamicHeight(horizontal[0]) + "px";
  window.addEventListener(
    "scroll",
    function () {
      horizontal[0].style.transform =
        "translateX(" +
        (-$(spaceHolder).offset().top + scrollCal) +
        "px) rotate(.001deg)";
    },
    false
  );
  window.addEventListener(
    "resize",
    function () {
      wrap[0].style.height = calcDynamicHeight(horizontal[0]) + "px";
    },
    false
  );
})();
