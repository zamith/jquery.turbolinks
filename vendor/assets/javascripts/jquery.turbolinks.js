// Generated by CoffeeScript 1.4.0

/*
  jquery.turbolinks.js ~ v1.0.0-rc2 ~ https://github.com/kossnocorp/jquery.turbolinks

  jQuery plugin for drop-in fix binded events problem caused by Turbolinks

  The MIT License

  Copyright (c) 2012 Sasha Koss
*/


(function() {
  var $, callbacks, fetch, non_idempotent_callback, ready, turbolinksReady;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  non_idempotent_callback = null;

  callbacks = [];

  ready = function() {
    var callback, _i, _len;
    for (_i = 0, _len = callbacks.length; _i < _len; _i++) {
      callback = callbacks[_i];
      callback($);
    }
    if (non_idempotent_callback != null) {
      non_idempotent_callback($);
      return non_idempotent_callback = null;
    }
  };

  turbolinksReady = function() {
    $.isReady = true;
    return ready();
  };

  fetch = function() {
    return $.isReady = false;
  };

  $(ready);

  $.fn.ready = function(callback) {
    if ((callback.name != null) && callback.name === "run_once") {
      non_idempotent_callback = callback;
    } else {
      callbacks.push(callback);
    }
    if ($.isReady) {
      return callback($);
    }
  };

  $.setReadyEvent = function(event) {
    return $(document).off('.turbolinks-ready').on(event + '.turbolinks-ready', turbolinksReady);
  };

  $.setFetchEvent = function(event) {
    return $(document).off('.turbolinks-fetch').on(event + '.turbolinks-fetch', fetch);
  };

  $.setReadyEvent('page:load');

  $.setFetchEvent('page:fetch');

}).call(this);
