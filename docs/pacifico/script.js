(function(){
    var script = {
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "defaultVRPointer": "laser",
 "paddingRight": 0,
 "children": [
  "this.MainViewer",
  "this.Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174",
  "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A",
  "this.Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB"
 ],
 "vrPolyfillScale": 0.5,
 "scripts": {
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "existsKey": function(key){  return key in window; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "unregisterKey": function(key){  delete window[key]; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getKey": function(key){  return window[key]; },
  "registerKey": function(key, value){  window[key] = value; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); }
 },
 "start": "this.init(); this.playList_41557731_6313_C126_41C5_9A1B8722475A.set('selectedIndex', 0); this.playList_4154D731_6313_C126_41D1_F67F7AFC356A.set('selectedIndex', 0); this.playList_4154B731_6313_C126_41D1_C8D49ACB88EA.set('selectedIndex', 0)",
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "downloadEnabled": false,
 "borderRadius": 0,
 "minHeight": 20,
 "verticalAlign": "top",
 "propagateClick": true,
 "class": "Player",
 "minWidth": 20,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "height": "100%",
 "borderSize": 0,
 "definitions": [{
 "partial": false,
 "label": "RI COMEDOR 6-RGB",
 "id": "panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
 "thumbnailUrl": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": 171.05,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 1.64
  },
  {
   "panorama": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
   "yaw": -40.06,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -118.34
  },
  {
   "panorama": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
   "yaw": 36.6,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 135.2
  },
  {
   "panorama": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
   "yaw": -19.87,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 170.11
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 294.55,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 290.9
  }
 ],
 "overlays": [
  "this.overlay_7C256F5D_6334_C154_41C7_EDFC34661E9D",
  "this.overlay_7C257F5D_6334_C154_41BA_AFD99E81741D",
  "this.overlay_7C255F5D_6334_C154_41C6_1A129389D08B",
  "this.overlay_7C252F5D_6334_C154_41D3_6328F192DD8A",
  "this.overlay_7C253F5D_6334_C154_41B8_F140D3F27DD7"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 50.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4256D94B_6313_C17A_41C9_1D8792DB8B10",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -44.8,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41F957E8_6313_C126_41C9_3E5C2AE1576B",
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
 "id": "playList_41557731_6313_C126_41C5_9A1B8722475A",
 "class": "PlayList"
},
{
 "partial": false,
 "label": "RI 601 DORMITORIO SECUNDARIO 2-RGB",
 "id": "panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
 "thumbnailUrl": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": -114.14,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -53.38
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 194.55,
   "angle": 225,
   "class": "PanoramaMapLocation",
   "y": 391.45
  }
 ],
 "overlays": [
  "this.overlay_7CE4333B_633C_C2D0_41A6_30E758FD0D0B"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -90.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_438BC8C0_6313_CF67_41C6_EE84E2384DDC",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -147.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_438D38A4_6313_CF2E_41D4_44A6DB603EC8",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -83.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41CC7820_6313_CF27_41B6_869EC40C3C23",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 160.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4270A903_6313_CEE9_41D5_616217D0AE5E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 128.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4381D8DC_6313_CF1E_41BC_90003ED51749",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "label": "RI BANO VISITA 1-RGB",
 "id": "panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
 "thumbnailUrl": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": -129.16,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -133.85
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 404.65,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 385.7
  }
 ],
 "overlays": [
  "this.overlay_7CD0227B_633C_C356_41D7_92FC0DF0A350"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "partial": false,
 "label": "RI COMEDOR 5-RGB",
 "id": "panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
 "thumbnailUrl": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
   "yaw": 89.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -147.57
  },
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": 1.64,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 171.05
  },
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": 89.13,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -140.91
  },
  {
   "panorama": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
   "yaw": -53.38,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -114.14
  },
  {
   "panorama": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 296.55,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 424.05
  }
 ],
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
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
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
 "id": "playList_4154D731_6313_C126_41D1_F67F7AFC356A",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 50.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4121C7B0_6313_C126_41D4_2B05DEEECA7D",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -178.36,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4113A7CC_6313_C17E_41C9_2C6DF27DDFDD",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 61.66,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_410627DA_6313_C11A_41C1_70DDC9C75552",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 50.34,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_412AB7A2_6313_C12A_4179_D9DE54984F90",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 129.99,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_426EC912_6313_CEEA_41CE_8760987B67F2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 29.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_411A97BE_6313_C11A_41CC_BAC1E7F4FE32",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_camera",
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "DPTO-602-PLANTA-1",
 "id": "album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
 "height": 839,
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_431A74C1_6071_CE13_41B6_6A6768C52AEF.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "viewerArea": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_camera",
 "automaticZoomSpeed": 10
},
{
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer"
},
{
 "label": "RI COMEDOR 1-RGB",
 "id": "panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
 "thumbnailUrl": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": -140.91,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 89.13
  },
  {
   "panorama": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
   "yaw": 32.24,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -147.27
  },
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "yaw": -129.66,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -87.24
  },
  {
   "panorama": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
   "yaw": -133.85,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -129.16
  },
  {
   "panorama": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
   "yaw": -51.73,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 175.04
  },
  {
   "panorama": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
   "class": "AdjacentPanorama"
  }
 ],
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 574.25,
   "angle": 50.47,
   "class": "PanoramaMapLocation",
   "y": 410.35
  }
 ],
 "overlays": [
  "this.overlay_42E9B504_6335_C6AB_41C5_60284C1CC377",
  "this.overlay_42E84505_6335_C6B5_41D7_83C6B9811658",
  "this.overlay_42E86505_6335_C6B5_41C5_5EA5560A428D",
  "this.overlay_42E81505_6335_C6B5_41A4_1A591BA75F77",
  "this.overlay_42E82505_6335_C6B5_41CA_C1C5D79F3615",
  "this.overlay_42E8F505_6335_C6B5_41C1_EDB55814C5D3"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0,
 "partial": false
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
 "id": "playList_41553732_6313_C12A_41CB_211B18E2988D",
 "class": "PlayList"
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
 "id": "playList_4155C732_6313_C12A_41C2_5D65D18D1F52",
 "class": "PlayList"
},
{
 "partial": false,
 "label": "RI COMEDOR 2-RGB",
 "id": "panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
 "thumbnailUrl": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": -147.27,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 32.24
  },
  {
   "panorama": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
   "yaw": -69.49,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 132.95
  },
  {
   "panorama": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
   "yaw": -147.57,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 89.38
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 691.25,
   "angle": 53.15,
   "class": "PanoramaMapLocation",
   "y": 408.95
  }
 ],
 "overlays": [
  "this.overlay_7C2AF749_6335_C2BA_4191_5A0E38B48270",
  "this.overlay_7C2AE749_6335_C2BA_41D6_FD4A72D345B9",
  "this.overlay_7C2AC749_6335_C2BA_41D0_1712CA76C1D8",
  "this.overlay_7C2AA74E_6335_C2B6_41D6_3B5D8EF95E4E",
  "this.overlay_7C2A874E_6335_C2B6_41A4_09BF4BF2FC8D"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "partial": false,
 "label": "RI BANO FAMILIAR 1-RGB",
 "id": "panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
 "thumbnailUrl": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": 135.2,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 36.6
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 368.3,
   "angle": 90,
   "class": "PanoramaMapLocation",
   "y": 228.25
  }
 ],
 "overlays": [
  "this.overlay_7CF20193_633D_41D0_41AF_9CAF84960121"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C259F5D_6334_C154_41CF_11C5CB083430_camera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "label": "RI BANO VISITA 2-RGB",
 "id": "panorama_7CA45547_633D_C6BF_41D0_6679E4286F80",
 "thumbnailUrl": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "yaw": -150.52,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 5.73
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "x": 637.08,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 106.24
  }
 ],
 "overlays": [
  "this.overlay_7CA47548_633D_C6B1_41C2_9F952EA73004"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 151.48,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41DFB812_6313_CEEB_41D4_6E3BF57AA920",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -174.27,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41A8784B_6313_CF7A_41C1_BD4B1F48E9D1",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 126.62,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41BBF83D_6313_CF1E_41C7_38F3DC4FA978",
 "automaticZoomSpeed": 10
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "image": {
  "class": "ImageResource",
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
  ]
 },
 "label": "DPTO-602-PLANTA-2",
 "initialZoomFactor": 1,
 "id": "map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "width": 1280,
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/map_403C6EC0_60D0_DA6B_41C6_DCB845321FB6_t.jpg",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 839,
 "fieldOfViewOverlayInsideOpacity": 0.4
},
{
 "partial": false,
 "label": "RI TERRAZA-RGB",
 "id": "panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D",
 "thumbnailUrl": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
   "yaw": -101.12,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 81.1
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "x": 738.03,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 400.19
  }
 ],
 "overlays": [
  "this.overlay_7CC16850_633D_4F51_41B9_34EE69190F2E"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "partial": false,
 "label": "RI BANO PRINCIPAL-RGB",
 "id": "panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E",
 "thumbnailUrl": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
   "yaw": -50.01,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 96.6
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 367.65,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 97.8
  }
 ],
 "overlays": [
  "this.overlay_7DEC2391_6333_C1AE_41B2_E79C43ECAB0C"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "viewerArea": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 78.88,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4132E793_6313_C1E9_41D1_74FE5E97A716",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 139.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41C7782E_6313_CF3B_41D2_FBF642CE4D41",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 32.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_423CB975_6313_C12E_41B4_4B3A587DA170",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -8.95,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_423B5983_6313_C1E9_41D2_4B47C2274DBB",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "label": "RI COMEDOR 3-RGB",
 "id": "panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
 "thumbnailUrl": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": 175.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -51.73
  },
  {
   "panorama": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
   "yaw": 132.95,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -69.49
  },
  {
   "panorama": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
   "yaw": -28.52,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -152.23
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 579.05,
   "angle": 36.87,
   "class": "PanoramaMapLocation",
   "y": 247.05
  }
 ],
 "overlays": [
  "this.overlay_7C23B5F2_6335_416F_4191_9C3D647E3007",
  "this.overlay_7C23A5F3_6335_416D_41AC_F39F9E6135F6",
  "this.overlay_7C23C5F3_6335_416D_41C5_220BC1786FF5"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 92.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_425F293D_6313_C11E_41CC_D751F60C48D0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -90.87,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_426BD920_6313_C127_41BE_6298EEDB8E58",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 39.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_42335991_6313_C1E6_41B6_4A216445B929",
 "automaticZoomSpeed": 10
},
{
 "displayPlaybackBar": true,
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7C2385F2_6335_416F_41C7_AE070B69B443_camera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "label": "RI ESTAR-RGB",
 "id": "panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
 "thumbnailUrl": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D",
   "yaw": 81.1,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -101.12
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": -87.24,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -129.66
  },
  {
   "panorama": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
   "yaw": 153.47,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -129.66
  },
  {
   "panorama": "this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80",
   "yaw": 5.73,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -150.52
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_77121C23_6030_7D87_41C9_3337E3E82B5C",
   "x": 598.05,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 410.18
  }
 ],
 "overlays": [
  "this.overlay_7CFC04E2_633D_C771_41C8_64C83FAAEBAD",
  "this.overlay_7CFCF4E2_633D_C771_41D5_91F8E07292EF",
  "this.overlay_7CFCE4E2_633D_C771_41C7_BEA1886BE4E9",
  "this.overlay_7CFCD4E2_633D_C771_41CA_1BD562E79B89"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.32,
 "label": "DPTO-602-PLANTA-1",
 "initialZoomFactor": 1,
 "id": "map_76ECAA2F_6030_459F_417D_FD8496661E95",
 "thumbnailUrl": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_t.png",
 "height": 603,
 "image": {
  "class": "ImageResource",
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
  ]
 },
 "width": 920,
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideColor": "#00FF00",
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
 ],
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "fieldOfViewOverlayInsideColor": "#0D1E3B",
 "maximumZoomFactor": 1.2
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -47.05,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_438898B2_6313_CF2A_41D0_8A7D495DB529",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "label": "RI COMEDOR 4-RGB",
 "id": "panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
 "thumbnailUrl": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
   "yaw": -152.23,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -28.52
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 681.25,
   "angle": 33.25,
   "class": "PanoramaMapLocation",
   "y": 113.35
  }
 ],
 "overlays": [
  "this.overlay_7C5D35DE_6335_4157_41A2_18B3B46D8089"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 65.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_422AC99F_6313_C11A_41D1_37148E89E683",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -9.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41F2C7F7_6313_C12A_41C7_CEE6E42897F2",
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
 "id": "playList_41552731_6313_C126_41D6_095415D4156A",
 "class": "PlayList"
},
{
 "easing": "quad_out",
 "duration": 200,
 "id": "effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B",
 "class": "FadeOutEffect"
},
{
 "easing": "quad_in",
 "duration": 200,
 "id": "effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D",
 "class": "FadeInEffect"
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "DPTO-602-PLANTA-2",
 "id": "album_444B5D56_6071_FE31_41BF_E608FEDA2243",
 "height": 839,
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_444B5D56_6071_FE31_41BF_E608FEDA2243.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 }
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 27.77,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_427B58F6_6313_CF2B_414F_BEED7D7439B4",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_camera",
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
 "id": "playList_4154F731_6313_C126_41AB_31DC838C5FAD",
 "class": "PlayList"
},
{
 "class": "Map",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-602-PLANTA-2",
 "initialZoomFactor": 1,
 "id": "map_77121C23_6030_7D87_41C9_3337E3E82B5C",
 "thumbnailUrl": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_t.png",
 "height": 603,
 "image": {
  "class": "ImageResource",
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
  ]
 },
 "width": 920,
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "overlays": [
  "this.overlay_7BD8EF8A_6070_7A87_4188_87617F967778",
  "this.overlay_7B570D9F_6070_DEBD_41D6_374843985EA0",
  "this.overlay_7CAAFBE7_6071_DA8D_41D5_A43CD1DF560A"
 ],
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "fieldOfViewOverlayInsideColor": "#0D1E3B",
 "maximumZoomFactor": 1.2
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 46.15,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_41E59805_6313_CEEE_41D8_126581A07089",
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
 "id": "playList_4154272B_6313_C13C_41CE_E14A2594CDAD",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -98.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_438718CD_6313_CF79_41B6_D57A49402568",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 32.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_4262492F_6313_C13A_41C0_BFF632F1173A",
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
 "id": "playList_4154B731_6313_C126_41D1_C8D49ACB88EA",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -4.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_424EE958_6313_C166_41D7_3CE33053BE75",
 "automaticZoomSpeed": 10
},
{
 "viewerArea": "this.MapViewer",
 "id": "MapViewerMapPlayer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "partial": false,
 "label": "RI PACIFICO DORMITORIO SECUNDARIO 1-RGB",
 "id": "panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
 "thumbnailUrl": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": -118.34,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -40.06
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 197.7,
   "angle": 233.71,
   "class": "PanoramaMapLocation",
   "y": 235.25
  }
 ],
 "overlays": [
  "this.overlay_7CB545E4_633C_C177_41BF_EC07C120F040"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": -143.4,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_42449966_6313_C12B_41B5_687202C6BA11",
 "automaticZoomSpeed": 10
},
{
 "items": [
  "this.PanoramaPlayListItem_41563737_6313_C12A_41D2_6FDE5512C431",
  "this.PanoramaPlayListItem_41577737_6313_C12A_41D6_A348BCAA1B57",
  "this.PanoramaPlayListItem_4157C738_6313_C126_41D1_75E597883974",
  "this.PanoramaPlayListItem_41502738_6313_C126_41C2_8E5CCA9EA492",
  "this.PanoramaPlayListItem_4150973D_6313_C11E_41D8_31957C3E7207",
  "this.PanoramaPlayListItem_4151073E_6313_C11A_41D6_E23B50248B2C",
  "this.PanoramaPlayListItem_4152773E_6313_C11A_41D5_0F2EC0623FCE",
  "this.PanoramaPlayListItem_4152D744_6313_C16E_41D3_CE07CD4BDA55",
  "this.PanoramaPlayListItem_41535744_6313_C16E_41B0_556663D5D766",
  "this.PanoramaPlayListItem_4153B744_6313_C16E_41B7_3D82825B67CF",
  "this.PanoramaPlayListItem_414C0745_6313_C16E_41BA_A5555A28EB07",
  "this.PanoramaPlayListItem_414C9745_6313_C16E_41B8_9DCFD734D672",
  "this.PanoramaPlayListItem_414DF74B_6313_C17A_41BD_2B44A4251169",
  "this.PanoramaPlayListItem_414E474B_6313_C17A_41C2_FB0997AE6707",
  "this.PanoramaPlayListItem_414EC74B_6313_C17A_41B9_377D3C715B23",
  {
   "end": "this.trigger('tourEnded')",
   "class": "PhotoAlbumPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 0)",
   "media": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
   "player": "this.MainViewerPhotoAlbumPlayer"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos DPTO-602-PLANTA-1",
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
 "thumbnailUrl": "media/album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_t.png",
 "playList": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_camera",
 "automaticZoomSpeed": 10
},
{
 "partial": false,
 "label": "RI DORMITORIO PRINCIPAL-RGB",
 "id": "panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
 "thumbnailUrl": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_t.jpg",
 "class": "Panorama",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/f/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/f/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/f/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_t.jpg",
   "class": "CubicPanoramaFrame",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/r/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/r/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/r/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/b/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/b/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/b/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/d/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/d/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/d/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/l/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/l/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/l/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/u/0/{row}_{column}.jpg",
      "colCount": 4,
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "rowCount": 4,
      "tags": "ondemand",
      "height": 2048
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/u/1/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_0/u/2/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
   "yaw": 170.11,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -19.87
  },
  {
   "panorama": "this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E",
   "yaw": 96.6,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -50.01
  }
 ],
 "hfovMin": "135%",
 "mapLocations": [
  {
   "map": "this.map_76ECAA2F_6030_459F_417D_FD8496661E95",
   "x": 237.75,
   "angle": -40.1,
   "class": "PanoramaMapLocation",
   "y": 164
  }
 ],
 "overlays": [
  "this.overlay_7CF4EE97_6333_43D3_41C9_EBE896912CFC",
  "this.overlay_7CF4FE97_6333_43D3_41B5_575C43D55E54"
 ],
 "vfov": 180,
 "hfov": 360,
 "hfovMax": 130,
 "pitch": 0
},
{
 "fieldOfViewOverlayOutsideColor": "#000000",
 "class": "Map",
 "image": {
  "class": "ImageResource",
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
  ]
 },
 "label": "DPTO-602-PLANTA-1",
 "initialZoomFactor": 1,
 "id": "map_40AE677B_60D0_4A1F_41AB_DD742737043F",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "width": 1280,
 "scaleMode": "fit_inside",
 "thumbnailUrl": "media/map_40AE677B_60D0_4A1F_41AB_DD742737043F_t.jpg",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 839,
 "fieldOfViewOverlayInsideOpacity": 0.4
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 2.66,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 110.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_427E98E9_6313_CF26_41D3_C9CF1F91F8C0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "easing": "cubic_in",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   },
   {
    "easing": "linear",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323
   },
   {
    "easing": "cubic_out",
    "yawSpeed": 5.31,
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_42E9E504_6335_C6AB_41D7_ED794C922301_camera",
 "automaticZoomSpeed": 10
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "MainViewer",
 "left": 0,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 10,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 7,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 10,
 "minHeight": 50,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 100,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontSize": "13px",
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.8,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "top": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Swis721 LtCn BT",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "transitionMode": "blending",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#333333",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Main Viewer"
 },
 "vrPointerColor": "#FFFFFF"
},
{
 "maxWidth": 5000,
 "children": [
  "this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D",
  "this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36"
 ],
 "id": "Container_7F59BED9_7065_6DCD_41D6_B4AD3EEA9174",
 "left": "0%",
 "maxHeight": 5000,
 "width": 300,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": false,
 "height": "100%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--- LEFT PANEL"
 },
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
 "width": 357,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 6,
 "right": "1.45%",
 "toolTipBorderSize": 1,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 6,
 "minHeight": 1,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "height": 230,
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "toolTipBorderColor": "#767676",
 "toolTipShadowVerticalLength": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "borderSize": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "top": "2.08%",
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "transitionMode": "blending",
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "PLANOS"
 },
 "vrPointerColor": "#FFFFFF"
},
{
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "backgroundOpacity": 0.6,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--LOCATION"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "backgroundOpacity": 0.6,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "overflow": "scroll",
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--FLOORPLAN"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "data": {
  "name": "--FLOORPLAN 2DO"
 },
 "id": "Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A",
 "left": "0%",
 "paddingRight": 0,
 "children": [
  "this.Container_7DABF279_60D0_4587_41BE_BB0754751B70"
 ],
 "backgroundOpacity": 0.6,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": false,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": "100%",
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "maxWidth": 157,
 "id": "Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB",
 "maxHeight": 7630,
 "right": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_45D46EC2_6030_5A11_4190_BE2F0F2E3EBB.png",
 "width": "1.33%",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": false,
 "height": "72.216%",
 "bottom": "12.13%",
 "class": "Image",
 "minWidth": 1,
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image84735"
 },
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_4113A7CC_6313_C17E_41C9_2C6DF27DDFDD); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B6F9F_633D_41CA_41D0_03783EDD45D9",
   "pitch": -24.53,
   "yaw": 171.05,
   "hfov": 12.34,
   "distance": 100
  }
 ],
 "id": "overlay_7C256F5D_6334_C154_41C7_EDFC34661E9D",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 171.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.53,
   "hfov": 12.34
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3, this.camera_41F2C7F7_6313_C12A_41C7_CEE6E42897F2); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B9F9F_633D_41CA_4127_6133977EB64C",
   "pitch": -4.73,
   "yaw": -19.87,
   "hfov": 11.45,
   "distance": 100
  }
 ],
 "id": "overlay_7C257F5D_6334_C154_41BA_AFD99E81741D",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -19.87,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.73,
   "hfov": 11.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Secndario 2",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD, this.camera_410627DA_6313_C11A_41C1_70DDC9C75552); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463C6FA0_633D_41F6_41D1_F4615302C3AC",
   "pitch": -7.68,
   "yaw": -40.06,
   "hfov": 14.87,
   "distance": 100
  }
 ],
 "id": "overlay_7C255F5D_6334_C154_41C6_1A129389D08B",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -40.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.68,
   "hfov": 14.87
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicios Higienicos",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2, this.camera_41F957E8_6313_C126_41C9_3E5C2AE1576B); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463CBFA0_633D_41F6_41CE_B9C3F7877A80",
   "pitch": -5.48,
   "yaw": 36.6,
   "hfov": 13.47,
   "distance": 100
  }
 ],
 "id": "overlay_7C252F5D_6334_C154_41D3_6328F192DD8A",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 36.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.48,
   "hfov": 13.47
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Secundario 1",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B1FA0_633D_41F6_41B2_B06158FB003E",
   "pitch": -4.26,
   "yaw": -158.58,
   "hfov": 7.44,
   "distance": 100
  }
 ],
 "id": "overlay_7C253F5D_6334_C154_41B8_F140D3F27DD7",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -158.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.26,
   "hfov": 7.44
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_41BBF83D_6313_CF1E_41C7_38F3DC4FA978); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463ACFA1_633D_41F6_41B7_9526E4B975AF",
   "pitch": 7.03,
   "yaw": -114.14,
   "hfov": 14.89,
   "distance": 100
  }
 ],
 "id": "overlay_7CE4333B_633C_C2D0_41A6_30E758FD0D0B",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -114.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 7.03,
   "hfov": 14.89
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_41E59805_6313_CEEE_41D8_126581A07089); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46077FA3_633D_41FA_41D1_A461F0538A24",
   "pitch": 11.4,
   "yaw": -129.16,
   "hfov": 37.11,
   "distance": 100
  }
 ],
 "id": "overlay_7CD0227B_633C_C356_41D7_92FC0DF0A350",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -129.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 11.4,
   "hfov": 37.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_42335991_6313_C1E6_41B6_4A216445B929); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463E5F9E_633D_41CA_41D5_21913E6DCAC4",
   "pitch": -13.8,
   "yaw": 89.13,
   "hfov": 8.81,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E92CA_6334_C3BC_41CC_5609AA1B8008",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 89.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -13.8,
   "hfov": 8.81
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B, this.camera_423CB975_6313_C12E_41B4_4B3A587DA170); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463E9F9E_633D_41CA_41AC_C2B7263407E1",
   "pitch": -9.98,
   "yaw": 89.38,
   "hfov": 3.03,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E82CA_6334_C3BC_41B0_59E2D385C4AD",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 89.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.98,
   "hfov": 3.03
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463EFF9E_633D_41CA_41D1_4E86DAB90D25",
   "pitch": -17.72,
   "yaw": 82.12,
   "hfov": 4.45,
   "distance": 50
  }
 ],
 "id": "overlay_7C5EB2CA_6334_C3BC_41D1_EED577BC746A",
 "data": {
  "label": "Arrow 02b Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 82.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.72,
   "hfov": 4.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_423B5983_6313_C1E9_41D2_4B47C2274DBB); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463D3F9E_633D_41CA_41C6_BE15152F0A12",
   "pitch": -20.66,
   "yaw": 1.64,
   "hfov": 13.09,
   "distance": 100
  }
 ],
 "id": "overlay_7C5EA2CA_6334_C3BC_41BE_3F6E1CDD5105",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 1.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.66,
   "hfov": 13.09
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Secundario 1",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3, this.camera_422AC99F_6313_C11A_41D1_37148E89E683); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463D9F9E_633D_41CA_41A4_A0C4BC5BB527",
   "pitch": -9.54,
   "yaw": -53.38,
   "hfov": 17.67,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E42CA_6334_C3BC_41BA_58930740F732",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -53.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.54,
   "hfov": 17.67
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463DEF9F_633D_41CA_41C2_970C519D7AB7",
   "pitch": -15.25,
   "yaw": -3.25,
   "hfov": 3.69,
   "distance": 100
  }
 ],
 "id": "overlay_7C5E12CA_6334_C3BC_41C3_E1288C17D23B",
 "data": {
  "label": "Arrow 02b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_5_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -3.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.25,
   "hfov": 3.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Secundario 2",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463C4F9F_633D_41CA_41D0_B03387F50E62",
   "pitch": -16.37,
   "yaw": -10.22,
   "hfov": 4.69,
   "distance": 50
  }
 ],
 "id": "overlay_7C5E02CA_6334_C3BC_41B4_57D53418D9F4",
 "data": {
  "label": "Arrow 02b Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_6_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -10.22,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.37,
   "hfov": 4.69
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicios Higienicos",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463C9F9F_633D_41CA_41D7_6C0AF8BAC448",
   "pitch": -15.81,
   "yaw": 11.23,
   "hfov": 4.05,
   "distance": 50
  }
 ],
 "id": "overlay_7C5E32CA_6334_C3BC_41D7_BC81C2A2A205",
 "data": {
  "label": "Arrow 02b Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_7_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 11.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.81,
   "hfov": 4.05
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicio Higienico Visita",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463CFF9F_633D_41CA_41D6_22ABC50AEFD8",
   "pitch": -27.19,
   "yaw": 79.47,
   "hfov": 7.75,
   "distance": 50
  }
 ],
 "id": "overlay_7C5DD2CA_6334_C3BC_41B8_CF81B8F7C2A2",
 "data": {
  "label": "Arrow 02c Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_8_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 79.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.19,
   "hfov": 7.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B, this.camera_4262492F_6313_C13A_41C0_BFF632F1173A); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46336F9B_633D_41CA_41D5_A8C292C55E36",
   "pitch": -27.16,
   "yaw": 32.24,
   "hfov": 16.46,
   "distance": 100
  }
 ],
 "id": "overlay_42E9B504_6335_C6AB_41C5_60284C1CC377",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 32.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.16,
   "hfov": 16.46
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443, this.camera_424EE958_6313_C166_41D7_3CE33053BE75); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4633CF9B_633D_41CA_41C7_962E7A1F5763",
   "pitch": -16.76,
   "yaw": -51.73,
   "hfov": 9.52,
   "distance": 100
  }
 ],
 "id": "overlay_42E84505_6335_C6B5_41D7_83C6B9811658",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -51.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.76,
   "hfov": 9.52
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_426BD920_6313_C127_41BE_6298EEDB8E58); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46321F9B_633D_41CA_41D2_C6AF2D87DC6F",
   "pitch": -12.46,
   "yaw": -140.91,
   "hfov": 5.57,
   "distance": 100
  }
 ],
 "id": "overlay_42E86505_6335_C6B5_41C5_5EA5560A428D",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -140.91,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.46,
   "hfov": 5.57
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0, this.camera_425F293D_6313_C11E_41CC_D751F60C48D0); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46327F9B_633D_41CA_41C2_1AED1C9D4173",
   "pitch": -28.94,
   "yaw": -129.66,
   "hfov": 11.38,
   "distance": 50
  }
 ],
 "id": "overlay_42E81505_6335_C6B5_41A4_1A591BA75F77",
 "data": {
  "label": "Arrow 02c Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -129.66,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -28.94,
   "hfov": 11.38
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4632DF9B_633D_41CA_41D4_A1A332099CE1",
   "pitch": -10.02,
   "yaw": -40.79,
   "hfov": 4.45,
   "distance": 50
  }
 ],
 "id": "overlay_42E82505_6335_C6B5_41CA_C1C5D79F3615",
 "data": {
  "label": "Arrow 02c Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -40.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.02,
   "hfov": 4.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicio Higienico de Visita",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C, this.camera_4256D94B_6313_C17A_41C9_1D8792DB8B10); this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46311F9C_633D_41CE_41AD_BF924DBE2B44",
   "pitch": -20.45,
   "yaw": -133.85,
   "hfov": 6.75,
   "distance": 50
  }
 ],
 "id": "overlay_42E8F505_6335_C6B5_41C1_EDB55814C5D3",
 "data": {
  "label": "Arrow 02c Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_5_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -133.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.45,
   "hfov": 6.75
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_438D38A4_6313_CF2E_41D4_44A6DB603EC8); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46317F9C_633D_41CE_41D5_B7CD46DBF57B",
   "pitch": -29.1,
   "yaw": -147.27,
   "hfov": 18.42,
   "distance": 100
  }
 ],
 "id": "overlay_7C2AF749_6335_C2BA_4191_5A0E38B48270",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -147.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.1,
   "hfov": 18.42
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A, this.camera_438BC8C0_6313_CF67_41C6_EE84E2384DDC); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4631DF9C_633D_41CE_41CE_BAFA3F708B83",
   "pitch": -9.23,
   "yaw": -147.57,
   "hfov": 7.14,
   "distance": 100
  }
 ],
 "id": "overlay_7C2AE749_6335_C2BA_41D6_FD4A72D345B9",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -147.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.23,
   "hfov": 7.14
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46302F9C_633D_41CE_41AB_2AF5CC5BBC2D",
   "pitch": -14.93,
   "yaw": -141.74,
   "hfov": 6.11,
   "distance": 50
  }
 ],
 "id": "overlay_7C2AC749_6335_C2BA_41D0_1712CA76C1D8",
 "data": {
  "label": "Arrow 02c Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -141.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.93,
   "hfov": 6.11
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443, this.camera_438898B2_6313_CF2A_41D0_8A7D495DB529); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46307F9C_633D_41CE_41D1_B5B7EAD5E8CE",
   "pitch": -5.44,
   "yaw": -69.49,
   "hfov": 6.49,
   "distance": 100
  }
 ],
 "id": "overlay_7C2AA74E_6335_C2B6_41D6_3B5D8EF95E4E",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -69.49,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.44,
   "hfov": 6.49
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicio Higienico de Visita",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4630BF9D_633D_41CE_418D_BEA4C610D51E",
   "pitch": -12.31,
   "yaw": -143.29,
   "hfov": 3.41,
   "distance": 50
  }
 ],
 "id": "overlay_7C2A874E_6335_C2B6_41A4_09BF4BF2FC8D",
 "data": {
  "label": "Arrow 02c Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -143.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.31,
   "hfov": 3.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_42449966_6313_C12B_41B5_687202C6BA11); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46392FA1_633D_41F6_41AF_BB4612DE8C2E",
   "pitch": 8.42,
   "yaw": 135.2,
   "hfov": 32.99,
   "distance": 100
  }
 ],
 "id": "overlay_7CF20193_633D_41D0_41AF_9CAF84960121",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 135.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 8.42,
   "hfov": 32.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Estar",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0, this.camera_41A8784B_6313_CF7A_41C1_BD4B1F48E9D1); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46398FA1_633D_41F6_419C_E58C9422FFE8",
   "pitch": 12.23,
   "yaw": -150.52,
   "hfov": 42.96,
   "distance": 100
  }
 ],
 "id": "overlay_7CA47548_633D_C6B1_41C2_9F952EA73004",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -150.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 12.23,
   "hfov": 42.96
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0, this.camera_438718CD_6313_CF79_41B6_D57A49402568); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46072FA3_633D_41FA_41D5_5E10A471C7CA",
   "pitch": -19.68,
   "yaw": -101.12,
   "hfov": 11.62,
   "distance": 100
  }
 ],
 "id": "overlay_7CC16850_633D_4F51_41B9_34EE69190F2E",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -101.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.68,
   "hfov": 11.62
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3, this.camera_41CC7820_6313_CF27_41B6_869EC40C3C23); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463A2FA1_633D_41F6_41D5_054D6BACF398",
   "pitch": 6.03,
   "yaw": -50.01,
   "hfov": 30.93,
   "distance": 100
  }
 ],
 "id": "overlay_7DEC2391_6333_C1AE_41B2_E79C43ECAB0C",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -50.01,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 6.03,
   "hfov": 30.93
  }
 ]
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
 "left": 0,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 10,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 7,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 10,
 "minHeight": 1,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontSize": "13px",
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.8,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "show": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "top": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Swis721 LtCn BT",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "transitionMode": "blending",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#333333",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Floor Plan 2"
 },
 "vrPointerColor": "#FFFFFF"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74, this.camera_427B58F6_6313_CF2B_414F_BEED7D7439B4); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463F2F9D_633D_41CE_41D0_B1C09A6909A9",
   "pitch": -26.96,
   "yaw": -28.52,
   "hfov": 9.19,
   "distance": 50
  }
 ],
 "id": "overlay_7C23B5F2_6335_416F_4191_9C3D647E3007",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -28.52,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.96,
   "hfov": 9.19
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_4381D8DC_6313_CF1E_41BC_90003ED51749); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463F6F9D_633D_41CE_41CC_449FC2E4ACB3",
   "pitch": -15.99,
   "yaw": 175.04,
   "hfov": 12.41,
   "distance": 100
  }
 ],
 "id": "overlay_7C23A5F3_6335_416D_41AC_F39F9E6135F6",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 175.04,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.99,
   "hfov": 12.41
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B, this.camera_427E98E9_6313_CF26_41D3_C9CF1F91F8C0); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463FBF9D_633D_41CE_41D8_073431C0F8D6",
   "pitch": -8.58,
   "yaw": 132.95,
   "hfov": 5.93,
   "distance": 50
  }
 ],
 "id": "overlay_7C23C5F3_6335_416D_41C5_220BC1786FF5",
 "data": {
  "label": "Arrow 02b Left"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 132.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.58,
   "hfov": 5.93
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_412AB7A2_6313_C12A_4179_D9DE54984F90); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4639DFA2_633D_41FA_41B9_676C65550F42",
   "pitch": -31.58,
   "yaw": -87.24,
   "hfov": 10.7,
   "distance": 50
  }
 ],
 "id": "overlay_7CFC04E2_633D_C771_41C8_64C83FAAEBAD",
 "data": {
  "label": "Arrow 02c Right"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -87.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -31.58,
   "hfov": 10.7
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicio Higienico de Visita",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80, this.camera_411A97BE_6313_C11A_41CC_BAC1E7F4FE32); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46381FA2_633D_41FA_41B7_F5B61FE3DCD4",
   "pitch": -0.99,
   "yaw": 5.73,
   "hfov": 6.99,
   "distance": 100
  }
 ],
 "id": "overlay_7CFCF4E2_633D_C771_41D5_91F8E07292EF",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 5.73,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.99,
   "hfov": 6.99
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301, this.camera_4121C7B0_6313_C126_41D4_2B05DEEECA7D); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_46388FA2_633D_41FA_4196_9B7807E12EC5",
   "pitch": -6.17,
   "yaw": 153.47,
   "hfov": 19.45,
   "distance": 100
  }
 ],
 "id": "overlay_7CFCE4E2_633D_C771_41C7_BEA1886BE4E9",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 153.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.17,
   "hfov": 19.45
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D, this.camera_4132E793_6313_C1E9_41D1_74FE5E97A716); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_4638CFA2_633D_41FA_41C5_28919171E670",
   "pitch": -22.7,
   "yaw": 81.1,
   "hfov": 17.07,
   "distance": 100
  }
 ],
 "id": "overlay_7CFCD4E2_633D_C771_41CA_1BD562E79B89",
 "data": {
  "label": "Circle 03b"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_3_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 81.1,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -22.7,
   "hfov": 17.07
  }
 ]
},
{
 "map": {
  "width": 29,
  "x": 559.75,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 398.35
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 559.75,
  "class": "HotspotMapOverlayImage",
  "y": 398.35,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_74C3BCA8_6030_DE81_41D7_7F180F033286",
 "data": {
  "label": "COMEDOR 1"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 676.75,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 396.95
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 676.75,
  "class": "HotspotMapOverlayImage",
  "y": 396.95,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_74F606B1_6030_4A83_41B9_5A2126A14711",
 "data": {
  "label": "SALA"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 564.55,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 235.05
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 564.55,
  "class": "HotspotMapOverlayImage",
  "y": 235.05,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_755C1047_603F_C58F_41BC_9383B16E4C98",
 "data": {
  "label": "COMEDOR 2"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 666.75,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_3_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 101.35
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 666.75,
  "class": "HotspotMapOverlayImage",
  "y": 101.35,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_3.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_75E770FA_6030_C681_41C8_054E73DCC210",
 "data": {
  "label": "COCINA"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 390.15,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_4_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 373.7
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 390.15,
  "class": "HotspotMapOverlayImage",
  "y": 373.7,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_4.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_75B53DE1_6030_BE82_41D3_26A582D5DB4D",
 "data": {
  "label": "SHV 1"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 282.05,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_5_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 412.05
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 282.05,
  "class": "HotspotMapOverlayImage",
  "y": 412.05,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_5.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_74A12838_6033_C581_41D2_A123D31F8DF7",
 "data": {
  "label": "PASILLO 1"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 280.05,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_6_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 278.9
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 280.05,
  "class": "HotspotMapOverlayImage",
  "y": 278.9,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_6.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_753D6FB9_6030_7A83_41D4_AF3B5D990A6C",
 "data": {
  "label": "PASILLO 2"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 353.8,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_7_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 216.25
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 353.8,
  "class": "HotspotMapOverlayImage",
  "y": 216.25,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_7.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_75867A09_6030_C583_41D1_A71D731951F0",
 "data": {
  "label": "SH"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 223.25,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_8_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 152
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 223.25,
  "class": "HotspotMapOverlayImage",
  "y": 152,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_8.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_75FA18C9_6030_4683_41D2_AC8FA216524F",
 "data": {
  "label": "DP"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 353.15,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_9_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 85.8
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 353.15,
  "class": "HotspotMapOverlayImage",
  "y": 85.8,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_9.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_7529694A_6030_4781_41C5_BD50196A38F8",
 "data": {
  "label": "SHP"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 183.2,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_10_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 223.25
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 183.2,
  "class": "HotspotMapOverlayImage",
  "y": 223.25,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_10.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_759E055D_6030_CF83_41D2_ABEDF85EE94B",
 "data": {
  "label": "DS2"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 180.05,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_11_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 379.45
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 180.05,
  "class": "HotspotMapOverlayImage",
  "y": 379.45,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_76ECAA2F_6030_459F_417D_FD8496661E95_HS_11.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_74469230_6030_4581_41B5_76C12D443405",
 "data": {
  "label": "DS1"
 },
 "rollOverDisplay": false
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443, this.camera_41DFB812_6313_CEEB_41D4_6E3BF57AA920); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463E0F9D_633D_41CE_41D0_99C5EE8842D0",
   "pitch": -34.82,
   "yaw": -152.23,
   "hfov": 14.85,
   "distance": 50
  }
 ],
 "id": "overlay_7C5D35DE_6335_4157_41A2_18B3B46D8089",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -152.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -34.82,
   "hfov": 14.85
  }
 ]
},
{
 "map": {
  "width": 29,
  "x": 583.55,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 398.18
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 583.55,
  "class": "HotspotMapOverlayImage",
  "y": 398.18,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_7BD8EF8A_6070_7A87_4188_87617F967778",
 "data": {
  "label": "ESTAR"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 723.53,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 388.19
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 723.53,
  "class": "HotspotMapOverlayImage",
  "y": 388.19,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_7B570D9F_6070_DEBD_41D6_374843985EA0",
 "data": {
  "label": "TERRAZA"
 },
 "rollOverDisplay": false
},
{
 "map": {
  "width": 29,
  "x": 622.58,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 94.24
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 622.58,
  "class": "HotspotMapOverlayImage",
  "y": 94.24,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_77121C23_6030_7D87_41C9_3337E3E82B5C_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 },
 "useHandCursor": true,
 "id": "overlay_7CAAFBE7_6071_DA8D_41D5_A43CD1DF560A",
 "data": {
  "label": "SHV2"
 },
 "rollOverDisplay": false
},
{
 "playbackBarHeadShadowOpacity": 0.7,
 "progressBarOpacity": 1,
 "id": "MapViewer",
 "left": 0,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 10,
 "playbackBarBorderColor": "#FFFFFF",
 "width": "100%",
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 7,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "toolTipPaddingLeft": 10,
 "minHeight": 1,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "displayTooltipInTouchScreens": true,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorDirection": "vertical",
 "minWidth": 1,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "height": "100%",
 "borderSize": 0,
 "toolTipBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBorderColor": "#FFFFFF",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipFontSize": "13px",
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.8,
 "shadow": false,
 "transitionDuration": 500,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "show": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "top": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Swis721 LtCn BT",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "transitionMode": "blending",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#333333",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "data": {
  "name": "Floor Plan"
 },
 "vrPointerColor": "#FFFFFF"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_41C7782E_6313_CF3B_41D2_FBF642CE4D41); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463A8FA1_633D_41F6_41B3_DEFAA0337530",
   "pitch": 7.29,
   "yaw": -118.34,
   "hfov": 14.88,
   "distance": 100
  }
 ],
 "id": "overlay_7CB545E4_633C_C177_41BF_EC07C120F040",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": -118.34,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 7.29,
   "hfov": 14.88
  }
 ]
},
{
 "media": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_41563737_6313_C12A_41D2_6FDE5512C431, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "camera": "this.panorama_42E9E504_6335_C6AB_41D7_ED794C922301_camera",
 "id": "PanoramaPlayListItem_41563737_6313_C12A_41D2_6FDE5512C431"
},
{
 "media": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_41577737_6313_C12A_41D6_A348BCAA1B57, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "camera": "this.panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_camera",
 "id": "PanoramaPlayListItem_41577737_6313_C12A_41D6_A348BCAA1B57"
},
{
 "media": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4157C738_6313_C126_41D1_75E597883974, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "camera": "this.panorama_7C2385F2_6335_416F_41C7_AE070B69B443_camera",
 "id": "PanoramaPlayListItem_4157C738_6313_C126_41D1_75E597883974"
},
{
 "media": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_41502738_6313_C126_41C2_8E5CCA9EA492, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "camera": "this.panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_camera",
 "id": "PanoramaPlayListItem_41502738_6313_C126_41C2_8E5CCA9EA492"
},
{
 "media": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4150973D_6313_C11E_41D8_31957C3E7207, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "camera": "this.panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_camera",
 "id": "PanoramaPlayListItem_4150973D_6313_C11E_41D8_31957C3E7207"
},
{
 "media": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4151073E_6313_C11A_41D6_E23B50248B2C, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "camera": "this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430_camera",
 "id": "PanoramaPlayListItem_4151073E_6313_C11A_41D6_E23B50248B2C"
},
{
 "media": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4152773E_6313_C11A_41D5_0F2EC0623FCE, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "camera": "this.panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_camera",
 "id": "PanoramaPlayListItem_4152773E_6313_C11A_41D5_0F2EC0623FCE"
},
{
 "media": "this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4152D744_6313_C16E_41D3_CE07CD4BDA55, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "camera": "this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_camera",
 "id": "PanoramaPlayListItem_4152D744_6313_C16E_41D3_CE07CD4BDA55"
},
{
 "media": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_41535744_6313_C16E_41B0_556663D5D766, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 8, 9)",
 "camera": "this.panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_camera",
 "id": "PanoramaPlayListItem_41535744_6313_C16E_41B0_556663D5D766"
},
{
 "media": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_4153B744_6313_C16E_41B7_3D82825B67CF, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 9, 10)",
 "camera": "this.panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_camera",
 "id": "PanoramaPlayListItem_4153B744_6313_C16E_41B7_3D82825B67CF"
},
{
 "media": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_414C0745_6313_C16E_41BA_A5555A28EB07, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "camera": "this.panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_camera",
 "id": "PanoramaPlayListItem_414C0745_6313_C16E_41BA_A5555A28EB07"
},
{
 "media": "this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_414C9745_6313_C16E_41B8_9DCFD734D672, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "camera": "this.panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_camera",
 "id": "PanoramaPlayListItem_414C9745_6313_C16E_41B8_9DCFD734D672"
},
{
 "media": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_414DF74B_6313_C17A_41BD_2B44A4251169, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "camera": "this.panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_camera",
 "id": "PanoramaPlayListItem_414DF74B_6313_C17A_41BD_2B44A4251169"
},
{
 "media": "this.panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_414E474B_6313_C17A_41C2_FB0997AE6707, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "camera": "this.panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_camera",
 "id": "PanoramaPlayListItem_414E474B_6313_C17A_41C2_FB0997AE6707"
},
{
 "media": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C",
 "player": "this.MainViewerPanoramaPlayer",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_414EC74B_6313_C17A_41B9_377D3C715B23, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "camera": "this.panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_camera",
 "id": "PanoramaPlayListItem_414EC74B_6313_C17A_41B9_377D3C715B23"
},
{
 "items": [
  {
   "media": "this.album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
   "camera": {
    "duration": 5000,
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.51",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.64"
    },
    "easing": "linear",
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_444B5D56_6071_FE31_41BF_E608FEDA2243",
   "camera": {
    "duration": 5000,
    "class": "MovementPhotoCamera",
    "targetPosition": {
     "x": "0.72",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.29"
    },
    "easing": "linear",
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Servicio Higienico Principal",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E, this.camera_426EC912_6313_CEEA_41CE_8760987B67F2); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463B7FA0_633D_41F6_41A3_E8064B5FB9BA",
   "pitch": 1.04,
   "yaw": 96.6,
   "hfov": 6.82,
   "distance": 100
  }
 ],
 "id": "overlay_7CF4EE97_6333_43D3_41C9_EBE896912CFC",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 96.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.04,
   "hfov": 6.82
  }
 ]
},
{
 "enabledInCardboard": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_7C259F5D_6334_C154_41CF_11C5CB083430, this.camera_4270A903_6313_CEE9_41D5_616217D0AE5E); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_463BDFA1_633D_41F6_41BD_F6C7C4B3AEB5",
   "pitch": 2.79,
   "yaw": 170.11,
   "hfov": 22.59,
   "distance": 100
  }
 ],
 "id": "overlay_7CF4FE97_6333_43D3_41B5_575C43D55E54",
 "data": {
  "label": "Circle Generic 03"
 },
 "rollOverDisplay": false,
 "maps": [
  {
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "yaw": 170.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.79,
   "hfov": 22.59
  }
 ]
},
{
 "children": [
  "this.Container_7FF195EF_706F_7FC6_41D7_A104CA87824D",
  "this.IconButton_7FF185EF_706F_7FC6_41A5_21B418265412"
 ],
 "id": "Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D",
 "left": "0%",
 "width": 66,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "height": "100%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "- COLLAPSE"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "absolute"
},
{
 "children": [
  "this.Image_7DB3C373_7065_34DE_41BA_CF5206137DED",
  "this.Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3",
  "this.Container_4607A75D_5FCF_F8B5_41C4_3168A3CCF3F3",
  "this.Container_7DBCC382_7065_343F_41D5_9D3C36B5F479"
 ],
 "id": "Container_7DB20382_7065_343F_4186_6E0B0B3AFF36",
 "left": "0%",
 "width": 300,
 "backgroundImageUrl": "skin/Container_7DB20382_7065_343F_4186_6E0B0B3AFF36.jpg",
 "paddingRight": 40,
 "backgroundOpacity": 0.9,
 "paddingLeft": 40,
 "borderRadius": 0,
 "paddingBottom": 40,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "height": "100%",
 "contentOpaque": false,
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 1,
 "data": {
  "name": "- EXPANDED"
 },
 "paddingTop": 40,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "right": "15%",
 "paddingRight": 0,
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "scroll",
 "bottom": "10%",
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadowVerticalLength": 0,
 "shadow": true,
 "layout": "horizontal",
 "scrollBarVisible": "rollOver"
},
{
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "15%",
 "right": "15%",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "10%",
 "propagateClick": false,
 "bottom": "80%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "paddingTop": 20,
 "shadow": false,
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "right": "15%",
 "paddingRight": 0,
 "children": [
  "this.MapViewer",
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C"
 ],
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "10%",
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadowVerticalLength": 0,
 "shadow": true,
 "layout": "absolute",
 "scrollBarVisible": "rollOver"
},
{
 "id": "Container_7DABF279_60D0_4587_41BE_BB0754751B70",
 "left": "15%",
 "shadowSpread": 1,
 "shadowHorizontalLength": 0,
 "shadowBlurRadius": 25,
 "right": "15%",
 "paddingRight": 0,
 "children": [
  "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
  "this.Container_7F1D51CE_60D0_469D_41CA_F511DBBE9B65"
 ],
 "shadowColor": "#000000",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "scrollBarColor": "#000000",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "minHeight": 1,
 "top": "10%",
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "borderSize": 0,
 "minWidth": 1,
 "overflow": "visible",
 "bottom": "10%",
 "verticalAlign": "top",
 "scrollBarMargin": 2,
 "scrollBarWidth": 10,
 "gap": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Global"
 },
 "paddingTop": 0,
 "shadowVerticalLength": 0,
 "shadow": true,
 "layout": "absolute",
 "scrollBarVisible": "rollOver"
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463B6F9F_633D_41CA_41D0_03783EDD45D9",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463B9F9F_633D_41CA_4127_6133977EB64C",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463C6FA0_633D_41F6_41D1_F4615302C3AC",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463CBFA0_633D_41F6_41CE_B9C3F7877A80",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_3_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463B1FA0_633D_41F6_41B2_B06158FB003E",
 "levels": [
  {
   "url": "media/panorama_7C259F5D_6334_C154_41CF_11C5CB083430_1_HS_4_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463ACFA1_633D_41F6_41B7_9526E4B975AF",
 "levels": [
  {
   "url": "media/panorama_7CE4233A_633C_C2D0_41D6_6FA4E266E6C3_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46077FA3_633D_41FA_41D1_A461F0538A24",
 "levels": [
  {
   "url": "media/panorama_7CD0027B_633C_C356_41C8_707E91C5A57C_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463E5F9E_633D_41CA_41D5_21913E6DCAC4",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463E9F9E_633D_41CA_41AC_C2B7263407E1",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463EFF9E_633D_41CA_41D1_4E86DAB90D25",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463D3F9E_633D_41CA_41C6_BE15152F0A12",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463D9F9E_633D_41CA_41A4_A0C4BC5BB527",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_4_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463DEF9F_633D_41CA_41C2_970C519D7AB7",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_5_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463C4F9F_633D_41CA_41D0_B03387F50E62",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_6_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463C9F9F_633D_41CA_41D7_6C0AF8BAC448",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_7_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463CFF9F_633D_41CA_41D6_22ABC50AEFD8",
 "levels": [
  {
   "url": "media/panorama_7C5EE2C4_6334_C3B1_41D4_BC392359905A_1_HS_8_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46336F9B_633D_41CA_41D5_A8C292C55E36",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4633CF9B_633D_41CA_41C7_962E7A1F5763",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46321F9B_633D_41CA_41D2_C6AF2D87DC6F",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46327F9B_633D_41CA_41C2_1AED1C9D4173",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_3_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4632DF9B_633D_41CA_41D4_A1A332099CE1",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46311F9C_633D_41CE_41AD_BF924DBE2B44",
 "levels": [
  {
   "url": "media/panorama_42E9E504_6335_C6AB_41D7_ED794C922301_1_HS_5_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46317F9C_633D_41CE_41D5_B7CD46DBF57B",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4631DF9C_633D_41CE_41CE_BAFA3F708B83",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46302F9C_633D_41CE_41AB_2AF5CC5BBC2D",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46307F9C_633D_41CE_41D1_B5B7EAD5E8CE",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_3_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4630BF9D_633D_41CE_418D_BEA4C610D51E",
 "levels": [
  {
   "url": "media/panorama_7C2A1749_6335_C2BA_41C8_62142E6F287B_1_HS_4_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46392FA1_633D_41F6_41AF_BB4612DE8C2E",
 "levels": [
  {
   "url": "media/panorama_7CF3E193_633D_41D0_419A_5C8957D645C2_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46398FA1_633D_41F6_419C_E58C9422FFE8",
 "levels": [
  {
   "url": "media/panorama_7CA45547_633D_C6BF_41D0_6679E4286F80_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46072FA3_633D_41FA_41D5_5E10A471C7CA",
 "levels": [
  {
   "url": "media/panorama_7CC17850_633D_4F51_41B8_7EBF8A0E627D_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463A2FA1_633D_41F6_41D5_054D6BACF398",
 "levels": [
  {
   "url": "media/panorama_7DEC3391_6333_C1AE_41BD_D28AA4D8653E_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463F2F9D_633D_41CE_41D0_B1C09A6909A9",
 "levels": [
  {
   "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463F6F9D_633D_41CE_41CC_449FC2E4ACB3",
 "levels": [
  {
   "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463FBF9D_633D_41CE_41D8_073431C0F8D6",
 "levels": [
  {
   "url": "media/panorama_7C2385F2_6335_416F_41C7_AE070B69B443_1_HS_2_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4639DFA2_633D_41FA_41B9_676C65550F42",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46381FA2_633D_41FA_41B7_F5B61FE3DCD4",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_46388FA2_633D_41FA_4196_9B7807E12EC5",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_2_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_4638CFA2_633D_41FA_41C5_28919171E670",
 "levels": [
  {
   "url": "media/panorama_7CFC24E2_633D_C771_41CA_C0F21806FDE0_1_HS_3_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 660
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463E0F9D_633D_41CE_41D0_99C5EE8842D0",
 "levels": [
  {
   "url": "media/panorama_7C5DC5DE_6335_4157_419A_18CD0B1D0C74_1_HS_0_0.png",
   "width": 400,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463A8FA1_633D_41F6_41B3_DEFAA0337530",
 "levels": [
  {
   "url": "media/panorama_7CB5A5E3_633C_C171_41D7_F581F1FA59CD_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463B7FA0_633D_41F6_41A3_E8064B5FB9BA",
 "levels": [
  {
   "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_0_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "colCount": 4,
 "frameCount": 24,
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_463BDFA1_633D_41F6_41BD_F6C7C4B3AEB5",
 "levels": [
  {
   "url": "media/panorama_7CF48E97_6333_43D3_41CE_0984BAD799B3_1_HS_1_0.png",
   "width": 1000,
   "class": "ImageResourceLevel",
   "height": 1500
  }
 ],
 "frameDuration": 41
},
{
 "id": "Container_7FF195EF_706F_7FC6_41D7_A104CA87824D",
 "left": "0%",
 "width": 36,
 "paddingRight": 0,
 "backgroundOpacity": 0.4,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": "100%",
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Container black"
 }
},
{
 "maxWidth": 80,
 "iconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412.png",
 "id": "IconButton_7FF185EF_706F_7FC6_41A5_21B418265412",
 "left": 10,
 "maxHeight": 80,
 "width": 50,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "transparencyActive": true,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "40%",
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_7FF185EF_706F_7FC6_41A5_21B418265412_rollover.png",
 "bottom": "40%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, false, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton arrow"
 },
 "paddingTop": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "maxWidth": 1095,
 "id": "Image_7DB3C373_7065_34DE_41BA_CF5206137DED",
 "left": "0%",
 "maxHeight": 1095,
 "right": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_7DB3C373_7065_34DE_41BA_CF5206137DED.png",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 30,
 "verticalAlign": "top",
 "top": "0%",
 "propagateClick": true,
 "bottom": "80%",
 "class": "Image",
 "minWidth": 40,
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "Image Company"
 },
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "children": [
  "this.Container_4FAD07AA_5F42_6780_41D7_00AFE0F85E70"
 ],
 "id": "Container_7DB3F373_7065_34CE_41B4_E77DDA40A4F3",
 "left": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "20%",
 "propagateClick": true,
 "bottom": "55%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Container buttons"
 }
},
{
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
 "right": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 127.2,
 "bottom": "30%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-Caracteristicas"
 },
 "paddingTop": 0,
 "shadow": false,
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "children": [
  "this.IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4",
  "this.Container_7DB2F382_7065_343F_41C8_85C6AE9C717F",
  "this.HTMLText_7DB2E382_7065_343F_41C2_951F708170F1",
  "this.HTMLText_448893C1_61F3_CA13_41D6_1E6827EC1002"
 ],
 "id": "Container_7DBCC382_7065_343F_41D5_9D3C36B5F479",
 "left": "0%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "bottom",
 "top": "60%",
 "propagateClick": true,
 "bottom": "0%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "-Container footer"
 }
},
{
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "url": "https://maps.google.com/maps?output=embed&center=-12.1142224,-76.9844978&z=17&q=Av.+Del+Sur+330,+Lima+15039",
 "width": "100%",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "propagateClick": false,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0
 ],
 "class": "WebFrame",
 "minWidth": 1,
 "height": "100%",
 "borderSize": 0,
 "insetBorder": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "WebFrame48191"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollEnabled": true
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxHeight": 60,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "25%",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "verticalAlign": "middle",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "height": "75%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "horizontalAlign": "center",
 "data": {
  "name": "X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "children": [
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "verticalAlign": "top",
 "paddingBottom": 0,
 "propagateClick": false,
 "height": 140,
 "width": "100%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "children": [
  "this.IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A"
 ],
 "id": "Container_7F1D51CE_60D0_469D_41CA_F511DBBE9B65",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "verticalAlign": "top",
 "paddingBottom": 0,
 "propagateClick": false,
 "height": 140,
 "width": "100%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "header"
 },
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "children": [
  "this.Container_4FAC57A7_5F42_6780_41CD_1209EF361371",
  "this.Button_4FAC47A7_5F42_6780_41AC_BBFD36F5C4E1",
  "this.Container_4FACA7A8_5F42_6780_41B2_761BC8D56240",
  "this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0"
 ],
 "id": "Container_4FAD07AA_5F42_6780_41D7_00AFE0F85E70",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 165,
 "width": "100%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "gap": 0,
 "scrollBarWidth": 6,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.15,
 "data": {
  "name": "-Level 1"
 },
 "paddingTop": 0,
 "shadow": false,
 "layout": "vertical",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "Container_4606675D_5FCF_F8B5_41C9_DA231F9A348A",
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": 1,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "line"
 }
},
{
 "data": {
  "name": "Planta 1er Piso"
 },
 "id": "Button_4606475D_5FCF_F8B5_41CB_634CE97A2FB1",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "rollOverShadow": false,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 18,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Planta 1er Piso",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.87vmin",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "id": "Container_45A7DED2_5FC3_E98D_41D3_7350B1141D0A",
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": 1,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "line"
 }
},
{
 "data": {
  "name": "Planta 2do Piso"
 },
 "id": "Button_7F7EA528_6030_CF84_41A1_4D7BEA6A5B5C",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "rollOverShadow": false,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 18,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Planta 2do Piso",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.87vmin",
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "id": "Container_46CBDF0A_5FC2_289D_41D7_41BD6E0B3A73",
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": 1,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "line"
 }
},
{
 "data": {
  "name": "Ubicacion"
 },
 "id": "Button_4606175D_5FCF_F8B5_41AB_39A6A97BAF7E",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 18,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Ubicaci\u00f3n",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.87vmin",
 "pressedLabel": "Reception",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false); this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false)",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "id": "Container_7E338E0E_6033_BD9C_41D6_1C962F75E477",
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": 1,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "line"
 }
},
{
 "maxWidth": 80,
 "iconURL": "skin/IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4.png",
 "id": "IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4",
 "maxHeight": 80,
 "width": 42,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "transparencyActive": true,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_7DB21382_7065_343F_41B1_484EDBCD16A4_rollover.png",
 "height": 42,
 "mode": "push",
 "class": "IconButton",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_7DB20382_7065_343F_4186_6E0B0B3AFF36, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "borderSize": 0,
 "horizontalAlign": "center",
 "data": {
  "name": "IconButton collapse"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "id": "Container_7DB2F382_7065_343F_41C8_85C6AE9C717F",
 "width": 40,
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#5CA1DE"
 ],
 "backgroundColorRatios": [
  0
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "visible",
 "scrollBarMargin": 2,
 "height": 2,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "paddingTop": 0,
 "shadow": false,
 "layout": "horizontal",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "blue line"
 }
},
{
 "id": "HTMLText_7DB2E382_7065_343F_41C2_951F708170F1",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "width": "100%",
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "propagateClick": true,
 "height": 88,
 "class": "HTMLText",
 "minWidth": 1,
 "click": "this.openLink('http://grupodicon.com.pe', '_blank')",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.51vmin;font-family:'Swis721 Cn BT';\"><U>GRUPO DICON</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.51vmin;font-family:'Swis721 Cn BT';\"><U>www.grupodicon.com.pe</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.51vmin;font-family:'Swis721 Cn BT';\"><U>comercial.ventas@grupodicon.com.pe</U></SPAN></A></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.24vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://grupodicon.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#ff9900;font-size:1.51vmin;font-family:'Swis721 Cn BT';\"><U>Cel: 933 209 656</U></SPAN></A></SPAN></SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText47602"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "id": "HTMLText_448893C1_61F3_CA13_41D6_1E6827EC1002",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "width": "100%",
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "propagateClick": true,
 "height": 23,
 "class": "HTMLText",
 "minWidth": 1,
 "click": "this.openLink('http://www.totem3d.com.pe', '_blank')",
 "scrollBarMargin": 2,
 "borderSize": 0,
 "scrollBarWidth": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vmin;color:#000000;font-size:1.1vmin;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;\"><A HREF=\"http://totem3d.com.pe\" TARGET=\"_blank\" STYLE=\"text-decoration:none; color:inherit;\"><SPAN STYLE=\"color:#666666;font-size:1.24vmin;font-family:'Swis721 Cn BT';\">Desarrollado por Totem 3D</SPAN></A></SPAN></SPAN></DIV></div>",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText47602"
 },
 "paddingTop": 0,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "right": 20,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "verticalAlign": "top",
 "top": 20,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "height": "36.14%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "horizontalAlign": "right",
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "maxWidth": 60,
 "iconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A.jpg",
 "id": "IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A",
 "maxHeight": 60,
 "right": 20,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "transparencyActive": false,
 "minHeight": 50,
 "verticalAlign": "top",
 "top": 20,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_rollover.jpg",
 "height": "36.14%",
 "mode": "push",
 "class": "IconButton",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false); this.setComponentVisibility(this.Container_7FF1F5EF_706F_7FC6_41C7_BCBB555D2D3D, true, 0, null, null, false)",
 "borderSize": 0,
 "pressedIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_pressed.jpg",
 "horizontalAlign": "right",
 "data": {
  "name": "IconButton X"
 },
 "paddingTop": 0,
 "shadow": false
},
{
 "id": "Container_4FAC57A7_5F42_6780_41CD_1209EF361371",
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": 1,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "line"
 }
},
{
 "data": {
  "name": "Button 1 - Reception"
 },
 "id": "Button_4FAC47A7_5F42_6780_41AC_BBFD36F5C4E1",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 10,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 37,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "toggle",
 "class": "Button",
 "minWidth": 1,
 "label": "Departamento 602",
 "pressedBackgroundOpacity": 0,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.8,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.87vmin",
 "click": "if(!this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0.get('visible')){ this.setComponentVisibility(this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0, true, 0, this.effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D, 'showEffect', false) } else { this.setComponentVisibility(this.Container_4FACB7A7_5F42_6780_41A6_05170EA63EA0, false, 0, this.effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B, 'hideEffect', false) }",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "id": "Container_4FACA7A8_5F42_6780_41B2_761BC8D56240",
 "paddingRight": 0,
 "backgroundOpacity": 0.5,
 "contentOpaque": false,
 "paddingLeft": 0,
 "paddingBottom": 0,
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 2,
 "height": 1,
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "line"
 }
},
{
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
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "propagateClick": true,
 "height": 116,
 "width": "100%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "scrollBarMargin": 10,
 "borderSize": 0,
 "gap": 0,
 "scrollBarWidth": 7,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0,
 "data": {
  "name": "-Level 1-1"
 },
 "paddingTop": 0,
 "visible": false,
 "shadow": false,
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "layout": "vertical"
},
{
 "id": "Container_4FAC97A8_5F42_6780_41C8_09BC305D9BB3",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "paddingLeft": 0,
 "borderRadius": 0,
 "scrollBarMargin": 2,
 "minHeight": 1,
 "verticalAlign": "top",
 "paddingBottom": 0,
 "propagateClick": true,
 "height": 8,
 "width": "100%",
 "class": "Container",
 "minWidth": 1,
 "overflow": "scroll",
 "borderSize": 0,
 "gap": 10,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "line separator"
 },
 "paddingTop": 0,
 "shadow": false,
 "layout": "absolute",
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000"
},
{
 "data": {
  "name": "Bt Com1"
 },
 "id": "Button_4FAC87A8_5F42_6780_41C8_5B7D7AC1DEEF",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 15,
 "backgroundOpacity": 0,
 "rollOverShadow": false,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "rollOverShadowBlurRadius": 18,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 32,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Comedor Vista 1",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 0)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Sal"
 },
 "id": "Button_4FACF7A8_5F42_6780_41B9_16CEF81C845D",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Sala",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 23,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 1)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Com 2"
 },
 "id": "Button_4FACD7A8_5F42_6780_41D6_26FB5763A358",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Comedor Vista 2",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 2)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Coci"
 },
 "id": "Button_4FAD37A8_5F42_6780_41B1_CF6801A36268",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Cocina",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 3)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt SHV1"
 },
 "id": "Button_4FAD27A8_5F42_6780_41C2_4C1BA4140B71",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Ba\u00f1o de Visita 1",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 14)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Dorm P"
 },
 "id": "Button_4FAD07A8_5F42_6780_41C3_6EF2EF736B9E",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Dormitorio Principal",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 6)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt SHP"
 },
 "id": "Button_4A1CF61A_5FBE_38BB_41D3_26FC9A662F7A",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Ba\u00f1o Principal",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 14); this.mainPlayList.set('selectedIndex', 7)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Dor S1"
 },
 "id": "Button_4964CC11_5FC1_E889_41D3_74FA81A76361",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Dormitorio Secundario 1",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 8)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Dor S2"
 },
 "id": "Button_48CDFBD2_5FC2_6F8B_41D2_DBDBAE8A2621",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Dormitorio Secundario 2",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 9)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt SHF"
 },
 "id": "Button_48DAFF88_5FC1_E787_41A1_FA5DC645548D",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Ba\u00f1o",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Estar"
 },
 "id": "Button_487377FA_5FC6_277B_41C5_6E4A3BB97E8D",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Estar",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 12)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
},
{
 "data": {
  "name": "Bt Terraza"
 },
 "id": "Button_4776AFD2_5FC1_E78B_41B9_C31C0FEE6FCC",
 "shadowSpread": 1,
 "fontFamily": "Swis721 Cn BT",
 "iconWidth": 32,
 "paddingRight": 0,
 "iconHeight": 32,
 "shadowColor": "#000000",
 "shadowBlurRadius": 6,
 "backgroundOpacity": 0,
 "cursor": "hand",
 "width": "100%",
 "paddingLeft": 20,
 "borderRadius": 0,
 "paddingBottom": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "propagateClick": true,
 "height": 36,
 "borderColor": "#000000",
 "backgroundColorRatios": [
  0,
  1
 ],
 "mode": "push",
 "class": "Button",
 "minWidth": 1,
 "label": "Terraza 1",
 "pressedBackgroundOpacity": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "rollOverBackgroundOpacity": 0.3,
 "iconBeforeLabel": true,
 "gap": 5,
 "fontSize": "1.98vmin",
 "click": "this.mainPlayList.set('selectedIndex', 13)",
 "backgroundColorDirection": "vertical",
 "horizontalAlign": "left",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "fontStyle": "normal",
 "fontColor": "#FFFFFF",
 "paddingTop": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "shadow": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "layout": "horizontal"
}],
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "paddingTop": 0,
 "mobileMipmappingEnabled": false,
 "shadow": false,
 "layout": "absolute",
 "mouseWheelEnabled": true,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#000000",
 "data": {
  "name": "Player468"
 }
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
