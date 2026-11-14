/* Optional aggregate Toolkit measurement. Never read or transmit workbook values. */
(function () {
  'use strict';
  if (window.__bbhMeasurementV1) return;
  window.__bbhMeasurementV1 = true;
  var ID = 'G-21LSVC1NKJ', KEY = 'bbh-measurement-choice-v1';
  var lesson = document.body.dataset.lesson;
  if (!/^(BP-0[1-5]|M(0[2-9]|1[0-2])-L0[1-8])$/.test(lesson || '')) return;
  var path = location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') + '/';
  var validPath = /^\/built-by-her-bp01\/(?:bp0[2-5]\/|m(?:0[2-9]|1[0-2])-l0[1-8]\/)?$/.test(path);
  // Local QA has no network transport. The public host is the only live destination source.
  var liveHost = location.hostname === 'woot-bbh.github.io' && validPath;
  var url = 'https://woot-bbh.github.io' + path;
  var choice = '', loaded = false, sent = Object.create(null), outcomeGiven = false;
  try { var saved = JSON.parse(localStorage.getItem(KEY)); if (saved && saved.until > Date.now()) choice = saved.value; } catch (_) {}
  var layer = window.bbhMeasurementLayer = window.bbhMeasurementLayer || [];
  function tag() { layer.push(arguments); }
  window['ga-disable-' + ID] = true;
  function emit(name, action) {
    if (choice !== 'accepted' || sent[name + ':' + (action || '')]) return false;
    sent[name + ':' + (action || '')] = true;
    var data = {send_to: ID, lesson_id: lesson, toolkit_surface: 'external_toolkit', measurement_version: '1', page_location: url, page_title: 'Built By Her ' + lesson, page_referrer: ''};
    if (action) data.workbook_action = action;
    tag('event', name, data);
    return true;
  }
  function start() {
    if (choice !== 'accepted') return;
    window['ga-disable-' + ID] = !liveHost;
    if (!loaded) {
      loaded = true;
      tag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
      tag('js', new Date());
      tag('config', ID, {send_page_view:false, page_location:url, page_title:'Built By Her ' + lesson, page_referrer:'', allow_google_signals:false, allow_ad_personalization_signals:false, cookie_domain:'woot-bbh.github.io'});
      if (liveHost) { var script=document.createElement('script'); script.async=true; script.src='https://www.googletagmanager.com/gtag/js?id='+ID+'&l=bbhMeasurementLayer'; document.head.appendChild(script); }
    } else tag('consent', 'update', {analytics_storage:'granted'});
    emit('bbh_lesson_open');
  }
  function choose(value, persist) {
    choice = value;
    if (persist !== false) { try { localStorage.setItem(KEY,JSON.stringify({value:value,until:Date.now()+180*86400000})); } catch (_) {} }
    if (value === 'accepted') start();
    else {
      window['ga-disable-' + ID] = true;
      if (loaded) tag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      document.cookie.split(';').forEach(function(c){var name=c.trim().split('=')[0];if(/^_ga(?:_|$)/.test(name))['','woot-bbh.github.io','.woot-bbh.github.io'].forEach(function(d){document.cookie=name+'=; Max-Age=0; path=/'+(d?'; domain='+d:'');});});
    }
    details.open=false;
    status.textContent=value==='accepted'?'Optional usage measurement is on. Your answers stay private.':'Optional usage measurement is off. All lesson and workbook tools still work.';
  }
  var style=document.createElement('style');
  style.textContent='.bbh-measurement{font:14px/1.5 system-ui,sans-serif;background:#f0f7f6;color:#173f59;border:1px solid #b6d4d1;border-radius:12px;margin:18px auto;padding:16px;max-width:1040px;box-sizing:border-box}.bbh-measurement p{margin:8px 0}.bbh-measurement summary{cursor:pointer;font-weight:650}.bbh-measurement button{font:inherit;padding:9px 12px;margin:6px 8px 0 0;border:1px solid #238e8c;border-radius:7px;background:#fff;color:#173f59;cursor:pointer}.bbh-measurement button:focus-visible{outline:3px solid #c64413;outline-offset:3px}.bbh-measurement button:disabled{opacity:.65;cursor:default}@media print{.bbh-measurement{display:none!important}}@media(max-width:600px){.bbh-measurement{margin:12px}}';
  document.head.appendChild(style);
  var consent=document.createElement('aside');consent.className='bbh-measurement';consent.setAttribute('aria-label','Optional Toolkit usage measurement');
  var details=document.createElement('details');details.open=!choice;
  details.innerHTML='<summary>Optional Toolkit usage measurement</summary><p>May we use Google Analytics cookies to count lesson opens, workbook interactions, export requests and optional usefulness responses? We send a lesson code and action type, never your answers, names, email addresses or business details. Choosing no does not affect your workbook. You can change your choice here at any time.</p>';
  [['No thanks','rejected'],['Allow usage measurement','accepted']].forEach(function(item){var button=document.createElement('button');button.type='button';button.textContent=item[0];button.addEventListener('click',function(){choose(item[1]);});details.appendChild(button);});
  var status=document.createElement('p');status.setAttribute('role','status');status.textContent=choice==='accepted'?'Optional usage measurement is on. Your answers stay private.':'Optional usage measurement is off. Your workbook works either way.';
  consent.appendChild(details);consent.appendChild(status);
  var main=document.querySelector('main');main.parentNode.insertBefore(consent,main);
  var outcome=document.createElement('aside');outcome.className='bbh-measurement';outcome.setAttribute('aria-label','Optional lesson usefulness feedback');
  outcome.innerHTML='<strong>Did this help you move forward?</strong><p>You can use any lesson when you need it. There is no need to finish a module or work through lessons in order.</p>';
  var useful=document.createElement('button');useful.type='button';useful.textContent='I found a relevant lesson and took a useful next step';
  var feedback=document.createElement('p');feedback.setAttribute('role','status');
  useful.addEventListener('click',function(){if(outcomeGiven)return;outcomeGiven=true;var shared=emit('bbh_useful_next_step');useful.disabled=true;feedback.textContent=shared?'Thank you. Your response will be counted if usage measurement is available.':'Thank you. Usage measurement is off, so this response has not been sent.';});
  outcome.appendChild(useful);outcome.appendChild(feedback);main.parentNode.insertBefore(outcome,main.nextSibling);
  document.addEventListener('input',function(event){if(event.isTrusted && event.target.matches('[data-save]'))emit('bbh_workbook_use');},true);
  document.addEventListener('click',function(event){if(!event.isTrusted)return;var button=event.target.closest('#export-pdf,#export-statement');if(button)emit('bbh_export_requested',button.id==='export-pdf'?'full_workbook':'notes');},true);
  window.addEventListener('storage',function(event){if(event.key!==KEY)return;try{var next=JSON.parse(event.newValue);choose(next&&next.until>Date.now()?next.value:'rejected',false);}catch(_){choose('rejected',false);}});
  start();
})();
