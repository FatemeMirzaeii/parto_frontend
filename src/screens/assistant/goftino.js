export const goftino = `!(function () {
  var a = window,
    d = document;
  function g() {
    var g = d.createElement('script'),
      i = 'BdaydR',
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
  // document.addEventListener('message', function (data) {
  //     alert(data.data);
  // });
  window.ReactNativeWebView.postMessage('goftino_ready');
  Goftino.setWidget({
    icon: false,
    counter: '#unread_counter',
  });
  var userId = Goftino.getUserId();
  window.ReactNativeWebView.postMessage(JSON.stringify({type: 'userId', data: userId }));
  Goftino.getUser(function (userData) {
    if (userData.status === 'success') {
      // window.ReactNativeWebView.postMessage(JSON.stringify({type: 'userData', data: userData }));
      window.ReactNativeWebView.postMessage(
        userData.tags ? userData.tags : 'noTag',
      ); // will return 'open' or 'closed' or 'noTag'
    }
  });
});
window.addEventListener('goftino_openWidget', function () {
  window.ReactNativeWebView.postMessage('goftino_open');
});
window.addEventListener('goftino_closeWidget', function () {
  window.ReactNativeWebView.postMessage('goftino_close');
});
window.addEventListener('goftino_sendMessage', function (d) {
  window.ReactNativeWebView.postMessage('send_message');

  var message_type = d.detail.type;
  // "text" , "file" , "voice" , "startForm" , "delayForm" , "offlineForm"

  var message_content = d.detail.content;
  // If message_type is text,file,voice :
  // "hi, I have question..."

  // If message_type is form :
  // [
  //    { label : "label1", value : "value1" },
  //    ...
  // ]
});
window.addEventListener('goftino_getMessage', function (d) {
  Goftino.getUser(function (userData) {
    if (userData.status === 'success') {
      // window.ReactNativeWebView.postMessage(JSON.stringify({id: userId, detail: userData }));
      window.ReactNativeWebView.postMessage(userData.tags);
    }
  });
  var message_type = d.detail.type;
  // "text" , "file" , "voice"

  var message_content = d.detail.content;
  // "hi, thanks for joining chat..."
});
true; // note: this is required, or you'll sometimes get silent failures
`;
