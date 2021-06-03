export const goftino = `
!(function () {
  var a = window,
    d = document;
  function g() {
    var g = d.createElement('script'),
      i = 'BbNXwx',
      s = 'https://www.goftino.com/widget/' + i,
      l = localStorage.getItem('goftino_' + i);
    (g.type = 'text/javascript'),
      (g.async = !0),
      (g.src = l ? s + '?o=' + l : s);
    d.getElementsByTagName('head')[0].appendChild(g);
  }
  'complete' === d.readyState
    ? g()
    : a.attachEvent
    ? a.attachEvent('onload', g)
    : a.addEventListener('load', g, !1);
})();
window.addEventListener('goftino_ready', function () {
  window.ReactNativeWebView.postMessage('goftino_ready');
  //   Goftino.setWidget({
  //     icon: false,
  //     counter: '#unread_counter'
  // });

  // document.getElementById("new_widget_button").addEventListener("click", function () {
  //     Goftino.toggle();
  // });
});

window.addEventListener('goftino_openWidget', function () {
  window.ReactNativeWebView.postMessage('goftino_open');
});
window.addEventListener('goftino_closeWidget', function () {
    window.ReactNativeWebView.postMessage('goftino_close');
});
true; // note: this is required, or you'll sometimes get silent failures
`;
