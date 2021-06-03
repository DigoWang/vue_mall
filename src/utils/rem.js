;(function (w, d) {
    function setREM() {
      const clientWidth = d.documentElement.clientWidth;
      d.documentElement.style.fontSize = clientWidth * 100 / 375 + "px";
    }
    setREM();
    w.onresize = setREM;
  })(window, document);