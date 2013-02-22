###
  jquery.turbolinks.js ~ v1.0.0-rc2 ~ https://github.com/kossnocorp/jquery.turbolinks

  jQuery plugin for drop-in fix binded events problem caused by Turbolinks

  The MIT License

  Copyright (c) 2012 Sasha Koss
###

$ = window.jQuery or require?('jquery')

# List for store callbacks passed to `$` or `$.ready`
named_callbacks = {}
callbacks = []

# Call each callback in list
ready = ->
  callback($) for callback in callbacks
  named_callbacks[key]($) for key in Object.keys(named_callbacks)

# Turbolinks ready event
turbolinksReady = ->
  $.isReady = true
  ready()

# Fetch event handler
fetch = ->
  $.isReady = false

# Bind `ready` to DOM ready event
$(ready)

# Store callbacks in list on `$` and `$.ready`
$.fn.ready = (callback) ->
  if name? and name != ""
    named_callbacks[callback.name] = callback
  else
    callbacks.push(callback)
  callback($) if $.isReady

# Bind ready to passed event
$.setReadyEvent = (event) ->
  $(document)
    .off('.turbolinks-ready')
    .on(event + '.turbolinks-ready', turbolinksReady)

# Bind fetch event
$.setFetchEvent = (event) ->
  $(document)
    .off('.turbolinks-fetch')
    .on(event + '.turbolinks-fetch', fetch)

# Bind `ready` to Tubolinks page:load
$.setReadyEvent('page:load')

# Bind fetch to Turbolinks page:fetch
$.setFetchEvent('page:fetch')
