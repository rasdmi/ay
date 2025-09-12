// script.js — наполнение и интерактив
(function () {
  // Навигация
  var nav = document.getElementById('nav');
  window.CONTENT.nav.forEach(function(item){
    var link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.title;
    nav.appendChild(link);
  });

  // Навигация 1–2–3
  var blocksNav = document.getElementById('blocksNav');
  window.CONTENT.blocks.forEach(function(b){
    var card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-scroll', '#block-' + b.id);
    card.addEventListener('click', function(){
      document.querySelector('#block-' + b.id).scrollIntoView({ behavior: 'smooth', block: 'start'});
    });

    var title = document.createElement('div');
    title.className = 'title';
    title.textContent = b.title;
    var muted = document.createElement('div');
    muted.className = 'muted';
    muted.textContent = b.summary;

    card.appendChild(title);
    card.appendChild(muted);
    blocksNav.appendChild(card);
  });

  // Контентные блоки
  window.CONTENT.blocks.forEach(function(b){
    var mount = document.querySelector('.block[data-block="' + b.id + '"]');
    if (!mount) return;

    var cover = document.createElement('div');
    cover.className = 'cover';
    var ph = document.createElement('div');
    ph.className = 'ph';
    ph.textContent = b.cover || 'Обложка ' + b.title;
    cover.appendChild(ph);

    var copy = document.createElement('div');
    copy.className = 'copy';
    var t = document.createElement('div');
    t.className = 'title';
    t.textContent = b.title;
    var d = document.createElement('div');
    d.className = 'desc';
    d.textContent = b.desc;
    var tags = document.createElement('div');
    tags.className = 'tags';
    (b.tags || []).forEach(function(tag){
      var tg = document.createElement('div');
      tg.className = 'tag';
      tg.textContent = tag;
      tags.appendChild(tg);
    });

    copy.appendChild(t);
    copy.appendChild(d);
    copy.appendChild(tags);

    mount.appendChild(copy);
    mount.appendChild(cover);
  });

  // Футер
  var footerLinks = document.getElementById('footerLinks');
  window.CONTENT.footer.links.forEach(function(l){
    var a = document.createElement('a');
    a.href = l.href;
    a.textContent = l.title;
    a.setAttribute('target', l.external ? '_blank' : '_self');
    var wrap = document.createElement('div');
    wrap.appendChild(a);
    footerLinks.appendChild(wrap);
  });

  var footerContacts = document.getElementById('footerContacts');
  window.CONTENT.footer.contacts.forEach(function(c){
    var row = document.createElement('div');
    row.className = 'muted';
    if (c.href) {
      var a = document.createElement('a');
      a.href = c.href;
      a.textContent = c.text;
      row.appendChild(a);
    } else {
      row.textContent = c.text;
    }
    footerContacts.appendChild(row);
  });

  // Привязка нажатия на кнопки с data-scroll
  Array.prototype.forEach.call(document.querySelectorAll('[data-scroll]'), function(el){
    el.addEventListener('click', function(){
      var sel = el.getAttribute('data-scroll');
      if (sel && document.querySelector(sel)) {
        document.querySelector(sel).scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
  });

  // Имитация отправки формы
  var submit = document.getElementById('submitLead');
  var form = document.getElementById('leadForm');
  if (submit && form) {
    submit.addEventListener('click', function(){
      var data = {};
      Array.prototype.forEach.call(form.querySelectorAll('input, textarea, select'), function(i){
        data[i.name] = i.value;
      });
      // простая валидация
      if (!data.name || !data.email) {
        alert('Заполните имя и email, пожалуйста.');
        return;
      }
      console.log('Lead form data:', data);
      alert('Спасибо! Мы свяжемся с вами по email.');
      form.reset();
    });
  }
})();
