(function(){
  Array.prototype.forEach.call(document.querySelectorAll('[data-scroll]'), function(el){
    el.addEventListener('click', function(){
      var to = el.getAttribute('data-scroll');
      if (to && document.querySelector(to)) {
        document.querySelector(to).scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
  var overlay = document.createElement('div');
  overlay.className = 'debug-overlay';
  document.body.appendChild(overlay);
  window.addEventListener('keydown', function(e){
    if (e.key.toLowerCase() === 'd') {
      overlay.classList.toggle('on');
    }
  });
})();