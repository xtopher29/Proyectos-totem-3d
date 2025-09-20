(function(){
    var script = {
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.MainViewer",
  "this.Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174",
  "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A",
  "this.Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB"
 ],
 "id": "rootPlayer",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "start": "this.init(); this.playList_72B047DD_63EF_6CF7_41B0_07CB58FB3172.set('selectedIndex', 0); this.playList_72B3D7DD_63EF_6CF7_41CA_AF8017E96EC4.set('selectedIndex', 0); this.playList_72B387DD_63EF_6CF7_41CC_04EB2A82B3DA.set('selectedIndex', 0)",
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scripts": {
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "existsKey": function(key){  return key in window; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "unregisterKey": function(key){  delete window[key]; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "registerKey": function(key, value){  window[key] = value; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getKey": function(key){  return window[key]; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } }
 },
 "minHeight": 20,
 "downloadEnabled": false,
 "layout": "absolute",
 "borderRadius": 0,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": "100%",
 "minWidth": 20,
 "class": "Player",
 "definitions": [{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -174.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70D0F9F2_63EF_64CD_4183_5D8AB486CEC2",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 128.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_72166845_63EF_63D7_41D5_5B4C422B758F",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 29.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_722AC853_63EF_63CC_41D5_40E8D8CFD05D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -90.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_7260280B_63EF_6353_41C7_8FE65E4D1C94",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 126.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71A448E0_63EF_64CD_41C7_625A418FB53F",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 110.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_720C8827_63EF_6354_41C9_E939B0BC01B9",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -4.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_710DA96A_63EF_65DC_41C3_DC0E4DD2D4E5",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "label": "Album de Fotos DPTO-602-PLANTA-1",
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
 "thumbnailUrl": "media/album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_t.png",
 "class": "PhotoAlbum",
 "playList": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 65.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70948A29_63EF_675F_41B3_9391ED646528",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B307DD_63EF_6CF7_41C1_35D092631E52",
 "class": "PlayList"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "id": "map_76ECAA2F_6030_459F_417D_FD8496661E95",
 "thumbnailUrl": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_t.png",
 "width": 920,
 "label": "DPTO-602-PLANTA-1",
 "class": "Map",
 "image": {
  "levels": [
   {
    "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ],
  "class": "ImageResource"
 },
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#0D1E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.32,
 "fieldOfViewOverlayOutsideColor": "#00FF00",
 "maximumZoomFactor": 1.2,
 "height": 603,
 "overlays": [
  "this.overlay_74C3BCA8_6030_DE81_41D7_7F180F033286",
  "this.overlay_74F606B1_6030_4A83_41B9_5A2126A14711",
  "this.overlay_755C1047_603F_C58F_41BC_9383B16E4C98",
  "this.overlay_75E770FA_6030_C681_41C8_054E73DCC210",
  "this.overlay_75B53DE1_6030_BE82_41D3_26A582D5DB4D",
  "this.overlay_74A12838_6033_C581_41D2_A123D31F8DF7",
  "this.overlay_753D6FB9_6030_7A83_41D4_AF3B5D990A6C",
  "this.overlay_75867A09_6030_C583_41D1_A71D731951F0",
  "this.overlay_75FA18C9_6030_4683_41D2_AC8FA216524F",
  "this.overlay_7529694A_6030_4781_41C5_BD50196A38F8",
  "this.overlay_759E055D_6030_CF83_41D2_ABEDF85EE94B",
  "this.overlay_74469230_6030_4581_41B5_76C12D443405"
 ]
},
{
 "items": [
  {
   "begin": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6",
   "player": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B0C7DD_63EF_6CF7_41CF_177BFD008C5B",
 "class": "PlayList"
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 574.25,
   "class": "PanoramaMapLocation",
   "angle": 50.47,
   "y": 410.35
  }
 ],
 "hfov": 360,
 "label": "RI COMEDOR 1-RGB",
 "id": "panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
 "thumbnailUrl": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
   "yaw": -51.73,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 175.04
  },
  {
   "panorama": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "yaw": -129.66,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -87.24
  },
  {
   "panorama": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
   "yaw": -133.85,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -129.16
  },
  {
   "panorama": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
   "yaw": 32.24,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -147.27
  },
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": -140.91,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 89.13
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_42E9B504_6335_C6AB_41C5_60284C1CC377",
  "this.overlay_42E84505_6335_C6B5_41D7_83C6B9811658",
  "this.overlay_42E86505_6335_C6B5_41C5_5EA5560A428D",
  "this.overlay_42E81505_6335_C6B5_41A4_1A591BA75F77",
  "this.overlay_42E82505_6335_C6B5_41CA_C1C5D79F3615",
  "this.overlay_42E8F505_6335_C6B5_41C1_EDB55814C5D3"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -147.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_7279F81A_63EF_637C_41D7_83C722309504",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C2385F2_6335_416F_41C7_AE070B69B443_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "id": "map_77121C23_6030_7D87_41C9_3337E3E82B5C",
 "thumbnailUrl": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_t.png",
 "width": 920,
 "label": "DPTO-602-PLANTA-2",
 "class": "Map",
 "image": {
  "levels": [
   {
    "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ],
  "class": "ImageResource"
 },
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#0D1E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "height": 603,
 "overlays": [
  "this.overlay_7BD8EF8A_6070_7A87_4188_87617F967778",
  "this.overlay_7B570D9F_6070_DEBD_41D6_374843985EA0",
  "this.overlay_7CAAFBE7_6071_DA8D_41D5_A43CD1DF560A"
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "DPTO-602-PLANTA-1",
 "id": "album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
 "width": 1280,
 "class": "Photo",
 "image": {
  "levels": [
   {
    "url": "media/album_431A74C1_6071_CE13_41B6_6A6768C52AEF.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 839
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 296.55,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 424.05
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI COMEDOR 5-RGB",
 "id": "panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
 "thumbnailUrl": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": 1.64,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 171.05
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": 89.13,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -140.91
  },
  {
   "panorama": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
   "yaw": 89.38,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -147.57
  },
  {
   "panorama": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
   "yaw": -53.38,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -114.14
  },
  {
   "panorama": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7C5E92CA_6334_C3BC_41CC_5609AA1B8008",
  "this.overlay_7C5E82CA_6334_C3BC_41B0_59E2D385C4AD",
  "this.overlay_7C5EB2CA_6334_C3BC_41D1_EED577BC746A",
  "this.overlay_7C5EA2CA_6334_C3BC_41BE_3F6E1CDD5105",
  "this.overlay_7C5E42CA_6334_C3BC_41BA_58930740F732",
  "this.overlay_7C5E12CA_6334_C3BC_41C3_E1288C17D23B",
  "this.overlay_7C5E02CA_6334_C3BC_41B4_57D53418D9F4",
  "this.overlay_7C5E32CA_6334_C3BC_41D7_BC81C2A2A205",
  "this.overlay_7C5DD2CA_6334_C3BC_41B8_CF81B8F7C2A2"
 ],
 "partial": false
},
{
 "width": 1280,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6",
 "thumbnailUrl": "media/map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-602-PLANTA-2",
 "class": "Map",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "levels": [
   {
    "url": "media/map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6.jpeg",
    "width": 1280,
    "class": "ImageResourceLevel",
    "height": 839
   },
   {
    "url": "media/map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "scaleMode": "fit_inside",
 "height": 839,
 "initialZoomFactor": 1
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -83.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70C0B9DF_63EF_64F3_41D5_E76E13B7D207",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6",
   "player": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B387DD_63EF_6CF7_41CC_04EB2A82B3DA",
 "class": "PlayList"
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 579.05,
   "class": "PanoramaMapLocation",
   "angle": 36.87,
   "y": 247.05
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI COMEDOR 3-RGB",
 "id": "panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
 "thumbnailUrl": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
   "yaw": 132.95,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -69.49
  },
  {
   "panorama": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
   "yaw": -28.52,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -152.23
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": 175.04,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -51.73
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7C23B5F2_6335_416F_4191_9C3D647E3007",
  "this.overlay_7C23A5F3_6335_416D_41AC_F39F9E6135F6",
  "this.overlay_7C23C5F3_6335_416D_41C5_220BC1786FF5"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 197.7,
   "class": "PanoramaMapLocation",
   "angle": 233.71,
   "y": 235.25
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI PACIFICO DORMITORIO SECUNDARIO 1-RGB",
 "id": "panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
 "thumbnailUrl": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": -118.34,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -40.06
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CB545E4_633C_C177_41BF_EC07C120F040"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 404.65,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 385.7
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI BANO VISITA 1-RGB",
 "id": "panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
 "thumbnailUrl": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": -129.16,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -133.85
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CD0227B_633C_C356_41D7_92FC0DF0A350"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 139.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_719478CD_63EF_64D7_41BA_4E396573CF1A",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -90.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70CEB9C7_63EF_64D4_41D6_6FD06B4ED508",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 50.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_712FA99C_63EF_6574_41B4_7F52BF5EB70E",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "x": 738.03,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 400.19
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI TERRAZA-RGB",
 "id": "panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74",
 "thumbnailUrl": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "yaw": -101.12,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 81.1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_6C91B93A_63D7_65BD_41B6_D7F6A39524BA"
 ],
 "partial": false
},
{
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer",
 "viewerArea": "this.MapViewer",
 "class": "MapPlayer"
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 194.55,
   "class": "PanoramaMapLocation",
   "angle": 225,
   "y": 391.45
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI 601 DORMITORIO SECUNDARIO 2-RGB",
 "id": "panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
 "thumbnailUrl": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": -114.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -53.38
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CE4333B_633C_C2D0_41A6_30E758FD0D0B"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -47.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_726A37FD_63EF_6CB7_41C9_5ABDD07B3373",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 39.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70F28A0E_63EF_6755_41CE_A1A602C5F942",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 151.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_717BF956_63EF_65F5_41D3_59A127A4DF29",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B047DD_63EF_6CF7_41B0_07CB58FB3172",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -8.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70E31A01_63EF_674C_41D1_C1FA61B10AE6",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 32.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_7084BA1B_63EF_6773_41B0_731610E8802D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 691.25,
   "class": "PanoramaMapLocation",
   "angle": 53.15,
   "y": 408.95
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI COMEDOR 2-RGB",
 "id": "panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
 "thumbnailUrl": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
   "yaw": -69.49,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 132.95
  },
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": -147.57,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 89.38
  },
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": -147.27,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 32.24
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7C2AF749_6335_C2BA_4191_5A0E38B48270",
  "this.overlay_7C2AE749_6335_C2BA_41D6_FD4A72D345B9",
  "this.overlay_7C2AC749_6335_C2BA_41D0_1712CA76C1D8",
  "this.overlay_7C2AA74E_6335_C2B6_41D6_3B5D8EF95E4E",
  "this.overlay_7C2A874E_6335_C2B6_41A4_09BF4BF2FC8D"
 ],
 "partial": false
},
{
 "movementMode": "constrained",
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
 "viewerArea": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
 "class": "MapPlayer"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 32.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_713F39AF_63EF_6553_41D8_019996ED721A",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -178.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71F2D8A5_63EF_6357_41D4_A5C005148320",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 50.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71CF486E_63EF_63D5_41BC_940AF9F42034",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "x": 637.08,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 106.24
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI BANO VISITA 2-RGB",
 "id": "panorama_7CA45547_633D_C6BF_41D0_6679E4286F80",
 "thumbnailUrl": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "yaw": -150.52,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 5.73
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CA47548_633D_C6B1_41C2_9F952EA73004"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 129.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_7149B912_63EF_654D_41AD_41E6C50FED89",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "touchControlMode": "drag_rotation",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "class": "PanoramaPlayer"
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 681.25,
   "class": "PanoramaMapLocation",
   "angle": 33.25,
   "y": 113.35
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI COMEDOR 4-RGB",
 "id": "panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
 "thumbnailUrl": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
   "yaw": -152.23,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -28.52
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7C5D35DE_6335_4157_41A2_18B3B46D8089"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B337DD_63EF_6CF7_41C2_8281A95E19D1",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C259F5D_6334_C154_41CF_11C5CB083430_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -98.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71B618F9_63EF_64BF_41C3_626F8C0EA8FF",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 2.66,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -9.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_718218B3_63EF_634C_41CC_0D2C3FEABBD2",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_40AE677B_60D0_4A1F_41AB_DD742737043F",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B017DD_63EF_6CF7_41B8_61FA5507FE85",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 92.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_711DE982_63EF_654D_41C8_F2BC0C41A514",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "x": 598.05,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 410.18
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI ESTAR-RGB",
 "id": "panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
 "thumbnailUrl": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80",
   "yaw": 5.73,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -150.52
  },
  {
   "panorama": "this.panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74",
   "yaw": 81.1,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -101.12
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": -87.24,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -129.66
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": 153.47,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -129.66
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CFC04E2_633D_C771_41C8_64C83FAAEBAD",
  "this.overlay_7CFCF4E2_633D_C771_41D5_91F8E07292EF",
  "this.overlay_7CFCE4E2_633D_C771_41C7_BEA1886BE4E9",
  "this.overlay_7CFCD4E2_633D_C771_41CA_1BD562E79B89"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 46.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_70A4DA36_63EF_67B5_41CD_7486878F3A5C",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 78.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_723FC861_63EF_63CF_41D0_50BE3CD5015D",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "movementMode": "constrained",
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
 "class": "MapPlayer"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B077DD_63EF_6CF7_41BF_5627912A350D",
 "class": "PlayList"
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 294.55,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 290.9
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI COMEDOR 6-RGB",
 "id": "panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
 "thumbnailUrl": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
   "yaw": -40.06,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -118.34
  },
  {
   "panorama": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
   "yaw": 36.6,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 135.2
  },
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": 171.05,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 1.64
  },
  {
   "panorama": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
   "yaw": -19.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 170.11
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7C256F5D_6334_C154_41C7_EDFC34661E9D",
  "this.overlay_7C257F5D_6334_C154_41BA_AFD99E81741D",
  "this.overlay_7C255F5D_6334_C154_41C6_1A129389D08B",
  "this.overlay_7C252F5D_6334_C154_41D3_6328F192DD8A",
  "this.overlay_7C253F5D_6334_C154_41B8_F140D3F27DD7"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 368.3,
   "class": "PanoramaMapLocation",
   "angle": 90,
   "y": 228.25
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI BANO FAMILIAR 1-RGB",
 "id": "panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
 "thumbnailUrl": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": 135.2,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 36.6
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CF20193_633D_41D0_41AF_9CAF84960121"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 237.75,
   "class": "PanoramaMapLocation",
   "angle": -40.1,
   "y": 164
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI DORMITORIO PRINCIPAL-RGB",
 "id": "panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
 "thumbnailUrl": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E",
   "yaw": 96.6,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -50.01
  },
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": 170.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -19.87
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7CF4EE97_6333_43D3_41C9_EBE896912CFC",
  "this.overlay_7CF4FE97_6333_43D3_41B5_575C43D55E54"
 ],
 "partial": false
},
{
 "width": 1280,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_40AE677B_60D0_4A1F_41AB_DD742737043F",
 "thumbnailUrl": "media/map_40AE677B_60D0_4A1F_41AB_DD742737043F_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-602-PLANTA-1",
 "class": "Map",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "levels": [
   {
    "url": "media/map_40AE677B_60D0_4A1F_41AB_DD742737043F.jpeg",
    "width": 1280,
    "class": "ImageResourceLevel",
    "height": 839
   },
   {
    "url": "media/map_40AE677B_60D0_4A1F_41AB_DD742737043F_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "scaleMode": "fit_inside",
 "height": 839,
 "initialZoomFactor": 1
},
{
 "items": [
  "this.PanoramaPlayListItem_72B127DE_63EF_6CF5_41D7_FC3027D01E61",
  "this.PanoramaPlayListItem_724E57DE_63EF_6CF5_41D8_134D2FCCFD29",
  "this.PanoramaPlayListItem_724EE7DE_63EF_6CF5_41C9_E4043B15AAC3",
  "this.PanoramaPlayListItem_724F67DF_63EF_6CF3_41C9_B9E17EBD81CD",
  "this.PanoramaPlayListItem_724F87DF_63EF_6CF3_41B6_60E17F511E8C",
  "this.PanoramaPlayListItem_724C27DF_63EF_6CF3_41CE_2472C95010F9",
  "this.PanoramaPlayListItem_724CB7DF_63EF_6CF3_41CD_EF353F711659",
  "this.PanoramaPlayListItem_724DD7E0_63EF_6CCD_41A6_2FD74B12DC3F",
  "this.PanoramaPlayListItem_724A77E0_63EF_6CCD_41D3_2B237A942764",
  "this.PanoramaPlayListItem_724A87E0_63EF_6CCD_41C3_0EF842DB0959",
  "this.PanoramaPlayListItem_724B27E1_63EF_6CCF_41C1_0769D3A33DD3",
  "this.PanoramaPlayListItem_724BB7E1_63EF_6CCF_41C3_29D909923F20",
  "this.PanoramaPlayListItem_7248C7E1_63EF_6CCF_41CC_FCCE6C0A2151",
  "this.PanoramaPlayListItem_724957E2_63EF_6CCD_41D6_C36BBBEA9FDB",
  "this.PanoramaPlayListItem_724997E2_63EF_6CCD_41D8_E924F24B9968",
  {
   "media": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 0)",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 160.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_7159B926_63EF_6554_4198_4E26DCCC6F93",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "label": "DPTO-602-PLANTA-2",
 "id": "album_444B5D56_6071_FE31_41BF_E608FEDA2243",
 "width": 1280,
 "class": "Photo",
 "image": {
  "levels": [
   {
    "url": "media/album_444B5D56_6071_FE31_41BF_E608FEDA2243.jpg",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 839
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -143.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_7168793F_63EF_65B4_41BC_6C0B9996036A",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 61.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71D1488A_63EF_635C_41D1_34081EDC91F0",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_40AE677B_60D0_4A1F_41AB_DD742737043F",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_72B3D7DD_63EF_6CF7_41CA_AF8017E96EC4",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -44.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71E37898_63EF_637D_41BC_9F6F3C72634C",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 50.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_71C1087D_63EF_63B4_41D4_33316B756368",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 27.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_72027836_63EF_63B5_41D7_29A558806021",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "id": "MainViewerPhotoAlbumPlayer",
 "viewerArea": "this.MainViewer",
 "class": "PhotoAlbumPlayer"
},
{
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 367.65,
   "class": "PanoramaMapLocation",
   "angle": 0,
   "y": 97.8
  }
 ],
 "hfovMin": "135%",
 "hfov": 360,
 "label": "RI BANO PRINCIPAL-RGB",
 "id": "panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E",
 "thumbnailUrl": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_t.jpg",
 "class": "Panorama",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "top": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "front": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
   "yaw": -50.01,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 96.6
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_7DEC2391_6333_C1AE_41B2_E79C43ECAB0C"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_42E9E504_6335_C6AB_41D7_ED794C922301_camera",
 "initialSequence": {
  "movements": [
   {
    "yawSpeed": 5.31,
    "easing": "cubic_in",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "yawSpeed": 5.31,
    "easing": "linear",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "yawSpeed": 5.31,
    "easing": "cubic_out",
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "left": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": true,
 "toolTipFontFamily": "Swis721 LtCn BT",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 100,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#333333",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#FFFFFF",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "class": "ViewerArea",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipBorderColor": "#FFFFFF",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.8,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 }
},
{
 "scrollBarMargin": 2,
 "maxWidth": 5000,
 "children": [
  "this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D",
  "this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36"
 ],
 "id": "Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174",
 "left": "0%",
 "maxHeight": 5000,
 "scrollBarOpacity": 0.5,
 "width": 300,
 "horizontalAlign": "left",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "height": "100%",
 "propagateClick": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingTop": 0,
 "data": {
  "name": "--- LEFT PANEL"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
 "width": 357,
 "toolTipFontWeight": "normal",
 "right": "1.45%",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "height": 230,
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "paddingRight": 0,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": "2.08%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "class": "ViewerArea",
 "toolTipShadowVerticalLength": 0,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "PLANOS"
 }
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "data": {
  "name": "--LOCATION"
 },
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "creationPolicy": "inAdvance",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "data": {
  "name": "--FLOORPLAN"
 },
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "shadow": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_7DABF279_60D0_4587_41BE_BB0754751B70"
 ],
 "id": "Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "top": "0%",
 "borderRadius": 0,
 "creationPolicy": "inAdvance",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "height": "100%",
 "paddingBottom": 0,
 "data": {
  "name": "--FLOORPLAN 2DO"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "maxWidth": 157,
 "id": "Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB",
 "maxHeight": 7630,
 "horizontalAlign": "center",
 "width": "1.33%",
 "right": "0%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB.png",
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": "72.216%",
 "propagateClick": false,
 "bottom": "12.13%",
 "minWidth": 1,
 "class": "Image",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image84735"
 },
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "items": [
  {
   "media": "this.album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.51",
     "class": "PhotoCameraPosition",
     "y": "0.64",
     "zoomFactor": 1.1
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "scaleMode": "fit_outside"
   }
  },
  {
   "media": "this.album_444B5D56_6071_FE31_41BF_E608FEDA2243",
   "class": "PhotoPlayListItem",
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.72",
     "class": "PhotoCameraPosition",
     "y": "0.29",
     "zoomFactor": 1.1
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "scaleMode": "fit_outside"
   }
  }
 ],
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "map": {
  "width": 29,
  "x": 559.75,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 398.35,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_74C3BCA8_6030_DE81_41D7_7F180F033286",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 559.75,
  "y": 398.35,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "COMEDOR 1"
 }
},
{
 "map": {
  "width": 29,
  "x": 676.75,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 396.95,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_74F606B1_6030_4A83_41B9_5A2126A14711",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 676.75,
  "y": 396.95,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "SALA"
 }
},
{
 "map": {
  "width": 29,
  "x": 564.55,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 235.05,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_755C1047_603F_C58F_41BC_9383B16E4C98",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 564.55,
  "y": 235.05,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "COMEDOR 2"
 }
},
{
 "map": {
  "width": 29,
  "x": 666.75,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_3_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 101.35,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_75E770FA_6030_C681_41C8_054E73DCC210",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 666.75,
  "y": 101.35,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_3.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "COCINA"
 }
},
{
 "map": {
  "width": 29,
  "x": 390.15,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_4_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 373.7,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_75B53DE1_6030_BE82_41D3_26A582D5DB4D",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 390.15,
  "y": 373.7,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_4.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "SHV 1"
 }
},
{
 "map": {
  "width": 29,
  "x": 282.05,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_5_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 412.05,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_74A12838_6033_C581_41D2_A123D31F8DF7",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 282.05,
  "y": 412.05,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_5.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "PASILLO 1"
 }
},
{
 "map": {
  "width": 29,
  "x": 280.05,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_6_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 278.9,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_753D6FB9_6030_7A83_41D4_AF3B5D990A6C",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 280.05,
  "y": 278.9,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_6.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "PASILLO 2"
 }
},
{
 "map": {
  "width": 29,
  "x": 353.8,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_7_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 216.25,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_75867A09_6030_C583_41D1_A71D731951F0",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 353.8,
  "y": 216.25,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_7.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "SH"
 }
},
{
 "map": {
  "width": 29,
  "x": 223.25,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_8_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 152,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_75FA18C9_6030_4683_41D2_AC8FA216524F",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 223.25,
  "y": 152,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_8.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "DP"
 }
},
{
 "map": {
  "width": 29,
  "x": 353.15,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_9_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 85.8,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_7529694A_6030_4781_41C5_BD50196A38F8",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 353.15,
  "y": 85.8,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_9.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "SHP"
 }
},
{
 "map": {
  "width": 29,
  "x": 183.2,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_10_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 223.25,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_759E055D_6030_CF83_41D2_ABEDF85EE94B",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 183.2,
  "y": 223.25,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_10.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "DS2"
 }
},
{
 "map": {
  "width": 29,
  "x": 180.05,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_11_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 379.45,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_74469230_6030_4581_41B5_76C12D443405",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 180.05,
  "y": 379.45,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_11.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "DS1"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B, this.camera_713F39AF_63EF_6553_41D8_019996ED721A); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 16.46,
   "yaw": 32.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.16
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.46,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46336F9B_633D_41CA_41D5_A8C292C55E36",
   "pitch": -27.16,
   "yaw": 32.24,
   "distance": 100
  }
 ],
 "id": "overlay_42E9B504_6335_C6AB_41C5_60284C1CC377",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443, this.camera_710DA96A_63EF_65DC_41C3_DC0E4DD2D4E5); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 9.52,
   "yaw": -51.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.76
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.52,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4633CF9B_633D_41CA_41C7_962E7A1F5763",
   "pitch": -16.76,
   "yaw": -51.73,
   "distance": 100
  }
 ],
 "id": "overlay_42E84505_6335_C6B5_41D7_83C6B9811658",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_70CEB9C7_63EF_64D4_41D6_6FD06B4ED508); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 5.57,
   "yaw": -140.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.46
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.57,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46321F9B_633D_41CA_41D2_C6AF2D87DC6F",
   "pitch": -12.46,
   "yaw": -140.91,
   "distance": 100
  }
 ],
 "id": "overlay_42E86505_6335_C6B5_41C5_5EA5560A428D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0, this.camera_711DE982_63EF_654D_41C8_F2BC0C41A514); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 11.38,
   "yaw": -129.66,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -28.94
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.38,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46327F9B_633D_41CA_41C2_1AED1C9D4173",
   "pitch": -28.94,
   "yaw": -129.66,
   "distance": 50
  }
 ],
 "id": "overlay_42E81505_6335_C6B5_41A4_1A591BA75F77",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 4.45,
   "yaw": -40.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -10.02
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4632DF9B_633D_41CA_41D4_A1A332099CE1",
   "pitch": -10.02,
   "yaw": -40.79,
   "distance": 50
  }
 ],
 "id": "overlay_42E82505_6335_C6B5_41CA_C1C5D79F3615",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C, this.camera_712FA99C_63EF_6574_41B4_7F52BF5EB70E); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicio Higienico de Visita"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 6.75,
   "yaw": -133.85,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_5_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.45
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46311F9C_633D_41CE_41AD_BF924DBE2B44",
   "pitch": -20.45,
   "yaw": -133.85,
   "distance": 50
  }
 ],
 "id": "overlay_42E8F505_6335_C6B5_41C1_EDB55814C5D3",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "map": {
  "width": 29,
  "x": 583.55,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 398.18,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_7BD8EF8A_6070_7A87_4188_87617F967778",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 583.55,
  "y": 398.18,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "ESTAR"
 }
},
{
 "map": {
  "width": 29,
  "x": 723.53,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 388.19,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_7B570D9F_6070_DEBD_41D6_374843985EA0",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 723.53,
  "y": 388.19,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "TERRAZA"
 }
},
{
 "map": {
  "width": 29,
  "x": 622.58,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 94.24,
  "offsetY": 0,
  "height": 24,
  "offsetX": 0
 },
 "id": "overlay_7CAAFBE7_6071_DA8D_41D5_A43CD1DF560A",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 622.58,
  "y": 94.24,
  "width": 29,
  "class": "HotspotMapOverlayImage",
  "image": {
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ],
   "class": "ImageResource"
  },
  "height": 24
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "SHV2"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_70F28A0E_63EF_6755_41CE_A1A602C5F942); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 8.81,
   "yaw": 89.13,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.8
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.81,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463E5F9E_633D_41CA_41D5_21913E6DCAC4",
   "pitch": -13.8,
   "yaw": 89.13,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E92CA_6334_C3BC_41CC_5609AA1B8008",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B, this.camera_7084BA1B_63EF_6773_41B0_731610E8802D); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 3.03,
   "yaw": 89.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.98
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.03,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463E9F9E_633D_41CA_41AC_C2B7263407E1",
   "pitch": -9.98,
   "yaw": 89.38,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E82CA_6334_C3BC_41B0_59E2D385C4AD",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Left"
 },
 "maps": [
  {
   "hfov": 4.45,
   "yaw": 82.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.72
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463EFF9E_633D_41CA_41D1_4E86DAB90D25",
   "pitch": -17.72,
   "yaw": 82.12,
   "distance": 50
  }
 ],
 "id": "overlay_7C5EB2CA_6334_C3BC_41D1_EED577BC746A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_70E31A01_63EF_674C_41D1_C1FA61B10AE6); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 13.09,
   "yaw": 1.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -20.66
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463D3F9E_633D_41CA_41C6_BE15152F0A12",
   "pitch": -20.66,
   "yaw": 1.64,
   "distance": 100
  }
 ],
 "id": "overlay_7C5EA2CA_6334_C3BC_41BE_3F6E1CDD5105",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3, this.camera_70948A29_63EF_675F_41B3_9391ED646528); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Secundario 1"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 17.67,
   "yaw": -53.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.54
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.67,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463D9F9E_633D_41CA_41A4_A0C4BC5BB527",
   "pitch": -9.54,
   "yaw": -53.38,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E42CA_6334_C3BC_41BA_58930740F732",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Principal"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b"
 },
 "maps": [
  {
   "hfov": 3.69,
   "yaw": -3.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_5_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.25
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463DEF9F_633D_41CA_41C2_970C519D7AB7",
   "pitch": -15.25,
   "yaw": -3.25,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E12CA_6334_C3BC_41C3_E1288C17D23B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Secundario 2"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Left"
 },
 "maps": [
  {
   "hfov": 4.69,
   "yaw": -10.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_6_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.37
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.69,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463C4F9F_633D_41CA_41D0_B03387F50E62",
   "pitch": -16.37,
   "yaw": -10.22,
   "distance": 50
  }
 ],
 "id": "overlay_7C5E02CA_6334_C3BC_41B4_57D53418D9F4",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicios Higienicos"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Right"
 },
 "maps": [
  {
   "hfov": 4.05,
   "yaw": 11.23,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_7_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.81
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 4.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463C9F9F_633D_41CA_41D7_6C0AF8BAC448",
   "pitch": -15.81,
   "yaw": 11.23,
   "distance": 50
  }
 ],
 "id": "overlay_7C5E32CA_6334_C3BC_41D7_BC81C2A2A205",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicio Higienico Visita"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left"
 },
 "maps": [
  {
   "hfov": 7.75,
   "yaw": 79.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_8_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.19
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.75,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463CFF9F_633D_41CA_41D6_22ABC50AEFD8",
   "pitch": -27.19,
   "yaw": 79.47,
   "distance": 50
  }
 ],
 "id": "overlay_7C5DD2CA_6334_C3BC_41B8_CF81B8F7C2A2",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74, this.camera_72027836_63EF_63B5_41D7_29A558806021); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "maps": [
  {
   "hfov": 9.19,
   "yaw": -28.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.96
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.19,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463F2F9D_633D_41CE_41D0_B1C09A6909A9",
   "pitch": -26.96,
   "yaw": -28.52,
   "distance": 50
  }
 ],
 "id": "overlay_7C23B5F2_6335_416F_4191_9C3D647E3007",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_72166845_63EF_63D7_41D5_5B4C422B758F); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.41,
   "yaw": 175.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15.99
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463F6F9D_633D_41CE_41CC_449FC2E4ACB3",
   "pitch": -15.99,
   "yaw": 175.04,
   "distance": 100
  }
 ],
 "id": "overlay_7C23A5F3_6335_416D_41AC_F39F9E6135F6",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B, this.camera_720C8827_63EF_6354_41C9_E939B0BC01B9); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02b Left"
 },
 "maps": [
  {
   "hfov": 5.93,
   "yaw": 132.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -8.58
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463FBF9D_633D_41CE_41D8_073431C0F8D6",
   "pitch": -8.58,
   "yaw": 132.95,
   "distance": 50
  }
 ],
 "id": "overlay_7C23C5F3_6335_416D_41C5_220BC1786FF5",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_719478CD_63EF_64D7_41BA_4E396573CF1A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 14.88,
   "yaw": -118.34,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.29
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.88,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463A8FA1_633D_41F6_41B3_DEFAA0337530",
   "pitch": 7.29,
   "yaw": -118.34,
   "distance": 100
  }
 ],
 "id": "overlay_7CB545E4_633C_C177_41BF_EC07C120F040",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_70A4DA36_63EF_67B5_41CD_7486878F3A5C); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 37.11,
   "yaw": -129.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 11.4
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 37.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46077FA3_633D_41FA_41D1_A461F0538A24",
   "pitch": 11.4,
   "yaw": -129.16,
   "distance": 100
  }
 ],
 "id": "overlay_7CD0227B_633C_C356_41D7_92FC0DF0A350",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0, this.camera_71B618F9_63EF_64BF_41C3_626F8C0EA8FF); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 11.62,
   "yaw": -101.12,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.62,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_6C300EBD_63D5_1CB4_41BB_3E6C2A265243",
   "pitch": -19.68,
   "yaw": -101.12,
   "distance": 100
  }
 ],
 "id": "overlay_6C91B93A_63D7_65BD_41B6_D7F6A39524BA",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MapViewer",
 "left": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Swis721 LtCn BT",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#333333",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#FFFFFF",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "show": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "class": "ViewerArea",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.8,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Floor Plan"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_71A448E0_63EF_64CD_41C7_625A418FB53F); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 14.89,
   "yaw": -114.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.03
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.89,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463ACFA1_633D_41F6_41B7_9526E4B975AF",
   "pitch": 7.03,
   "yaw": -114.14,
   "distance": 100
  }
 ],
 "id": "overlay_7CE4333B_633C_C2D0_41A6_30E758FD0D0B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_7279F81A_63EF_637C_41D7_83C722309504); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 18.42,
   "yaw": -147.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -29.1
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.42,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46317F9C_633D_41CE_41D5_B7CD46DBF57B",
   "pitch": -29.1,
   "yaw": -147.27,
   "distance": 100
  }
 ],
 "id": "overlay_7C2AF749_6335_C2BA_4191_5A0E38B48270",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_7260280B_63EF_6353_41C7_8FE65E4D1C94); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 7.14,
   "yaw": -147.57,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.23
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.14,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4631DF9C_633D_41CE_41CE_BAFA3F708B83",
   "pitch": -9.23,
   "yaw": -147.57,
   "distance": 100
  }
 ],
 "id": "overlay_7C2AE749_6335_C2BA_41D6_FD4A72D345B9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 6.11,
   "yaw": -141.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -14.93
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.11,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46302F9C_633D_41CE_41AB_2AF5CC5BBC2D",
   "pitch": -14.93,
   "yaw": -141.74,
   "distance": 50
  }
 ],
 "id": "overlay_7C2AC749_6335_C2BA_41D0_1712CA76C1D8",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443, this.camera_726A37FD_63EF_6CB7_41C9_5ABDD07B3373); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 6.49,
   "yaw": -69.49,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.44
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.49,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46307F9C_633D_41CE_41D1_B5B7EAD5E8CE",
   "pitch": -5.44,
   "yaw": -69.49,
   "distance": 100
  }
 ],
 "id": "overlay_7C2AA74E_6335_C2B6_41D6_3B5D8EF95E4E",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicio Higienico de Visita"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 3.41,
   "yaw": -143.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -12.31
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.41,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4630BF9D_633D_41CE_418D_BEA4C610D51E",
   "pitch": -12.31,
   "yaw": -143.29,
   "distance": 50
  }
 ],
 "id": "overlay_7C2A874E_6335_C2B6_41A4_09BF4BF2FC8D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
 "left": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Swis721 LtCn BT",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#333333",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#FFFFFF",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "show": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "progressBorderSize": 0,
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "class": "ViewerArea",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 0.8,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Floor Plan 2"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0, this.camera_70D0F9F2_63EF_64CD_4183_5D8AB486CEC2); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 42.96,
   "yaw": -150.52,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 12.23
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 42.96,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46398FA1_633D_41F6_419C_E58C9422FFE8",
   "pitch": 12.23,
   "yaw": -150.52,
   "distance": 100
  }
 ],
 "id": "overlay_7CA47548_633D_C6B1_41C2_9F952EA73004",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443, this.camera_717BF956_63EF_65F5_41D3_59A127A4DF29); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "maps": [
  {
   "hfov": 14.85,
   "yaw": -152.23,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.82
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463E0F9D_633D_41CE_41D0_99C5EE8842D0",
   "pitch": -34.82,
   "yaw": -152.23,
   "distance": 50
  }
 ],
 "id": "overlay_7C5D35DE_6335_4157_41A2_18B3B46D8089",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_71CF486E_63EF_63D5_41BC_940AF9F42034); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 02c Right"
 },
 "maps": [
  {
   "hfov": 10.7,
   "yaw": -87.24,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.58
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.7,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4639DFA2_633D_41FA_41B9_676C65550F42",
   "pitch": -31.58,
   "yaw": -87.24,
   "distance": 50
  }
 ],
 "id": "overlay_7CFC04E2_633D_C771_41C8_64C83FAAEBAD",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80, this.camera_722AC853_63EF_63CC_41D5_40E8D8CFD05D); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicio Higienico de Visita"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 6.99,
   "yaw": 5.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -0.99
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.99,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46381FA2_633D_41FA_41B7_F5B61FE3DCD4",
   "pitch": -0.99,
   "yaw": 5.73,
   "distance": 100
  }
 ],
 "id": "overlay_7CFCF4E2_633D_C771_41D5_91F8E07292EF",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_71C1087D_63EF_63B4_41D4_33316B756368); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 19.45,
   "yaw": 153.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.17
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 19.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46388FA2_633D_41FA_4196_9B7807E12EC5",
   "pitch": -6.17,
   "yaw": 153.47,
   "distance": 100
  }
 ],
 "id": "overlay_7CFCE4E2_633D_C771_41C7_BEA1886BE4E9",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74, this.camera_723FC861_63EF_63CF_41D0_50BE3CD5015D); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 17.07,
   "yaw": 81.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -22.7
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.07,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4638CFA2_633D_41FA_41C5_28919171E670",
   "pitch": -22.7,
   "yaw": 81.1,
   "distance": 100
  }
 ],
 "id": "overlay_7CFCD4E2_633D_C771_41CA_1BD562E79B89",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_71F2D8A5_63EF_6357_41D4_A5C005148320); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle 03b"
 },
 "maps": [
  {
   "hfov": 12.34,
   "yaw": 171.05,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.53
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.34,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B6F9F_633D_41CA_41D0_03783EDD45D9",
   "pitch": -24.53,
   "yaw": 171.05,
   "distance": 100
  }
 ],
 "id": "overlay_7C256F5D_6334_C154_41C7_EDFC34661E9D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3, this.camera_718218B3_63EF_634C_41CC_0D2C3FEABBD2); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Principal"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 11.45,
   "yaw": -19.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.73
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B9F9F_633D_41CA_4127_6133977EB64C",
   "pitch": -4.73,
   "yaw": -19.87,
   "distance": 100
  }
 ],
 "id": "overlay_7C257F5D_6334_C154_41BA_AFD99E81741D",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD, this.camera_71D1488A_63EF_635C_41D1_34081EDC91F0); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Secndario 2"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 14.87,
   "yaw": -40.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.68
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.87,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463C6FA0_633D_41F6_41D1_F4615302C3AC",
   "pitch": -7.68,
   "yaw": -40.06,
   "distance": 100
  }
 ],
 "id": "overlay_7C255F5D_6334_C154_41C6_1A129389D08B",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2, this.camera_71E37898_63EF_637D_41BC_9F6F3C72634C); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicios Higienicos"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 13.47,
   "yaw": 36.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -5.48
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.47,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463CBFA0_633D_41F6_41CE_B9C3F7877A80",
   "pitch": -5.48,
   "yaw": 36.6,
   "distance": 100
  }
 ],
 "id": "overlay_7C252F5D_6334_C154_41D3_6328F192DD8A",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Secundario 1"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 7.44,
   "yaw": -158.58,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.26
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B1FA0_633D_41F6_41B2_B06158FB003E",
   "pitch": -4.26,
   "yaw": -158.58,
   "distance": 100
  }
 ],
 "id": "overlay_7C253F5D_6334_C154_41B8_F140D3F27DD7",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_7168793F_63EF_65B4_41BC_6C0B9996036A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 32.99,
   "yaw": 135.2,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 8.42
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 32.99,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46392FA1_633D_41F6_41AF_BB4612DE8C2E",
   "pitch": 8.42,
   "yaw": 135.2,
   "distance": 100
  }
 ],
 "id": "overlay_7CF20193_633D_41D0_41AF_9CAF84960121",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E, this.camera_7149B912_63EF_654D_41AD_41E6C50FED89); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Servicio Higienico Principal"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 6.82,
   "yaw": 96.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 1.04
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.82,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B7FA0_633D_41F6_41A3_E8064B5FB9BA",
   "pitch": 1.04,
   "yaw": 96.6,
   "distance": 100
  }
 ],
 "id": "overlay_7CF4EE97_6333_43D3_41C9_EBE896912CFC",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_7159B926_63EF_6554_4198_4E26DCCC6F93); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 22.59,
   "yaw": 170.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.59,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463BDFA1_633D_41F6_41BD_F6C7C4B3AEB5",
   "pitch": 2.79,
   "yaw": 170.11,
   "distance": 100
  }
 ],
 "id": "overlay_7CF4FE97_6333_43D3_41B5_575C43D55E54",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "media": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_72B127DE_63EF_6CF5_41D7_FC3027D01E61, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_72B127DE_63EF_6CF5_41D7_FC3027D01E61"
},
{
 "media": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724E57DE_63EF_6CF5_41D8_134D2FCCFD29, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724E57DE_63EF_6CF5_41D8_134D2FCCFD29"
},
{
 "media": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724EE7DE_63EF_6CF5_41C9_E4043B15AAC3, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724EE7DE_63EF_6CF5_41C9_E4043B15AAC3"
},
{
 "media": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724F67DF_63EF_6CF3_41C9_B9E17EBD81CD, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724F67DF_63EF_6CF3_41C9_B9E17EBD81CD"
},
{
 "media": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724F87DF_63EF_6CF3_41B6_60E17F511E8C, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724F87DF_63EF_6CF3_41B6_60E17F511E8C"
},
{
 "media": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724C27DF_63EF_6CF3_41CE_2472C95010F9, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724C27DF_63EF_6CF3_41CE_2472C95010F9"
},
{
 "media": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724CB7DF_63EF_6CF3_41CD_EF353F711659, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724CB7DF_63EF_6CF3_41CD_EF353F711659"
},
{
 "media": "this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724DD7E0_63EF_6CCD_41A6_2FD74B12DC3F, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724DD7E0_63EF_6CCD_41A6_2FD74B12DC3F"
},
{
 "media": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724A77E0_63EF_6CCD_41D3_2B237A942764, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724A77E0_63EF_6CCD_41D3_2B237A942764"
},
{
 "media": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724A87E0_63EF_6CCD_41C3_0EF842DB0959, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724A87E0_63EF_6CCD_41C3_0EF842DB0959"
},
{
 "media": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724B27E1_63EF_6CCF_41C1_0769D3A33DD3, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724B27E1_63EF_6CCF_41C1_0769D3A33DD3"
},
{
 "media": "this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724BB7E1_63EF_6CCF_41C3_29D909923F20, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724BB7E1_63EF_6CCF_41C3_29D909923F20"
},
{
 "media": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_7248C7E1_63EF_6CCF_41CC_FCCE6C0A2151, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_7248C7E1_63EF_6CCF_41CC_FCCE6C0A2151"
},
{
 "media": "this.panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724957E2_63EF_6CCD_41D6_C36BBBEA9FDB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724957E2_63EF_6CCD_41D6_C36BBBEA9FDB"
},
{
 "media": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_724997E2_63EF_6CCD_41D8_E924F24B9968, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_724997E2_63EF_6CCD_41D8_E924F24B9968"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3, this.camera_70C0B9DF_63EF_64F3_41D5_E76E13B7D207); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Principal"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Circle Generic 03"
 },
 "maps": [
  {
   "hfov": 30.93,
   "yaw": -50.01,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 6.03
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 30.93,
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463A2FA1_633D_41F6_41D5_054D6BACF398",
   "pitch": 6.03,
   "yaw": -50.01,
   "distance": 100
  }
 ],
 "id": "overlay_7DEC2391_6333_C1AE_41B2_E79C43ECAB0C",
 "rollOverDisplay": false,
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_7FF195EF_706F_7FC6_41D7_A104CA87824D",
  "this.IconButton_7FF185EF_706F_7FC6_41A5_21B418265412"
 ],
 "id": "Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": 66,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "height": "100%",
 "propagateClick": true,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingTop": 0,
 "data": {
  "name": "- COLLAPSE"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Image_7DB3C373_7065_34DE_41BA_CF5206137DED",
  "this.Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3",
  "this.Container_4607A75D_5FCF_F8B5_41C4_3168A3CCF3F3",
  "this.Container_7DBCC382_7065_343F_41D5_9D3C36B5F479"
 ],
 "id": "Container_7DB20382_7065_343F_4186_6E0B0B3AFF36",
 "left": "0%",
 "scrollBarOpacity": 1,
 "width": 300,
 "backgroundImageUrl": "skin/Container_7DB20382_7065_343F_4186_6E0B0B3AFF36.jpg",
 "paddingRight": 40,
 "borderSize": 0,
 "paddingLeft": 40,
 "backgroundOpacity": 0.9,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 1,
 "height": "100%",
 "propagateClick": true,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingTop": 40,
 "data": {
  "name": "- EXPANDED"
 },
 "paddingBottom": 40,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "right": "15%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "top": "10%",
 "borderRadius": 0,
 "bottom": "10%",
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "right",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "scrollBarOpacity": 0.5,
 "right": "15%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "top": "10%",
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "visible",
 "paddingBottom": 0,
 "paddingTop": 20,
 "data": {
  "name": "Container X global"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "center",
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "right": "15%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "top": "10%",
 "borderRadius": 0,
 "bottom": "10%",
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "center",
 "children": [
  "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
  "this.Container_7F1D51CE_60D0_469D_41CA_F511DBBE9B65"
 ],
 "id": "Container_7DABF279_60D0_4587_41BE_BB0754751B70",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "shadowHorizontalLength": 0,
 "right": "15%",
 "paddingRight": 0,
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "shadowOpacity": 0.3,
 "verticalAlign": "top",
 "top": "10%",
 "borderRadius": 0,
 "bottom": "10%",
 "shadowVerticalLength": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "Global"
 },
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "layout": "absolute"
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46336F9B_633D_41CA_41D5_A8C292C55E36",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4633CF9B_633D_41CA_41C7_962E7A1F5763",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46321F9B_633D_41CA_41D2_C6AF2D87DC6F",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46327F9B_633D_41CA_41C2_1AED1C9D4173",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4632DF9B_633D_41CA_41D4_A1A332099CE1",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46311F9C_633D_41CE_41AD_BF924DBE2B44",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_5_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463E5F9E_633D_41CA_41D5_21913E6DCAC4",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463E9F9E_633D_41CA_41AC_C2B7263407E1",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463EFF9E_633D_41CA_41D1_4E86DAB90D25",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463D3F9E_633D_41CA_41C6_BE15152F0A12",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463D9F9E_633D_41CA_41A4_A0C4BC5BB527",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_4_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463DEF9F_633D_41CA_41C2_970C519D7AB7",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_5_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463C4F9F_633D_41CA_41D0_B03387F50E62",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_6_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463C9F9F_633D_41CA_41D7_6C0AF8BAC448",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_7_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463CFF9F_633D_41CA_41D6_22ABC50AEFD8",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_8_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463F2F9D_633D_41CE_41D0_B1C09A6909A9",
 "levels": [
  {
   "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463F6F9D_633D_41CE_41CC_449FC2E4ACB3",
 "levels": [
  {
   "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463FBF9D_633D_41CE_41D8_073431C0F8D6",
 "levels": [
  {
   "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463A8FA1_633D_41F6_41B3_DEFAA0337530",
 "levels": [
  {
   "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46077FA3_633D_41FA_41D1_A461F0538A24",
 "levels": [
  {
   "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_6C300EBD_63D5_1CB4_41BB_3E6C2A265243",
 "levels": [
  {
   "url": "media/panorama_6C91D939_63D7_65BF_41B0_DB152AF1AF74_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463ACFA1_633D_41F6_41B7_9526E4B975AF",
 "levels": [
  {
   "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46317F9C_633D_41CE_41D5_B7CD46DBF57B",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4631DF9C_633D_41CE_41CE_BAFA3F708B83",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46302F9C_633D_41CE_41AB_2AF5CC5BBC2D",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46307F9C_633D_41CE_41D1_B5B7EAD5E8CE",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_3_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4630BF9D_633D_41CE_418D_BEA4C610D51E",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46398FA1_633D_41F6_419C_E58C9422FFE8",
 "levels": [
  {
   "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463E0F9D_633D_41CE_41D0_99C5EE8842D0",
 "levels": [
  {
   "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4639DFA2_633D_41FA_41B9_676C65550F42",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46381FA2_633D_41FA_41B7_F5B61FE3DCD4",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46388FA2_633D_41FA_4196_9B7807E12EC5",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_4638CFA2_633D_41FA_41C5_28919171E670",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463B6F9F_633D_41CA_41D0_03783EDD45D9",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463B9F9F_633D_41CA_4127_6133977EB64C",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463C6FA0_633D_41F6_41D1_F4615302C3AC",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463CBFA0_633D_41F6_41CE_B9C3F7877A80",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_3_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463B1FA0_633D_41F6_41B2_B06158FB003E",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_4_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_46392FA1_633D_41F6_41AF_BB4612DE8C2E",
 "levels": [
  {
   "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463B7FA0_633D_41F6_41A3_E8064B5FB9BA",
 "levels": [
  {
   "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463BDFA1_633D_41F6_41BD_F6C7C4B3AEB5",
 "levels": [
  {
   "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_463A2FA1_633D_41F6_41D5_054D6BACF398",
 "levels": [
  {
   "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameCount": 24
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_7FF195EF_706F_7FC6_41D7_A104CA87824D",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": 36,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.4,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "height": "100%",
 "data": {
  "name": "Container black"
 },
 "paddingBottom": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "maxWidth": 80,
 "id": "IconButton_7FF185EF_706F_7FC6_41A5_21B418265412",
 "left": 10,
 "maxHeight": 80,
 "horizontalAlign": "center",
 "width": 50,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "top": "40%",
 "verticalAlign": "middle",
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": true,
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412_rollover.png",
 "bottom": "40%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false)",
 "class": "IconButton",
 "iconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton arrow"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 1095,
 "id": "Image_7DB3C373_7065_34DE_41BA_CF5206137DED",
 "left": "0%",
 "maxHeight": 1095,
 "horizontalAlign": "center",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_7DB3C373_7065_34DE_41BA_CF5206137DED.png",
 "minHeight": 30,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "propagateClick": true,
 "bottom": "80%",
 "minWidth": 40,
 "class": "Image",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image Company"
 },
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_4FAD07AA_5F42_6780_41D7_00AFE0F85E70"
 ],
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "id": "Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "20%",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "propagateClick": true,
 "bottom": "55%",
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "-Container buttons"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_4606675D_5FCF_F8B5_41C9_DA231F9A348A",
  "this.Button_4606475D_5FCF_F8B5_41CB_634CE97A2FB1",
  "this.Container_45A7DED2_5FC3_E98D_41D3_7350B1141D0A",
  "this.Button_7F7EA528_6030_CF84_41A1_4D7BEA6A5B5C",
  "this.Container_46CBDF0A_5FC2_289D_41D7_41BD6E0B3A73",
  "this.Button_4606175D_5FCF_F8B5_41AB_39A6A97BAF7E",
  "this.Container_7E338E0E_6033_BD9C_41D6_1C962F75E477"
 ],
 "id": "Container_4607A75D_5FCF_F8B5_41C4_3168A3CCF3F3",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 127.2,
 "minHeight": 1,
 "propagateClick": true,
 "bottom": "30%",
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "-Caracteristicas"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4",
  "this.Container_7DB2F382_7065_343F_41C8_85C6AE9C717F",
  "this.HTMLText_7DB2E382_7065_343F_41C2_951F708170F1",
  "this.HTMLText_448893C1_61F3_CA13_41D6_1E6827EC1002"
 ],
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "id": "Container_7DBCC382_7065_343F_41D5_9D3C36B5F479",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "top": "60%",
 "borderRadius": 0,
 "verticalAlign": "bottom",
 "minHeight": 1,
 "propagateClick": true,
 "bottom": "0%",
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "-Container footer"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "insetBorder": false,
 "width": "100%",
 "borderSize": 0,
 "scrollEnabled": true,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "url": "https://maps.google.com/maps?output=embed&center=-12.1142224,-76.9844978&z=17&q=Av.+Del+Sur+330,+Lima+15039",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "class": "WebFrame",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "WebFrame48191"
 },
 "shadow": false,
 "backgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxHeight": 60,
 "horizontalAlign": "center",
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "minHeight": 50,
 "borderRadius": 0,
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "verticalAlign": "middle",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "class": "IconButton",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 140,
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "header"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A"
 ],
 "id": "Container_7F1D51CE_60D0_469D_41CA_F511DBBE9B65",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 140,
 "minHeight": 1,
 "propagateClick": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "header"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_4FAC57A7_5F42_6780_41CD_1209EF361371",
  "this.Button_4FAC47A7_5F42_6780_41AC_BBFD36F5C4E1",
  "this.Container_4FACA7A8_5F42_6780_41B2_761BC8D56240",
  "this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0"
 ],
 "id": "Container_4FAD07AA_5F42_6780_41D7_00AFE0F85E70",
 "scrollBarOpacity": 0.15,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 6,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 165,
 "minHeight": 1,
 "propagateClick": true,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "-Level 1"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_4606675D_5FCF_F8B5_41C9_DA231F9A348A",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false)",
 "id": "Button_4606475D_5FCF_F8B5_41CB_634CE97A2FB1",
 "rollOverBackgroundOpacity": 0.3,
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 18,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Planta 1er Piso",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.87vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Planta 1er Piso"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "rollOverShadowBlurRadius": 18,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_45A7DED2_5FC3_E98D_41D3_7350B1141D0A",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false)",
 "id": "Button_7F7EA528_6030_CF84_41A1_4D7BEA6A5B5C",
 "rollOverBackgroundOpacity": 0.3,
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 18,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Planta 2do Piso",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.87vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Planta 2do Piso"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "rollOverShadowBlurRadius": 18,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_46CBDF0A_5FC2_289D_41D7_41BD6E0B3A73",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false)",
 "id": "Button_4606175D_5FCF_F8B5_41AB_39A6A97BAF7E",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 18,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Ubicaci\u00f3n",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.87vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "pressedLabel": "Reception",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Ubicacion"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_7E338E0E_6033_BD9C_41D6_1C962F75E477",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "maxWidth": 80,
 "id": "IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4",
 "maxHeight": 80,
 "horizontalAlign": "center",
 "width": 42,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 42,
 "transparencyActive": true,
 "mode": "push",
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "class": "IconButton",
 "iconURL": "skin/IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4.png",
 "paddingTop": 0,
 "data": {
  "name": "IconButton collapse"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_7DB2F382_7065_343F_41C8_85C6AE9C717F",
 "scrollBarOpacity": 0.5,
 "width": 40,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "height": 2,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "visible",
 "paddingBottom": 0,
 "data": {
  "name": "blue line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_7DB2E382_7065_343F_41C2_951F708170F1",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": 88,
 "minHeight": 1,
 "propagateClick": true,
 "minWidth": 1,
 "click": "this.openLink('http://grupodicon.com.pe', '_blank')",
 "class": "HTMLText",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.38vmin;font-family:'Swis721 Cn BT';\"><U>GRUPO DICON</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.38vmin;font-family:'Swis721 Cn BT';\"><U>www.grupodicon.com.pe</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.38vmin;font-family:'Swis721 Cn BT';\"><U>comercial.ventas@grupodicon.com.pe</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.38vmin;font-family:'Swis721 Cn BT';\"><U>Cel: 933 209 656</U></SPAN></A></SPAN></SPAN></DIV></div>",
 "paddingTop": 0,
 "data": {
  "name": "HTMLText47602"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_448893C1_61F3_CA13_41D6_1E6827EC1002",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": 23,
 "minHeight": 1,
 "propagateClick": true,
 "minWidth": 1,
 "click": "this.openLink('http://www.totem3d.com.pe', '_blank')",
 "class": "HTMLText",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:0.96vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://totem3d.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#666666;font-size:1.24vmin;font-family:'Swis721 Cn BT';\"><U>Desarrollado por Totem 3D</U></SPAN></A></SPAN></SPAN></DIV></div>",
 "paddingTop": 0,
 "data": {
  "name": "HTMLText47602"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "horizontalAlign": "right",
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "verticalAlign": "top",
 "height": "36.14%",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "class": "IconButton",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 60,
 "id": "IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A",
 "maxHeight": 60,
 "horizontalAlign": "right",
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "verticalAlign": "top",
 "height": "36.14%",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "class": "IconButton",
 "iconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_4FAC57A7_5F42_6780_41CD_1209EF361371",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "horizontalAlign": "left",
 "click": "if(!this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0.get('visible')){ this.setComponentVisibility(this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0, true, 0, this.effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D, 'showEffect', false) } else { this.setComponentVisibility(this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0, false, 0, this.effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B, 'hideEffect', false) }",
 "id": "Button_4FAC47A7_5F42_6780_41AC_BBFD36F5C4E1",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 37,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Departamento 602",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.87vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Button 1 - Reception"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_4FACA7A8_5F42_6780_41B2_761BC8D56240",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.5,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
 "children": [
  "this.Container_4FAC97A8_5F42_6780_41C8_09BC305D9BB3",
  "this.Button_4FAC87A8_5F42_6780_41C8_5B7D7AC1DEEF",
  "this.Button_4FACF7A8_5F42_6780_41B9_16CEF81C845D",
  "this.Button_4FACD7A8_5F42_6780_41D6_26FB5763A358",
  "this.Button_4FAD37A8_5F42_6780_41B1_CF6801A36268",
  "this.Button_4FAD27A8_5F42_6780_41C2_4C1BA4140B71",
  "this.Button_4FAD07A8_5F42_6780_41C3_6EF2EF736B9E",
  "this.Button_4A1CF61A_5FBE_38BB_41D3_26FC9A662F7A",
  "this.Button_4964CC11_5FC1_E889_41D3_74FA81A76361",
  "this.Button_48CDFBD2_5FC2_6F8B_41D2_DBDBAE8A2621",
  "this.Button_48DAFF88_5FC1_E787_41A1_FA5DC645548D",
  "this.Button_487377FA_5FC6_277B_41C5_6E4A3BB97E8D",
  "this.Button_4776AFD2_5FC1_E78B_41B9_C31C0FEE6FCC"
 ],
 "id": "Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 116,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "propagateClick": true,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "-Level 1-1"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_4FAC97A8_5F42_6780_41C8_09BC305D9BB3",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "top",
 "height": 8,
 "minHeight": 1,
 "propagateClick": true,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "gap": 10,
 "overflow": "scroll",
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "id": "Button_4FAC87A8_5F42_6780_41C8_5B7D7AC1DEEF",
 "rollOverBackgroundOpacity": 0.3,
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 32,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Comedor Vista 1",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Com1"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "rollOverShadowBlurRadius": 18,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 1)",
 "id": "Button_4FACF7A8_5F42_6780_41B9_16CEF81C845D",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Sala",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Sal"
 },
 "gap": 23,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 2)",
 "id": "Button_4FACD7A8_5F42_6780_41D6_26FB5763A358",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Comedor Vista 2",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Com 2"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 3)",
 "id": "Button_4FAD37A8_5F42_6780_41B1_CF6801A36268",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Cocina",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Coci"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 14)",
 "id": "Button_4FAD27A8_5F42_6780_41C2_4C1BA4140B71",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o de Visita 1",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt SHV1"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 6)",
 "id": "Button_4FAD07A8_5F42_6780_41C3_6EF2EF736B9E",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Dormitorio Principal",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Dorm P"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 14); this.mainPlayList.set('selectedIndex', 7)",
 "id": "Button_4A1CF61A_5FBE_38BB_41D3_26FC9A662F7A",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Principal",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt SHP"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 8)",
 "id": "Button_4964CC11_5FC1_E889_41D3_74FA81A76361",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 1",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Dor S1"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 9)",
 "id": "Button_48CDFBD2_5FC2_6F8B_41D2_DBDBAE8A2621",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 2",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Dor S2"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "id": "Button_48DAFF88_5FC1_E787_41A1_FA5DC645548D",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt SHF"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 12)",
 "id": "Button_487377FA_5FC6_277B_41C5_6E4A3BB97E8D",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Estar",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Estar"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.mainPlayList.set('selectedIndex', 13)",
 "id": "Button_4776AFD2_5FC1_E78B_41B9_C31C0FEE6FCC",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "verticalAlign": "middle",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "label": "Terraza 1",
 "class": "Button",
 "borderColor": "#000000",
 "fontSize": "1.98vmin",
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "paddingTop": 0,
 "data": {
  "name": "Bt Terraza"
 },
 "gap": 5,
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "gap": 10,
 "overflow": "visible",
 "backgroundPreloadEnabled": true,
 "paddingBottom": 0,
 "data": {
  "name": "Player468"
 },
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "vrPolyfillScale": 0.5,
 "desktopMipmappingEnabled": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
