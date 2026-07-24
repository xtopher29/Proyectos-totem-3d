(function(){
    var script = {
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "data": {
  "name": "Player468"
 },
 "id": "rootPlayer",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "start": "this.init(); this.playList_BE9E8FA1_8222_9F67_41DE_D53FFA679E81.set('selectedIndex', 0); this.playList_BE9FDFA1_8222_9F67_41C8_977FC3C44592.set('selectedIndex', 0); this.playList_BE9FFFA1_8222_9F67_41B5_C6A3E32A8207.set('selectedIndex', 0); this.playList_BE9F0FA1_8222_9F67_41B9_BB74B157A9AB.set('selectedIndex', 0); this.playList_BE9F2FA1_8222_9F67_41D6_D89FFFD08746.set('selectedIndex', 0); this.playList_BE9EFFA1_8222_9F67_41C3_237C26F9E371.set('selectedIndex', 0)",
 "scrollBarWidth": 10,
 "children": [
  "this.MainViewer",
  "this.Container_9CD0A028_A9D4_E880_41AB_FF26BFCBC926",
  "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A",
  "this.Container_3B000ABF_22CD_CA3F_418A_406A87F5B6EA",
  "this.Container_610403E3_22D4_DA47_41A4_830DC852C065",
  "this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2",
  "this.Container_4DC45133_755E_020A_41CF_F8920040CCCD",
  "this.Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB"
 ],
 "scripts": {
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "registerKey": function(key, value){  window[key] = value; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "existsKey": function(key){  return key in window; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "unregisterKey": function(key){  delete window[key]; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getKey": function(key){  return window[key]; },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); }
 },
 "paddingLeft": 0,
 "backgroundPreloadEnabled": true,
 "width": "100%",
 "contentOpaque": false,
 "defaultVRPointer": "laser",
 "downloadEnabled": false,
 "borderRadius": 0,
 "minHeight": 20,
 "propagateClick": true,
 "class": "Player",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "mouseWheelEnabled": true,
 "desktopMipmappingEnabled": false,
 "gap": 10,
 "definitions": [{
 "movementMode": "constrained",
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB"
},
{
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "label": "DPTO-604-PLANTA-1",
 "thumbnailUrl": "media/map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25_t.jpg",
 "id": "map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "height": 603,
 "width": 920,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3
},
{
 "duration": 5000,
 "label": "DPTO-602-PLANTA-2",
 "thumbnailUrl": "media/album_444B5D56_6071_FE31_41BF_E608FEDA2243_t.jpg",
 "id": "album_444B5D56_6071_FE31_41BF_E608FEDA2243",
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "class": "ImageResourceLevel",
    "url": "media/album_444B5D56_6071_FE31_41BF_E608FEDA2243.jpg"
   }
  ]
 },
 "class": "Photo",
 "height": 839
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI HALL 1-RGB",
 "hfov": 360,
 "id": "panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF"
  }
 ],
 "thumbnailUrl": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_t.jpg",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_B4E8CC52_8223_A125_41D8_19FD66190454",
  "this.overlay_B4E8BC52_8223_A125_41DA_60A95D5A56E2"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -11.02,
  "class": "PanoramaCameraPosition",
  "pitch": 10.1
 },
 "id": "camera_BCE36230_8222_A165_41DC_521F3FE2BC87",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 176.33,
  "class": "PanoramaCameraPosition",
  "pitch": -3.67
 },
 "id": "camera_BD8C70CC_8222_A13D_41C0_D802E5691F95",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_in",
 "id": "effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "easing": "quad_out",
 "id": "effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 DORM PRINCIPAL-SRGB",
 "hfov": 360,
 "id": "panorama_BDA06581_8227_A324_41D4_A1735B5E590F",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BE4E4B3D_8227_E75C_4190_F639164FE079"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86"
  }
 ],
 "thumbnailUrl": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 205.52,
   "angle": 38.66,
   "y": 231.52,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BDA04581_8227_A324_41C8_520F2F79E736",
  "this.overlay_BDA0A581_8227_A324_41A8_3792CA5ACC95"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI TERRAZA-SRGB",
 "hfov": 360,
 "id": "panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFE82021_8223_E167_41D2_037B36EC84EB"
  }
 ],
 "thumbnailUrl": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "x": 238.97,
   "angle": 88.88,
   "y": 169.19,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BEE11F3E_8223_7F5D_41DC_DAD85608EA3D",
  "this.overlay_BEE13F3E_8223_7F5D_41B8_61F178B7B5E2"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BCF55227_8222_A16B_41DA_A39B1FEA66D5",
 "class": "PanoramaCamera"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI X2",
 "hfov": 360,
 "id": "panorama_B4C57330_8222_E765_41CB_38FA033A93E3",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF"
  }
 ],
 "thumbnailUrl": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_t.jpg",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_B4C56330_8222_E765_41DF_48CB38D50ECE",
  "this.overlay_B4C51330_8222_E765_41B6_AB6E37C4106C",
  "this.overlay_B4C50330_8222_E765_41DA_C4C9EB94B855",
  "this.overlay_B4C53330_8222_E765_41BD_B79CA6ECDB19"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BED0BFD8_8222_9F25_41E0_5C175F9BE904",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -3.67,
  "class": "PanoramaCameraPosition",
  "pitch": 14.69
 },
 "id": "camera_BDD7A105_8222_A32F_41D6_5043300D8D6B",
 "class": "PanoramaCamera"
},
{
 "label": "Album de Fotos DPTO-602-PLANTA-1",
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
 "thumbnailUrl": "media/album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_t.png",
 "playList": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 11.02
 },
 "id": "camera_BDD970FD_8222_A2DF_41BC_FF3525F28A4D",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -2.11,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC0EE151_8222_A326_41D9_BA410A242833",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC3D5160_8222_A3E5_41B5_6680DAFC8B28",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_camera",
 "class": "PanoramaCamera"
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "height": 603,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "DPTO-604-PLANTA-3",
 "id": "map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
 "initialZoomFactor": 1,
 "width": 920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.04,
 "thumbnailUrl": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_t.png",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_E615C030_FEE5_748A_41B9_8C220F0A9B8A",
  "this.overlay_E615D030_FEE5_748A_41D4_FCFAA721BCCA"
 ],
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayInsideColor": "#001E3B"
},
{
 "easing": "quad_out",
 "id": "effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "easing": "cubic_in_out",
 "id": "effect_B8EBDF14_A7F4_D876_41E2_24E8CA7F08AF",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "easing": "quad_in",
 "id": "effect_4614A88C_7576_021E_41C6_F0C9ED5051FA",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BCBCF1DF_8222_A2DB_41DF_F1D37185EBE5",
 "class": "PanoramaCamera"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 COMEDOR 4-SRGB",
 "hfov": 360,
 "id": "panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2332334_8221_E76D_41B3_3B2D5B19E552"
  },
  {
   "panorama": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E",
   "backwardYaw": -144.47,
   "yaw": 177.89,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA07096D_8227_63FC_419A_57482630962B"
  }
 ],
 "thumbnailUrl": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 276.47,
   "angle": 268.92,
   "y": 271.71,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BED1DEE5_8226_9EEF_41DC_D36493C42CE5",
  "this.overlay_BED13EE5_8226_9EEF_41D3_60DA0113CFF0",
  "this.overlay_BED12EE5_8226_9EEF_41D1_79924D53CADF",
  "this.overlay_BED17EE5_8226_9EEF_41DB_D35834565849"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "easing": "quad_out",
 "id": "effect_5B21667B_4F08_3100_41C7_3B45A9C1819F",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer"
  }
 ],
 "id": "playList_BE916FA1_8222_9F67_41CA_AC7783D6C95E",
 "class": "PlayList"
},
{
 "easing": "quad_out",
 "id": "effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "items": [
  "this.PanoramaPlayListItem_BE850FAF_8222_9F7B_41DA_EFE13E230F28",
  "this.PanoramaPlayListItem_BE84CFAF_8222_9F7B_41E0_5DB673769214",
  "this.PanoramaPlayListItem_BE849FAF_8222_9F7B_41DD_E3FC109EE89B",
  "this.PanoramaPlayListItem_BE847FAF_8222_9F7B_41D7_10C2C884C602",
  "this.PanoramaPlayListItem_BE840FAF_8222_9F7B_41D2_EA00AB179538",
  "this.PanoramaPlayListItem_BE923FA1_8222_9F67_41AA_591B1AF2B32E",
  "this.PanoramaPlayListItem_BE95BFA1_8222_9F67_41DE_A70C4DFCB3E6",
  "this.PanoramaPlayListItem_BE94DFA1_8222_9F67_41DF_2C79AB523D73",
  "this.PanoramaPlayListItem_BE940FA1_8222_9F67_41C2_E4EDC995F5D6",
  "this.PanoramaPlayListItem_BE97BFA1_8222_9F67_41CC_1858036B4BDB",
  "this.PanoramaPlayListItem_BE96CFA1_8222_9F67_41B4_A39D8B5328CB",
  "this.PanoramaPlayListItem_BE97CFA1_8222_9F67_41D5_3EEEE09B6928",
  "this.PanoramaPlayListItem_BE976FA1_8222_9F67_41DA_074CD9CF244A",
  "this.PanoramaPlayListItem_BE969FA1_8222_9F67_41D0_A9B12933262B",
  "this.PanoramaPlayListItem_BE89DFA1_8222_9F67_41C7_E5EB9F7D324F",
  "this.PanoramaPlayListItem_BE896FA1_8222_9F67_41AD_41A5100F61F2",
  "this.PanoramaPlayListItem_BE888FA1_8222_9F67_41A5_5ACB4E4A1DD6",
  "this.PanoramaPlayListItem_BE881FA1_8222_9F67_41CB_7D6BB08AD99D",
  "this.PanoramaPlayListItem_BE8B5FA1_8222_9F67_41B9_D0B5E425BB4E",
  "this.PanoramaPlayListItem_BE8AFFA1_8222_9F67_4177_F2F7A750CE64",
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "media": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
   "class": "PhotoAlbumPlayListItem",
   "player": "this.MainViewerPhotoAlbumPlayer"
  },
  {
   "media": "this.album_383D1026_2235_55C1_41B4_B2C4B0B66487",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 0)",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "easing": "quad_out",
 "id": "effect_31B8DD71_225D_4E40_41A5_240011E92082",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BFE82021_8223_E167_41D2_037B36EC84EB_camera",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_out",
 "id": "effect_EE521299_A95C_A980_41E1_8012EC56685F",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 9.18
 },
 "id": "camera_BD91F0CA_8222_A125_41BB_1BB3D3A7D94A",
 "class": "PanoramaCamera"
},
{
 "label": "Album de Fotos 303-DORMITORIO",
 "id": "album_383D1026_2235_55C1_41B4_B2C4B0B66487",
 "thumbnailUrl": "media/album_383D1026_2235_55C1_41B4_B2C4B0B66487_t.png",
 "playList": "this.album_383D1026_2235_55C1_41B4_B2C4B0B66487_AlbumPlayList",
 "class": "PhotoAlbum"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BB60499A_8221_6325_41D3_1823EE361757_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE91DFA1_8222_9F67_41C9_D98573898F9A",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_956082AA_8221_6124_41D7_7FADDF3DEA1C",
   "class": "MapPlayListItem",
   "player": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer"
  }
 ],
 "id": "playList_BE9E3FA1_8222_9F67_41D9_F03CB5F1568E",
 "class": "PlayList"
},
{
 "easing": "cubic_in_out",
 "id": "effect_BB5CD0EF_A7F5_A9D2_41E2_3824B0946812",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI ESTAR-SRGB",
 "hfov": 360,
 "id": "panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C"
  }
 ],
 "thumbnailUrl": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "x": 284.05,
   "angle": 113.16,
   "y": 256.33,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BAAE3AFB_8222_E6DB_41D6_608287DB6949",
  "this.overlay_BAAFCAFB_8222_E6DB_41DB_696D6F6E1EDD",
  "this.overlay_BAAFDAFB_8222_E6DB_41DE_4B3C77C726AD",
  "this.overlay_BAAFEAFB_8222_E6DB_41D2_5F1D2C625005"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "movementMode": "constrained",
 "id": "ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765E"
},
{
 "fieldOfViewOverlayOutsideColor": "#00FF00",
 "height": 603,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "DPTO-701-PLANTA-1",
 "id": "map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
 "initialZoomFactor": 1,
 "width": 920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.05,
 "thumbnailUrl": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_t.png",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_9AD31B8A_8221_A7E4_41C3_4D482E45FA1A",
  "this.overlay_9AD36B8A_8221_A7E4_41C9_3E43B2D6EE4A",
  "this.overlay_9AD37B8A_8221_A7E4_41DF_BC881178F5FD",
  "this.overlay_9AD3AB8A_8221_A7E4_41D7_28BB06D82335",
  "this.overlay_9AD39B8A_8221_A7E4_41CD_4C115C81D321",
  "this.overlay_9AD3EB8A_8221_A7E4_41D3_9433DB16F841",
  "this.overlay_9AD3DB8A_8221_A7E4_41D2_789E5C00B272",
  "this.overlay_9AD03B8A_8221_A7E4_41D1_03ED0DD24FC1",
  "this.overlay_AA7A4643_8221_A0B8_41D5_5661EDFB3421"
 ],
 "fieldOfViewOverlayInsideOpacity": 0.32,
 "fieldOfViewOverlayInsideColor": "#001E3B"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 35.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BEFF6003_8222_A12B_41B2_F0500C01B248",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 3.09,
  "class": "PanoramaCameraPosition",
  "pitch": -29.4
 },
 "id": "panorama_B4C57330_8222_E765_41CB_38FA033A93E3_camera",
 "class": "PanoramaCamera"
},
{
 "easing": "cubic_in_out",
 "id": "effect_BC5E4F44_A7CC_58D6_41DF_9C47E76A87BE",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E949EC43_FEE5_0C8E_41E5_0D6474D24273",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer"
  }
 ],
 "id": "playList_BE910FA1_8222_9F67_41C6_932C4F1DEF41",
 "class": "PlayList"
},
{
 "movementMode": "constrained",
 "id": "ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78"
},
{
 "duration": 5000,
 "label": "303-DORMITORIO",
 "thumbnailUrl": "media/album_383D1026_2235_55C1_41B4_B2C4B0B66487_0_t.jpg",
 "id": "album_383D1026_2235_55C1_41B4_B2C4B0B66487_0",
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "class": "ImageResourceLevel",
    "url": "media/album_383D1026_2235_55C1_41B4_B2C4B0B66487_0.jpg"
   }
  ]
 },
 "class": "Photo",
 "height": 839
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 174.49,
  "class": "PanoramaCameraPosition",
  "pitch": -1.84
 },
 "id": "camera_BDBD80E6_8222_A2ED_41DF_326E77624D56",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_out",
 "id": "effect_5AFD81C9_4F08_5301_41C3_9093DB61A2A7",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BD36765E_8221_61DD_41D6_F35CD9879261_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BCADE1EF_8222_A2FC_41DA_E014DFC4A884",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_out",
 "id": "effect_3FB7720B_22F7_D5C7_4174_D5879CC918C1",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "easing": "quad_out",
 "id": "effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 SHF-SRGB",
 "hfov": 360,
 "id": "panorama_C2332334_8221_E76D_41B3_3B2D5B19E552",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86"
  }
 ],
 "thumbnailUrl": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 321.51,
   "angle": 0,
   "y": 335.47,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_C2333335_8221_E76F_41A1_D8D4BD6EE945"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "easing": "cubic_in_out",
 "id": "effect_BC5FBF43_A7CC_58D2_41AA_4532B9A7D12C",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 0.92,
  "class": "PanoramaCameraPosition",
  "pitch": 11.94
 },
 "id": "camera_BECB2FEB_8222_9EFB_41CB_667C9071D380",
 "class": "PanoramaCamera"
},
{
 "fontFamily": "Arial",
 "class": "Menu",
 "backgroundColor": "#404040",
 "children": [
  {
   "label": "RI X3",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 0)"
  },
  {
   "label": "RI X4",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  },
  {
   "label": "RI X2",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  },
  {
   "label": "RI X1",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 3)"
  },
  {
   "label": "RI HALL 1-RGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  },
  {
   "label": "RI COMEDOR 1-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  },
  {
   "label": "RI COMEDOR 2-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  },
  {
   "label": "RI 701 COMEDOR 5-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  },
  {
   "label": "RI 701 COMEDOR 3-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  },
  {
   "label": "RI 701 COMEDOR 4-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  },
  {
   "label": "RI 701 DORM PRINCIPAL-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  },
  {
   "label": "RI 701 SHP-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  },
  {
   "label": "RI 701 DORM SEC-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  },
  {
   "label": "RI 701 DORM SEC OFFICE-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  },
  {
   "label": "RI 701 SHF-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  },
  {
   "label": "RI 701 SHV 2DO PISO-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  },
  {
   "label": "RI 701 SHV 1ER PISO-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  },
  {
   "label": "RI ESTAR-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  },
  {
   "label": "RI TERRAZA-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  },
  {
   "label": "RI-TERRAZA-2-SRGB",
   "class": "MenuItem",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "label": "Media",
 "rollOverFontColor": "#FFFFFF",
 "selectedFontColor": "#FFFFFF",
 "id": "Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "rollOverOpacity": 0.8,
 "opacity": 0.4,
 "selectedBackgroundColor": "#202020"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 DORM SEC OFFICE-SRGB",
 "hfov": 360,
 "id": "panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2"
  }
 ],
 "thumbnailUrl": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 278.37,
   "angle": 0,
   "y": 424.18,
   "class": "PanoramaMapLocation"
  },
  {
   "map": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "x": 282.06,
   "angle": -134.16,
   "y": 404.3,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BDF3872A_8226_AF65_41D8_BC38D6F373C0",
  "this.overlay_BDF3672A_8226_AF65_41DE_C270BFB02B72"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9C1FA1_8222_9F67_41D4_9034453A2C70",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -12.33,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BDF2C128_8222_A364_41D1_88F10F2B5721",
 "class": "PanoramaCamera"
},
{
 "hfov": 360,
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI COMEDOR 1-SRGB",
 "id": "panorama_BCFDFCA5_8222_E16F_4193_B0445526523E",
 "pitch": 0,
 "hfovMin": "120%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BD36765E_8221_61DD_41D6_F35CD9879261",
   "backwardYaw": -160.08,
   "yaw": 37.9,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "panorama": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86",
   "backwardYaw": 177.89,
   "yaw": -144.47,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BB60499A_8221_6325_41D3_1823EE361757"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D"
  }
 ],
 "thumbnailUrl": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 513.92,
   "angle": 60.37,
   "y": 253.95,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BCFD9CA5_8222_E16F_41DD_EE489324053B",
  "this.overlay_BCFDBCA5_8222_E16F_41D6_F69CAE9EC82E",
  "this.overlay_BCFD4CA5_8222_E16F_41BF_71B81628CE5C",
  "this.overlay_BCFD7CA5_8222_E16F_41D4_AED571C043C2",
  "this.overlay_BCFD6CA5_8222_E16F_41C5_CDEC48DBBF8F",
  "this.overlay_BCFD0CA5_8222_E16F_41D3_F0113752CADD",
  "this.overlay_BCFD3CA5_8222_E16F_41D9_EBAA0425BA1A"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "from": "left",
 "easing": "quad_in",
 "id": "effect_4C974746_571D_6541_41CE_76A308A87323",
 "class": "SlideInEffect",
 "duration": 400
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -0.92,
  "class": "PanoramaCameraPosition",
  "pitch": -33.06
 },
 "id": "camera_BCC41219_8222_A124_41B2_2FBD6218F477",
 "class": "PanoramaCamera"
},
{
 "id": "MainViewerPhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "viewerArea": "this.MainViewer"
},
{
 "easing": "quad_out",
 "id": "effect_59CA3A81_4F08_D101_41D3_0462DF8FB066",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "movementMode": "constrained",
 "id": "ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445"
},
{
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "label": "DPTO-604-PLANTA-3",
 "thumbnailUrl": "media/map_E949EC43_FEE5_0C8E_41E5_0D6474D24273_t.jpg",
 "id": "map_E949EC43_FEE5_0C8E_41E5_0D6474D24273",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "height": 603,
 "width": 920,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E949EC43_FEE5_0C8E_41E5_0D6474D24273.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_E949EC43_FEE5_0C8E_41E5_0D6474D24273_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -3.67,
  "class": "PanoramaCameraPosition",
  "pitch": -36.73
 },
 "id": "camera_BD7300AE_8222_A17D_41D8_0F85981CA7AD",
 "class": "PanoramaCamera"
},
{
 "easing": "cubic_in_out",
 "id": "effect_BC5FEF40_A7CC_58CE_41BB_C81A3CE4CC8B",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE91BFA1_8222_9F67_41C5_709DDE566EE2",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer"
  }
 ],
 "id": "playList_BE9F0FA1_8222_9F67_41B9_BB74B157A9AB",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": -4.06,
  "class": "PanoramaCameraPosition",
  "pitch": -0.93
 },
 "id": "panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_camera",
 "class": "PanoramaCamera"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 SHP-SRGB",
 "hfov": 360,
 "id": "panorama_BE4E4B3D_8227_E75C_4190_F639164FE079",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F"
  }
 ],
 "thumbnailUrl": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 195.21,
   "angle": 268.88,
   "y": 314.77,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BE4E7B3D_8227_E75C_41AE_13F9EF77F940"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BD1AB031_8222_A167_41DE_B81C22871AA8",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": -142.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC63C1B7_8222_A36B_41DD_64059C9051E1",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_in",
 "id": "effect_31B8AD71_225D_4E40_41B2_AE1A588E7B72",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_camera",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_out",
 "id": "effect_4614B88C_7576_021E_41D2_418BC89D7577",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "easing": "quad_out",
 "id": "effect_46498381_7576_0606_41CD_118CDFEBC494",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -109.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC75E1A8_8222_A365_41BB_1394EDB9AEC7",
 "class": "PanoramaCamera"
},
{
 "easing": "cubic_in_out",
 "id": "effect_BB5E10F0_A7F5_A9CE_41A7_B92C1ACA5DB3",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "movementMode": "constrained",
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA"
},
{
 "items": [
  {
   "begin": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_956082AA_8221_6124_41D7_7FADDF3DEA1C",
   "class": "MapPlayListItem",
   "player": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer"
  }
 ],
 "id": "playList_BE9FFFA1_8222_9F67_41B5_C6A3E32A8207",
 "class": "PlayList"
},
{
 "easing": "quad_out",
 "id": "effect_4B7BDB89_753A_0606_419D_5F34AC1C5036",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "from": "left",
 "easing": "quad_in",
 "id": "effect_4B8711AA_571D_FDC6_41C4_8313D8AEEDC7",
 "class": "SlideInEffect",
 "duration": 400
},
{
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "label": "DPTO-701-PLANTA-2-JPG",
 "thumbnailUrl": "media/map_956082AA_8221_6124_41D7_7FADDF3DEA1C_t.jpg",
 "id": "map_956082AA_8221_6124_41D7_7FADDF3DEA1C",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "height": 603,
 "width": 920,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_956082AA_8221_6124_41D7_7FADDF3DEA1C.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_956082AA_8221_6124_41D7_7FADDF3DEA1C_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC9081C4_8222_A32D_41D4_9F285DC15D70",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -2.25,
  "class": "PanoramaCameraPosition",
  "pitch": 17.87
 },
 "id": "panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BD5FE086_8222_A12D_41D2_B945CA8971C9",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC58B17B_8222_A3DB_41CE_3388C0547D6B",
 "class": "PanoramaCamera"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI X4",
 "hfov": 360,
 "id": "panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF"
  }
 ],
 "thumbnailUrl": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_t.jpg",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_B4B9DF1D_8221_BF5F_41B2_BEDD9D025BB8",
  "this.overlay_B4B9AF1D_8221_BF5F_41B6_A3CAC8B4DA36",
  "this.overlay_B4B9BF1D_8221_BF5F_41DF_26C0FE18BDC8",
  "this.overlay_B4B98F1D_8221_BF5F_41DC_A153BB05AD81"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "cubic_in_out",
 "id": "effect_BC5F8F43_A7CC_58D2_41D8_DF244C29624F",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI-TERRAZA-2-SRGB",
 "hfov": 360,
 "id": "panorama_BFE82021_8223_E167_41D2_037B36EC84EB",
 "pitch": 0,
 "hfovMin": "120%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93"
  }
 ],
 "thumbnailUrl": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "x": 394.08,
   "angle": -57.99,
   "y": 246.92,
   "class": "PanoramaMapLocation"
  },
  {
   "map": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "x": 686.08,
   "angle": 242.42,
   "y": 114.13,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BFE8C021_8223_E167_41D3_BD3E6D9D2161",
  "this.overlay_BFE8D021_8223_E167_41D5_850BB2599043"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "easing": "cubic_in_out",
 "id": "effect_BB51ED10_A7CC_584E_41E4_5D75E4F1C6AE",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 SHV 1ER PISO-SRGB",
 "hfov": 360,
 "id": "panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C"
  }
 ],
 "thumbnailUrl": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "x": 201.31,
   "angle": 270,
   "y": 351.45,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_C2B7400D_8222_A13C_41DD_585F8400D672"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9F5FA1_8222_9F67_41D7_FE389E0B7371",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9F7FA1_8222_9F67_41AB_45570CE54FE4",
 "class": "PlayList"
},
{
 "easing": "quad_out",
 "id": "effect_358AEAE7_753A_0609_41AD_E70825F2EC00",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_rotation",
 "viewerArea": "this.MainViewer"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": -8.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC476194_8222_A32D_41DA_B9313A40F73A",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BEC49FF9_8222_9EE7_41D3_9335A2A0D570",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9FBFA1_8222_9F67_41CD_0B478F115023",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer"
  }
 ],
 "id": "playList_BE91AFA1_8222_9F67_41C6_337E9D3930AA",
 "class": "PlayList"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI X1",
 "hfov": 360,
 "id": "panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16"
  }
 ],
 "thumbnailUrl": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_t.jpg",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BB71CF0B_8223_FF3B_41B9_0A2DF1FF48C7",
  "this.overlay_BB71DF0B_8223_FF3B_41BF_E7C7B90A2E7B",
  "this.overlay_BB71EF0B_8223_FF3B_41A6_F2CD5D8D743E",
  "this.overlay_BB71FF0B_8223_FF3B_41DE_0270DFC6DCAC"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "cubic_in_out",
 "id": "effect_BCBD364B_A7D4_68D2_41C9_1FA89A1A23DB",
 "class": "FadeOutEffect",
 "duration": 1000
},
{
 "easing": "cubic_in_out",
 "id": "effect_BB5100F0_A7F5_A9CE_41D8_6446A7D705FB",
 "class": "FadeInEffect",
 "duration": 1000
},
{
 "easing": "quad_in",
 "id": "effect_5AFDA1C9_4F08_5301_41A5_258F6E1B7A4F",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "duration": 5000,
 "label": "DPTO-602-PLANTA-1",
 "thumbnailUrl": "media/album_431A74C1_6071_CE13_41B6_6A6768C52AEF_t.jpg",
 "id": "album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "class": "ImageResourceLevel",
    "url": "media/album_431A74C1_6071_CE13_41B6_6A6768C52AEF.jpg"
   }
  ]
 },
 "class": "Photo",
 "height": 839
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BED97FD0_8222_9F25_41D4_4372DA1C7128",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": -29.39
 },
 "id": "camera_BD453099_8222_A127_41E0_1DAEDE294234",
 "class": "PanoramaCamera"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 COMEDOR 5-SRGB",
 "hfov": 360,
 "id": "panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D",
 "pitch": 0,
 "hfovMin": "120%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E"
  },
  {
   "panorama": "this.panorama_BB60499A_8221_6325_41D3_1823EE361757",
   "backwardYaw": 171.54,
   "yaw": 167.67,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 425.99,
   "angle": 268.49,
   "y": 135.53,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BF8869F4_8221_E2ED_41D7_B1AF95859E5C",
  "this.overlay_BF8809F4_8221_E2ED_41DA_F57C7D2DC10D"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "easing": "quad_in",
 "id": "effect_59CA1A81_4F08_D101_41D2_30683CB5E100",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC8EC1C4_8222_A32D_41DF_F2477FE069CE",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -2.1,
  "class": "PanoramaCameraPosition",
  "pitch": -38.22
 },
 "id": "panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BEE3D022_8222_A165_41D2_F507DBB73838",
 "class": "PanoramaCamera"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 SHV 2DO PISO-SRGB",
 "hfov": 360,
 "id": "panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93"
  }
 ],
 "thumbnailUrl": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "x": 197.99,
   "angle": -88.6,
   "y": 223.17,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BA7F38E4_8221_A2ED_41D0_6B86CE4FDBD3"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "width": 2048,
      "tags": "ondemand",
      "rowCount": 4,
      "class": "TiledImageResourceLevel",
      "height": 2048
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "height": 603,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "DPTO-604-PLANTA-1",
 "id": "map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
 "initialZoomFactor": 1,
 "width": 920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.04,
 "thumbnailUrl": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_t.png",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_E6062C39_FEE3_0CFA_41DC_BB797E9E904A",
  "this.overlay_E6063C39_FEE3_0CFA_41EF_07E4478308A7",
  "this.overlay_E6060C39_FEE3_0CFA_41A2_BB8A294A34DD",
  "this.overlay_E6061C39_FEE3_0CFA_41E7_1FFBE0756AF2",
  "this.overlay_E606EC39_FEE3_0CFA_41C7_4AD732F2096E",
  "this.overlay_E606FC39_FEE3_0CFA_41D7_4E2287FFAB9F",
  "this.overlay_E606CC39_FEE3_0CFA_41EF_51A4232AD450",
  "this.overlay_E606AC39_FEE3_0CFA_41D1_3B69DFE90684",
  "this.overlay_E6069C39_FEE3_0CFA_41DD_9A5547CDF3F7"
 ],
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayInsideColor": "#001E3B"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -9.18,
  "class": "PanoramaCameraPosition",
  "pitch": 11.02
 },
 "id": "camera_BD3D904F_8222_A13B_41A2_1AD1662A344F",
 "class": "PanoramaCamera"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 2.76,
  "class": "PanoramaCameraPosition",
  "pitch": -26.63
 },
 "id": "camera_BCD6420B_8222_A13B_41C6_8301DF33C6E1",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BA07096D_8227_63FC_419A_57482630962B_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 175.41,
  "class": "PanoramaCameraPosition",
  "pitch": -3.67
 },
 "id": "camera_BD48E095_8222_A12F_41D2_7B81E0FCACAC",
 "class": "PanoramaCamera"
},
{
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "label": "DPTO-701-PLANTA-1-JPG",
 "thumbnailUrl": "media/map_9B62DEAA_8221_A124_41DA_A0C0D1998DE8_t.jpg",
 "id": "map_9B62DEAA_8221_A124_41DA_A0C0D1998DE8",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "height": 603,
 "width": 920,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_9B62DEAA_8221_A124_41DA_A0C0D1998DE8.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_9B62DEAA_8221_A124_41DA_A0C0D1998DE8_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3
},
{
 "easing": "quad_out",
 "id": "effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI COMEDOR 2-SRGB",
 "hfov": 360,
 "id": "panorama_BD36765E_8221_61DD_41D6_F35CD9879261",
 "pitch": 0,
 "hfovMin": "120%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86"
  },
  {
   "panorama": "this.panorama_BB60499A_8221_6325_41D3_1823EE361757",
   "backwardYaw": 70.04,
   "yaw": -57.22,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "panorama": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E",
   "backwardYaw": 37.9,
   "yaw": -160.08,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D"
  }
 ],
 "thumbnailUrl": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 600.63,
   "angle": 51.58,
   "y": 254.47,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BD36B65E_8221_61DD_41D2_F17B75C96798",
  "this.overlay_BD36A65E_8221_61DD_41C8_47E7F13C1FC2",
  "this.overlay_BD36C65E_8221_61DD_41DB_D3A520675B3E",
  "this.overlay_BD36E65E_8221_61DD_41DD_64E12AE7BD5F",
  "this.overlay_BD37165E_8221_61DD_41D7_435A3D081FFD",
  "this.overlay_BD37065E_8221_61DD_41DA_B6414663EA22"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "easing": "quad_in",
 "id": "effect_618C5950_7067_14DB_41DB_D2CA7B61EE3C",
 "class": "SlideOutEffect",
 "duration": 400,
 "to": "left"
},
{
 "easing": "quad_in",
 "id": "effect_5B21267B_4F08_3100_41A1_F6699BEFB8F1",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE91EFA1_8222_9F67_41D2_0D4B8CB64001",
 "class": "PlayList"
},
{
 "movementMode": "constrained",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "viewerArea": "this.MapViewer"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 COMEDOR 3-SRGB",
 "hfov": 360,
 "id": "panorama_BB60499A_8221_6325_41D3_1823EE361757",
 "pitch": 0,
 "hfovMin": "120%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_BD36765E_8221_61DD_41D6_F35CD9879261",
   "backwardYaw": -57.22,
   "yaw": 70.04,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "panorama": "this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D",
   "backwardYaw": 167.67,
   "yaw": 171.54,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "thumbnailUrl": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 596.73,
   "angle": 111.63,
   "y": 108.24,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BB60799A_8221_6325_41C2_2955080AB9DF",
  "this.overlay_BB60699A_8221_6325_41DF_FDE4F568C59F",
  "this.overlay_BB61999A_8221_6325_41D4_2451E6776AA8"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_camera",
 "class": "PanoramaCamera"
},
{
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "label": "DPTO-604-PLANTA-2",
 "thumbnailUrl": "media/map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B_t.jpg",
 "id": "map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B",
 "minimumZoomFactor": 0.5,
 "initialZoomFactor": 1,
 "height": 603,
 "width": 920,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -1.88,
  "class": "PanoramaCameraPosition",
  "pitch": -23.88
 },
 "id": "camera_BDABA0F3_8222_A2EB_41CA_B8D1791FC778",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BCDAB1F8_8222_A2E5_41B7_46335281914D",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BD63E0B3_8222_A16B_41D2_2470422697D4",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_9B62DEAA_8221_A124_41DA_A0C0D1998DE8",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_BE9E1FA1_8222_9F67_4169_014E09D8113F",
 "class": "PlayList"
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI X3",
 "hfov": 360,
 "id": "panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16"
  }
 ],
 "thumbnailUrl": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_t.jpg",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BD9591CE_8221_E33D_41D2_07C210F2774F",
  "this.overlay_BD95A1CE_8221_E33D_414D_C1906FF53B06",
  "this.overlay_BD9661CE_8221_E33D_41DB_D852C1D1DA07",
  "this.overlay_BD9671CE_8221_E33D_41CA_B47200F37718"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ]
},
{
 "easing": "quad_out",
 "id": "effect_31B87D71_225D_4E40_41BD_D20390538720",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BD16C035_8222_A16F_41CB_453667C6002C",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E949EC43_FEE5_0C8E_41E5_0D6474D24273",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer"
  }
 ],
 "id": "playList_BE9EFFA1_8222_9F67_41C3_237C26F9E371",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 9.18
 },
 "id": "camera_BD36B068_8222_A1E5_41A8_9F09182E0599",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BDE1512E_8222_A37D_41D7_29FFCEA35A60",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC2A2161_8222_A3E7_41AB_6DE826AD59B1",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_in",
 "id": "effect_EE95F0BB_A954_A980_41D2_48DAD5E5964F",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "cardboardMenu": "this.Menu_BE829FA1_8222_9F67_41CF_614DF84C79F0",
 "vfov": 180,
 "partial": false,
 "label": "RI 701 DORM SEC-SRGB",
 "hfov": 360,
 "id": "panorama_BA07096D_8227_63FC_419A_57482630962B",
 "pitch": 0,
 "hfovMin": "135%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86"
  }
 ],
 "thumbnailUrl": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "x": 278.37,
   "angle": 232.59,
   "y": 424.18,
   "class": "PanoramaMapLocation"
  }
 ],
 "overlays": [
  "this.overlay_BA07396D_8227_63FC_41D5_B6B7F019E58D"
 ],
 "frames": [
  {
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/d/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/f/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/l/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/u/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/r/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/b/0/{row}_{column}.jpg",
      "colCount": 5,
      "width": 2560,
      "tags": "ondemand",
      "rowCount": 5,
      "class": "TiledImageResourceLevel",
      "height": 2560
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "height": 1536
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "height": 1024
     },
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9EAFA1_8222_9F67_41CC_DA6ABE4A820C",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BD23E079_8222_A1E4_41AA_C789C932BD1B",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_camera",
 "class": "PanoramaCamera"
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "height": 603,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "DPTO-701-PLANTA-2",
 "id": "map_9553EA2D_8221_E13C_41DC_91064D6910E9",
 "initialZoomFactor": 1,
 "width": 920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.04,
 "thumbnailUrl": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_t.png",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_9553FA2D_8221_E13C_41DE_0D52177772CF",
  "this.overlay_95538A2D_8221_E13C_41D3_4BB4F45E553F",
  "this.overlay_95539A2D_8221_E13C_41BE_3E81B15BA1C4",
  "this.overlay_A879A92B_8221_E0CA_41C8_AE1DA972AAEC",
  "this.overlay_AAAE3354_8222_A75E_41D8_59C4776AF56E",
  "this.overlay_AEBF0714_8221_60DE_41DF_F7E75798382D"
 ],
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayInsideColor": "#0D1E3B"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_camera",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_out",
 "id": "effect_3F3D515A_22F5_B641_41AF_472A74851EFD",
 "class": "FadeOutEffect",
 "duration": 200
},
{
 "easing": "quad_in",
 "id": "effect_3F3D415A_22F5_B641_4176_C13E8BC46385",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "automaticZoomSpeed": 10,
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -0.92,
  "class": "PanoramaCameraPosition",
  "pitch": -34.9
 },
 "id": "camera_BD00404C_8222_A13D_41AA_90E1E70F3A93",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BDA06581_8227_A324_41D4_A1735B5E590F_camera",
 "class": "PanoramaCamera"
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "height": 603,
 "maximumZoomFactor": 1.2,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "DPTO-604-PLANTA-2",
 "id": "map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
 "initialZoomFactor": 1,
 "width": 920,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.04,
 "thumbnailUrl": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_t.png",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_E62E4F3F_FEE3_0CF6_41D6_5965EA3F65E8",
  "this.overlay_E37F1816_FEFF_14B4_4195_F50DB180F772",
  "this.overlay_E62DAF3F_FEE3_0CF6_41D4_356ADDA16A2D",
  "this.overlay_DAA06E8B_FFC8_9E47_41D7_B698C18E9F0F",
  "this.overlay_E62DBF3F_FEE3_0CF6_41B3_62E4194294F8",
  "this.overlay_E3F4C8A5_FEE3_F597_41E5_D0C5AE35E6CA",
  "this.overlay_E3E09D3F_FEE5_0CF3_41DA_87FF965E2290",
  "this.overlay_E31927D4_FEE5_7BB5_41C1_482702391A11"
 ],
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayInsideColor": "#001E3B"
},
{
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC56618B_8222_A33B_41D5_31871A9356EF",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_9B62DEAA_8221_A124_41DA_A0C0D1998DE8",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "playList_BE9FDFA1_8222_9F67_41C8_977FC3C44592",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "displayOriginPosition": {
  "hfov": 165,
  "stereographicFactor": 1,
  "yaw": -0.05,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 },
 "manualRotationSpeed": 500,
 "displayMovements": [
  {
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 1000
  },
  {
   "targetStereographicFactor": 0,
   "easing": "cubic_in_out",
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 3000,
   "targetPitch": 14.13
  }
 ],
 "initialPosition": {
  "yaw": -0.05,
  "class": "PanoramaCameraPosition",
  "pitch": 14.13
 },
 "id": "panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_camera",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_in",
 "id": "effect_3FB7420B_22F7_D5C7_4198_CD44E66661AC",
 "class": "FadeInEffect",
 "duration": 200
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 122.78,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BDC5E117_8222_A32B_41C6_CFB13D06BD7C",
 "class": "PanoramaCamera"
},
{
 "easing": "quad_in",
 "id": "effect_4D468A42_571D_AF46_41C4_8C8358C32FB0",
 "class": "SlideOutEffect",
 "duration": 400,
 "to": "left"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 19.92,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BC1E0143_8222_A32B_41C7_1063D0D7931F",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer"
  }
 ],
 "id": "playList_BE9F2FA1_8222_9F67_41D6_D89FFFD08746",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_9553EA2D_8221_E13C_41DC_91064D6910E9",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9C0FA1_8222_9F67_41C1_C342D13CF6E2",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_camera",
 "class": "PanoramaCamera"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer"
  }
 ],
 "id": "playList_BE9E8FA1_8222_9F67_41DE_D53FFA679E81",
 "class": "PlayList"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_camera",
 "class": "PanoramaCamera"
},
{
 "initialSequence": {
  "class": "PanoramaCameraSequence",
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
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_BEF64015_8222_A12C_41DE_41C16CF643FC",
 "class": "PanoramaCamera"
},
{
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 7,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarBorderRadius": 0,
 "minHeight": 50,
 "playbackBarProgressBorderColor": "#000000",
 "height": "100%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Swis721 LtCn BT",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 100,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#333333",
 "toolTipFontColor": "#FFFFFF",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "data": {
  "name": "Main Viewer"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.8
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_9CD0A028_A9D4_E880_41AB_FF26BFCBC926",
 "left": "0.05%",
 "width": 300,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932",
  "this.Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F"
 ],
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": false,
 "height": "100%",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0.8,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "AURA PANEL"
 },
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
 "toolTipPaddingBottom": 4,
 "width": 360,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "right": 20,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "minHeight": 150,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "height": 280,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 360,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 10,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "data": {
  "name": "PLANOS"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--LOCATION"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--PLANTA 701-1"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_7DABF279_60D0_4587_41BE_BB0754751B70"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false)",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--PLANTA 701-2"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_3B000ABF_22CD_CA3F_418A_406A87F5B6EA",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_3B00BABF_22CD_CA3F_4196_8059B3DFE268"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--PLANTA 303"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_610403E3_22D4_DA47_41A4_830DC852C065",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_6105D3E2_22D4_DA41_418C_50644C9E3D5B"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "click": "this.setComponentVisibility(this.Container_610403E3_22D4_DA47_41A4_830DC852C065, false, 0, null, null, false)",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--PLANTA 604-1"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_6105EF4E_22D3_4A41_41B9_2471196AFC02"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "click": "this.setComponentVisibility(this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2, false, 0, null, null, false)",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--PLANTA 604-2"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_4DC45133_755E_020A_41CF_F8920040CCCD",
 "left": "0%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_4DDB8132_755E_020A_41C1_52FFC36C1B4C"
 ],
 "paddingLeft": 0,
 "right": "0%",
 "backgroundOpacity": 0.6,
 "top": "0%",
 "contentOpaque": false,
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, false, 0, null, null, false)",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "--PLANTA 604-3"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "id": "Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB",
 "width": "1.33%",
 "shadow": false,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "maxWidth": 157,
 "url": "skin/Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB.png",
 "maxHeight": 7630,
 "right": "0%",
 "backgroundOpacity": 0,
 "bottom": "12.13%",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "height": "72.216%",
 "class": "Image",
 "propagateClick": false,
 "borderSize": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image84735"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF, this.camera_BECB2FEB_8222_9EFB_41CB_667C9071D380); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6C7F87_8222_9F2B_41B6_494E74796250",
   "yaw": 103.39,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.5,
   "hfov": 9,
   "distance": 100
  }
 ],
 "id": "overlay_B4E8CC52_8223_A125_41D8_19FD66190454",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9,
   "yaw": 103.39,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.5
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow Transparent Left"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E, this.camera_BED0BFD8_8222_9F25_41E0_5C175F9BE904); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dpto 603"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_1_HS_8_0.png",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 64
     }
    ]
   },
   "pitch": -1.58,
   "hfov": 2.78,
   "yaw": -38.41,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B4E8BC52_8223_A125_41DA_60A95D5A56E2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.78,
   "yaw": -38.41,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.58
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BE4E4B3D_8227_E75C_4190_F639164FE079, this.camera_BD5FE086_8222_A12D_41D2_B945CA8971C9); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ba\u00f1o Principal"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE627F99_8222_9F27_41D7_7C2FD8844F82",
   "yaw": 151.38,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.06,
   "hfov": 4.8,
   "distance": 100
  }
 ],
 "id": "overlay_BDA04581_8227_A324_41C8_520F2F79E736",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 151.38,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.06
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86, this.camera_BD48E095_8222_A12F_41D2_7B81E0FCACAC); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE623F99_8222_9F27_41BD_6EA2490F7265",
   "yaw": 68.25,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.88,
   "hfov": 4.95,
   "distance": 100
  }
 ],
 "id": "overlay_BDA0A581_8227_A324_41A8_3792CA5ACC95",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.95,
   "yaw": 68.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93, this.camera_BD1AB031_8222_A167_41DE_B81C22871AA8); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE99FF9C_8222_9F5D_41CA_93CAA16313BC",
   "yaw": 39.43,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.38,
   "hfov": 9,
   "distance": 50
  }
 ],
 "id": "overlay_BEE11F3E_8223_7F5D_41DC_DAD85608EA3D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 9,
   "yaw": 39.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BFE82021_8223_E167_41D2_037B36EC84EB, this.camera_BD16C035_8222_A16F_41CB_453667C6002C); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE994F9D_8222_9F5F_41D7_09F1CD5012DD",
   "yaw": -4.45,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -7.57,
   "hfov": 4.46,
   "distance": 100
  }
 ],
 "id": "overlay_BEE13F3E_8223_7F5D_41B8_61F178B7B5E2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.46,
   "yaw": -4.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Imagen"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738, this.camera_BD00404C_8222_A13D_41AA_90E1E70F3A93); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_1_0.png",
      "width": 112,
      "class": "ImageResourceLevel",
      "height": 84
     }
    ]
   },
   "pitch": 2.9,
   "hfov": 5.06,
   "yaw": -40.16,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B4C56330_8222_E765_41DF_48CB38D50ECE",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.06,
   "yaw": -40.16,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_1_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.9
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02a Right-Up"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6A6F87_8222_9F2B_41BB_E8A5442BFDAB",
   "yaw": -17.95,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -41.29,
   "hfov": 2.71,
   "distance": 50
  }
 ],
 "id": "overlay_B4C51330_8222_E765_41B6_AB6E37C4106C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.71,
   "yaw": -17.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -41.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16, this.camera_BD3D904F_8222_A13B_41A2_1AD1662A344F); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6DDF87_8222_9F2B_41D8_D7FD9CB52973",
   "yaw": -40.62,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -33.53,
   "hfov": 3.75,
   "distance": 100
  }
 ],
 "id": "overlay_B4C50330_8222_E765_41DA_C4C9EB94B855",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.75,
   "yaw": -40.62,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03a"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF, this.camera_BD36B068_8222_A1E5_41A8_9F09182E0599); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6DAF87_8222_9F2B_41DB_A56D8DD94E20",
   "yaw": -14.26,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -72.55,
   "hfov": 3.37,
   "distance": 100
  }
 ],
 "id": "overlay_B4C53330_8222_E765_41BD_B79CA6ECDB19",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.37,
   "yaw": -14.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -72.55
  }
 ]
},
{
 "items": [
  {
   "media": "this.album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
   "class": "PhotoPlayListItem",
   "camera": {
    "easing": "linear",
    "duration": 5000,
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
    "scaleMode": "fit_outside",
    "class": "MovementPhotoCamera"
   }
  },
  {
   "media": "this.album_444B5D56_6071_FE31_41BF_E608FEDA2243",
   "class": "PhotoPlayListItem",
   "camera": {
    "easing": "linear",
    "duration": 5000,
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
    "scaleMode": "fit_outside",
    "class": "MovementPhotoCamera"
   }
  }
 ],
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "map": {
  "width": 20,
  "x": 384.08,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_HS_10_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 236.92,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 20,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Terraza 2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E615C030_FEE5_748A_41B9_8C220F0A9B8A",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 384.08,
  "y": 236.92,
  "width": 20,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_HS_10.png",
     "width": 20,
     "class": "ImageResourceLevel",
     "height": 20
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 20
 }
},
{
 "map": {
  "width": 20,
  "x": 546.67,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_HS_11_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 308.25,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 20,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "Terraza 1"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E615D030_FEE5_748A_41D4_FCFAA721BCCA",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 546.67,
  "y": 308.25,
  "width": 20,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_HS_11.png",
     "width": 20,
     "class": "ImageResourceLevel",
     "height": 20
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 20
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F, this.camera_BEF64015_8222_A12C_41DE_41C16CF643FC); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Principal"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE63BF98_8222_9F25_41D9_890C86949109",
   "yaw": 41.81,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -7.59,
   "hfov": 8.92,
   "distance": 100
  }
 ],
 "id": "overlay_BED1DEE5_8226_9EEF_41DC_D36493C42CE5",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.92,
   "yaw": 41.81,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.59
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA07096D_8227_63FC_419A_57482630962B, this.camera_BEE3D022_8222_A165_41D2_F507DBB73838); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Secundario 1"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE637F99_8222_9F27_41DE_3239A0999AAC",
   "yaw": -80.34,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.29,
   "hfov": 4.8,
   "distance": 100
  }
 ],
 "id": "overlay_BED13EE5_8226_9EEF_41D3_60DA0113CFF0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -80.34,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C2332334_8221_E76D_41B3_3B2D5B19E552, this.camera_BEC49FF9_8222_9EE7_41D3_9335A2A0D570); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ba\u00f1o Familiar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE632F99_8222_9F27_4199_2709D69A39C6",
   "yaw": -108.29,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.09,
   "hfov": 4.8,
   "distance": 100
  }
 ],
 "id": "overlay_BED12EE5_8226_9EEF_41D1_79924D53CADF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.8,
   "yaw": -108.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02b Left"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E, this.camera_BEFF6003_8222_A12B_41B2_F0500C01B248); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE628F99_8222_9F27_41C7_72BDAB6B31DB",
   "yaw": 177.89,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -14.59,
   "hfov": 4.65,
   "distance": 100
  }
 ],
 "id": "overlay_BED17EE5_8226_9EEF_41DB_D35834565849",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.65,
   "yaw": 177.89,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_15_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.59
  }
 ]
},
{
 "media": "this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_B8EBDF14_A7F4_D876_41E2_24E8CA7F08AF, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_camera",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BCBD364B_A7D4_68D2_41C9_1FA89A1A23DB, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE850FAF_8222_9F7B_41DA_EFE13E230F28",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5100F0_A7F5_A9CE_41D8_6446A7D705FB, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_camera",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5E4F44_A7CC_58D6_41DF_9C47E76A87BE, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE84CFAF_8222_9F7B_41E0_5DB673769214",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5E10F0_A7F5_A9CE_41A7_B92C1ACA5DB3, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3_camera",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5F8F43_A7CC_58D2_41D8_DF244C29624F, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE849FAF_8222_9F7B_41DD_E3FC109EE89B",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5CD0EF_A7F5_A9D2_41E2_3824B0946812, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_camera",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5FBF43_A7CC_58D2_41AA_4532B9A7D12C, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE847FAF_8222_9F7B_41D7_10C2C884C602",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB51ED10_A7CC_584E_41E4_5D75E4F1C6AE, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_camera",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5FEF40_A7CC_58CE_41BB_C81A3CE4CC8B, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE840FAF_8222_9F7B_41D2_EA00AB179538",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E",
 "camera": "this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE923FA1_8222_9F67_41AA_591B1AF2B32E, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE923FA1_8222_9F67_41AA_591B1AF2B32E",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BD36765E_8221_61DD_41D6_F35CD9879261",
 "camera": "this.panorama_BD36765E_8221_61DD_41D6_F35CD9879261_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE95BFA1_8222_9F67_41DE_A70C4DFCB3E6, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE95BFA1_8222_9F67_41DE_A70C4DFCB3E6",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D",
 "camera": "this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE94DFA1_8222_9F67_41DF_2C79AB523D73, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE94DFA1_8222_9F67_41DF_2C79AB523D73",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BB60499A_8221_6325_41D3_1823EE361757",
 "camera": "this.panorama_BB60499A_8221_6325_41D3_1823EE361757_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE940FA1_8222_9F67_41C2_E4EDC995F5D6, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE940FA1_8222_9F67_41C2_E4EDC995F5D6",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86",
 "camera": "this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE97BFA1_8222_9F67_41CC_1858036B4BDB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE97BFA1_8222_9F67_41CC_1858036B4BDB",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F",
 "camera": "this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE96CFA1_8222_9F67_41B4_A39D8B5328CB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE96CFA1_8222_9F67_41B4_A39D8B5328CB",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BE4E4B3D_8227_E75C_4190_F639164FE079",
 "camera": "this.panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE97CFA1_8222_9F67_41D5_3EEEE09B6928, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE97CFA1_8222_9F67_41D5_3EEEE09B6928",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BA07096D_8227_63FC_419A_57482630962B",
 "camera": "this.panorama_BA07096D_8227_63FC_419A_57482630962B_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE976FA1_8222_9F67_41DA_074CD9CF244A, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE976FA1_8222_9F67_41DA_074CD9CF244A",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C",
 "camera": "this.panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE969FA1_8222_9F67_41D0_A9B12933262B, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE969FA1_8222_9F67_41D0_A9B12933262B",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_C2332334_8221_E76D_41B3_3B2D5B19E552",
 "camera": "this.panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE89DFA1_8222_9F67_41C7_E5EB9F7D324F, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE89DFA1_8222_9F67_41C7_E5EB9F7D324F",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4",
 "camera": "this.panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE896FA1_8222_9F67_41AD_41A5100F61F2, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 16)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE896FA1_8222_9F67_41AD_41A5100F61F2",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2",
 "camera": "this.panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE888FA1_8222_9F67_41A5_5ACB4E4A1DD6, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 16, 17)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE888FA1_8222_9F67_41A5_5ACB4E4A1DD6",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93",
 "camera": "this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE881FA1_8222_9F67_41CB_7D6BB08AD99D, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 17, 18)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE881FA1_8222_9F67_41CB_7D6BB08AD99D",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C",
 "camera": "this.panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE8B5FA1_8222_9F67_41B9_D0B5E425BB4E, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 18, 19)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE8B5FA1_8222_9F67_41B9_D0B5E425BB4E",
 "class": "PanoramaPlayListItem"
},
{
 "media": "this.panorama_BFE82021_8223_E167_41D2_037B36EC84EB",
 "camera": "this.panorama_BFE82021_8223_E167_41D2_037B36EC84EB_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_BE8AFFA1_8222_9F67_4177_F2F7A750CE64, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 19, 20)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_BE8AFFA1_8222_9F67_4177_F2F7A750CE64",
 "class": "PanoramaPlayListItem"
},
{
 "items": [
  {
   "media": "this.album_383D1026_2235_55C1_41B4_B2C4B0B66487_0",
   "class": "PhotoPlayListItem",
   "camera": {
    "easing": "linear",
    "duration": 5000,
    "targetPosition": {
     "x": "0.65",
     "class": "PhotoCameraPosition",
     "y": "0.44",
     "zoomFactor": 1.1
    },
    "initialPosition": {
     "x": "0.50",
     "class": "PhotoCameraPosition",
     "y": "0.50",
     "zoomFactor": 1
    },
    "scaleMode": "fit_outside",
    "class": "MovementPhotoCamera"
   }
  }
 ],
 "id": "album_383D1026_2235_55C1_41B4_B2C4B0B66487_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4, this.camera_BCBCF1DF_8222_A2DB_41DF_F1D37185EBE5); this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ba\u00f1o de Visita"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE671F9B_8222_9F5B_41B2_7D4E98AB47C3",
   "yaw": -171.4,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.76,
   "hfov": 4.5,
   "distance": 100
  }
 ],
 "id": "overlay_BAAE3AFB_8222_E6DB_41D6_608287DB6949",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.5,
   "yaw": -171.4,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.76
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C, this.camera_BCADE1EF_8222_A2FC_41DA_E014DFC4A884); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE66FF9C_8222_9F5D_41E0_43F66A476873",
   "yaw": 74.19,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.27,
   "hfov": 4.8,
   "distance": 100
  }
 ],
 "id": "overlay_BAAFCAFB_8222_E6DB_41DB_696D6F6E1EDD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 74.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.27
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C, this.camera_BCDAB1F8_8222_A2E5_41B7_46335281914D); this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Terraza"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE66BF9C_8222_9F5D_41CF_71BA11C3BC13",
   "yaw": -127.35,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -2.88,
   "hfov": 7.19,
   "distance": 50
  }
 ],
 "id": "overlay_BAAFDAFB_8222_E6DB_41DE_4B3C77C726AD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 7.19,
   "yaw": -127.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -2.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E, this.camera_BC8EC1C4_8222_A32D_41DF_F2477FE069CE); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "1er Piso"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE660F9C_8222_9F5D_41DC_7B1944420DA8",
   "yaw": -81.35,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -4.79,
   "hfov": 4.48,
   "distance": 50
  }
 ],
 "id": "overlay_BAAFEAFB_8222_E6DB_41D2_5F1D2C625005",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.48,
   "yaw": -81.35,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.79
  }
 ]
},
{
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765E",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "height": "99.975%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "data": {
  "name": "PLANTA 604-2"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1
},
{
 "map": {
  "width": 29,
  "x": 499.42,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_0_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 241.95,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "COMEDOR 1"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD31B8A_8221_A7E4_41C3_4D482E45FA1A",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 499.42,
  "y": 241.95,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 586.13,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_1_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 242.47,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "SALA"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD36B8A_8221_A7E4_41C9_3E43B2D6EE4A",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 586.13,
  "y": 242.47,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 411.49,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_3_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 123.53,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "COCINA"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD37B8A_8221_A7E4_41DF_BC881178F5FD",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 411.49,
  "y": 123.53,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_3.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 261.97,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_5_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 259.71,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "PASILLO 1"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD3AB8A_8221_A7E4_41D7_28BB06D82335",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 261.97,
  "y": 259.71,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_5.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 307.01,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_7_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 323.47,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "SH"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD39B8A_8221_A7E4_41CD_4C115C81D321",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 307.01,
  "y": 323.47,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_7.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 191.02,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_8_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 219.52,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "DP"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD3EB8A_8221_A7E4_41D3_9433DB16F841",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 191.02,
  "y": 219.52,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_8.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 180.71,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_9_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 302.77,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "SHP"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD3DB8A_8221_A7E4_41D2_789E5C00B272",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 180.71,
  "y": 302.77,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_9.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 263.87,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_10_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 412.18,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "DS2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9AD03B8A_8221_A7E4_41D1_03ED0DD24FC1",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 263.87,
  "y": 412.18,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_10.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 582.23,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_12_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 96.24,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "SALA 2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_AA7A4643_8221_A0B8_41D5_5661EDFB3421",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 582.23,
  "y": 96.24,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9AD30B8A_8221_A7E4_41B3_D42E0E2CA254_HS_12.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "height": "99.975%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "data": {
  "name": "PLANTA 604-3"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86, this.camera_BDBD80E6_8222_A2ED_41DF_326E77624D56); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE641F9B_8222_9F5B_41C3_C521B4C2B831",
   "yaw": -30.43,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -15.95,
   "hfov": 11.54,
   "distance": 100
  }
 ],
 "id": "overlay_C2333335_8221_E76F_41A1_D8D4BD6EE945",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.54,
   "yaw": -30.43,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -15.95
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE652F9A_8222_9F25_41D8_0D7264C2117E",
   "yaw": 106.56,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.19,
   "hfov": 6.3,
   "distance": 100
  }
 ],
 "id": "overlay_BDF3872A_8226_AF65_41D8_BC38D6F373C0",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.3,
   "yaw": 106.56,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2, this.camera_BDE1512E_8222_A37D_41D7_29FFCEA35A60); this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Ba\u00f1o"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE648F9B_8222_9F5B_41D2_E26FD980CC2B",
   "yaw": 58.1,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.14,
   "hfov": 4.5,
   "distance": 100
  }
 ],
 "id": "overlay_BDF3672A_8226_AF65_41DE_C270BFB02B72",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.5,
   "yaw": 58.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BD36765E_8221_61DD_41D6_F35CD9879261, this.camera_BC1E0143_8222_A32B_41C7_1063D0D7931F); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6FEF87_8222_9F2B_4193_548474DA3D73",
   "yaw": 37.9,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.53,
   "hfov": 10.44,
   "distance": 100
  }
 ],
 "id": "overlay_BCFD9CA5_8222_E16F_41DD_EE489324053B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.44,
   "yaw": 37.9,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Principal"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6FAF87_8222_9F2B_41E0_1FC360BA2617",
   "yaw": -141.31,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.77,
   "hfov": 3,
   "distance": 100
  }
 ],
 "id": "overlay_BCFDBCA5_8222_E16F_41D6_F69CAE9EC82E",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3,
   "yaw": -141.31,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.77
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D, this.camera_BC2A2161_8222_A3E7_41AB_6DE826AD59B1); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Cocina"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6F1F87_8222_9F2B_41C6_3E9CA03EF793",
   "yaw": -61.69,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.01,
   "hfov": 3.15,
   "distance": 50
  }
 ],
 "id": "overlay_BCFD4CA5_8222_E16F_41BF_71B81628CE5C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.15,
   "yaw": -61.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.01
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6EFF87_8222_9F2B_41DB_F8964F643560",
   "yaw": 4.59,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -21.16,
   "hfov": 6.3,
   "distance": 100
  }
 ],
 "id": "overlay_BCFD7CA5_8222_E16F_41D4_AED571C043C2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 6.3,
   "yaw": 4.59,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_12_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.16
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Salida"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6EAF96_8222_9F2D_41C1_FEC806A356E4",
   "yaw": -172.88,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -1.72,
   "hfov": 4.5,
   "distance": 50
  }
 ],
 "id": "overlay_BCFD6CA5_8222_E16F_41C5_CDEC48DBBF8F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.5,
   "yaw": -172.88,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_13_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -1.72
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93, this.camera_BC3D5160_8222_A3E5_41B5_6680DAFC8B28); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6E7F96_8222_9F2D_41AE_D7EC64CF680E",
   "yaw": -84.91,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 1.34,
   "hfov": 4.5,
   "distance": 50
  }
 ],
 "id": "overlay_BCFD0CA5_8222_E16F_41D3_F0113752CADD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.5,
   "yaw": -84.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_14_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 1.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86, this.camera_BC0EE151_8222_A326_41D9_BA410A242833); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE61DF96_8222_9F2D_4165_DBCE84853602",
   "yaw": -144.47,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -14.55,
   "hfov": 5.23,
   "distance": 100
  }
 ],
 "id": "overlay_BCFD3CA5_8222_E16F_41D9_EBAA0425BA1A",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.23,
   "yaw": -144.47,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_15_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -14.55
  }
 ]
},
{
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "height": "99.975%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "paddingTop": 0,
 "data": {
  "name": "PLANTA 604-1"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BDA06581_8227_A324_41D4_A1735B5E590F, this.camera_BED97FD0_8222_9F25_41D4_4372DA1C7128); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Dormitorio Principal"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE659F9A_8222_9F25_41C7_560300690C5B",
   "yaw": 57.28,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -31.57,
   "hfov": 8.18,
   "distance": 100
  }
 ],
 "id": "overlay_BE4E7B3D_8227_E75C_41AE_13F9EF77F940",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 8.18,
   "yaw": 57.28,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -31.57
  }
 ]
},
{
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 7,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "height": "100%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Swis721 LtCn BT",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#333333",
 "toolTipFontColor": "#FFFFFF",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "show": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "paddingTop": 0,
 "data": {
  "name": "PLANTA 701-2"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.8
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF, this.camera_BD91F0CA_8222_A125_41BB_1BB3D3A7D94A); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6B4F87_8222_9F2B_41D2_6AC7732113E3",
   "yaw": 40.96,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.66,
   "hfov": 5.37,
   "distance": 100
  }
 ],
 "id": "overlay_B4B9DF1D_8221_BF5F_41B2_BEDD9D025BB8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.37,
   "yaw": 40.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.66
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Imagen"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3, this.camera_BD453099_8222_A127_41E0_1DAEDE294234); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_1_0.png",
      "width": 80,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": 25.64,
   "hfov": 3.25,
   "yaw": 30.98,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B4B9AF1D_8221_BF5F_41B6_A3CAC8B4DA36",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.25,
   "yaw": 30.98,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 25.64
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Imagen"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738, this.camera_BD7300AE_8222_A17D_41D8_0F85981CA7AD); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_2_0.png",
      "width": 219,
      "class": "ImageResourceLevel",
      "height": 219
     }
    ]
   },
   "pitch": 57.31,
   "hfov": 5.35,
   "yaw": -33.69,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_B4B9BF1D_8221_BF5F_41DF_26C0FE18BDC8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.35,
   "yaw": -33.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 57.31
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0, this.camera_BD63E0B3_8222_A16B_41D2_2470422697D4); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6A9F87_8222_9F2B_41B5_AFF6CEB3CF65",
   "yaw": 8.37,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.92,
   "hfov": 4.77,
   "distance": 50
  }
 ],
 "id": "overlay_B4B98F1D_8221_BF5F_41DC_A153BB05AD81",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.77,
   "yaw": 8.37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.92
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE993F9D_8222_9F5F_41A7_6321C226F69B",
   "yaw": 14.73,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -8.48,
   "hfov": 1.78,
   "distance": 100
  }
 ],
 "id": "overlay_BFE8C021_8223_E167_41D3_BD3E6D9D2161",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 1.78,
   "yaw": 14.73,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_1_HS_0_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -8.48
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE666F9D_8222_9F5E_41D3_A36858D810A5",
   "yaw": 13.27,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.49,
   "hfov": 2.25,
   "distance": 50
  }
 ],
 "id": "overlay_BFE8D021_8223_E167_41D5_850BB2599043",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.25,
   "yaw": 13.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C, this.camera_BD23E079_8222_A1E4_41AA_C789C932BD1B); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE678F9B_8222_9F5B_41BE_9AE6FDA1CFC9",
   "yaw": -59.03,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -32.28,
   "hfov": 10.15,
   "distance": 100
  }
 ],
 "id": "overlay_C2B7400D_8222_A13C_41DD_585F8400D672",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.15,
   "yaw": -59.03,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.28
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Imagen"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3, this.camera_BDABA0F3_8222_A2EB_41CA_B8D1791FC778); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_0_0.png",
      "width": 91,
      "class": "ImageResourceLevel",
      "height": 91
     }
    ]
   },
   "pitch": 5.51,
   "hfov": 4.1,
   "yaw": 37,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BB71CF0B_8223_FF3B_41B9_0A2DF1FF48C7",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.1,
   "yaw": 37,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 5.51
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02a Left-Up"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6D0F87_8222_9F2B_41DB_903D3D8E01F2",
   "yaw": 14.11,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -54.53,
   "hfov": 2.87,
   "distance": 50
  }
 ],
 "id": "overlay_BB71DF0B_8223_FF3B_41BF_E7C7B90A2E7B",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.87,
   "yaw": 14.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -54.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF, this.camera_BDD970FD_8222_A2DF_41BC_FF3525F28A4D); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6CFF87_8222_9F2B_41DE_B6AB65847E0A",
   "yaw": 57.25,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -37.55,
   "hfov": 3.57,
   "distance": 100
  }
 ],
 "id": "overlay_BB71EF0B_8223_FF3B_41A6_F2CD5D8D743E",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.57,
   "yaw": 57.25,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_5_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -37.55
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03a"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16, this.camera_BDD7A105_8222_A32F_41D6_5043300D8D6B); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6C8F87_8222_9F2B_41CC_C3A3A775BA66",
   "yaw": -21.19,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -80.1,
   "hfov": 3.87,
   "distance": 100
  }
 ],
 "id": "overlay_BB71FF0B_8223_FF3B_41DE_0270DFC6DCAC",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.87,
   "yaw": -21.19,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -80.1
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E, this.camera_BC56618B_8222_A33B_41D5_31871A9356EF); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE63AF97_8222_9F2B_41C4_5D7E9D2DA11D",
   "yaw": -157.13,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -32.7,
   "hfov": 5.05,
   "distance": 50
  }
 ],
 "id": "overlay_BF8869F4_8221_E2ED_41D7_B1AF95859E5C",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.05,
   "yaw": -157.13,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -32.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB60499A_8221_6325_41D3_1823EE361757, this.camera_BC476194_8222_A32D_41DA_B9313A40F73A); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE60EF98_8222_9F25_41CE_558AC2D52023",
   "yaw": 167.67,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -19.88,
   "hfov": 5.64,
   "distance": 100
  }
 ],
 "id": "overlay_BF8809F4_8221_E2ED_41DA_F57C7D2DC10D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 5.64,
   "yaw": 167.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_1_HS_5_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.88
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93, this.camera_BC58B17B_8222_A3DB_41CE_3388C0547D6B); this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE67DF9B_8222_9F5B_41DA_7C3409256F95",
   "yaw": -153.29,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.99,
   "hfov": 14.92,
   "distance": 100
  }
 ],
 "id": "overlay_BA7F38E4_8221_A2ED_41D0_6B86CE4FDBD3",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 14.92,
   "yaw": -153.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.99
  }
 ]
},
{
 "map": {
  "width": 29,
  "x": 441,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 365.6,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "COMEDOR"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E6062C39_FEE3_0CFA_41DC_BB797E9E904A",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 441,
  "y": 365.6,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 547.1,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 364.6,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "SALA"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E6063C39_FEE3_0CFA_41EF_07E4478308A7",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 547.1,
  "y": 364.6,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 341.9,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 331.65,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "COCINA"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E6060C39_FEE3_0CFA_41A2_BB8A294A34DD",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 341.9,
  "y": 331.65,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 439.05,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_3_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 217.85,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "PASILLO 1"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E6061C39_FEE3_0CFA_41E7_1FFBE0756AF2",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 439.05,
  "y": 217.85,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_3.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 586.65,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_4_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 215.45,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "DORMITORIO SECUNDARIO 1"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E606EC39_FEE3_0CFA_41C7_4AD732F2096E",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 586.65,
  "y": 215.45,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_4.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 529.4,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_5_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 164.6,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "BA\u00d1O DOR SEC 1"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E606FC39_FEE3_0CFA_41D7_4E2287FFAB9F",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 529.4,
  "y": 164.6,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_5.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 404.5,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_6_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 167.2,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "BA\u00d1O VISITA 1"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E606CC39_FEE3_0CFA_41EF_51A4232AD450",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 404.5,
  "y": 167.2,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_6.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 171.4,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_8_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 217.45,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "ESTUDIO"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E606AC39_FEE3_0CFA_41D1_3B69DFE90684",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 171.4,
  "y": 217.45,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_8.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 312.5,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_10_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 163.75,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "BA\u00d1O FAMILIAR"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E6069C39_FEE3_0CFA_41DD_9A5547CDF3F7",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 312.5,
  "y": 163.75,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_HS_10.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BCFDFCA5_8222_E16F_4193_B0445526523E, this.camera_BC63C1B7_8222_A36B_41DD_64059C9051E1); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE618F96_8222_9F2D_41BD_F87E050A7CC7",
   "yaw": -160.08,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -28.53,
   "hfov": 11.86,
   "distance": 100
  }
 ],
 "id": "overlay_BD36B65E_8221_61DD_41D2_F17B75C96798",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 11.86,
   "yaw": -160.08,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -28.53
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03b"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D, this.camera_BC9081C4_8222_A32D_41D4_9F285DC15D70); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Cocina"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE617F96_8222_9F2D_41C9_CAE5E0FA2F80",
   "yaw": -100.45,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.07,
   "hfov": 2.25,
   "distance": 50
  }
 ],
 "id": "overlay_BD36A65E_8221_61DD_41C8_47E7F13C1FC2",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.25,
   "yaw": -100.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.07
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Salida"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE60DF97_8222_9F2B_41D1_74C64FE5BEF5",
   "yaw": -162.03,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.29,
   "hfov": 2.25,
   "distance": 50
  }
 ],
 "id": "overlay_BD36C65E_8221_61DD_41DB_D3A520675B3E",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.25,
   "yaw": -162.03,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.29
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE60AF97_8222_9F2B_41D7_D27118632D5B",
   "yaw": -149.93,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -10.24,
   "hfov": 3.1,
   "distance": 100
  }
 ],
 "id": "overlay_BD36E65E_8221_61DD_41DD_64E12AE7BD5F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.1,
   "yaw": -149.93,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_8_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -10.24
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Right"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB60499A_8221_6325_41D3_1823EE361757, this.camera_BC75E1A8_8222_A365_41BB_1394EDB9AEC7); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE606F97_8222_9F2B_41C3_8469FD0254B8",
   "yaw": -57.22,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -25.08,
   "hfov": 10.19,
   "distance": 100
  }
 ],
 "id": "overlay_BD37165E_8221_61DD_41D7_435A3D081FFD",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 10.19,
   "yaw": -57.22,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_9_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -25.08
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Estar"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE63DF97_8222_9F2B_4183_2A100A3722F3",
   "yaw": -129.02,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.06,
   "hfov": 2.25,
   "distance": 50
  }
 ],
 "id": "overlay_BD37065E_8221_61DD_41DA_B6414663EA22",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.25,
   "yaw": -129.02,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.06
  }
 ]
},
{
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 7,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 0,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "height": "100%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Swis721 LtCn BT",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#333333",
 "toolTipFontColor": "#FFFFFF",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "show": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "paddingTop": 0,
 "data": {
  "name": "PLANTA 701-1"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "13px",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.8
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BD36765E_8221_61DD_41D6_F35CD9879261, this.camera_BDC5E117_8222_A32B_41C6_CFB13D06BD7C); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE605F98_8222_9F25_41A6_92B43A76B101",
   "yaw": 70.04,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -23.25,
   "hfov": 4.13,
   "distance": 100
  }
 ],
 "id": "overlay_BB60799A_8221_6325_41C2_2955080AB9DF",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.13,
   "yaw": 70.04,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_1_HS_5_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.25
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02 Left"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D, this.camera_BDF2C128_8222_A364_41D1_88F10F2B5721); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Cocina"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE600F98_8222_9F25_41E0_5D74D3E86274",
   "yaw": 171.54,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.19,
   "hfov": 3.15,
   "distance": 50
  }
 ],
 "id": "overlay_BB60699A_8221_6325_41DF_FDE4F568C59F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.15,
   "yaw": 171.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_1_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02 Left"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Salida"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE63FF98_8222_9F25_41C6_265876BEF74F",
   "yaw": 112.44,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": 0.79,
   "hfov": 2.25,
   "distance": 50
  }
 ],
 "id": "overlay_BB61999A_8221_6325_41D4_2451E6776AA8",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 2.25,
   "yaw": 112.44,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_1_HS_12_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 0.79
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Imagen"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738, this.camera_BCC41219_8222_A124_41B2_2FBD6218F477); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_0_0.png",
      "width": 90,
      "class": "ImageResourceLevel",
      "height": 90
     }
    ]
   },
   "pitch": 28.78,
   "hfov": 3.55,
   "yaw": -26.67,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BD9591CE_8221_E33D_41D2_07C210F2774F",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.55,
   "yaw": -26.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 28.78
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Imagen"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4C57330_8222_E765_41CB_38FA033A93E3, this.camera_BCD6420B_8222_A13B_41C6_8301DF33C6E1); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_1_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 44.49,
   "hfov": 4.82,
   "yaw": 22.79,
   "class": "HotspotPanoramaOverlayImage"
  }
 ],
 "id": "overlay_BD95A1CE_8221_E33D_414D_C1906FF53B06",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.82,
   "yaw": 22.79,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 44.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle 03c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16, this.camera_BCE36230_8222_A165_41DC_521F3FE2BC87); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE682F87_8222_9F2B_41A6_DA52CB425994",
   "yaw": -40.97,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.99,
   "hfov": 4.48,
   "distance": 100
  }
 ],
 "id": "overlay_BD9661CE_8221_E33D_41DB_D852C1D1DA07",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.48,
   "yaw": -40.97,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0, this.camera_BCF55227_8222_A16B_41DA_A39B1FEA66D5); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE6BEF87_8222_9F2B_41B0_9B9ACCEA3442",
   "yaw": -9.67,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -5.47,
   "hfov": 3.58,
   "distance": 50
  }
 ],
 "id": "overlay_BD9671CE_8221_E33D_41CA_B47200F37718",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 3.58,
   "yaw": -9.67,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -5.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Generic 03"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86, this.camera_BD8C70CC_8222_A13D_41C0_D802E5691F95); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "toolTip": "Pasillo"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "image": "this.AnimatedImageResource_BE657F9A_8222_9F25_41C5_84DBF9185E07",
   "yaw": 107.36,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -0.97,
   "hfov": 4.72,
   "distance": 100
  }
 ],
 "id": "overlay_BA07396D_8227_63FC_41D5_B6B7F019E58D",
 "class": "HotspotPanoramaOverlay",
 "maps": [
  {
   "hfov": 4.72,
   "yaw": 107.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -0.97
  }
 ]
},
{
 "map": {
  "width": 29,
  "x": 269.55,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 244.33,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "ESTAR"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_9553FA2D_8221_E13C_41DE_0D52177772CF",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 269.55,
  "y": 244.33,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 224.47,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 157.19,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "TERRAZA"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_95538A2D_8221_E13C_41D3_4BB4F45E553F",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 224.47,
  "y": 157.19,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 183.49,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 211.17,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "SHV2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_95539A2D_8221_E13C_41BE_3E81B15BA1C4",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 183.49,
  "y": 211.17,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 671.58,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_3_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 102.13,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "TERRAZA 2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_A879A92B_8221_E0CA_41C8_AE1DA972AAEC",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 671.58,
  "y": 102.13,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_3.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 267.56,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_4_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 392.3,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "DORMITORIO SECUNDARIO 2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_AAAE3354_8222_A75E_41D8_59C4776AF56E",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 267.56,
  "y": 392.3,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_4.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 186.81,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_5_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 339.45,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "BA\u00d1O 2"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotMapOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_AEBF0714_8221_60DE_41DF_F7E75798382D",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 186.81,
  "y": 339.45,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_9553EA2D_8221_E13C_41DC_91064D6910E9_HS_5.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 574.43,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_0_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 370.6,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "PASILLO 1"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E62E4F3F_FEE3_0CF6_41D6_5965EA3F65E8",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 574.43,
  "y": 370.6,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_0.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 487.83,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_3_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 216.22,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "PASILLO 2"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E37F1816_FEFF_14B4_4195_F50DB180F772",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 487.83,
  "y": 216.22,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_3.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 559.72,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_2_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 212.36,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "DORMITORIO PRINCIPAL"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E62DAF3F_FEE3_0CF6_41D4_356ADDA16A2D",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 559.72,
  "y": 212.36,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_2.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 526.84,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_7_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 140.13,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "BA\u00d1O PRINCIPAL"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_DAA06E8B_FFC8_9E47_41D7_B698C18E9F0F",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 526.84,
  "y": 140.13,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_7.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 288.58,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_1_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 215.82,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "DORMITORIO SECUNDARIO 2"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E62DBF3F_FEE3_0CF6_41B3_62E4194294F8",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 288.58,
  "y": 215.82,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_1.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 410.74,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_4_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 369.73,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "GYM"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E3F4C8A5_FEE3_F597_41E5_D0C5AE35E6CA",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 410.74,
  "y": 369.73,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_4.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 353.02,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_5_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 173.02,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "BA\u00d1O FAMILIAR"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E3E09D3F_FEE5_0CF3_41DA_87FF965E2290",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 353.02,
  "y": 173.02,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_5.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 570.24,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_6_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 274.74,
  "offsetY": 0,
  "class": "HotspotMapOverlayMap",
  "height": 24,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "data": {
  "label": "JUEGOS"
 },
 "areas": [
  {
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_E31927D4_FEE5_7BB5_41C1_482702391A11",
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 570.24,
  "y": 274.74,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_6.png",
     "width": 29,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "class": "HotspotMapOverlayImage",
  "height": 24
 }
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932",
 "left": "0%",
 "width": 66,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Container_9CD3B025_A9D4_E880_41E2_F7E2F968C434",
  "this.IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E"
 ],
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "height": "100%",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "- COLLAPSE"
 },
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F",
 "width": 300,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "children": [
  "this.Image_9CD3E025_A9D4_E880_41D4_11D730D4859E",
  "this.Container_9CD3F025_A9D4_E880_41D0_0CEB8EB90ED5",
  "this.Container_9CD30026_A9D4_E880_41C2_588F29082802"
 ],
 "paddingLeft": 40,
 "right": "0%",
 "backgroundImageUrl": "skin/Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F.jpg",
 "backgroundOpacity": 0.7,
 "contentOpaque": true,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "paddingRight": 40,
 "height": "100%",
 "class": "Container",
 "propagateClick": true,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "- EXPANDED"
 },
 "paddingTop": 40,
 "paddingBottom": 40,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "horizontal",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "horizontalAlign": "left",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "right",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "right": "15%",
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "bottom": "80%",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "10%",
 "paddingRight": 20,
 "scrollBarColor": "#000000",
 "class": "Container",
 "propagateClick": false,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "horizontalAlign": "center",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_7DABF279_60D0_4587_41BE_BB0754751B70",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
  "this.Container_7F1D51CE_60D0_469D_41CA_F511DBBE9B65"
 ],
 "horizontalAlign": "center",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_3B00BABF_22CD_CA3F_4196_8059B3DFE268",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.ViewerAreaLabeled_3B00CABF_22CD_CA3F_415F_764A7C5A2749",
  "this.Container_3B00DABF_22CD_CA3F_41A4_282BCBFE84B2"
 ],
 "horizontalAlign": "center",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_6105D3E2_22D4_DA41_418C_50644C9E3D5B",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445",
  "this.Container_6105F3E2_22D4_DA41_4191_9FBF3AEA4258"
 ],
 "horizontalAlign": "center",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_6105EF4E_22D3_4A41_41B9_2471196AFC02",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765E",
  "this.Container_61058F4E_22D3_4A41_41AB_E291325EA4EE"
 ],
 "horizontalAlign": "center",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_4DDB8132_755E_020A_41C1_52FFC36C1B4C",
 "left": "15%",
 "shadowVerticalLength": 0,
 "layout": "absolute",
 "shadow": true,
 "shadowColor": "#000000",
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "children": [
  "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78",
  "this.Container_4DC46133_755E_020A_41C6_9CA46BC30A6D"
 ],
 "horizontalAlign": "center",
 "right": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "top": "10%",
 "bottom": "10%",
 "shadowOpacity": 0.3,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6C7F87_8222_9F2B_41B6_494E74796250",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_B4E8EC52_8223_A125_41CA_7ED3FEAE0FA0_1_HS_3_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE627F99_8222_9F27_41D7_7C2FD8844F82",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE623F99_8222_9F27_41BD_6EA2490F7265",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BDA06581_8227_A324_41D4_A1735B5E590F_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE99FF9C_8222_9F5D_41CA_93CAA16313BC",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE994F9D_8222_9F5F_41D7_09F1CD5012DD",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BEE6FF3E_8223_7F5D_41D9_F404E257AE0C_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6A6F87_8222_9F2B_41BB_E8A5442BFDAB",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6DDF87_8222_9F2B_41D8_D7FD9CB52973",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6DAF87_8222_9F2B_41DB_A56D8DD94E20",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_B4C57330_8222_E765_41CB_38FA033A93E3_1_HS_6_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE63BF98_8222_9F25_41D9_890C86949109",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_4_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE637F99_8222_9F27_41DE_3239A0999AAC",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_9_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE632F99_8222_9F27_4199_2709D69A39C6",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_10_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE628F99_8222_9F27_41C7_72BDAB6B31DB",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BED18EE5_8226_9EEF_41CC_10D076ECCB86_1_HS_15_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE671F9B_8222_9F5B_41B2_7D4E98AB47C3",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE66FF9C_8222_9F5D_41E0_43F66A476873",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_4_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE66BF9C_8222_9F5D_41CF_71BA11C3BC13",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE660F9C_8222_9F5D_41DC_7B1944420DA8",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BAAE2AFB_8222_E6DB_41D4_772E38AF3A93_1_HS_10_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE641F9B_8222_9F5B_41C3_C521B4C2B831",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C2332334_8221_E76D_41B3_3B2D5B19E552_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE652F9A_8222_9F25_41D8_0D7264C2117E",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE648F9B_8222_9F5B_41D2_E26FD980CC2B",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BDF3B72A_8226_AF65_41DD_1260BEBD5D0C_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6FEF87_8222_9F2B_4193_548474DA3D73",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6FAF87_8222_9F2B_41E0_1FC360BA2617",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_6_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6F1F87_8222_9F2B_41C6_3E9CA03EF793",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_11_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6EFF87_8222_9F2B_41DB_F8964F643560",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_12_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6EAF96_8222_9F2D_41C1_FEC806A356E4",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_13_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6E7F96_8222_9F2D_41AE_D7EC64CF680E",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_14_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE61DF96_8222_9F2D_4165_DBCE84853602",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BCFDFCA5_8222_E16F_4193_B0445526523E_1_HS_15_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE659F9A_8222_9F25_41C7_560300690C5B",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BE4E4B3D_8227_E75C_4190_F639164FE079_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6B4F87_8222_9F2B_41D2_6AC7732113E3",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6A9F87_8222_9F2B_41B5_AFF6CEB3CF65",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_B4B9CF1D_8221_BF5F_419B_7D3381FD2B16_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE993F9D_8222_9F5F_41A7_6321C226F69B",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE666F9D_8222_9F5E_41D3_A36858D810A5",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BFE82021_8223_E167_41D2_037B36EC84EB_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE678F9B_8222_9F5B_41BE_9AE6FDA1CFC9",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C2B7100D_8222_A13C_41D4_57E48A7233C2_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6D0F87_8222_9F2B_41DB_903D3D8E01F2",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6CFF87_8222_9F2B_41DE_B6AB65847E0A",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6C8F87_8222_9F2B_41CC_C3A3A775BA66",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BB711F0B_8223_FF3B_41B5_2BCDECBB4738_1_HS_6_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE63AF97_8222_9F2B_41C4_5D7E9D2DA11D",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE60EF98_8222_9F25_41CE_558AC2D52023",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BF8849F4_8221_E2ED_41DE_43EE38EB642D_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE67DF9B_8222_9F5B_41DA_7C3409256F95",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BA7F48E4_8221_A2ED_41B1_4113E51041B4_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE618F96_8222_9F2D_41BD_F87E050A7CC7",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE617F96_8222_9F2D_41C9_CAE5E0FA2F80",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_6_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE60DF97_8222_9F2B_41D1_74C64FE5BEF5",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_7_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE60AF97_8222_9F2B_41D7_D27118632D5B",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_8_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE606F97_8222_9F2B_41C3_8469FD0254B8",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_9_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE63DF97_8222_9F2B_4183_2A100A3722F3",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD36765E_8221_61DD_41D6_F35CD9879261_1_HS_10_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE605F98_8222_9F25_41A6_92B43A76B101",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE600F98_8222_9F25_41E0_5D74D3E86274",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_1_HS_11_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE63FF98_8222_9F25_41C6_265876BEF74F",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BB60499A_8221_6325_41D3_1823EE361757_1_HS_12_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE682F87_8222_9F2B_41A6_DA52CB425994",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE6BEF87_8222_9F2B_41B0_9B9ACCEA3442",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BD95F1CE_8221_E33D_41E0_4378E903D8EF_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "frameCount": 24,
 "id": "AnimatedImageResource_BE657F9A_8222_9F25_41C5_84DBF9185E07",
 "frameDuration": 41,
 "colCount": 4,
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_BA07096D_8227_63FC_419A_57482630962B_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "class": "AnimatedImageResource"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD3B025_A9D4_E880_41E2_F7E2F968C434",
 "left": "0%",
 "width": 36,
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0.4,
 "top": "0%",
 "backgroundColor": [
  "#000000"
 ],
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "height": "100%",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "Container black"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "transparencyActive": true,
 "id": "IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E",
 "left": 10,
 "width": 50,
 "shadow": false,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "maxWidth": 80,
 "maxHeight": 80,
 "backgroundOpacity": 0,
 "bottom": "40%",
 "mode": "push",
 "borderRadius": 0,
 "top": "40%",
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E.png",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F, true, 0, this.effect_4B8711AA_571D_FDC6_41C4_8313D8AEEDC7, 'showEffect', false); this.setComponentVisibility(this.Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932, false, 0, this.effect_4D468A42_571D_AF46_41C4_8C8358C32FB0, 'hideEffect', false)",
 "class": "IconButton",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E_rollover.png",
 "borderSize": 0,
 "data": {
  "name": "IconButton arrow"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1
},
{
 "id": "Image_9CD3E025_A9D4_E880_41D4_11D730D4859E",
 "left": "0%",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "maxWidth": 1095,
 "url": "skin/Image_9CD3E025_A9D4_E880_41D4_11D730D4859E.png",
 "maxHeight": 1095,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "top": "0%",
 "minHeight": 30,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": "25%",
 "class": "Image",
 "paddingRight": 0,
 "click": "this.openLink('https://grupodicon.com.pe/', '_blank')",
 "borderSize": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image Company"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 40,
 "paddingBottom": 0
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_9CD3F025_A9D4_E880_41D0_0CEB8EB90ED5",
 "left": "0%",
 "children": [
  "this.Container_9CD3C025_A9D4_E880_41E1_AD77AD58C400",
  "this.HTMLText_9CD32025_A9D4_E880_41A7_906B4F276871",
  "this.HTMLText_E2793939_A975_D883_41E2_0D44CE4FC516",
  "this.IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "bottom": "0.75%",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "bottom",
 "propagateClick": true,
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "-FRAME footer"
 },
 "height": "40.997%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_9CD30026_A9D4_E880_41C2_588F29082802",
 "left": "0%",
 "children": [
  "this.Container_9CD31026_A9D4_E880_41E2_04D648024641",
  "this.Button_9CD36026_A9D4_E880_41B0_183896A978CD",
  "this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37",
  "this.Container_9CD03026_A9D4_E880_41DB_64A7FE1BAD82",
  "this.Button_9CD00026_A9D4_E880_41D1_857DB344AF1E",
  "this.Container_9CD01026_A9D4_E880_41D5_222EAA683898",
  "this.Container_9CD37027_A9D4_E880_41E2_426E8728566A",
  "this.Button_360243EB_225F_7A47_415A_A95B4DA19C34",
  "this.Container_31C72787_2257_5ACF_41A0_ABDC47157625",
  "this.Container_3663E2CC_2253_BA41_419B_E53DCBB14090",
  "this.Button_317EE473_225C_DE47_41AC_BD4F5B413F22",
  "this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E",
  "this.Container_36408520_2253_5FC1_41BD_2CAF593C92E8",
  "this.Button_4544DB06_755A_060A_41C6_B54CDC3ACBF9",
  "this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754",
  "this.Container_451A8030_755E_0207_41D4_C58A86D88DA1",
  "this.Button_9CD01027_A9D4_E880_41E3_746447337ABD",
  "this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2",
  "this.Button_9CD35027_A9D4_E880_41E0_F5E34C0E852C",
  "this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B",
  "this.Container_9CD01028_A9D4_E880_41D3_8BBE44B2275E",
  "this.Button_9CD06028_A9D4_E880_41D0_4C2E09848B30",
  "this.Container_9CD07028_A9D4_E880_41CE_4356F9ED825B",
  "this.Container_9CD04028_A9D4_E880_41E0_25650AB19114",
  "this.Button_31B15D9B_225D_4EC7_417F_E22820A51F95",
  "this.Container_44418E8E_755A_1E1A_41D2_8AF3852C0DC7"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 6,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "bottom": "38.68%",
 "borderRadius": 0,
 "minHeight": 1,
 "top": "29.43%",
 "verticalAlign": "middle",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.15,
 "gap": 0,
 "borderSize": 0,
 "data": {
  "name": "-FRAME Menu P"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "insetBorder": false,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "backgroundColorDirection": "vertical",
 "shadow": false,
 "width": "100%",
 "scrollEnabled": true,
 "paddingLeft": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d759.2239513672519!2d-77.00327169317363!3d-12.137186850315329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDA4JzE0LjIiUyA3N8KwMDAnMTEuNSJX!5e0!3m2!1ses!2spe!4v1784608426980!5m2!1ses!2spe",
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "minHeight": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "class": "WebFrame",
 "paddingRight": 0,
 "height": "100%",
 "borderSize": 0,
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "transparencyActive": false,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "shadow": false,
 "horizontalAlign": "center",
 "width": "25%",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 50,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "verticalAlign": "middle",
 "propagateClick": false,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "class": "IconButton",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "borderSize": 0,
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 50
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": 140,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_7F1D51CE_60D0_469D_41CA_F511DBBE9B65",
 "children": [
  "this.IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": 140,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "toolTipShadowBlurRadius": 3,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_3B00CABF_22CD_CA3F_415F_764A7C5A2749",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarHeadWidth": 6,
 "width": "100%",
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingLeft": 0,
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "height": "99.975%",
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarProgressOpacity": 1,
 "paddingRight": 0,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "minWidth": 1,
 "borderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionDuration": 500,
 "playbackBarHeadShadow": true,
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "top": 0,
 "toolTipBorderRadius": 3,
 "progressBorderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "displayTooltipInTouchScreens": true,
 "borderRadius": 0,
 "playbackBarHeadHeight": 15,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "transitionMode": "blending",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "click": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "toolTipShadowSpread": 0,
 "paddingTop": 0,
 "data": {
  "name": "PLANTA 303"
 },
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_3B00DABF_22CD_CA3F_41A4_282BCBFE84B2",
 "children": [
  "this.IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": 140,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_6105F3E2_22D4_DA41_4191_9FBF3AEA4258",
 "children": [
  "this.IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": 140,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_61058F4E_22D3_4A41_41AB_E291325EA4EE",
 "children": [
  "this.IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": 140,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_4DC46133_755E_020A_41C6_9CA46BC30A6D",
 "children": [
  "this.IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": false,
 "height": 140,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "Container_9CD3C025_A9D4_E880_41E1_AD77AD58C400",
 "width": 40,
 "layout": "horizontal",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 1,
 "height": 2,
 "minHeight": 1,
 "verticalAlign": "top",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "visible",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "blue line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "HTMLText_9CD32025_A9D4_E880_41A7_906B4F276871",
 "width": "100%",
 "shadow": false,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": true,
 "height": 86,
 "scrollBarColor": "#000000",
 "class": "HTMLText",
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>GRUPO DICON</U></I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>www.guopdicon.com.pe</U></I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>inizio@grupodicon.com.pe</U></I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>Cel.: 982 185 816</U></I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "scrollBarOpacity": 0.5,
 "click": "this.openLink('https://grupodicon.com.pe/', '_blank')",
 "borderSize": 0,
 "data": {
  "name": "HTMLText47602"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "id": "HTMLText_E2793939_A975_D883_41E2_0D44CE4FC516",
 "width": "100%",
 "shadow": false,
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": true,
 "height": 45,
 "scrollBarColor": "#000000",
 "class": "HTMLText",
 "paddingRight": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:14px;font-family:'Oswald Regular';\"><I><U>Desarrollado por Totem 3D</U></I></SPAN></SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "click": "this.openLink('https://www.totem3d.com.pe/', '_blank')",
 "borderSize": 0,
 "data": {
  "name": "HTMLText47602"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "transparencyActive": true,
 "id": "IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7",
 "width": 42,
 "shadow": false,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "maxWidth": 80,
 "maxHeight": 80,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "iconURL": "skin/IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7.png",
 "propagateClick": true,
 "height": 42,
 "click": "this.setComponentVisibility(this.Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F, false, 0, this.effect_618C5950_7067_14DB_41DB_D2CA7B61EE3C, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932, true, 0, this.effect_4C974746_571D_6541_41CE_76A308A87323, 'showEffect', false)",
 "class": "IconButton",
 "paddingRight": 0,
 "rollOverIconURL": "skin/IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7_rollover.png",
 "borderSize": 0,
 "data": {
  "name": "IconButton collapse"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 1,
 "paddingBottom": 0
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD31026_A9D4_E880_41E2_04D648024641",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT AREAS COM"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_9CD36026_A9D4_E880_41B0_183896A978CD",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "\u00c1reas Com\u00fanes >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4, 'hideEffect', false); if(!this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37.get('visible')){ this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, true, 0, this.effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B, 'hideEffect', false) }",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37",
 "children": [
  "this.Container_9CD34026_A9D4_E880_41C0_ADF60C34D581",
  "this.Container_9CD35026_A9D4_E880_41E0_043F2006F875",
  "this.Button_9CD0A026_A9D4_E880_41DA_2A056A8841CA",
  "this.Button_9CD08026_A9D4_E880_41C5_FED95C751747",
  "this.Button_9CD09026_A9D4_E880_41D9_C010E68FE3B4",
  "this.Button_9CD0E026_A9D4_E880_4190_6287BB5AC208",
  "this.Button_9CD0F026_A9D4_E880_41BB_FCA355718613",
  "this.Button_9CD0C026_A9D4_E880_41CD_A682DDB9A23F",
  "this.Button_9CD0D026_A9D4_E880_41E3_8672AE3BD791",
  "this.Button_9CD02026_A9D4_E880_41A1_C787E34AC5D5",
  "this.Button_912D519A_A9F5_AB80_41C6_6108114715E5"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 198,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-MENU AC"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD03026_A9D4_E880_41DB_64A7FE1BAD82",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT DPTO 701"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_9CD00026_A9D4_E880_41D1_857DB344AF1E",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "Departamento 603 >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_9CD01026_A9D4_E880_41D5_222EAA683898.get('visible')){ this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, true, 0, this.effect_5B21267B_4F08_3100_41A1_F6699BEFB8F1, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_5B21667B_4F08_3100_41C7_3B45A9C1819F, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_9CD01026_A9D4_E880_41D5_222EAA683898",
 "children": [
  "this.Container_9CD06026_A9D4_E880_41B5_0315CEA5609B",
  "this.Container_9CD07026_A9D4_E880_41A4_E246B962EC85",
  "this.Button_3141E223_2275_75C7_41BE_0A68E3642997",
  "this.Button_30B87DAA_224D_CEC1_41B1_B2FBFF6CFF8A",
  "this.Button_9CD04026_A9D4_E880_41E3_F403655C131D",
  "this.Button_9CD05026_A9D4_E880_41CF_399BA66B2C2B",
  "this.Button_9CD1B026_A9D4_E880_41C5_D6513C9E39C5",
  "this.Button_9CD19026_A9D4_E880_4185_91A690ADE787",
  "this.Button_9CD31027_A9D4_E880_41C5_F1EB4C316B8B",
  "this.Button_9CD36027_A9D4_E880_41CD_7490BCEB0D31",
  "this.Button_E8BB4335_A9CD_A883_41D8_7B15C59E6C5F",
  "this.Button_9CD18026_A9D4_E880_41C7_8D09F066D5A5",
  "this.Button_95528198_A9CC_AB81_41BE_6D8F4B17CB8C",
  "this.Button_EA8B0EA7_A9CC_D98F_41D2_AFFD875E7B45",
  "this.Button_E8C76929_A9CC_5880_41DD_614FFCEEF598",
  "this.Button_968F942B_A9CC_A887_41C9_B456228D301A"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-MENU 701"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD37027_A9D4_E880_41E2_426E8728566A",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT DPTO 604"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_360243EB_225F_7A47_415A_A95B4DA19C34",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "Departamento 604 >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_31C72787_2257_5ACF_41A0_ABDC47157625.get('visible')){ this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, true, 0, this.effect_3FB7420B_22F7_D5C7_4198_CD44E66661AC, 'showEffect', false) } else { this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_3FB7720B_22F7_D5C7_4174_D5879CC918C1, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_31C72787_2257_5ACF_41A0_ABDC47157625",
 "children": [
  "this.Container_36CFA4C8_2257_5E41_41C0_1BE17A92F888",
  "this.Container_36CF44C9_2257_5E43_41C0_1568DA462072",
  "this.Button_31577500_2257_5FC1_41B9_83551C79DC76",
  "this.Button_3153C501_2257_5FC3_41A7_E387491247AD",
  "this.Button_E8EBA427_FFD8_81CD_41E6_617603032F34",
  "this.Button_31538501_2257_5FC3_41B3_35696BC8B542",
  "this.Button_3152B512_2257_5FC1_4186_23DFA5AD5D98",
  "this.Button_3124A534_2257_5FC1_41C0_632A1728AED4",
  "this.Button_311C2576_2257_5E41_4184_ED2B637EFC4C",
  "this.Button_E63073A4_FFF8_86C3_41EF_DE380E045C77",
  "this.Button_313D5545_2257_5E43_41BC_35AE66F68721",
  "this.Button_31CE1597_2257_5ECF_4198_A9A6DFA31D4B",
  "this.Button_E3A5EE60_FFC8_9E42_41C6_3C5B2F7090FD",
  "this.Button_31353555_2257_5E43_415A_73B917A3856E",
  "this.Button_310E7565_2257_5E43_4199_05FEC1A3139A",
  "this.Button_31E46587_2257_5ECF_41B1_BCAAF47ED3E8",
  "this.Button_31D2C5A6_2257_5EC1_41B7_2CD05247055D",
  "this.Button_E07C6918_FFC9_83C3_41E9_B663BA7159F7",
  "this.Button_31B6C5C9_2257_5E43_41B6_668177E164FC",
  "this.Button_31993600_2257_5DC1_419A_B92667302B10"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-MENU 604"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_3663E2CC_2253_BA41_419B_E53DCBB14090",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT DPTO 303"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_317EE473_225C_DE47_41AC_BD4F5B413F22",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "Departamento 303 >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E.get('visible')){ this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, true, 0, this.effect_3F3D415A_22F5_B641_4176_C13E8BC46385, 'showEffect', false) } else { this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_3F3D515A_22F5_B641_41AF_472A74851EFD, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_36706DA7_224C_CECF_41BB_3353556CEE8E",
 "children": [
  "this.Container_3620EB18_224C_CBC1_41B7_3F7DC3BF5CE6",
  "this.Container_3620CB18_224C_CBC1_41B0_3620C822F179",
  "this.Button_36276B29_224C_CBC3_41BF_51A2A8146367",
  "this.Button_36279B2B_224C_CBC7_41B6_504741500C03",
  "this.Button_36289B3C_224C_CBC1_41BC_51C7329F10F9",
  "this.Button_362FFB5C_224C_CA41_41B4_0C64EB0549C4",
  "this.Button_36159B6C_224C_CA41_4190_8DE108AD8FA8",
  "this.Button_361D3B7D_224C_CA43_41A2_6D6B22857FC1",
  "this.Button_36067B8D_224C_CAC3_41BC_3B98161B3A64",
  "this.Button_360DFB9D_224C_CAC3_419B_394422BBA5F5",
  "this.Button_36F77BAD_224C_CAC3_41A3_DE0BA661EABA"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-MENU 303"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_36408520_2253_5FC1_41BD_2CAF593C92E8",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT DPTO 301"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_4544DB06_755A_060A_41C6_B54CDC3ACBF9",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "Departamento 301 >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754.get('visible')){ this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, true, 0, this.effect_4614A88C_7576_021E_41C6_F0C9ED5051FA, 'showEffect', false) } else { this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_4614B88C_7576_021E_41D2_418BC89D7577, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_5AAA9085_755A_020E_41B1_B24DD7A8C754",
 "children": [
  "this.Container_5A6CCFEE_755A_FE1A_41D8_9AD593DE46F7",
  "this.Container_5A6C8FEF_755A_FE1A_41CC_D2D1B4DAC993",
  "this.Button_5A916FF6_755A_FE0A_41C1_857A4C5FCD4B",
  "this.Button_5A912FF7_755A_FE0A_41CB_BDC3416970BB",
  "this.Button_5A96DFFD_755A_FDFE_41D5_CFDB04B2DA20",
  "this.Button_404FDCEC_754A_021F_41B5_3FDD01E5AC62",
  "this.Button_5A948003_755A_020A_41D3_84D25E389367",
  "this.Button_5A952009_755A_0206_41D0_7D29AA6FE8A0",
  "this.Button_5A9BE00F_755A_0219_41D8_772C963525B3",
  "this.Button_5A99A014_755A_020F_41CA_0EDF54CF3DBD",
  "this.Button_5A9E601B_755A_023A_41C6_7C549606655F",
  "this.Button_4FC70A82_755A_060A_419E_5B870252C28C",
  "this.Button_5A9C1020_755A_0207_41DB_7AA8184A816C"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-MENU 301"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_451A8030_755E_0207_41D4_C58A86D88DA1",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT UBICACION"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_9CD01027_A9D4_E880_41E3_746447337ABD",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "Ubicaci\u00f3n >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, this.effect_EE95F0BB_A954_A980_41D2_48DAD5E5964F, 'showEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2",
 "children": [
  "this.Container_9CD3F027_A9D4_E880_41D4_892075911F85",
  "this.Container_9CD3C027_A9D4_E880_41D5_63EDE88AAF06",
  "this.Button_9CD3D027_A9D4_E880_41D5_F837EB94A381",
  "this.Button_9CD32027_A9D4_E880_41E0_E10FD94119D0",
  "this.Button_9CD33027_A9D4_E880_4173_FD48FB97A7AA",
  "this.Button_9CD30027_A9D4_E880_41CE_7C2088BA98D2",
  "this.Button_9CD31027_A9D4_E880_41E2_8AFD4FBFA44C",
  "this.Button_9CD36027_A9D4_E880_41A4_CCE7D3A3F4D5",
  "this.Button_9CD37027_A9D4_E880_4195_DCD9C59F3EBA",
  "this.Button_9CD34027_A9D4_E880_41E2_B1AFC0760851"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-Level 4-1"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button 5 - Swimming"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_9CD35027_A9D4_E880_41E0_F5E34C0E852C",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "SWIMMING POOL >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B.get('visible')){ this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, true, 0, this.effect_59CA1A81_4F08_D101_41D2_30683CB5E100, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_59CA3A81_4F08_D101_41D3_0462DF8FB066, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B",
 "children": [
  "this.Container_9CD0B028_A9D4_E880_41C6_59030722B1FD",
  "this.Container_9CD08028_A9D4_E880_419B_D4B7D146E006",
  "this.Button_9CD09028_A9D4_E880_41D0_EC0889905F29",
  "this.Button_9CD0E028_A9D4_E880_41BA_378B02116016",
  "this.Button_9CD0F028_A9D4_E880_41E4_1C7D6FB9C0ED",
  "this.Button_9CD0C028_A9D4_E880_41DF_0F4D009D7A77",
  "this.Button_9CD0D028_A9D4_E880_41C4_1E5FE147A317",
  "this.Button_9CD02028_A9D4_E880_41D3_059E304AF133",
  "this.Button_9CD03028_A9D4_E880_41C9_B460A7D99228",
  "this.Button_9CD00028_A9D4_E880_41D8_B85E81688F45"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-Level 5-1"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD01028_A9D4_E880_41D3_8BBE44B2275E",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button 6 - Restaurants"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_9CD06028_A9D4_E880_41D0_4C2E09848B30",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "RESTAURANTS >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_9CD04028_A9D4_E880_41E0_25650AB19114.get('visible')){ this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, true, 0, this.effect_5AFDA1C9_4F08_5301_41A5_258F6E1B7A4F, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_5AFD81C9_4F08_5301_41C3_9093DB61A2A7, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD07028_A9D4_E880_41CE_4356F9ED825B",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 10,
 "id": "Container_9CD04028_A9D4_E880_41E0_25650AB19114",
 "children": [
  "this.Container_9CD05028_A9D4_E880_41C7_437DAE4713DD",
  "this.Container_9CD1A028_A9D4_E880_4198_49E0DFF905CB",
  "this.Button_9CD1B028_A9D4_E880_41BB_66F1F0879D95",
  "this.Button_9CD18028_A9D4_E880_41D9_30B0C63CD78A",
  "this.Button_9CD19028_A9D4_E880_41E1_C01EFCEB3555",
  "this.Button_9CD1E028_A9D4_E880_41BD_5BA3C12FC7AB",
  "this.Button_9CD1F028_A9D4_E880_41D6_F9975557DC3D",
  "this.Button_9CD37028_A9D4_E880_41AB_4B88BE5E1240",
  "this.Button_9CD34028_A9D4_E880_41E4_5C45CE4FA7B4",
  "this.Button_9CD35028_A9D4_E880_41DC_5CD4AC7F900A"
 ],
 "layout": "vertical",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 7,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "creationPolicy": "inAdvance",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 200,
 "scrollBarColor": "#000000",
 "class": "Container",
 "overflow": "scroll",
 "scrollBarOpacity": 0,
 "paddingRight": 0,
 "borderSize": 0,
 "data": {
  "name": "-Level 6-1"
 },
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "minWidth": 1
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "BT DPTO X"
 },
 "pressedBackgroundOpacity": 0,
 "id": "Button_31B15D9B_225D_4EC7_417F_E22820A51F95",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 10,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "mode": "toggle",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 50,
 "label": "Departamento 602 >",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "if(!this.Container_9CD01026_A9D4_E880_41D5_222EAA683898.get('visible')){ this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, true, 0, this.effect_31B8AD71_225D_4E40_41B2_AE1A588E7B72, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_31B8DD71_225D_4E40_41A5_240011E92082, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_44418E8E_755A_1E1A_41D2_8AF3852C0DC7",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.3,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "transparencyActive": false,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "shadow": false,
 "horizontalAlign": "right",
 "width": "100%",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "right": 20,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "top": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "borderSize": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 50,
 "paddingBottom": 0
},
{
 "transparencyActive": false,
 "id": "IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A",
 "pressedRollOverIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_pressed_rollover.jpg",
 "shadow": false,
 "horizontalAlign": "right",
 "width": "100%",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "right": 20,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "top": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_pressed.jpg",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_rollover.jpg",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false)",
 "borderSize": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 50,
 "paddingBottom": 0
},
{
 "transparencyActive": false,
 "id": "IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "right": 20,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "top": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109_pressed.jpg",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109_rollover.jpg",
 "height": "36.14%",
 "borderSize": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 50,
 "paddingBottom": 0
},
{
 "transparencyActive": false,
 "id": "IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "right": 20,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "top": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90_pressed.jpg",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90_rollover.jpg",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_610403E3_22D4_DA47_41A4_830DC852C065, false, 0, null, null, false)",
 "borderSize": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 50,
 "paddingBottom": 0
},
{
 "transparencyActive": false,
 "id": "IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "right": 20,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "top": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70_pressed.jpg",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70_rollover.jpg",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2, false, 0, null, null, false)",
 "borderSize": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 50,
 "paddingBottom": 0
},
{
 "transparencyActive": false,
 "id": "IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B",
 "width": "100%",
 "shadow": false,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "maxWidth": 60,
 "maxHeight": 60,
 "right": 20,
 "backgroundOpacity": 0,
 "mode": "push",
 "borderRadius": 0,
 "top": 20,
 "minHeight": 50,
 "iconURL": "skin/IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B.jpg",
 "verticalAlign": "top",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B_pressed.jpg",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B_rollover.jpg",
 "height": "36.14%",
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, false, 0, null, null, false)",
 "borderSize": 0,
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "cursor": "hand",
 "minWidth": 50,
 "paddingBottom": 0
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD34026_A9D4_E880_41C0_ADF60C34D581",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_9CD35026_A9D4_E880_41E0_043F2006F875",
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Fach V1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0A026_A9D4_E880_41DA_2A056A8841CA",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Fachada Vista 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_BE850FAF_8222_9F7B_41DA_EFE13E230F28, 3.673469387755102, 14.693877551020408);; this.mainPlayList.set('selectedIndex', 0)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Fach V2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD08026_A9D4_E880_41C5_FED95C751747",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Fachada Vista 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_BE84CFAF_8222_9F7B_41E0_5DB673769214, -3.673469387755102, 19.285714285714285);; this.mainPlayList.set('selectedIndex', 1)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Fach V3"
 },
 "pressedLabel": "Reception",
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD09026_A9D4_E880_41D9_C010E68FE3B4",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Fachada Vista 3",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_BE849FAF_8222_9F7B_41DD_E3FC109EE89B, 1.836734693877551, -26.632653061224488);; this.mainPlayList.set('selectedIndex', 2)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Fach V4"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0E026_A9D4_E880_4190_6287BB5AC208",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Fachada Vista 4",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_BE847FAF_8222_9F7B_41D7_10C2C884C602, 0, -35.816326530612244);; this.mainPlayList.set('selectedIndex', 3)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Recep"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0F026_A9D4_E880_41BB_FCA355718613",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Recepci\u00f3n",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_BE840FAF_8222_9F7B_41D2_EA00AB179538, 0, 0);; this.mainPlayList.set('selectedIndex', 4)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Coworking"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0C026_A9D4_E880_41CD_A682DDB9A23F",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Coworking",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Patio 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0D026_A9D4_E880_41E3_8672AE3BD791",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Patio Vista 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Patio 2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD02026_A9D4_E880_41A1_C787E34AC5D5",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Patio Vista 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Patio 3"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_912D519A_A9F5_AB80_41C6_6108114715E5",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Patio Vista 3",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "visible": false,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD06026_A9D4_E880_41B5_0315CEA5609B",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_9CD07026_A9D4_E880_41A4_E246B962EC85",
 "children": [
  "this.Button_315E7D4C_2274_CE41_41B0_138070189229"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_3141E223_2275_75C7_41BE_0A68E3642997",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta 1er Piso",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_30B87DAA_224D_CEC1_41B1_B2FBFF6CFF8A",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta 2do Piso",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, true, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD04026_A9D4_E880_41E3_F403655C131D",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Sala"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD05026_A9D4_E880_41CF_399BA66B2C2B",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Sala",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 6)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Cocina"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD1B026_A9D4_E880_41C5_D6513C9E39C5",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Cocina",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 7)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm P"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD19026_A9D4_E880_4185_91A690ADE787",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHP"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD31027_A9D4_E880_41C5_F1EB4C316B8B",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 11)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD36027_A9D4_E880_41CD_7490BCEB0D31",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 12)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_E8BB4335_A9CD_A883_41D8_7B15C59E6C5F",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 13)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHV1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD18026_A9D4_E880_41C7_8D09F066D5A5",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Familiar",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 14)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Estar"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_95528198_A9CC_AB81_41BE_6D8F4B17CB8C",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Estar",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 17)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Terraza"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_EA8B0EA7_A9CC_D98F_41D2_AFFD875E7B45",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Terraza",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 18)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHF"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_E8C76929_A9CC_5880_41DD_614FFCEEF598",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o de Visita",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 15)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHV2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_968F942B_A9CC_A887_41C9_B456228D301A",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 16)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_36CFA4C8_2257_5E41_41C0_1BE17A92F888",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_36CF44C9_2257_5E43_41C0_1568DA462072",
 "children": [
  "this.Button_36CF64C9_2257_5E43_4190_E70C3E8F6988"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31577500_2257_5FC1_41B9_83551C79DC76",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta 1er Piso",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_610403E3_22D4_DA47_41A4_830DC852C065, true, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_3153C501_2257_5FC3_41A7_E387491247AD",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta 2do Piso",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2, true, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 3"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_E8EBA427_FFD8_81CD_41E6_617603032F34",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta 3er Piso",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, true, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31538501_2257_5FC3_41B3_35696BC8B542",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Sala"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_3152B512_2257_5FC1_4186_23DFA5AD5D98",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Sala",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Cocina"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_3124A534_2257_5FC1_41C0_632A1728AED4",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Cocina",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_311C2576_2257_5E41_4184_ED2B637EFC4C",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHP1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_E63073A4_FFF8_86C3_41EF_DE380E045C77",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Principal 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHV1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_313D5545_2257_5E43_41BC_35AE66F68721",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o de Visita",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHF"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31CE1597_2257_5ECF_4198_A9A6DFA31D4B",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Familiar 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Estudio"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_E3A5EE60_FFC8_9E42_41C6_3C5B2F7090FD",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Estudio",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm P"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31353555_2257_5E43_415A_73B917A3856E",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHP"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_310E7565_2257_5E43_4199_05FEC1A3139A",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Principal 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31E46587_2257_5ECF_41B1_BCAAF47ED3E8",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Gym"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31D2C5A6_2257_5EC1_41B7_2CD05247055D",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Gym",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Juegos"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_E07C6918_FFC9_83C3_41E9_B663BA7159F7",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Juegos",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHF2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31B6C5C9_2257_5E43_41B6_668177E164FC",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Familiar 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Terraza"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_31993600_2257_5DC1_419A_B92667302B10",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Terraza",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_3620EB18_224C_CBC1_41B7_3F7DC3BF5CE6",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_3620CB18_224C_CBC1_41B0_3620C822F179",
 "children": [
  "this.Button_36212B18_224C_CBC1_41AA_A96985F948DA"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36276B29_224C_CBC3_41BF_51A2A8146367",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36279B2B_224C_CBC7_41B6_504741500C03",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Sala"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36289B3C_224C_CBC1_41BC_51C7329F10F9",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Sala",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Cocina"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_362FFB5C_224C_CA41_41B4_0C64EB0549C4",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Cocina",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SH1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36159B6C_224C_CA41_4190_8DE108AD8FA8",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Familiar",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm P"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_361D3B7D_224C_CA43_41A2_6D6B22857FC1",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SH2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36067B8D_224C_CAC3_41BC_3B98161B3A64",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_360DFB9D_224C_CAC3_419B_394422BBA5F5",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36F77BAD_224C_CAC3_41A3_DE0BA661EABA",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_5A6CCFEE_755A_FE1A_41D8_9AD593DE46F7",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_5A6C8FEF_755A_FE1A_41CC_D2D1B4DAC993",
 "children": [
  "this.Button_5A6DCFEF_755A_FE1A_41CB_C8B7206FAC1E"
 ],
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Planta 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A916FF6_755A_FE0A_41C1_857A4C5FCD4B",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Planta",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, true, 0, null, null, false)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Sala Comedor"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A912FF7_755A_FE0A_41CB_BDC3416970BB",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Sala Comedor",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Sala"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A96DFFD_755A_FDFE_41D5_CFDB04B2DA20",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Sala",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_404FDCEC_754A_021F_41B5_3FDD01E5AC62",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Cocina"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A948003_755A_020A_41D3_84D25E389367",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Cocina",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SHV"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A952009_755A_0206_41D0_7D29AA6FE8A0",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o de Visita",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm P"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A9BE00F_755A_0219_41D8_772C963525B3",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SH2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A99A014_755A_020F_41CA_0EDF54CF3DBD",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Principal",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A9E601B_755A_023A_41C6_7C549606655F",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Dorm S2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_4FC70A82_755A_060A_419E_5B870252C28C",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Dormitorio Secundario 2",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt SH1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A9C1020_755A_0207_41DB_7AA8184A816C",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Ba\u00f1o Familiar",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD3F027_A9D4_E880_41D4_892075911F85",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_9CD3C027_A9D4_E880_41D5_63EDE88AAF06",
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD3D027_A9D4_E880_41D5_F837EB94A381",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD32027_A9D4_E880_41E0_E10FD94119D0",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 3"
 },
 "pressedLabel": "Lorem Ipsum",
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD33027_A9D4_E880_4173_FD48FB97A7AA",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 4"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD30027_A9D4_E880_41CE_7C2088BA98D2",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 5"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD31027_A9D4_E880_41E2_8AFD4FBFA44C",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 6"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD36027_A9D4_E880_41A4_CCE7D3A3F4D5",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 7"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD37027_A9D4_E880_4195_DCD9C59F3EBA",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 8"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD34027_A9D4_E880_41E2_B1AFC0760851",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD0B028_A9D4_E880_41C6_59030722B1FD",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_9CD08028_A9D4_E880_419B_D4B7D146E006",
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD09028_A9D4_E880_41D0_EC0889905F29",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0E028_A9D4_E880_41BA_378B02116016",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 3"
 },
 "pressedLabel": "Lorem Ipsum",
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0F028_A9D4_E880_41E4_1C7D6FB9C0ED",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 4"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0C028_A9D4_E880_41DF_0F4D009D7A77",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 5"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD0D028_A9D4_E880_41C4_1E5FE147A317",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 6"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD02028_A9D4_E880_41D3_059E304AF133",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 7"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD03028_A9D4_E880_41C9_B460A7D99228",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 8"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD00028_A9D4_E880_41D8_B85E81688F45",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_9CD05028_A9D4_E880_41C7_437DAE4713DD",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "width": "100%",
 "contentOpaque": false,
 "backgroundOpacity": 0.5,
 "height": 1,
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "class": "Container",
 "verticalAlign": "top",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line"
 },
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "scrollBarVisible": "rollOver",
 "id": "Container_9CD1A028_A9D4_E880_4198_49E0DFF905CB",
 "width": "100%",
 "layout": "absolute",
 "shadow": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "paddingLeft": 0,
 "contentOpaque": false,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 8,
 "scrollBarColor": "#000000",
 "class": "Container",
 "paddingRight": 0,
 "overflow": "scroll",
 "scrollBarOpacity": 0.5,
 "gap": 10,
 "borderSize": 0,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "scrollBarMargin": 2,
 "paddingBottom": 0,
 "minWidth": 1
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD1B028_A9D4_E880_41BB_66F1F0879D95",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 2"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD18028_A9D4_E880_41D9_30B0C63CD78A",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 23,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 3"
 },
 "pressedLabel": "Lorem Ipsum",
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD19028_A9D4_E880_41E1_C01EFCEB3555",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 4"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD1E028_A9D4_E880_41BD_5BA3C12FC7AB",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 5"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD1F028_A9D4_E880_41D6_F9975557DC3D",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 6"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD37028_A9D4_E880_41AB_4B88BE5E1240",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 7"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD34028_A9D4_E880_41E4_5C45CE4FA7B4",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Button text 8"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_9CD35028_A9D4_E880_41DC_5CD4AC7F900A",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "fontFamily": "Oswald",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Lorem Ipsum",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_315E7D4C_2274_CE41_41B0_138070189229",
 "left": "0%",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "bottom": "-350%",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor Vista 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36CF64C9_2257_5E43_4190_E70C3E8F6988",
 "left": "0%",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "bottom": "-350%",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor Vista 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_36212B18_224C_CBC1_41AA_A96985F948DA",
 "left": "0%",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "bottom": "-350%",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor Vista 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
},
{
 "rollOverShadow": false,
 "fontColor": "#FFFFFF",
 "data": {
  "name": "Bt Comedor 1"
 },
 "pressedBackgroundOpacity": 1,
 "id": "Button_5A6DCFEF_755A_FE1A_41CB_C8B7206FAC1E",
 "left": "0%",
 "iconWidth": 32,
 "backgroundColorDirection": "vertical",
 "iconBeforeLabel": true,
 "shadow": false,
 "horizontalAlign": "left",
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 20,
 "shadowSpread": 1,
 "shadowBlurRadius": 15,
 "fontFamily": "Oswald",
 "borderColor": "#000000",
 "layout": "horizontal",
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "bottom": "-350%",
 "rollOverBackgroundOpacity": 0.3,
 "mode": "push",
 "borderRadius": 0,
 "minHeight": 1,
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "label": "Comedor Vista 1",
 "class": "Button",
 "paddingRight": 0,
 "fontSize": 18,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "click": "this.mainPlayList.set('selectedIndex', 5)",
 "backgroundColorRatios": [
  0,
  1
 ],
 "gap": 5,
 "borderSize": 0,
 "fontStyle": "italic",
 "textDecoration": "none",
 "paddingTop": 0,
 "paddingBottom": 0,
 "cursor": "hand",
 "minWidth": 1,
 "fontWeight": "normal"
}],
 "borderSize": 0,
 "mobileMipmappingEnabled": false,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "minWidth": 20,
 "vrPolyfillScale": 0.5
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
