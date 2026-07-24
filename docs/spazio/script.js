(function(){
    var script = {
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
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
 "id": "rootPlayer",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "start": "this.init(); this.playList_197770A2_05F4_9C18_4189_C173EFC8D7DE.set('selectedIndex', 0); this.playList_1974C0A2_05F4_9C18_418B_6980B524AA17.set('selectedIndex', 0); this.playList_197400A2_05F4_9C18_418E_8FCBEF793A50.set('selectedIndex', 0); this.playList_1977F0A2_05F4_9C18_415C_3E70E2F41B97.set('selectedIndex', 0); this.playList_1977C0A2_05F4_9C18_4190_B9178DC9359A.set('selectedIndex', 0); this.playList_197700A2_05F4_9C18_418E_13D8E68D3369.set('selectedIndex', 0)",
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "scripts": {
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "unregisterKey": function(key){  delete window[key]; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "existsKey": function(key){  return key in window; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getKey": function(key){  return window[key]; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "registerKey": function(key, value){  window[key] = value; }
 },
 "minHeight": 20,
 "downloadEnabled": false,
 "layout": "absolute",
 "borderRadius": 0,
 "verticalAlign": "top",
 "class": "Player",
 "propagateClick": true,
 "height": "100%",
 "minWidth": 20,
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_25490607_05F4_8418_4192_2D8F6E3DC953",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_5AFDA1C9_4F08_5301_41A5_258F6E1B7A4F",
 "class": "FadeInEffect"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "id": "map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E",
 "thumbnailUrl": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_t.png",
 "width": 920,
 "label": "DPTO-701-PLANTA-2",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#0D1E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "height": 603,
 "overlays": [
  "this.overlay_F78802F2_EAAD_38D1_41DA_C252F37B59B2",
  "this.overlay_F78812F2_EAAD_38D1_41DD_799167BD92E3",
  "this.overlay_F78862F2_EAAD_38D1_41E6_A39232FB153D"
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_195018B0_05F4_8C78_4180_0067B3688950",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 1.45,
    "yawSpeed": 1.9,
    "easing": "cubic_in_out",
    "targetYaw": -4.06,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -0.93
   },
   {
    "pitchSpeed": 6.35,
    "yawSpeed": 11.75,
    "easing": "cubic_in_out",
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "end": "var sequence = this.panorama_AADDAF5C_A70C_D209_41CB_7A99DBC92DEA_camera.get('initialSequence'); sequence.pause(); var self = this; setTimeout(function(){ sequence.play() }, 100000)",
    "targetPitch": -6.22
   },
   {
    "duration": 0,
    "targetPitch": -6.22,
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -103.14,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_192AF87A_05F4_8CE8_4185_BBFC9B37686E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_27D1C782_05F4_8418_4177_10D0F0F7FC4A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_25C0058E_05F4_8428_4189_3660F2E9EF90",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 38.57,
  "class": "PanoramaCameraPosition",
  "pitch": 17.45
 },
 "id": "camera_1AD6D3AF_05F4_9C68_4166_6476A648552E",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_245986F6_05F4_85F8_418A_BDE7FE554728",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1DED6488_0553_8428_418E_ED90A16299DE_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 2.66,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC5F0F42_A7CC_58D2_41C8_CE7991E550FF",
 "class": "FadeOutEffect"
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 622.69,
   "angle": 91.71,
   "class": "PanoramaMapLocation",
   "y": 182.29
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI COMEDOR 2-SRGB",
 "id": "panorama_1DED6488_0553_8428_418E_ED90A16299DE",
 "thumbnailUrl": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54",
   "yaw": 167.26,
   "backwardYaw": -25.42,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1BDA00_055C_8C18_4184_90EFF8467140"
  }
 ],
 "overlays": [
  "this.overlay_1DED2489_0553_8428_4167_21466BDB9E28",
  "this.overlay_1DED1489_0553_8428_4175_E17305305F8A",
  "this.overlay_1DED0489_0553_8428_418E_3CFBF8EBDC77",
  "this.overlay_1DEDF489_0553_8428_4190_2513605007E8"
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
 "id": "camera_1936F868_05F4_8CE8_4188_26ABD409873B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1FC6C784_0553_841F_4161_F6B7AE761209_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197470A2_05F4_9C18_4191_73A2CC4B1BE6",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 113.1,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1924E890_05F4_8C38_418F_0DC861552EDD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5DC0ED_A7F5_A9D6_41AE_46366DB9783D",
 "class": "FadeInEffect"
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI X2",
 "id": "panorama_125C3BAD_0557_8C68_4194_358C7EAE8279",
 "thumbnailUrl": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  }
 ],
 "overlays": [
  "this.overlay_125C2BAD_0557_8C68_4195_5A2560C8BD84",
  "this.overlay_125C1BAD_0557_8C68_4175_0D0976ABE270",
  "this.overlay_125CFBAD_0557_8C68_4183_72316BD3EBE3",
  "this.overlay_125CEBAD_0557_8C68_4190_5DA1900D94B3"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 502.33,
   "angle": 267.95,
   "class": "PanoramaMapLocation",
   "y": 228.22
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COMEDOR 5-SRGB",
 "id": "panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3",
 "thumbnailUrl": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1959DFF6_0555_83FB_416E_D361C87BCF28"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19A4ED49_0553_8428_4194_8459BC5F3186"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF"
  }
 ],
 "overlays": [
  "this.overlay_1E2056F2_0557_85FB_417F_D2ACDD34B320",
  "this.overlay_1E2066F2_0557_85FB_418D_F7FBD27CBF24",
  "this.overlay_1E2076F2_0557_85FB_4185_F524FB822B63",
  "this.overlay_1E2086F2_0557_85FB_4176_BAABFA752C18",
  "this.overlay_1E2096F2_0557_85FB_4182_2B7E10330240",
  "this.overlay_1E20B6F2_0557_85FB_4179_A4AD44CBF23F"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -134.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_24656737_05F4_8478_4155_DA12924F684E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_EE521299_A95C_A980_41E1_8012EC56685F",
 "class": "FadeOutEffect"
},
{
 "id": "MainViewerPhotoAlbumPlayer",
 "viewerArea": "this.MainViewer",
 "class": "PhotoAlbumPlayer"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1D9CB834_055D_8C78_4188_C5620981969B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "id": "ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765E",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB59D0EB_A7F5_A9D2_41DA_EA49FC3B63D4",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1B8E5220_05F4_9C18_4193_EB0A8579E884",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 356.4,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 343.65
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COCINA-SRGB",
 "id": "panorama_1FC6C784_0553_841F_4161_F6B7AE761209",
 "thumbnailUrl": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  }
 ],
 "overlays": [
  "this.overlay_1FC6E784_0553_841F_4159_6267C9F19AB4",
  "this.overlay_1FC68784_0553_841F_4178_B6CEE7035897"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 499.06,
   "angle": 267.4,
   "class": "PanoramaMapLocation",
   "y": 344.58
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 COMEDOR 3-SRGB",
 "id": "panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF",
 "thumbnailUrl": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CEDE816_055F_8C38_418E_7A08769A1A13"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4"
  },
  {
   "panorama": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B",
   "yaw": 0.07,
   "backwardYaw": -177.16,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885"
  }
 ],
 "overlays": [
  "this.overlay_1DF062CA_055C_FC28_418C_F1B498710623",
  "this.overlay_1DF072CA_055C_FC28_4194_D06897E40A47",
  "this.overlay_1DF002CA_055C_FC28_417B_025C99317703",
  "this.overlay_1DF012CA_055C_FC28_4183_5C647449E5F0",
  "this.overlay_1DF022CA_055C_FC28_417D_BEC422EBE6FD",
  "this.overlay_1DF032CA_055C_FC28_4190_DFFBC305ABAE",
  "this.overlay_1DF1C2CA_055C_FC28_418F_EED28B870226",
  "this.overlay_1DF1D2CA_055C_FC28_418D_EB9F7B46EAD8",
  "this.overlay_1DF182CA_055C_FC28_4189_9BA30AA883BD"
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
 "id": "camera_24A19672_05F4_84F8_4184_8D4EA117D6C0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_4614B88C_7576_021E_41D2_418BC89D7577",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1976B0A2_05F4_9C18_4183_F0E9688BB862",
 "class": "PlayList"
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5CD0EF_A7F5_A9D2_41E2_3824B0946812",
 "class": "FadeInEffect"
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_4B7BDB89_753A_0606_419D_5F34AC1C5036",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1FC38A81_0555_8C19_4175_14474F252753_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 37.65,
  "class": "PanoramaCameraPosition",
  "pitch": 20.2
 },
 "id": "camera_1AF5C3E5_05F4_9C18_4165_6E6514A87B5C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1B2242F0_05F4_9DF8_4182_661BD5D16DAB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -129.49,
  "class": "PanoramaCameraPosition",
  "pitch": -42.24
 },
 "id": "camera_1A0E2430_05F4_8478_4179_3978B1745B6E",
 "automaticZoomSpeed": 10
},
{
 "width": 920,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_F474072F_EAAD_394F_41E1_5BBD82B2E1A9",
 "thumbnailUrl": "media/map_F474072F_EAAD_394F_41E1_5BBD82B2E1A9_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-701-PLANTA-2-JPG",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_F474072F_EAAD_394F_41E1_5BBD82B2E1A9.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_F474072F_EAAD_394F_41E1_5BBD82B2E1A9_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 603,
 "initialZoomFactor": 1
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1D6A8C40_0555_8418_417B_8070C5C48340_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1930685A_05F4_8C28_418F_86C9995BF719",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_27C11792_05F4_8438_417D_A8E93A09D339",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 2.84,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_18387174_05F4_9CF8_417A_CF59A859318A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 37.65,
  "class": "PanoramaCameraPosition",
  "pitch": 17.45
 },
 "id": "camera_1A5B1480_05F4_8418_4194_76711708EFF8",
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D",
 "class": "FadeInEffect"
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI HALL 1-RGB",
 "id": "panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68",
 "thumbnailUrl": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/r/3/{row}_{column}.jpg",
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
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "thumbnailUrl": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_t.jpg"
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6"
  },
  {
   "panorama": "this.panorama_12A29C71_0555_84F8_4191_5AD65F782312",
   "yaw": 45.45,
   "backwardYaw": 176.29,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  }
 ],
 "overlays": [
  "this.overlay_12C46DF7_0554_87F8_417E_C6BE4F5521F1",
  "this.overlay_12C41DF7_0554_87F8_418C_67A589FDE834",
  "this.overlay_12C43DF7_0554_87F8_418F_9EE6FB346659",
  "this.overlay_12C42DF7_0554_87F8_4171_B95957A58BE7"
 ],
 "partial": false
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC203F41_A7CC_58CE_41D9_856AA5CEF294",
 "class": "FadeOutEffect"
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI PATIO 1-SRGB",
 "id": "panorama_1281485E_0554_8C28_4117_AABDB6019BC0",
 "thumbnailUrl": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C",
   "yaw": 17.74,
   "backwardYaw": -66.9,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "panorama": "this.panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552",
   "yaw": 12.31,
   "backwardYaw": 6.24,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_1281585E_0554_8C28_4191_E5DB33940472",
  "this.overlay_1280A85E_0554_8C28_4172_C4D0C08EF9C7"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 462.12,
   "angle": 180.73,
   "class": "PanoramaMapLocation",
   "y": 407.09
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 SHV 1ER PISO-SRGB",
 "id": "panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C",
 "thumbnailUrl": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B"
  }
 ],
 "overlays": [
  "this.overlay_1CFFBFCD_055F_8429_4153_F6358952E0AD"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -2.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2795C746_05F4_8418_4194_8923411DF5FA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F49DCFEF_EAAD_08CF_41EB_40EC0B6E5D0A",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1974C0A2_05F4_9C18_418B_6980B524AA17",
 "class": "PlayList"
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 668.22,
   "angle": 135,
   "class": "PanoramaMapLocation",
   "y": 346.38
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 DORM PRINCIPAL-SRGB",
 "id": "panorama_1D833878_055D_8CF7_4188_7DF8A38CB885",
 "thumbnailUrl": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D9CB834_055D_8C78_4188_C5620981969B"
  }
 ],
 "overlays": [
  "this.overlay_1D832878_055D_8CF7_4132_903168D1C6D0",
  "this.overlay_1D837878_055D_8CF7_418C_77BF10BCB990"
 ],
 "partial": false
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC208F41_A7CC_58CE_41D7_C89A49BDED40",
 "class": "FadeOutEffect"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E949EC43_FEE5_0C8E_41E5_0D6474D24273",
   "player": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197700A2_05F4_9C18_418E_13D8E68D3369",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -167.69,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1920B886_05F4_8C18_4191_26B7D87D32CC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 453.55,
   "angle": 270,
   "class": "PanoramaMapLocation",
   "y": 229.85
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COMEDOR 3-SRGB",
 "id": "panorama_1FC38A81_0555_8C19_4175_14474F252753",
 "thumbnailUrl": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1979EA66_0555_8C1B_4173_7393A6159775"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19FCE6D1_0554_8439_4189_6FB639D5833F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_199039CD_0553_8C28_4183_39FD45DD7E5B"
  }
 ],
 "overlays": [
  "this.overlay_1FC26A81_0555_8C19_417D_F568ED996273",
  "this.overlay_1FC25A81_0555_8C19_4183_1897F70193CF",
  "this.overlay_1FC24A81_0555_8C19_4159_8A144DF31BEC",
  "this.overlay_1FC37A81_0555_8C19_4190_DB94254EE46C",
  "this.overlay_1FC36A81_0555_8C19_418B_30B689A4BAE0"
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
 "id": "camera_251C05BD_05F4_8468_4188_19FE25717128",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 154.58,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_194A38D0_05F4_8C38_4195_AD47B9464CAE",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 18.08,
    "yawSpeed": 35.32,
    "easing": "cubic_in_out",
    "targetYaw": -4.06,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -0.93
   },
   {
    "pitchSpeed": 6.35,
    "yawSpeed": 11.75,
    "easing": "cubic_in_out",
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "end": "var sequence = this.panorama_AADDAF5C_A70C_D209_41CB_7A99DBC92DEA_camera.get('initialSequence'); sequence.pause(); var self = this; setTimeout(function(){ sequence.play() }, 100000)",
    "targetPitch": -6.22
   },
   {
    "duration": 0,
    "targetPitch": -6.22,
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest"
   }
  ]
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
 "id": "panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5E10F0_A7F5_A9CE_41A7_B92C1ACA5DB3",
 "class": "FadeInEffect"
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38",
 "class": "FadeOutEffect"
},
{
 "width": 920,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_F49DCFEF_EAAD_08CF_41EB_40EC0B6E5D0A",
 "thumbnailUrl": "media/map_F49DCFEF_EAAD_08CF_41EB_40EC0B6E5D0A_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-701-PLANTA-1-JPG",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_F49DCFEF_EAAD_08CF_41EB_40EC0B6E5D0A.jpeg",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_F49DCFEF_EAAD_08CF_41EB_40EC0B6E5D0A_lq.jpeg",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 603,
 "initialZoomFactor": 1
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 OFFICE-SRGB",
 "id": "panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5",
 "thumbnailUrl": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B"
  }
 ],
 "overlays": [
  "this.overlay_1C0EBF7E_055C_84EB_4192_9C8600E48569"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 185.9,
   "angle": 45.44,
   "class": "PanoramaMapLocation",
   "y": 229.45
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 ESTUDIO-SRGB",
 "id": "panorama_1979EA66_0555_8C1B_4173_7393A6159775",
 "thumbnailUrl": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753"
  }
 ],
 "overlays": [
  "this.overlay_1979FA66_0555_8C1B_417A_38AC8189C3C2"
 ],
 "partial": false
},
{
 "items": [
  {
   "begin": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F474072F_EAAD_394F_41E1_5BBD82B2E1A9",
   "player": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1976E0A2_05F4_9C18_4191_AA58EC41EAA8",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B",
   "player": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1969A0A2_05F4_9C18_4138_322049417990",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
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
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_187691E6_05F4_9C18_417A_ED287BFAAE56",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_240B26CC_05F4_8428_4188_1B5EF2BCD894",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "id": "ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC5FEF40_A7CC_58CE_41BB_C81A3CE4CC8B",
 "class": "FadeOutEffect"
},
{
 "from": "left",
 "duration": 400,
 "easing": "quad_in",
 "id": "effect_4C974746_571D_6541_41CE_76A308A87323",
 "class": "SlideInEffect"
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 574.22,
   "angle": 57.8,
   "class": "PanoramaMapLocation",
   "y": 224.36
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 DP-SRGB",
 "id": "panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C",
 "thumbnailUrl": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  }
 ],
 "overlays": [
  "this.overlay_1EEECBAD_0557_8C68_4179_482F01EB577E",
  "this.overlay_1EEEDBAD_0557_8C68_4192_C4DF0ACCA364"
 ],
 "partial": false
},
{
 "id": "MapViewerMapPlayer",
 "viewerArea": "this.MapViewer",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC5F5F42_A7CC_58D2_41D9_DDF8532AE26B",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1BAEB24B_05F4_9C28_4151_7360E5654DCD",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": -4.06,
  "class": "PanoramaCameraPosition",
  "pitch": -0.93
 },
 "id": "panorama_1D1AE23E_0553_FC68_4188_605472736D54_camera",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 6.35,
    "yawSpeed": 11.75,
    "easing": "cubic_in_out",
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "end": "var sequence = this.panorama_AADDAF5C_A70C_D209_41CB_7A99DBC92DEA_camera.get('initialSequence'); sequence.pause(); var self = this; setTimeout(function(){ sequence.play() }, 100000)",
    "targetPitch": -6.22
   },
   {
    "duration": 0,
    "targetPitch": -6.22,
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_4614A88C_7576_021E_41C6_F0C9ED5051FA",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1824F19C_05F4_9C28_4190_6102DB0A9708",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_59CA3A81_4F08_D101_41D3_0462DF8FB066",
 "class": "FadeOutEffect"
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5A80ED_A7F5_A9D6_41D3_C23F221B02A9",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_24FD569C_05F4_8428_4192_EE9BE8A3EE38",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI PATIO 2-SRGB",
 "id": "panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552",
 "thumbnailUrl": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C",
   "yaw": -5.68,
   "backwardYaw": 76.86,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "panorama": "this.panorama_1281485E_0554_8C28_4117_AABDB6019BC0",
   "yaw": 6.24,
   "backwardYaw": 12.31,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_1D6298A1_0554_8C18_418C_AC0792D67397",
  "this.overlay_1D6288A1_0554_8C18_4195_484471DDF9FF"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 170.96,
  "class": "PanoramaCameraPosition",
  "pitch": -37.26
 },
 "id": "panorama_122A3252_0554_BC3B_4194_9382E6D6E856_camera",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -36.73,
  "class": "PanoramaCameraPosition",
  "pitch": 18.37
 },
 "id": "camera_1AD9639A_05F4_9C28_4161_5F5D7B7588B0",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_24DF067E_05F4_84E8_4195_9809A3F736A3",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 425.24,
   "angle": -42.88,
   "class": "PanoramaMapLocation",
   "y": 381.73
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 GYM-SRGB",
 "id": "panorama_1959DFF6_0555_83FB_416E_D361C87BCF28",
 "thumbnailUrl": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  }
 ],
 "overlays": [
  "this.overlay_1959BFF6_0555_83FB_418B_AAE316809D09"
 ],
 "partial": false
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5100F0_A7F5_A9CE_41D8_6446A7D705FB",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1A9CA336_05F4_9C78_4174_2B6CE2AAC853",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 584.74,
   "angle": 113.5,
   "class": "PanoramaMapLocation",
   "y": 286.74
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 JUEGOS-SRGB",
 "id": "panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF",
 "thumbnailUrl": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  }
 ],
 "overlays": [
  "this.overlay_1934E15C_0554_9C2F_4182_28954E2EA896"
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
 "id": "panorama_1281485E_0554_8C28_4117_AABDB6019BC0_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_31B8DD71_225D_4E40_41A5_240011E92082",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 168.98,
  "class": "PanoramaCameraPosition",
  "pitch": -37.65
 },
 "id": "camera_1B415310_05F4_9C38_4182_F1034D9372D7",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -35.55,
  "class": "PanoramaCameraPosition",
  "pitch": 16.89
 },
 "id": "panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197790A2_05F4_9C18_417A_F4ED083E1060",
 "class": "PlayList"
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI HALL 2 JPG-RGB",
 "id": "panorama_12A29C71_0555_84F8_4191_5AD65F782312",
 "thumbnailUrl": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68",
   "yaw": 176.29,
   "backwardYaw": 45.45,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "panorama": "this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C",
   "yaw": 0.59,
   "backwardYaw": 177.71,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D6A8C40_0555_8418_417B_8070C5C48340"
  }
 ],
 "overlays": [
  "this.overlay_12A2BC71_0555_84F8_4194_09006B9A7328",
  "this.overlay_12A2DC71_0555_84F8_4187_375D0522E130",
  "this.overlay_12A2EC71_0555_84F8_4171_044E3F847F2F"
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
 "id": "panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1BD2F266_05F4_9C18_4190_D0C41A73225F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 400,
 "easing": "quad_in",
 "id": "effect_618C5950_7067_14DB_41DB_D2CA7B61EE3C",
 "class": "SlideOutEffect",
 "to": "left"
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "DPTO-602-PLANTA-1",
 "id": "album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
 "thumbnailUrl": "media/album_431A74C1_6071_CE13_41B6_6A6768C52AEF_t.jpg",
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_431A74C1_6071_CE13_41B6_6A6768C52AEF.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 839
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_24570702_05F4_8418_416D_F76AFB9E5415",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "x": 394.08,
   "angle": -57.99,
   "class": "PanoramaMapLocation",
   "y": 246.92
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI-TERRAZA-2-SRGB",
 "id": "panorama_2561322E_052C_FC68_4186_201DBEA1664B",
 "thumbnailUrl": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F"
  }
 ],
 "overlays": [
  "this.overlay_2560C22E_052C_FC68_4183_9C2896FF248D",
  "this.overlay_2560D22E_052C_FC68_4190_C7B261F30293",
  "this.overlay_2560F22E_052C_FC68_4180_C24A116E1424"
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
 "id": "camera_181C9146_05F4_9C18_418F_363435A7E85C",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1849C1BA_05F4_9C68_4195_542094F9B4D8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1ABB435E_05F4_9C28_4171_C77337244727",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI X1",
 "id": "panorama_122A3252_0554_BC3B_4194_9382E6D6E856",
 "thumbnailUrl": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279"
  }
 ],
 "overlays": [
  "this.overlay_122A0252_0554_BC3B_4182_80D090500858",
  "this.overlay_122A6252_0554_BC3B_418F_918FB248FB1F",
  "this.overlay_122A5252_0554_BC3B_418A_29D27D80F2FB",
  "this.overlay_122BA252_0554_BC3B_4189_3D9DEF541041"
 ],
 "partial": false
},
{
 "width": 920,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25",
 "thumbnailUrl": "media/map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-604-PLANTA-1",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideColor": "#000000",
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
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 603,
 "initialZoomFactor": 1
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -128.57,
  "class": "PanoramaCameraPosition",
  "pitch": -42.24
 },
 "id": "camera_1A48B494_05F4_8438_4176_93F7202A501C",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_25B58539_05F4_8468_4194_6FB13AF17779",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 174.32,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1BEF82A5_05F4_9C18_418F_01753539E395",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_46498381_7576_0606_41CD_118CDFEBC494",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1A6924CF_05F4_8429_4187_EEFFC2B493C5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197490A2_05F4_9C18_4184_EF6210ABD2F9",
 "class": "PlayList"
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 455.5,
   "angle": 61.11,
   "class": "PanoramaMapLocation",
   "y": 377.6
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COMEDOR 1-SRGB",
 "id": "panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59",
 "thumbnailUrl": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC6C784_0553_841F_4161_F6B7AE761209"
  }
 ],
 "overlays": [
  "this.overlay_1FB38408_055C_8417_417C_5B07409E38E2",
  "this.overlay_1FB36408_055C_8417_418B_517F68A72DF4",
  "this.overlay_1FB35408_055C_8417_4170_D7DB66983D5A",
  "this.overlay_1FB34408_055C_8417_4184_214528BD076B",
  "this.overlay_1FB33408_055C_8417_4190_1DBF46E7958F"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -21.12,
  "class": "PanoramaCameraPosition",
  "pitch": 1.84
 },
 "id": "camera_25851520_05F4_8418_4189_E612E49A4EE6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1A8D134B_05F4_9C28_418E_A46FF47204C0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_3F3D415A_22F5_B641_4176_C13E8BC46385",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2477E728_05F4_8468_4142_4233AF311FC0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PhotoAlbum",
 "label": "Album de Fotos 303-DORMITORIO",
 "id": "album_383D1026_2235_55C1_41B4_B2C4B0B66487",
 "thumbnailUrl": "media/album_383D1026_2235_55C1_41B4_B2C4B0B66487_t.png",
 "playList": "this.album_383D1026_2235_55C1_41B4_B2C4B0B66487_AlbumPlayList"
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB51ED10_A7CC_584E_41E4_5D75E4F1C6AE",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1B07A2D5_05F4_9C38_4178_9A607CDEF94F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1E4CEDA5_055D_8418_4183_369C273834FC_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_2783D752_05F4_8438_416D_E72E71ADC474",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI X4",
 "id": "panorama_13A2BAA7_0557_8C18_4194_35D348CC784A",
 "thumbnailUrl": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279"
  }
 ],
 "overlays": [
  "this.overlay_13A2AAA7_0557_8C18_4194_AE9CBC55B85F",
  "this.overlay_13A29AA7_0557_8C18_416E_138747D453DA",
  "this.overlay_13A28AA7_0557_8C18_4169_CD5055663FAF",
  "this.overlay_13A2FAA7_0557_8C18_4182_6419A339294E"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 327,
   "angle": 268.49,
   "class": "PanoramaMapLocation",
   "y": 175.75
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 SH2-SRGB",
 "id": "panorama_19FCE6D1_0554_8439_4189_6FB639D5833F",
 "thumbnailUrl": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753"
  }
 ],
 "overlays": [
  "this.overlay_19FC86D1_0554_8439_4184_58F3F723BEB9"
 ],
 "partial": false
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_31B8AD71_225D_4E40_41B2_AE1A588E7B72",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1A6754EE_05F4_85E8_4181_9882284586A0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -130.41,
  "class": "PanoramaCameraPosition",
  "pitch": -45
 },
 "id": "camera_1B6F132C_05F4_9C68_4196_4BCB9FDF2534",
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5B50EC_A7F5_A9D6_41DE_384D4C4C1CB4",
 "class": "FadeInEffect"
},
{
 "mapLocations": [
  {
   "map": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "x": 556.67,
   "angle": 43.92,
   "class": "PanoramaMapLocation",
   "y": 318.25
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI-TERRAZA-1-SRGB",
 "id": "panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C",
 "thumbnailUrl": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_2561322E_052C_FC68_4186_201DBEA1664B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  }
 ],
 "overlays": [
  "this.overlay_1BBAF9F8_052C_8FF7_4161_F89C3A5DE34C",
  "this.overlay_1BBAE9F8_052C_8FF7_418B_33827283BFEE",
  "this.overlay_1BBA09F8_052C_8FF7_4181_B6168F0E8F10"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 95.51,
  "class": "PanoramaCameraPosition",
  "pitch": 0.92
 },
 "id": "camera_1B95420F_05F4_9C28_4150_C51318024766",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1BF9C286_05F4_9C1B_4145_2D6E98A97060",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BB5D60EE_A7F5_A9D2_41D1_95C81D1971C3",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1BF5B296_05F4_9C38_4182_C60A42C1EE06",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COMEDOR 6-SRGB",
 "id": "panorama_1E0C3788_0557_8428_4189_01956A218B4B",
 "thumbnailUrl": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_19A4ED49_0553_8428_4194_8459BC5F3186"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1959DFF6_0555_83FB_416E_D361C87BCF28"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C"
  }
 ],
 "overlays": [
  "this.overlay_1E0C6788_0557_8428_4195_9D16A7D7AD50",
  "this.overlay_1E0C7788_0557_8428_4194_DC1C5CE2D50E",
  "this.overlay_1E0C4788_0557_8428_4187_CB8D9B626044",
  "this.overlay_1E0C5788_0557_8428_4193_406892E5F1C3",
  "this.overlay_1E0CB788_0557_8428_4191_DFBAEE526129"
 ],
 "partial": false
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197620A2_05F4_9C18_4192_135D23D69F58",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_253AC5D9_05F4_8428_4177_DD0829A7D7DC",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_B8EBDF14_A7F4_D876_41E2_24E8CA7F08AF",
 "class": "FadeInEffect"
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BCBD364B_A7D4_68D2_41C9_1FA89A1A23DB",
 "class": "FadeOutEffect"
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_59CA1A81_4F08_D101_41D2_30683CB5E100",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_194688EF_05F4_8DE8_4194_83CF6936CEB5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1E0C3788_0557_8428_4189_01956A218B4B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_25EEE5AD_05F4_8468_4186_C296D968C5E0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1E71347A_0554_84EB_418B_9D281A31772F_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI X3",
 "id": "panorama_1222D37D_0557_7CE9_4184_0374F237A6F6",
 "thumbnailUrl": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279"
  }
 ],
 "overlays": [
  "this.overlay_1223337E_0557_7CEB_4178_9EE2728A8D0C",
  "this.overlay_1223637E_0557_7CEB_4174_C5C8A0D7C0B3",
  "this.overlay_1223737E_0557_7CEB_4184_05F80572670C",
  "this.overlay_1223A37E_0557_7CEB_418B_D982F84D3DBC"
 ],
 "partial": false
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC20EF41_A7CC_58CE_4187_270B63CE9C60",
 "class": "FadeOutEffect"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "id": "map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
 "thumbnailUrl": "media/map_E614F030_FEE5_748A_41CD_3AC7FF21E486_t.png",
 "width": 920,
 "label": "DPTO-604-PLANTA-3",
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
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#001E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "height": 603,
 "overlays": [
  "this.overlay_E615C030_FEE5_748A_41B9_8C220F0A9B8A",
  "this.overlay_E615D030_FEE5_748A_41D4_FCFAA721BCCA"
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1AABD37C_05F4_9CE8_418D_1F8899F5D52B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "303-DORMITORIO",
 "id": "album_383D1026_2235_55C1_41B4_B2C4B0B66487_0",
 "thumbnailUrl": "media/album_383D1026_2235_55C1_41B4_B2C4B0B66487_0_t.jpg",
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_383D1026_2235_55C1_41B4_B2C4B0B66487_0.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 839
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 506.65,
   "angle": 116.36,
   "class": "PanoramaMapLocation",
   "y": 190.81
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI COMEDOR 1-SRGB",
 "id": "panorama_1D1AE23E_0553_FC68_4188_605472736D54",
 "thumbnailUrl": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1BDA00_055C_8C18_4184_90EFF8467140"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885"
  },
  {
   "panorama": "this.panorama_1DED6488_0553_8428_418E_ED90A16299DE",
   "yaw": -25.42,
   "backwardYaw": 167.26,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_1D1A823E_0553_FC68_4191_728E8AFF684F",
  "this.overlay_1D1A923E_0553_FC68_418D_1743090B41ED",
  "this.overlay_1D1AB23E_0553_FC68_4189_5FAEE58E31AA",
  "this.overlay_1D1B423E_0553_FC68_4195_271270AC1349",
  "this.overlay_1D1B623E_0553_FC68_4120_B980F67E0440",
  "this.overlay_1D1B023E_0553_FC68_4178_C3A4B54CFE9C",
  "this.overlay_1D1B223E_0553_FC68_4185_91B1C1EAC174"
 ],
 "partial": false
},
{
 "items": [
  "this.PanoramaPlayListItem_189660B6_05F4_9C78_4131_86B6AE7DA294",
  "this.PanoramaPlayListItem_1889A0B6_05F4_9C78_417E_8FCC22831185",
  "this.PanoramaPlayListItem_188980B6_05F4_9C78_4149_62A27DDF445E",
  "this.PanoramaPlayListItem_1889C0B6_05F4_9C78_4185_E2D2481349DA",
  "this.PanoramaPlayListItem_188900B6_05F4_9C78_4188_87C756B8648E",
  {
   "media": "this.panorama_12A29C71_0555_84F8_4191_5AD65F782312",
   "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB59D0EB_A7F5_A9D2_41DA_EA49FC3B63D4, 'showEffect', false)",
   "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
   "camera": "this.panorama_12A29C71_0555_84F8_4191_5AD65F782312_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC203F41_A7CC_58CE_41D9_856AA5CEF294, 'hideEffect', false)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_188940B6_05F4_9C78_4187_691256DE4A47",
  "this.PanoramaPlayListItem_1888B0B6_05F4_9C78_418F_F36B70A7F4A2",
  "this.PanoramaPlayListItem_1888E0B6_05F4_9C78_418E_77A4EF708031",
  "this.PanoramaPlayListItem_188820B6_05F4_9C78_4190_E609D9E242C4",
  "this.PanoramaPlayListItem_196CF0A7_05F4_9C19_4185_5D33968C8D86",
  "this.PanoramaPlayListItem_196FB0A7_05F4_9C19_418C_E2FF78DF6C38",
  "this.PanoramaPlayListItem_196F20A7_05F4_9C19_4193_0722BC18BF59",
  "this.PanoramaPlayListItem_196E90A7_05F4_9C19_4183_FBFDEBB4D897",
  "this.PanoramaPlayListItem_196E70A7_05F4_9C19_418A_7869E116202F",
  "this.PanoramaPlayListItem_196F60A7_05F4_9C19_4182_B6550143E594",
  "this.PanoramaPlayListItem_196ED0A7_05F4_9C19_4160_8D47F8A13315",
  "this.PanoramaPlayListItem_196E40A7_05F4_9C19_4196_3C4191FE5340",
  "this.PanoramaPlayListItem_196120A7_05F4_9C19_4174_539680C59DAB",
  {
   "media": "this.panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5",
   "camera": "this.panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_196010A7_05F4_9C19_415B_09FAEE78E77A",
  "this.PanoramaPlayListItem_196380A7_05F4_9C19_418B_F3F478EAA486",
  "this.PanoramaPlayListItem_196370A7_05F4_9C19_4193_3F4BDD245672",
  "this.PanoramaPlayListItem_1962C0A7_05F4_9C19_4131_DB661288F3F6",
  "this.PanoramaPlayListItem_196240A7_05F4_9C19_413A_424FEB647C8A",
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "media": "this.album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  },
  "this.PanoramaPlayListItem_196550A7_05F4_9C19_4178_0C33BB4097AB",
  "this.PanoramaPlayListItem_196420AC_05F4_9C68_4196_5D5FF4089C60",
  "this.PanoramaPlayListItem_196780AC_05F4_9C68_4174_8484E400492C",
  "this.PanoramaPlayListItem_196770AC_05F4_9C68_4186_E61FC58D5FEB",
  "this.PanoramaPlayListItem_1966C0AC_05F4_9C68_4148_0C6F0C601460",
  "this.PanoramaPlayListItem_1899A0AC_05F4_9C68_416A_053AFF321300",
  {
   "media": "this.panorama_1E0C3788_0557_8428_4189_01956A218B4B",
   "camera": "this.panorama_1E0C3788_0557_8428_4189_01956A218B4B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_189880AC_05F4_9C68_4175_8FF96F8AA16E",
  "this.PanoramaPlayListItem_189870AC_05F4_9C68_4189_F5FD2EC14C19",
  "this.PanoramaPlayListItem_189BF0AC_05F4_9C68_4152_1B8A9E53AD32",
  "this.PanoramaPlayListItem_189B50AC_05F4_9C68_4182_DE9327DC0127",
  "this.PanoramaPlayListItem_189AC0AC_05F4_9C68_4149_95021678A68C",
  "this.PanoramaPlayListItem_189DA0AC_05F4_9C68_416A_A8F69320DD1B",
  "this.PanoramaPlayListItem_189D10AC_05F4_9C68_416F_478502872C89",
  "this.PanoramaPlayListItem_189CF0AC_05F4_9C68_4169_2F8CC1176C4F",
  {
   "begin": "this.setEndToItemIndex(this.mainPlayList, 41, 42)",
   "media": "this.album_383D1026_2235_55C1_41B4_B2C4B0B66487",
   "player": "this.MainViewerPhotoAlbumPlayer",
   "class": "PhotoAlbumPlayListItem"
  },
  "this.PanoramaPlayListItem_189F80AC_05F4_9C68_4175_CCF37C0C70CA",
  "this.PanoramaPlayListItem_189F00AC_05F4_9C68_4181_28A185A75F71",
  "this.PanoramaPlayListItem_189C70AC_05F4_9C68_4172_D9ECE14133FB",
  "this.PanoramaPlayListItem_189FD0AC_05F4_9C68_4181_0F348134DA31",
  "this.PanoramaPlayListItem_189EB0AC_05F4_9C68_418A_106C394133DD"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F474072F_EAAD_394F_41E1_5BBD82B2E1A9",
   "player": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197400A2_05F4_9C18_418E_8FCBEF793A50",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 170.82,
  "class": "PanoramaCameraPosition",
  "pitch": -35.82
 },
 "id": "camera_1AC473C5_05F4_9C19_4189_BC471B497CB0",
 "automaticZoomSpeed": 10
},
{
 "from": "left",
 "duration": 400,
 "easing": "quad_in",
 "id": "effect_4B8711AA_571D_FDC6_41C4_8313D8AEEDC7",
 "class": "SlideInEffect"
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 369.79,
   "angle": 179.18,
   "class": "PanoramaMapLocation",
   "y": 228.75
  }
 ],
 "hfovMin": "120%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 COMEDOR 5-SRGB",
 "id": "panorama_1D1BDA00_055C_8C18_4184_90EFF8467140",
 "thumbnailUrl": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  }
 ],
 "overlays": [
  "this.overlay_1D1BFA01_055C_8C18_4182_AB99B35116E0",
  "this.overlay_1D1BEA01_055C_8C18_417F_C9AB454D3214"
 ],
 "partial": false
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "id": "map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
 "thumbnailUrl": "media/map_E6065C39_FEE3_0CFA_417E_7AFEA5212806_t.png",
 "width": 920,
 "label": "DPTO-604-PLANTA-1",
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
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#001E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "height": 603,
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
 ]
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -39.49,
  "class": "PanoramaCameraPosition",
  "pitch": 21.12
 },
 "id": "camera_1A2C2464_05F4_8418_4165_88D57717F19F",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_2561322E_052C_FC68_4186_201DBEA1664B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_3F3D515A_22F5_B641_41AF_472A74851EFD",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1BB5B23C_05F4_9C68_418C_762E5279E636",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E614F030_FEE5_748A_41CD_3AC7FF21E486",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197670A2_05F4_9C18_4190_C94A0499C15C",
 "class": "PlayList"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B",
   "player": "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765EMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1977C0A2_05F4_9C18_4190_B9178DC9359A",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -179.93,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_255B75F2_05F4_87F8_4169_DBA784458365",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "id": "ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_18C0D0FC_05F4_9DE8_4143_F1481394A848",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_27A14772_05F4_84F8_4190_A8A308CB6B57",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "width": 920,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B",
 "thumbnailUrl": "media/map_E68FA4F9_FEE3_1D7A_41E6_ED5AFDA4748B_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-604-PLANTA-2",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideColor": "#000000",
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
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 603,
 "initialZoomFactor": 1
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2579E612_05F4_8438_418C_D3EBD3F197F3",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_31B87D71_225D_4E40_41BD_D20390538720",
 "class": "FadeOutEffect"
},
{
 "id": "MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DAMapPlayer",
 "viewerArea": "this.MapViewer_7F1D11CE_60D0_469D_41B4_E551B89E29DA",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_3FB7420B_22F7_D5C7_4198_CD44E66661AC",
 "class": "FadeInEffect"
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_358AEAE7_753A_0609_41AD_E70825F2EC00",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_186071F6_05F4_9FF8_418A_50D2135A2F7E",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 1.45,
    "yawSpeed": 1.9,
    "easing": "cubic_in_out",
    "targetYaw": -4.06,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -0.93
   },
   {
    "pitchSpeed": 6.35,
    "yawSpeed": 11.75,
    "easing": "cubic_in_out",
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "end": "var sequence = this.panorama_AADDAF5C_A70C_D209_41CB_7A99DBC92DEA_camera.get('initialSequence'); sequence.pause(); var self = this; setTimeout(function(){ sequence.play() }, 100000)",
    "targetPitch": -6.22
   },
   {
    "duration": 0,
    "targetPitch": -6.22,
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25",
   "player": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1969B0A2_05F4_9C18_4145_1BD6F49C1D36",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1BBB122D_05F4_9C68_418F_D08F7092BF73",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_252A95E8_05F4_87E8_418F_17BBB6C2E1C5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1979EA66_0555_8C1B_4173_7393A6159775_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_3FB7720B_22F7_D5C7_4174_D5879CC918C1",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1BD9F25A_05F4_9C28_4170_49226BE7E8D4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_24473714_05F4_8438_4189_A957414F6B57",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 300.29,
   "angle": 90,
   "class": "PanoramaMapLocation",
   "y": 400.1
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 SHF-SRGB",
 "id": "panorama_1CEDE816_055F_8C38_418E_7A08769A1A13",
 "thumbnailUrl": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B"
  }
 ],
 "overlays": [
  "this.overlay_1CEDD816_055F_8C38_4182_CC28D6C77211"
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
 "id": "camera_180E2166_05F4_9C18_412A_86437A0DF408",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "DPTO-602-PLANTA-2",
 "id": "album_444B5D56_6071_FE31_41BF_E608FEDA2243",
 "thumbnailUrl": "media/album_444B5D56_6071_FE31_41BF_E608FEDA2243_t.jpg",
 "width": 1280,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/album_444B5D56_6071_FE31_41BF_E608FEDA2243.jpg",
    "class": "ImageResourceLevel"
   }
  ]
 },
 "height": 839
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_27B33764_05F4_8418_4175_C1E03C5E07BE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197440A2_05F4_9C18_417C_89C6F7E46D5F",
 "class": "PlayList"
},
{
 "fontFamily": "Arial",
 "class": "Menu",
 "selectedFontColor": "#FFFFFF",
 "rollOverFontColor": "#FFFFFF",
 "opacity": 0.4,
 "label": "Media",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundColor": "#000000",
 "children": [
  {
   "label": "RI X3",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "MenuItem"
  },
  {
   "label": "RI X4",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "MenuItem"
  },
  {
   "label": "RI X2",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "MenuItem"
  },
  {
   "label": "RI X1",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "MenuItem"
  },
  {
   "label": "RI HALL 1-RGB",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "MenuItem"
  },
  {
   "label": "RI HALL 2 JPG-RGB",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "MenuItem"
  },
  {
   "label": "RI SUM-RGB",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "MenuItem"
  },
  {
   "label": "RI PATIO 3-RGB",
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "MenuItem"
  },
  {
   "label": "RI PATIO 1-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 8)",
   "class": "MenuItem"
  },
  {
   "label": "RI PATIO 2-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 9)",
   "class": "MenuItem"
  },
  {
   "label": "RI COMEDOR 1-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "MenuItem"
  },
  {
   "label": "RI COMEDOR 2-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 COMEDOR 5-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 COMEDOR 3-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 COMEDOR 4-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 DORM PRINCIPAL-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 SHP-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 DORM SEC-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 DORM SEC OFFICE-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 OFFICE-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 19)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 SHF-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 SHV 1ER PISO-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "MenuItem"
  },
  {
   "label": "RI ESTAR-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "MenuItem"
  },
  {
   "label": "RI TERRAZA-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "MenuItem"
  },
  {
   "label": "RI 701 SHV 2DO PISO-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COMEDOR 1-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COMEDOR 2-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 27)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COCINA-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COMEDOR 3-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 29)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COMEDOR 4-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 30)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COMEDOR 5-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 COMEDOR 6-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 32)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 DP-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 33)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 SH1-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 DS1-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 35)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 DS2-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 36)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 ESTUDIO-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 37)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 GYM-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 38)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 JUEGOS-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 SH2-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 SH3-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 42)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 SH4-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 43)",
   "class": "MenuItem"
  },
  {
   "label": "RI 604 SHV-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "MenuItem"
  },
  {
   "label": "RI-TERRAZA-1-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 45)",
   "class": "MenuItem"
  },
  {
   "label": "RI-TERRAZA-2-SRGB",
   "click": "this.mainPlayList.set('selectedIndex', 46)",
   "class": "MenuItem"
  }
 ],
 "id": "Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "rollOverOpacity": 0.8,
 "backgroundColor": "#404040",
 "selectedBackgroundColor": "#202020"
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
  "yaw": -179.41,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1B1672C5_05F4_9C18_4177_DA34723786D2",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -173.76,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_195AB8A4_05F4_8C18_418A_71C85E05348A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_25FE659E_05F4_842B_4170_5B48B32C1F79",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_18F8A10B_05F4_9C28_4194_59E8882816C8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 173.57,
  "class": "PanoramaCameraPosition",
  "pitch": 4.59
 },
 "id": "camera_193D084A_05F4_8C28_4154_736DD4BED39E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1B3472DC_05F4_9C28_4190_3AD049A610D9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_18333181_05F4_9C18_4141_0FEE21EF44CE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "id": "ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer",
 "viewerArea": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445",
 "class": "MapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_2429C6E2_05F4_8418_4186_3475101FD36A",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1A10D414_05F4_8438_418F_610138F507EA",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E",
   "x": 462.7,
   "angle": 177.4,
   "class": "PanoramaMapLocation",
   "y": 404.85
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 SHV 2DO PISO-SRGB",
 "id": "panorama_1E4CEDA5_055D_8418_4183_369C273834FC",
 "thumbnailUrl": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B"
  }
 ],
 "overlays": [
  "this.overlay_1E4CBDA5_055D_8418_4193_3C4B9C6FB652"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 39.49,
  "class": "PanoramaCameraPosition",
  "pitch": 12.86
 },
 "id": "camera_24823652_05F4_8438_416D_E2CAD53100CA",
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_5B21667B_4F08_3100_41C7_3B45A9C1819F",
 "class": "FadeOutEffect"
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 601.15,
   "angle": 49.9,
   "class": "PanoramaMapLocation",
   "y": 227.45
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 DS1-SRGB",
 "id": "panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7",
 "thumbnailUrl": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EC76684_0557_8418_4152_AE2998805982"
  }
 ],
 "overlays": [
  "this.overlay_1EB6FBAB_0554_8C68_418B_79F88EFB14CA",
  "this.overlay_1EB6EBAB_0554_8C68_4190_1670B7ABFBFB"
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
 "id": "camera_24CFF68D_05F4_8428_4163_B459B7231293",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_25A32553_05F4_8438_412F_E63BA9F3A8F0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -129.19,
  "class": "PanoramaCameraPosition",
  "pitch": -43.96
 },
 "id": "panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_camera",
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 235.11,
   "angle": -52.85,
   "class": "PanoramaMapLocation",
   "y": 286.4
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 DORM SEC-SRGB",
 "id": "panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF",
 "thumbnailUrl": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B"
  }
 ],
 "overlays": [
  "this.overlay_1C4D4E72_055C_84F8_4170_67647A3A70A2"
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
 "id": "camera_185E31A6_05F4_9C18_4193_B5E7F3A966BB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_197770A2_05F4_9C18_4189_C173EFC8D7DE",
 "class": "PlayList"
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 564.97,
   "angle": 90,
   "class": "PanoramaMapLocation",
   "y": 400.64
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 SHP-SRGB",
 "id": "panorama_1D9CB834_055D_8C78_4188_C5620981969B",
 "thumbnailUrl": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885"
  }
 ],
 "overlays": [
  "this.overlay_1D9C8834_055D_8C78_4175_416B08098C56"
 ],
 "partial": false
},
{
 "width": 920,
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_E949EC43_FEE5_0C8E_41E5_0D6474D24273",
 "thumbnailUrl": "media/map_E949EC43_FEE5_0C8E_41E5_0D6474D24273_t.jpg",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "label": "DPTO-604-PLANTA-3",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideColor": "#000000",
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
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "maximumZoomFactor": 1.2,
 "minimumZoomFactor": 0.5,
 "height": 603,
 "initialZoomFactor": 1
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 419,
   "angle": 0,
   "class": "PanoramaMapLocation",
   "y": 179.2
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 SHV-SRGB",
 "id": "panorama_199039CD_0553_8C28_4183_39FD45DD7E5B",
 "thumbnailUrl": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753"
  }
 ],
 "overlays": [
  "this.overlay_199029CD_0553_8C28_4181_6FA8967DBD7D"
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
 "id": "panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1EC76684_0557_8418_4152_AE2998805982_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E949EC43_FEE5_0C8E_41E5_0D6474D24273",
   "player": "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78MapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1969F0A2_05F4_9C18_4193_33EDDBE89CF6",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_18E2F138_05F4_9C68_4183_655DD173514F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415",
 "class": "FadeOutEffect"
},
{
 "duration": 200,
 "easing": "quad_out",
 "id": "effect_5AFD81C9_4F08_5301_41C3_9093DB61A2A7",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC5FBF43_A7CC_58D2_41AA_4532B9A7D12C",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_18F3C11A_05F4_9C28_4181_F47005D1BFA2",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 1.45,
    "yawSpeed": 1.9,
    "easing": "cubic_in_out",
    "targetYaw": -4.06,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -0.93
   },
   {
    "pitchSpeed": 6.35,
    "yawSpeed": 11.75,
    "easing": "cubic_in_out",
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "end": "var sequence = this.panorama_AADDAF5C_A70C_D209_41CB_7A99DBC92DEA_camera.get('initialSequence'); sequence.pause(); var self = this; setTimeout(function(){ sequence.play() }, 100000)",
    "targetPitch": -6.22
   },
   {
    "duration": 0,
    "targetPitch": -6.22,
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_EE95F0BB_A954_A980_41D2_48DAD5E5964F",
 "class": "FadeInEffect"
},
{
 "mapLocations": [
  {
   "map": "this.map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E",
   "x": 446.7,
   "angle": 41.99,
   "class": "PanoramaMapLocation",
   "y": 339.9
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI ESTAR-SRGB",
 "id": "panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B",
 "thumbnailUrl": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E4CEDA5_055D_8418_4183_369C273834FC"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579"
  }
 ],
 "overlays": [
  "this.overlay_1CD3BAA9_055C_8C68_4184_A33F6DCA0409",
  "this.overlay_1CD38AA9_055C_8C68_4183_9B1807897219",
  "this.overlay_1CD3EAA9_055C_8C68_4178_55ECEB3DB892",
  "this.overlay_1CD3FAA9_055C_8C68_4176_C018E372F3D4"
 ],
 "partial": false
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F49DCFEF_EAAD_08CF_41EB_40EC0B6E5D0A",
   "player": "this.MapViewerMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1976A0A2_05F4_9C18_4170_075C5B12A666",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -61.53,
  "class": "PanoramaCameraPosition",
  "pitch": 0.92
 },
 "id": "camera_25D3B573_05F4_84F8_4186_87D6DCC50BDE",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -91.84,
  "class": "PanoramaCameraPosition",
  "pitch": 1.84
 },
 "id": "camera_241DF6BD_05F4_8469_4178_13841FC2323E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_182D1191_05F4_9C38_4187_874C3E9E01E9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 332.04,
   "angle": 270,
   "class": "PanoramaMapLocation",
   "y": 345.32
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 COMEDOR 4-SRGB",
 "id": "panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B",
 "thumbnailUrl": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CEDE816_055F_8C38_418E_7A08769A1A13"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF"
  },
  {
   "panorama": "this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF",
   "yaw": -177.16,
   "backwardYaw": 0.07,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4"
  }
 ],
 "overlays": [
  "this.overlay_1DA5BAB1_055C_8C78_4192_AA85F182AE0E",
  "this.overlay_1DA5AAB1_055C_8C78_414E_CB06860E3E66",
  "this.overlay_1DA59AB1_055C_8C78_4194_67AFB3B52415",
  "this.overlay_1DA55AB1_055C_8C78_4182_9780CF06A9A2",
  "this.overlay_1DA54AB1_055C_8C78_4157_3C2D345CAC54",
  "this.overlay_1DA53AB1_055C_8C78_4181_FF1F82153A40",
  "this.overlay_1DA52AB1_055C_8C78_4174_D2D6FB8C5AD6",
  "this.overlay_1DA50AB1_055C_8C78_417A_94B782CCA5CF"
 ],
 "partial": false
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1976C0A2_05F4_9C18_4184_9B70C0962DDD",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_18141157_05F4_9C39_418E_BCC1B8BB14E0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 541.34,
   "angle": 179.03,
   "class": "PanoramaMapLocation",
   "y": 152.13
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 SH3-SRGB",
 "id": "panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358",
 "thumbnailUrl": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C"
  }
 ],
 "overlays": [
  "this.overlay_19F2DBBA_0554_8C68_418F_2D86225541C8"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
   "x": 206.02,
   "angle": 223.53,
   "class": "PanoramaMapLocation",
   "y": 351.84
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 701 DORM SEC OFFICE-SRGB",
 "id": "panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4",
 "thumbnailUrl": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B"
  }
 ],
 "overlays": [
  "this.overlay_1C2F1B8C_055C_8C28_4154_A723F6D49952"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 303.08,
   "angle": -49.27,
   "class": "PanoramaMapLocation",
   "y": 227.82
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 DS2-SRGB",
 "id": "panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836",
 "thumbnailUrl": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  }
 ],
 "overlays": [
  "this.overlay_1E95B3C0_0555_BC18_4184_C02D164A8B9C"
 ],
 "partial": false
},
{
 "duration": 400,
 "easing": "quad_in",
 "id": "effect_4D468A42_571D_AF46_41C4_8C8358C32FB0",
 "class": "SlideOutEffect",
 "to": "left"
},
{
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "mouseControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_184351C6_05F4_9C18_418E_41C58D4E6BAB",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E",
   "player": "this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1974E0A2_05F4_9C18_4195_81DC51788B4A",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -3.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_24B3B662_05F4_8418_4182_B7FEF14FA572",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_24EDE6AB_05F4_8468_4190_3ACBAFE6A55E",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 200,
 "easing": "quad_in",
 "id": "effect_5B21267B_4F08_3100_41A1_F6699BEFB8F1",
 "class": "FadeInEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1A7904B4_05F4_8478_416C_10659D6412D5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1B71031A_05F4_9C28_4184_F5998D2430E5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1BCD7278_05F4_9CE8_4178_8859D1E527C9",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_25770624_05F4_8418_4176_031D83A88158",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC5E4F44_A7CC_58D6_41DF_9C47E76A87BE",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_187C71D8_05F4_9C28_4182_C60F98AC0630",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "displayMovements": [
  {
   "duration": 1000,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "duration": 3000,
   "easing": "cubic_in_out",
   "targetPitch": 16.39,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetStereographicFactor": 0
  }
 ],
 "displayOriginPosition": {
  "hfov": 165,
  "yaw": 40.07,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90,
  "stereographicFactor": 1
 },
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 40.07,
  "class": "PanoramaCameraPosition",
  "pitch": 16.39
 },
 "id": "panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_camera",
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 543.9,
   "angle": 87.8,
   "class": "PanoramaMapLocation",
   "y": 176.6
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 SH1-SRGB",
 "id": "panorama_1EC76684_0557_8418_4152_AE2998805982",
 "thumbnailUrl": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7"
  }
 ],
 "overlays": [
  "this.overlay_1EC75684_0557_8418_414E_F3CB2D1618D0"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -21.12,
  "class": "PanoramaCameraPosition",
  "pitch": 1.84
 },
 "id": "camera_2597E504_05F4_8418_418A_B5A9C13C93B5",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "hfov": 120,
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_25672638_05F4_8468_4177_4D5C34BE2A4C",
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "pitchSpeed": 1.45,
    "yawSpeed": 1.9,
    "easing": "cubic_in_out",
    "targetYaw": -4.06,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -0.93
   },
   {
    "pitchSpeed": 6.35,
    "yawSpeed": 11.75,
    "easing": "cubic_in_out",
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "end": "var sequence = this.panorama_AADDAF5C_A70C_D209_41CB_7A99DBC92DEA_camera.get('initialSequence'); sequence.pause(); var self = this; setTimeout(function(){ sequence.play() }, 100000)",
    "targetPitch": -6.22
   },
   {
    "duration": 0,
    "targetPitch": -6.22,
    "targetYaw": 45.35,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest"
   }
  ]
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E6065C39_FEE3_0CFA_417E_7AFEA5212806",
   "x": 561.6,
   "angle": 54.93,
   "class": "PanoramaMapLocation",
   "y": 376.6
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COMEDOR 2-SRGB",
 "id": "panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA",
 "thumbnailUrl": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FC6C784_0553_841F_4161_F6B7AE761209"
  }
 ],
 "overlays": [
  "this.overlay_1FEFB0DC_0553_BC28_4178_5AAFB5953488",
  "this.overlay_1FEF80DC_0553_BC28_4162_A644EEBFB2C6",
  "this.overlay_1FEFE0DC_0553_BC28_4191_1CF8505317EF",
  "this.overlay_1FEFF0DC_0553_BC28_417E_88B5CA264EEB",
  "this.overlay_1FEFC0DC_0553_BC28_418E_7CE644116E23"
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
 "id": "panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "panorama_19A4ED49_0553_8428_4194_8459BC5F3186_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E",
   "x": 636.7,
   "angle": 23.55,
   "class": "PanoramaMapLocation",
   "y": 406.85
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI TERRAZA-SRGB",
 "id": "panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579",
 "thumbnailUrl": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B"
  }
 ],
 "overlays": [
  "this.overlay_1CBCEAFA_055C_8DE8_4194_8E688567895C"
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
 "id": "camera_1A3EE44E_05F4_8428_418E_1F862C931D4B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "id": "camera_1939583B_05F4_8C68_4195_C82F5F6FE64B",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI SUM-RGB",
 "id": "panorama_1D6A8C40_0555_8418_417B_8070C5C48340",
 "thumbnailUrl": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12A29C71_0555_84F8_4191_5AD65F782312"
  }
 ],
 "overlays": [
  "this.overlay_1D6ADC40_0555_8418_414E_17AE3AD26000"
 ],
 "partial": false
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.04,
 "id": "map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
 "thumbnailUrl": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_t.png",
 "width": 920,
 "label": "DPTO-604-PLANTA-2",
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
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#001E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1.2,
 "height": 603,
 "overlays": [
  "this.overlay_E62E4F3F_FEE3_0CF6_41D6_5965EA3F65E8",
  "this.overlay_E37F1816_FEFF_14B4_4195_F50DB180F772",
  "this.overlay_E62DAF3F_FEE3_0CF6_41D4_356ADDA16A2D",
  "this.overlay_DAA06E8B_FFC8_9E47_41D7_B698C18E9F0F",
  "this.overlay_E62DBF3F_FEE3_0CF6_41B3_62E4194294F8",
  "this.overlay_E3F4C8A5_FEE3_F597_41E5_D0C5AE35E6CA",
  "this.overlay_E3E09D3F_FEE5_0CF3_41DA_87FF965E2290",
  "this.overlay_E31927D4_FEE5_7BB5_41C1_482702391A11"
 ]
},
{
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI PATIO 3-RGB",
 "id": "panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C",
 "thumbnailUrl": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/f/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/f/3/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/u/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/u/3/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/b/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/b/3/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/d/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/d/3/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/l/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/l/3/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2560,
      "colCount": 5,
      "rowCount": 5,
      "height": 2560
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/r/2/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_0/r/3/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552",
   "yaw": 76.86,
   "backwardYaw": -5.68,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "panorama": "this.panorama_1281485E_0554_8C28_4117_AABDB6019BC0",
   "yaw": -66.9,
   "backwardYaw": 17.74,
   "class": "AdjacentPanorama",
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68"
  },
  {
   "panorama": "this.panorama_12A29C71_0555_84F8_4191_5AD65F782312",
   "yaw": 177.71,
   "backwardYaw": 0.59,
   "class": "AdjacentPanorama",
   "distance": 1
  }
 ],
 "overlays": [
  "this.overlay_1285306E_0555_9CEB_4183_E617D1339349",
  "this.overlay_1285206E_0555_9CEB_4173_AF260D815276",
  "this.overlay_1285106E_0555_9CEB_4165_76EAF2515772",
  "this.overlay_1285006E_0555_9CEB_4188_ED838A1C8977"
 ],
 "partial": false
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 588.93,
   "angle": 268.99,
   "class": "PanoramaMapLocation",
   "y": 382.6
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 COMEDOR 4-SRGB",
 "id": "panorama_1E71347A_0554_84EB_418B_9D281A31772F",
 "thumbnailUrl": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C"
  }
 ],
 "overlays": [
  "this.overlay_1E71247A_0554_84EB_4177_B4B761DC3A0D",
  "this.overlay_1E70C47A_0554_84EB_4181_C0DF89AB2FBF",
  "this.overlay_1E70F47A_0554_84EB_4188_A70861F6CCDF",
  "this.overlay_1E70E47A_0554_84EB_418A_5741F987CA84"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0.25,
  "class": "PanoramaCameraPosition",
  "pitch": -2.01
 },
 "id": "panorama_12A29C71_0555_84F8_4191_5AD65F782312_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer.set('movementMode', 'constrained')",
   "media": "this.map_E7AF2725_FEE3_1C8A_41E2_8EA0953F3A25",
   "player": "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445MapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_1977F0A2_05F4_9C18_415C_3E70E2F41B97",
 "class": "PlayList"
},
{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.05,
 "id": "map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8",
 "thumbnailUrl": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_t.png",
 "width": 920,
 "label": "DPTO-701-PLANTA-1",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8.png",
    "width": 920,
    "class": "ImageResourceLevel",
    "height": 603
   },
   {
    "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_lq.png",
    "width": 316,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 208
   }
  ]
 },
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayInsideColor": "#001E3B",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideOpacity": 0.32,
 "fieldOfViewOverlayOutsideColor": "#00FF00",
 "maximumZoomFactor": 1.2,
 "height": 603,
 "overlays": [
  "this.overlay_F4DF6C2D_EAB3_0F73_41E6_5F63DCF645B3",
  "this.overlay_F4DF4C2D_EAB3_0F73_41EC_A7E6E09DA239",
  "this.overlay_F4D8AC2E_EAB3_0F71_41DE_69DCC58572B9",
  "this.overlay_F4D89C2E_EAB3_0F71_41D8_2E75F1C81BAF",
  "this.overlay_F4D88C2E_EAB3_0F71_41E5_AC4CFBEC0BD2",
  "this.overlay_F4D8FC2E_EAB3_0F71_41CB_806EA1F903ED",
  "this.overlay_F4D8EC2E_EAB3_0F71_41CC_43F72230A425",
  "this.overlay_F4D8DC2E_EAB3_0F71_41C1_2F0B9E20510E",
  "this.overlay_F4D8CC2E_EAB3_0F71_41DD_C2CF49EC887C",
  "this.overlay_F4D83C2E_EAB3_0F71_41D6_E54B975F9E41",
  "this.overlay_F4D82C2E_EAB3_0F71_41EC_54236286E1F9"
 ]
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": -41.33,
  "class": "PanoramaCameraPosition",
  "pitch": 18.37
 },
 "id": "camera_1B53D300_05F4_9C18_4191_9FA8E1221370",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -12.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_243BF6D8_05F4_8428_418E_BBE4B4E369D2",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 2.66,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 2.66,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 2.66,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -162.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_1B1B52B5_05F4_9C78_4184_0A52B4F581F4",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "manualRotationSpeed": 500,
 "initialPosition": {
  "yaw": 168.06,
  "class": "PanoramaCameraPosition",
  "pitch": -38.57
 },
 "id": "camera_1AE373FE_05F4_83E8_4162_FC0C3E06DAB9",
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "mapLocations": [
  {
   "map": "this.map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C",
   "x": 367.52,
   "angle": -89.3,
   "class": "PanoramaMapLocation",
   "y": 185.02
  }
 ],
 "hfovMin": "135%",
 "class": "Panorama",
 "hfov": 360,
 "label": "RI 604 SH4-SRGB",
 "id": "panorama_19A4ED49_0553_8428_4194_8459BC5F3186",
 "thumbnailUrl": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_t.jpg",
 "cardboardMenu": "this.Menu_1897A0B6_05F4_9C78_417C_4D5CFA6435F8",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/f/2/{row}_{column}.jpg",
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
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/u/2/{row}_{column}.jpg",
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
    ]
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/b/2/{row}_{column}.jpg",
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
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/d/2/{row}_{column}.jpg",
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
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/l/2/{row}_{column}.jpg",
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
    ]
   },
   "thumbnailUrl": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_t.jpg",
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_0/r/2/{row}_{column}.jpg",
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
    ]
   }
  }
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3"
  }
 ],
 "overlays": [
  "this.overlay_19A4FD49_0553_8428_418D_F563C5352FBA"
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
 "id": "panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 1000,
 "easing": "cubic_in_out",
 "id": "effect_BC5F8F43_A7CC_58D2_41D8_DF244C29624F",
 "class": "FadeOutEffect"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_250CD5CA_05F4_8428_4190_8351F415E7C8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
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
 "horizontalAlign": "left",
 "children": [
  "this.Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932",
  "this.Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F"
 ],
 "id": "Container_9CD0A028_A9D4_E880_41AB_FF26BFCBC926",
 "left": "0.05%",
 "scrollBarOpacity": 0.8,
 "width": 300,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 1,
 "class": "Container",
 "propagateClick": false,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "data": {
  "name": "AURA PANEL"
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
 "width": 360,
 "toolTipFontWeight": "normal",
 "right": 20,
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 150,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "height": 280,
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "minWidth": 360,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
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
 "top": 10,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
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
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PLANTA 701-1"
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
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "minHeight": 1,
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PLANTA 701-2"
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
  "this.Container_3B00BABF_22CD_CA3F_4196_8059B3DFE268"
 ],
 "id": "Container_3B000ABF_22CD_CA3F_418A_406A87F5B6EA",
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
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PLANTA 303"
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
  "this.Container_6105D3E2_22D4_DA41_418C_50644C9E3D5B"
 ],
 "id": "Container_610403E3_22D4_DA47_41A4_830DC852C065",
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
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_610403E3_22D4_DA47_41A4_830DC852C065, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PLANTA 604-1"
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
  "this.Container_6105EF4E_22D3_4A41_41B9_2471196AFC02"
 ],
 "id": "Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2",
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
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PLANTA 604-2"
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
  "this.Container_4DDB8132_755E_020A_41C1_52FFC36C1B4C"
 ],
 "id": "Container_4DC45133_755E_020A_41CF_F8920040CCCD",
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
 "creationPolicy": "inAdvance",
 "top": "0%",
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": true,
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, false, 0, null, null, false)",
 "bottom": "0%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "data": {
  "name": "--PLANTA 604-3"
 },
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "visible": false,
 "shadow": false,
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
 "class": "Image",
 "propagateClick": false,
 "bottom": "12.13%",
 "minWidth": 1,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image84735"
 },
 "scaleMode": "fit_inside",
 "shadow": false
},
{
 "map": {
  "width": 29,
  "x": 432.24,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_HS_0_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 327.92
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "ESTAR"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F78802F2_EAAD_38D1_41DA_C252F37B59B2",
 "image": {
  "x": 432.2,
  "class": "HotspotMapOverlayImage",
  "y": 327.9,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 622.23,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_HS_1_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 394.89
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "TERRAZA"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F78812F2_EAAD_38D1_41DD_799167BD92E3",
 "image": {
  "x": 622.2,
  "class": "HotspotMapOverlayImage",
  "y": 394.85,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 448.22,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 392.9
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "SHV2"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F78862F2_EAAD_38D1_41E6_A39232FB153D",
 "image": {
  "x": 448.2,
  "class": "HotspotMapOverlayImage",
  "y": 392.85,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F78832F2_EAAD_38D1_41EC_B0FF5622D97E_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1AE23E_0553_FC68_4188_605472736D54, this.camera_194A38D0_05F4_8C38_4195_AD47B9464CAE); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DED2489_0553_8428_4167_21466BDB9E28",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.67,
   "image": "this.AnimatedImageResource_26089E98_0534_8428_4182_0D797AA7EF8B",
   "pitch": -27.23,
   "yaw": 167.26,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.67,
   "yaw": 167.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -27.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1BDA00_055C_8C18_4184_90EFF8467140, this.camera_194688EF_05F4_8DE8_4194_83CF6936CEB5); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DED1489_0553_8428_4175_E17305305F8A",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.65,
   "image": "this.AnimatedImageResource_26081E98_0534_8428_4193_0CDFFF66C4B6",
   "pitch": -14.54,
   "yaw": 162.89,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.65,
   "yaw": 162.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DED0489_0553_8428_418E_3CFBF8EBDC77",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.42,
   "image": "this.AnimatedImageResource_260BAE99_0534_8428_4172_1A7042520BA1",
   "pitch": -10.22,
   "yaw": -168.94,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6.42,
   "yaw": -168.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DEDF489_0553_8428_4190_2513605007E8",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_260BFE99_0534_8428_4190_F6A8C9EFCEE0",
   "pitch": -2.69,
   "yaw": 174.26,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": 174.26,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6, this.camera_1AD6D3AF_05F4_9C68_4166_6476A648552E); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_125C2BAD_0557_8C68_4195_5A2560C8BD84",
 "data": {
  "label": "Circle 03a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.89,
   "image": "this.AnimatedImageResource_261E3E88_0534_8428_4176_F1E44E91A21D",
   "pitch": -45.31,
   "yaw": -178.06,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.89,
   "yaw": -178.06,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -45.31,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_0_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856, this.camera_1AC473C5_05F4_9C19_4189_BC471B497CB0); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_125C1BAD_0557_8C68_4175_0D0976ABE270",
 "data": {
  "label": "Imagen"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.06,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_1_0.png",
      "width": 98,
      "class": "ImageResourceLevel",
      "height": 73
     }
    ]
   },
   "pitch": 2.26,
   "yaw": -177.7
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.06,
   "yaw": -177.7,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_1_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A, this.camera_1AD9639A_05F4_9C28_4161_5F5D7B7588B0); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_125CFBAD_0557_8C68_4183_72316BD3EBE3",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.35,
   "image": "this.AnimatedImageResource_261E5E88_0534_8428_4171_982EB8473C09",
   "pitch": -77.79,
   "yaw": 1.57,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.35,
   "yaw": 1.57,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -77.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_125CEBAD_0557_8C68_4190_5DA1900D94B3",
 "data": {
  "label": "Arrow 02a Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.08,
   "image": "this.AnimatedImageResource_2601FE88_0534_8428_4177_BB9529DB0427",
   "pitch": -60.15,
   "yaw": -143.79,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.08,
   "yaw": -143.79,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -60.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C, this.camera_1A6924CF_05F4_8429_4187_EEFFC2B493C5); this.mainPlayList.set('selectedIndex', 33)",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E2056F2_0557_85FB_417F_D2ACDD34B320",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.77,
   "image": "this.AnimatedImageResource_26FDCEB8_0534_8468_418D_DB6F4778255D",
   "pitch": -14.6,
   "yaw": 148.15,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.77,
   "yaw": 148.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_19A4ED49_0553_8428_4194_8459BC5F3186, this.camera_1A6754EE_05F4_85E8_4181_9882284586A0); this.mainPlayList.set('selectedIndex', 43)",
   "toolTip": "Ba\u00f1o Familiar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E2066F2_0557_85FB_418D_F7FBD27CBF24",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.2,
   "image": "this.AnimatedImageResource_26FD4EB9_0534_8468_4194_A37F5ED24BEE",
   "pitch": -2.69,
   "yaw": 8.64,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.2,
   "yaw": 8.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 36)",
   "toolTip": "Dormitorio Secundario 2",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E2076F2_0557_85FB_4185_F524FB822B63",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_26FC2EB9_0534_8468_418C_2E9558514604",
   "pitch": -2.75,
   "yaw": 6.08,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": 6.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1959DFF6_0555_83FB_416E_D361C87BCF28, this.camera_1A7904B4_05F4_8478_416C_10659D6412D5); this.mainPlayList.set('selectedIndex', 38)",
   "toolTip": "Gym",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E2086F2_0557_85FB_4176_BAABFA752C18",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "image": "this.AnimatedImageResource_26FFAEB9_0534_8468_4194_B8DC7A3222B8",
   "pitch": -4.6,
   "yaw": -12.14,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.19,
   "yaw": -12.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E71347A_0554_84EB_418B_9D281A31772F, this.camera_25851520_05F4_8418_4189_E612E49A4EE6); this.mainPlayList.set('selectedIndex', 30); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E2096F2_0557_85FB_4182_2B7E10330240",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6,
   "image": "this.AnimatedImageResource_26FF2EBA_0534_8468_418B_5E6ADE8B1A54",
   "pitch": -0.62,
   "yaw": -85.58,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6,
   "yaw": -85.58,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF, this.camera_25B58539_05F4_8468_4194_6FB13AF17779); this.mainPlayList.set('selectedIndex', 39)",
   "toolTip": "Juegos",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E20B6F2_0557_85FB_4179_A4AD44CBF23F",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.18,
   "image": "this.AnimatedImageResource_26FE9EBA_0534_8468_417D_E02965B96A0B",
   "pitch": -6.15,
   "yaw": -110,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.18,
   "yaw": -110,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765E",
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "99.975%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
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
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
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
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
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
  "name": "PLANTA 604-2"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC6E784_0553_841F_4159_6267C9F19AB4",
 "data": {
  "label": "Arrow 02 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.8,
   "image": "this.AnimatedImageResource_26F96EAF_0534_8468_4168_A84680A9D4B6",
   "pitch": -3.3,
   "yaw": 58.98,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 1.8,
   "yaw": 58.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.3,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59, this.camera_25C0058E_05F4_8428_4189_3660F2E9EF90); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC68784_0553_841F_4178_B6CEE7035897",
 "data": {
  "label": "Arrow 02 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_26F88EAF_0534_8468_4190_7C40B6720094",
   "pitch": -2.6,
   "yaw": 127.84,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": 127.84,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1AE23E_0553_FC68_4188_605472736D54, this.camera_18F3C11A_05F4_9C28_4181_F47005D1BFA2); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF062CA_055C_FC28_418C_F1B498710623",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.95,
   "image": "this.AnimatedImageResource_26081E9A_0534_8428_4172_875DCA30BEC3",
   "pitch": -19.96,
   "yaw": 90.32,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.95,
   "yaw": 90.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_2_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885, this.camera_1824F19C_05F4_9C28_4190_6102DB0A9708); this.mainPlayList.set('selectedIndex', 15)",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF072CA_055C_FC28_4194_D06897E40A47",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.4,
   "image": "this.AnimatedImageResource_260BBE9A_0534_8428_4188_DCED1A16F8E5",
   "pitch": -18.23,
   "yaw": -137.36,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.4,
   "yaw": -137.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C, this.camera_182D1191_05F4_9C38_4187_874C3E9E01E9); this.mainPlayList.set('selectedIndex', 21)",
   "toolTip": "Ba\u00f1o Visita",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF002CA_055C_FC28_417B_025C99317703",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.53,
   "image": "this.AnimatedImageResource_260BDE9A_0534_8428_418F_3A5BF885B3C8",
   "pitch": -12.81,
   "yaw": -44.36,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.53,
   "yaw": -44.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B, this.camera_18387174_05F4_9CF8_417A_CF59A859318A); this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF012CA_055C_FC28_4183_5C647449E5F0",
 "data": {
  "label": "Arrow 02c Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.85,
   "image": "this.AnimatedImageResource_260B7E9A_0534_8428_4185_CC1091A256AA",
   "pitch": -18.09,
   "yaw": 0.07,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.85,
   "yaw": 0.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_5_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B, this.camera_181C9146_05F4_9C18_418F_363435A7E85C); this.mainPlayList.set('selectedIndex', 22)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF022CA_055C_FC28_417D_BEC422EBE6FD",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_260AEE9A_0534_8428_4172_114E6870C2D8",
   "pitch": -3.06,
   "yaw": -10.63,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": -10.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CEDE816_055F_8C38_418E_7A08769A1A13, this.camera_18E2F138_05F4_9C68_4183_655DD173514F); this.mainPlayList.set('selectedIndex', 20)",
   "toolTip": "Ba\u00f1o Familiar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF032CA_055C_FC28_4190_DFFBC305ABAE",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_260A0E9A_0534_8428_4190_93EF839450C0",
   "pitch": -1.91,
   "yaw": -6.08,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": -6.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4, this.camera_180E2166_05F4_9C18_412A_86437A0DF408); this.mainPlayList.set('selectedIndex', 18)",
   "toolTip": "Dormitorio Secundario 2",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF1C2CA_055C_FC28_418F_EED28B870226",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.1,
   "image": "this.AnimatedImageResource_260DBE9B_0534_8428_4183_B05E1B4CCFEA",
   "pitch": -1.86,
   "yaw": -3.89,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.1,
   "yaw": -3.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.86,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5, this.camera_18141157_05F4_9C39_418E_BCC1B8BB14E0); this.mainPlayList.set('selectedIndex', 19)",
   "toolTip": "Estudio",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF1D2CA_055C_FC28_418D_EB9F7B46EAD8",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.1,
   "image": "this.AnimatedImageResource_260D0E9B_0534_8428_4167_2F66072A34D8",
   "pitch": -3.02,
   "yaw": -3.93,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.1,
   "yaw": -3.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.02,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF, this.camera_18333181_05F4_9C18_4141_0FEE21EF44CE); this.mainPlayList.set('selectedIndex', 17)",
   "toolTip": "Dormitorio Secundario 1",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DF182CA_055C_FC28_4189_9BA30AA883BD",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.1,
   "image": "this.AnimatedImageResource_260D4E9B_0534_8428_4188_1AC3B8CC66B1",
   "pitch": -1.89,
   "yaw": 4.98,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.1,
   "yaw": 4.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12A29C71_0555_84F8_4191_5AD65F782312, this.camera_24B3B662_05F4_8418_4182_B7FEF14FA572); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12C46DF7_0554_87F8_417E_C6BE4F5521F1",
 "data": {
  "label": "Arrow 02b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.04,
   "image": "this.AnimatedImageResource_26004E8E_0534_8428_4187_D85F2197F4FB",
   "pitch": -17.12,
   "yaw": 45.45,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.04,
   "yaw": 45.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6, this.camera_24823652_05F4_8438_416D_E2CAD53100CA); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12C41DF7_0554_87F8_418C_67A589FDE834",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.92,
   "image": "this.AnimatedImageResource_26039E8E_0534_8428_4191_369D1CF9FED1",
   "pitch": -7.54,
   "yaw": -119.93,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.92,
   "yaw": -119.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.54,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1AE23E_0553_FC68_4188_605472736D54, this.camera_25672638_05F4_8468_4177_4D5C34BE2A4C); this.mainPlayList.set('selectedIndex', 10)",
   "toolTip": "Dpto 701",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12C43DF7_0554_87F8_418F_9EE6FB346659",
 "data": {
  "label": "Arrow Transparent Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.79,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_8_0.png",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 64
     }
    ]
   },
   "pitch": 0.72,
   "yaw": 58.02
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.79,
   "yaw": 58.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.72,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59, this.camera_24A19672_05F4_84F8_4184_8D4EA117D6C0); this.mainPlayList.set('selectedIndex', 26)",
   "toolTip": "Dpto 604",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12C42DF7_0554_87F8_4171_B95957A58BE7",
 "data": {
  "label": "Arrow Transparent Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.78,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_9_0.png",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 64
     }
    ]
   },
   "pitch": -3.49,
   "yaw": 58.05
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.78,
   "yaw": 58.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C, this.camera_1924E890_05F4_8C38_418F_0DC861552EDD); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1281585E_0554_8C28_4191_E5DB33940472",
 "data": {
  "label": "Arrow 02a Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.43,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_1_HS_3_0.png",
      "width": 102,
      "class": "ImageResourceLevel",
      "height": 107
     }
    ]
   },
   "pitch": -16.75,
   "yaw": 17.74
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.43,
   "yaw": 17.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552, this.camera_195AB8A4_05F4_8C18_418A_71C85E05348A); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1280A85E_0554_8C28_4172_C4D0C08EF9C7",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.81,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_1_HS_4_0.png",
      "width": 40,
      "class": "ImageResourceLevel",
      "height": 35
     }
    ]
   },
   "pitch": -7.94,
   "yaw": 12.31
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 1.81,
   "yaw": 12.31,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1281485E_0554_8C28_4117_AABDB6019BC0_1_HS_4_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CFFBFCD_055F_8429_4153_F6358952E0AD",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6,
   "image": "this.AnimatedImageResource_26F00EA5_0534_8418_4193_44ABD69B253C",
   "pitch": 0.41,
   "yaw": -163.68,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6,
   "yaw": -163.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D9CB834_055D_8C78_4188_C5620981969B, this.camera_1B2242F0_05F4_9DF8_4182_661BD5D16DAB); this.mainPlayList.set('selectedIndex', 16)",
   "toolTip": "Ba\u00f1o Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D832878_055D_8CF7_4132_903168D1C6D0",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.8,
   "image": "this.AnimatedImageResource_26F13EA3_0534_8418_418F_0693F020917A",
   "pitch": 1.56,
   "yaw": 118.35,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.8,
   "yaw": 118.35,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF, this.camera_1B3472DC_05F4_9C28_4190_3AD049A610D9); this.mainPlayList.set('selectedIndex', 13)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D837878_055D_8CF7_418C_77BF10BCB990",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.6,
   "image": "this.AnimatedImageResource_26F14EA3_0534_8418_4178_8305C0D34717",
   "pitch": 0.74,
   "yaw": 124.2,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.6,
   "yaw": 124.2,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.74,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7, this.camera_27A14772_05F4_84F8_4190_A8A308CB6B57); this.mainPlayList.set('selectedIndex', 35); this.mainPlayList.set('selectedIndex', 35)",
   "toolTip": "Dormitorio Secundario 1",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC26A81_0555_8C19_417D_F568ED996273",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.54,
   "image": "this.AnimatedImageResource_26F83EAF_0534_8468_4159_E06264FB7DDB",
   "pitch": -15.87,
   "yaw": 144.39,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.54,
   "yaw": 144.39,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -15.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_199039CD_0553_8C28_4183_39FD45DD7E5B, this.camera_1939583B_05F4_8C68_4195_C82F5F6FE64B); this.mainPlayList.set('selectedIndex', 44)",
   "toolTip": "Ba\u00f1o de Visita",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC25A81_0555_8C19_4183_1897F70193CF",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.56,
   "image": "this.AnimatedImageResource_26FB9EB0_0534_8478_418C_598210D37FB6",
   "pitch": -12.22,
   "yaw": 38.76,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.56,
   "yaw": 38.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1979EA66_0555_8C1B_4173_7393A6159775, this.camera_2783D752_05F4_8438_416D_E72E71ADC474); this.mainPlayList.set('selectedIndex', 37)",
   "toolTip": "Estudio",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC24A81_0555_8C19_4159_8A144DF31BEC",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.59,
   "image": "this.AnimatedImageResource_26FB6EB0_0534_8478_4192_224596226A7C",
   "pitch": -3.12,
   "yaw": 6.64,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.59,
   "yaw": 6.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_19FCE6D1_0554_8439_4189_6FB639D5833F, this.camera_27D1C782_05F4_8418_4177_10D0F0F7FC4A); this.mainPlayList.set('selectedIndex', 40)",
   "toolTip": "Ba\u00f1o Familiar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC37A81_0555_8C19_4190_DB94254EE46C",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "image": "this.AnimatedImageResource_26FA9EB6_0534_8478_4191_761E60208930",
   "pitch": -2.94,
   "yaw": 9.33,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.19,
   "yaw": 9.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.94,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59, this.camera_27C11792_05F4_8438_417D_A8E93A09D339); this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FC36A81_0555_8C19_418B_30B689A4BAE0",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.37,
   "image": "this.AnimatedImageResource_26FA1EB6_0534_8478_4122_6DFDD9A76160",
   "pitch": -21.58,
   "yaw": -91.85,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.37,
   "yaw": -91.85,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_4_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1C0EBF7E_055C_84EB_4192_9C8600E48569",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.98,
   "image": "this.AnimatedImageResource_26F14EA4_0534_8418_416F_73244262EC21",
   "pitch": 3.21,
   "yaw": -73.72,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.98,
   "yaw": -73.72,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC38A81_0555_8C19_4175_14474F252753, this.camera_193D084A_05F4_8C28_4154_736DD4BED39E); this.mainPlayList.set('selectedIndex', 29)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1979FA66_0555_8C1B_417A_38AC8189C3C2",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "image": "this.AnimatedImageResource_26E4BEC3_0534_8418_4195_A16D56131BFA",
   "pitch": -4.03,
   "yaw": 40.94,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.19,
   "yaw": 40.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "items": [
  {
   "media": "this.album_431A74C1_6071_CE13_41B6_6A6768C52AEF",
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
   },
   "class": "PhotoPlayListItem"
  },
  {
   "media": "this.album_444B5D56_6071_FE31_41BF_E608FEDA2243",
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
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_44971B9F_5FCE_2FB1_41D0_AE6C139C9AB2_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78",
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "99.975%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
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
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
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
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
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
  "name": "PLANTA 604-3"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1EEECBAD_0557_8C68_4179_482F01EB577E",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.98,
   "image": "this.AnimatedImageResource_26E3BEC1_0534_8418_4189_4BE04560E2AC",
   "pitch": -3.34,
   "yaw": -127.76,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.98,
   "yaw": -127.76,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358, this.camera_18F8A10B_05F4_9C28_4194_59E8882816C8); this.mainPlayList.set('selectedIndex', 42)",
   "toolTip": "Ba\u00f1o Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1EEEDBAD_0557_8C68_4192_C4DF0ACCA364",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6,
   "image": "this.AnimatedImageResource_26E32EC2_0534_8418_4181_3E665DD3C58A",
   "pitch": -1.41,
   "yaw": -80.89,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6,
   "yaw": -80.89,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "progressBottom": 2,
 "playbackBarHeadShadow": true,
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
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingTop": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
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
 "toolTipShadowSpread": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "PLANTA 701-1"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C, this.camera_192AF87A_05F4_8CE8_4185_BBFC9B37686E); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D6298A1_0554_8C18_418C_AC0792D67397",
 "data": {
  "label": "Arrow 02b Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.49,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_1_HS_3_0.png",
      "width": 79,
      "class": "ImageResourceLevel",
      "height": 79
     }
    ]
   },
   "pitch": -14.32,
   "yaw": -5.68
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.49,
   "yaw": -5.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -14.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1281485E_0554_8C28_4117_AABDB6019BC0, this.camera_1920B886_05F4_8C18_4191_26B7D87D32CC); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D6288A1_0554_8C18_4195_484471DDF9FF",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 1.85,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_1_HS_4_0.png",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 39
     }
    ]
   },
   "pitch": -8.55,
   "yaw": 6.24
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 1.85,
   "yaw": 6.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3, this.camera_1BAEB24B_05F4_9C28_4151_7360E5654DCD); this.mainPlayList.set('selectedIndex', 31)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1959BFF6_0555_83FB_418B_AAE316809D09",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_26E43EC4_0534_8418_4164_DDB7102AD2FD",
   "pitch": -3.66,
   "yaw": 44.8,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 44.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3, this.camera_25D3B573_05F4_84F8_4186_87D6DCC50BDE); this.mainPlayList.set('selectedIndex', 31)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1934E15C_0554_9C2F_4182_28954E2EA896",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9,
   "image": "this.AnimatedImageResource_26E52EC4_0534_8418_4191_F08BE3620641",
   "pitch": 1.55,
   "yaw": 123.68,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9,
   "yaw": 123.68,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68, this.camera_24656737_05F4_8478_4155_DA12924F684E); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12A2BC71_0555_84F8_4194_09006B9A7328",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.25,
   "image": "this.AnimatedImageResource_26028E8F_0534_8428_4170_F2667A3D6EAE",
   "pitch": -1.96,
   "yaw": 176.29,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.25,
   "yaw": 176.29,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C, this.camera_2795C746_05F4_8418_4194_8923411DF5FA); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12A2DC71_0555_84F8_4187_375D0522E130",
 "data": {
  "label": "Arrow 02a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.79,
   "image": "this.AnimatedImageResource_2602DE8F_0534_8428_4161_702DA0B200AA",
   "pitch": -21.43,
   "yaw": 0.59,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.79,
   "yaw": 0.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_12A2EC71_0555_84F8_4171_044E3F847F2F",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.87,
   "image": "this.AnimatedImageResource_26026E8F_0534_8428_418E_E26DAE66B3FC",
   "pitch": -24.14,
   "yaw": -10.23,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.87,
   "yaw": -10.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C, this.camera_24CFF68D_05F4_8428_4163_B459B7231293); this.mainPlayList.set('selectedIndex', 45)",
   "toolTip": "Terraza",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2560C22E_052C_FC68_4183_9C2896FF248D",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.92,
   "image": "this.AnimatedImageResource_26E9CECC_0534_8428_418B_FDC383CEDC12",
   "pitch": -24.42,
   "yaw": -174.14,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.92,
   "yaw": -174.14,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_1_HS_0_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E71347A_0554_84EB_418B_9D281A31772F, this.camera_24EDE6AB_05F4_8468_4190_3ACBAFE6A55E); this.mainPlayList.set('selectedIndex', 30)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2560D22E_052C_FC68_4190_C7B261F30293",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.25,
   "image": "this.AnimatedImageResource_26E97ECD_0534_8428_4182_4116ABE88C73",
   "pitch": 0.92,
   "yaw": -174.8,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.25,
   "yaw": -174.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59, this.camera_24FD569C_05F4_8428_4192_EE9BE8A3EE38); this.mainPlayList.set('selectedIndex', 26)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_2560F22E_052C_FC68_4180_C24A116E1424",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.58,
   "image": "this.AnimatedImageResource_26E8FECD_0534_8428_4191_1F7EBAB6CF24",
   "pitch": -5.84,
   "yaw": -151.24,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.58,
   "yaw": -151.24,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279, this.camera_1A48B494_05F4_8438_4176_93F7202A501C); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_122A0252_0554_BC3B_4182_80D090500858",
 "data": {
  "label": "Imagen"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.08,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_0_0.png",
      "width": 80,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": 7.78,
   "yaw": -137.11
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.08,
   "yaw": -137.11,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 7.78,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A, this.camera_1A2C2464_05F4_8418_4165_88D57717F19F); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_122A6252_0554_BC3B_418F_918FB248FB1F",
 "data": {
  "label": "Circle 03a"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.32,
   "image": "this.AnimatedImageResource_26014E89_0534_8428_4194_FDE2CA2BB064",
   "pitch": -46.69,
   "yaw": -137.09,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.32,
   "yaw": -137.09,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -46.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_1_0_0_map.gif",
      "width": 28,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6, this.camera_1A5B1480_05F4_8418_4194_76711708EFF8); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_122A5252_0554_BC3B_418A_29D27D80F2FB",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.56,
   "image": "this.AnimatedImageResource_26009E89_0534_8428_4140_282E72A37406",
   "pitch": -80.05,
   "yaw": 53.8,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.56,
   "yaw": 53.8,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -80.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_122BA252_0554_BC3B_4189_3D9DEF541041",
 "data": {
  "label": "Arrow 02a Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.1,
   "image": "this.AnimatedImageResource_26000E89_0534_8428_417E_086641146A1B",
   "pitch": -64.83,
   "yaw": 177.71,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.1,
   "yaw": 177.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -64.83,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA, this.camera_185E31A6_05F4_9C18_4193_B5E7F3A966BB); this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FB38408_055C_8417_417C_5B07409E38E2",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.44,
   "image": "this.AnimatedImageResource_26F5DEAC_0534_8468_4165_5C86B7C2C944",
   "pitch": -25.03,
   "yaw": 29.27,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.44,
   "yaw": 29.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FB36408_055C_8417_418B_517F68A72DF4",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.87,
   "image": "this.AnimatedImageResource_26F57EAC_0534_8468_4191_1D98023103B6",
   "pitch": -20.89,
   "yaw": -58.98,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.87,
   "yaw": -58.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68, this.camera_1849C1BA_05F4_9C68_4195_542094F9B4D8); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FB35408_055C_8417_4170_D7DB66983D5A",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.47,
   "image": "this.AnimatedImageResource_26F49EAD_0534_8468_418F_28A8695EE7D7",
   "pitch": -17.05,
   "yaw": 124.15,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.47,
   "yaw": 124.15,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68, this.camera_184351C6_05F4_9C18_418E_41C58D4E6BAB); this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FB34408_055C_8417_4184_214528BD076B",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_26F43EAD_0534_8468_4173_064CCDF9B66B",
   "pitch": -5.5,
   "yaw": 38.02,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.78,
   "yaw": 38.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC6C784_0553_841F_4161_F6B7AE761209, this.camera_187C71D8_05F4_9C28_4182_C60F98AC0630); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FB33408_055C_8417_4190_1DBF46E7958F",
 "data": {
  "label": "Arrow 02 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6.02,
   "image": "this.AnimatedImageResource_26F44EAD_0534_8468_4181_B55C7C2D1864",
   "pitch": -33.23,
   "yaw": -150.16,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6.02,
   "yaw": -150.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -33.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_6_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "items": [
  {
   "media": "this.album_383D1026_2235_55C1_41B4_B2C4B0B66487_0",
   "camera": {
    "duration": 5000,
    "easing": "linear",
    "class": "MovementPhotoCamera",
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
    "scaleMode": "fit_outside"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_383D1026_2235_55C1_41B4_B2C4B0B66487_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6, this.camera_1AF5C3E5_05F4_9C18_4165_6E6514A87B5C); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13A2AAA7_0557_8C18_4194_AE9CBC55B85F",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.61,
   "image": "this.AnimatedImageResource_261FDE87_0534_8418_4194_911F906AAF0A",
   "pitch": -5.5,
   "yaw": -83.44,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.61,
   "yaw": -83.44,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_0_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279, this.camera_1A0E2430_05F4_8478_4179_3978B1745B6E); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13A29AA7_0557_8C18_416E_138747D453DA",
 "data": {
  "label": "Imagen"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.11,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_1_0.png",
      "width": 268,
      "class": "ImageResourceLevel",
      "height": 268
     }
    ]
   },
   "pitch": 59,
   "yaw": -9.07
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.11,
   "yaw": -9.07,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856, this.camera_1AE373FE_05F4_83E8_4162_FC0C3E06DAB9); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13A28AA7_0557_8C18_4169_CD5055663FAF",
 "data": {
  "label": "Imagen"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.77,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_2_0.png",
      "width": 100,
      "class": "ImageResourceLevel",
      "height": 71
     }
    ]
   },
   "pitch": 22,
   "yaw": -86.59
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.77,
   "yaw": -86.59,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 22,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_2_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68, this.camera_1A10D414_05F4_8438_418F_610138F507EA); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_13A2FAA7_0557_8C18_4182_6419A339294E",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.77,
   "image": "this.AnimatedImageResource_261EEE88_0534_8428_4166_B9C7904A2738",
   "pitch": -6.04,
   "yaw": -52.25,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.77,
   "yaw": -52.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC38A81_0555_8C19_4175_14474F252753, this.camera_18C0D0FC_05F4_9DE8_4143_F1481394A848); this.mainPlayList.set('selectedIndex', 29)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_19FC86D1_0554_8439_4184_58F3F723BEB9",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.68,
   "image": "this.AnimatedImageResource_26E54EC4_0534_8418_4191_6BC7CE178474",
   "pitch": -24.19,
   "yaw": -64.64,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.68,
   "yaw": -64.64,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E71347A_0554_84EB_418B_9D281A31772F, this.camera_2579E612_05F4_8438_418C_D3EBD3F197F3); this.mainPlayList.set('selectedIndex', 30)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1BBAF9F8_052C_8FF7_4161_F89C3A5DE34C",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.5,
   "image": "this.AnimatedImageResource_26E74ECB_0534_8428_4173_8C6D47AC8008",
   "pitch": -0.18,
   "yaw": 84.32,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.5,
   "yaw": 84.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -0.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 46)",
   "toolTip": "Terraza",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1BBAE9F8_052C_8FF7_418B_33827283BFEE",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.14,
   "image": "this.AnimatedImageResource_26E6FECB_0534_8428_4153_DAA2EE5C69BA",
   "pitch": -17.88,
   "yaw": -110,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.14,
   "yaw": -110,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -17.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_1_HS_1_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59, this.camera_25770624_05F4_8418_4176_031D83A88158); this.mainPlayList.set('selectedIndex', 26)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1BBA09F8_052C_8FF7_4181_B6168F0E8F10",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.42,
   "image": "this.AnimatedImageResource_26E64ECC_0534_8428_4190_EE0E0467E3C2",
   "pitch": -10.93,
   "yaw": 142.25,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.42,
   "yaw": 142.25,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.93,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_19A4ED49_0553_8428_4194_8459BC5F3186, this.camera_245986F6_05F4_85F8_418A_BDE7FE554728); this.mainPlayList.set('selectedIndex', 43)",
   "toolTip": "Ba\u00f1o Familiar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E0C6788_0557_8428_4195_9D16A7D7AD50",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.37,
   "image": "this.AnimatedImageResource_26FE1EBB_0534_8468_4193_DDE70069670B",
   "pitch": -5.69,
   "yaw": 17.41,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.37,
   "yaw": 17.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C, this.camera_24473714_05F4_8438_4189_A957414F6B57); this.mainPlayList.set('selectedIndex', 33)",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E0C7788_0557_8428_4194_DC1C5CE2D50E",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_26E1EEBB_0534_8468_416B_39D731293207",
   "pitch": -4.24,
   "yaw": 171.16,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 171.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E0C4788_0557_8428_4187_CB8D9B626044",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9.83,
   "image": "this.AnimatedImageResource_26E11EBB_0534_8468_4183_3545A270978D",
   "pitch": -34.98,
   "yaw": -173,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9.83,
   "yaw": -173,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -34.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_2_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1959DFF6_0555_83FB_416E_D361C87BCF28, this.camera_24570702_05F4_8418_416D_F76AFB9E5415); this.mainPlayList.set('selectedIndex', 38)",
   "toolTip": "Gym",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E0C5788_0557_8428_4193_406892E5F1C3",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.48,
   "image": "this.AnimatedImageResource_26E0BEC0_0534_8418_4194_A447110B2354",
   "pitch": -16.87,
   "yaw": -49.94,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.48,
   "yaw": -49.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836, this.camera_2429C6E2_05F4_8418_4186_3475101FD36A); this.mainPlayList.set('selectedIndex', 36)",
   "toolTip": "Dormitorio Secundario 2",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E0CB788_0557_8428_4191_DFBAEE526129",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.77,
   "image": "this.AnimatedImageResource_26E00EC1_0534_8418_4168_BF2340A11229",
   "pitch": -6.19,
   "yaw": 12.94,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.77,
   "yaw": 12.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.19,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856, this.camera_1B415310_05F4_9C38_4182_F1034D9372D7); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1223337E_0557_7CEB_4178_9EE2728A8D0C",
 "data": {
  "label": "Imagen"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.38,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_0_0.png",
      "width": 233,
      "class": "ImageResourceLevel",
      "height": 233
     }
    ]
   },
   "pitch": 63.38,
   "yaw": 0.02
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.38,
   "yaw": 0.02,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 63.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279, this.camera_1B6F132C_05F4_9C68_4196_4BCB9FDF2534); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1223637E_0557_7CEB_4174_C5C8A0D7C0B3",
 "data": {
  "label": "Imagen"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.74,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_1_0.png",
      "width": 81,
      "class": "ImageResourceLevel",
      "height": 81
     }
    ]
   },
   "pitch": 26.97,
   "yaw": 83.95
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.74,
   "yaw": 83.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 26.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A, this.camera_1B53D300_05F4_9C18_4191_9FA8E1221370); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1223737E_0557_7CEB_4184_05F80572670C",
 "data": {
  "label": "Circle 03c"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "image": "this.AnimatedImageResource_261C4E87_0534_8418_4190_752D01AEB292",
   "pitch": -4.11,
   "yaw": 85.75,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.19,
   "yaw": 85.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -4.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_2_0_0_map.gif",
      "width": 61,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68, this.camera_1B71031A_05F4_9C28_4184_F5998D2430E5); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1223A37E_0557_7CEB_418B_D982F84D3DBC",
 "data": {
  "label": "Arrow 02b Left-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.41,
   "image": "this.AnimatedImageResource_261F8E87_0534_8418_4194_5804FE46D4BD",
   "pitch": -6.05,
   "yaw": 45.46,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.41,
   "yaw": 45.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_3_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "map": {
  "width": 20,
  "x": 384.08,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 20,
  "y": 236.92
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Terraza 2"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 46)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E615C030_FEE5_748A_41B9_8C220F0A9B8A",
 "image": {
  "x": 384.08,
  "class": "HotspotMapOverlayImage",
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
  "height": 20
 }
},
{
 "map": {
  "width": 20,
  "x": 546.67,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 20,
  "y": 308.25
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Terraza 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 45)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E615D030_FEE5_748A_41D4_FCFAA721BCCA",
 "image": {
  "x": 546.67,
  "class": "HotspotMapOverlayImage",
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
  "height": 20
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DED6488_0553_8428_418E_ED90A16299DE, this.camera_243BF6D8_05F4_8428_418E_BBE4B4E369D2); this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1A823E_0553_FC68_4191_728E8AFF684F",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.71,
   "image": "this.AnimatedImageResource_26071E91_0534_8438_4184_E93875B7C62D",
   "pitch": -26.79,
   "yaw": -25.42,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.71,
   "yaw": -25.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1BDA00_055C_8C18_4184_90EFF8467140, this.camera_240B26CC_05F4_8428_4188_1B5EF2BCD894); this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1A923E_0553_FC68_418D_1743090B41ED",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11,
   "image": "this.AnimatedImageResource_26068E92_0534_8438_416B_D4B61B4FA852",
   "pitch": -23.59,
   "yaw": 142.08,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11,
   "yaw": 142.08,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -23.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_1_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1AB23E_0553_FC68_4189_5FAEE58E31AA",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_2606DE92_0534_8438_417C_CAB90B1E1638",
   "pitch": -2.6,
   "yaw": 59.03,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": 59.03,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "toolTip": "Ba\u00f1o de Visita",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1B423E_0553_FC68_4195_271270AC1349",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_26061E92_0534_8438_4184_BF613F496B73",
   "pitch": -2.2,
   "yaw": 71.77,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": 71.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF, this.camera_241DF6BD_05F4_8469_4178_13841FC2323E); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1B623E_0553_FC68_4120_B980F67E0440",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.25,
   "image": "this.AnimatedImageResource_2609EE92_0534_8438_4193_1B0C310B7079",
   "pitch": -19.77,
   "yaw": 66.27,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.25,
   "yaw": 66.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -19.77,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_8_0_0_map.gif",
      "width": 37,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1B023E_0553_FC68_4178_C3A4B54CFE9C",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.87,
   "image": "this.AnimatedImageResource_26092E98_0534_8428_417E_26CB33898190",
   "pitch": -9.79,
   "yaw": -51.6,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.87,
   "yaw": -51.6,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.79,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1B223E_0553_FC68_4185_91B1C1EAC174",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_26095E98_0534_8428_4170_F7CCCC7455B2",
   "pitch": -5.07,
   "yaw": 165.95,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.78,
   "yaw": 165.95,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "media": "this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_B8EBDF14_A7F4_D876_41E2_24E8CA7F08AF, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BCBD364B_A7D4_68D2_41C9_1FA89A1A23DB, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189660B6_05F4_9C78_4131_86B6AE7DA294"
},
{
 "media": "this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5100F0_A7F5_A9CE_41D8_6446A7D705FB, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5E4F44_A7CC_58D6_41DF_9C47E76A87BE, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1889A0B6_05F4_9C78_417E_8FCC22831185"
},
{
 "media": "this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5E10F0_A7F5_A9CE_41A7_B92C1ACA5DB3, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5F8F43_A7CC_58D2_41D8_DF244C29624F, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_188980B6_05F4_9C78_4149_62A27DDF445E"
},
{
 "media": "this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5CD0EF_A7F5_A9D2_41E2_3824B0946812, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_122A3252_0554_BC3B_4194_9382E6D6E856_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5FBF43_A7CC_58D2_41AA_4532B9A7D12C, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1889C0B6_05F4_9C78_4185_E2D2481349DA"
},
{
 "media": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB51ED10_A7CC_584E_41E4_5D75E4F1C6AE, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5FEF40_A7CC_58CE_41BB_C81A3CE4CC8B, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_188900B6_05F4_9C78_4188_87C756B8648E"
},
{
 "media": "this.panorama_1D6A8C40_0555_8418_417B_8070C5C48340",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5D60EE_A7F5_A9D2_41D1_95C81D1971C3, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_1D6A8C40_0555_8418_417B_8070C5C48340_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5F0F42_A7CC_58D2_41C8_CE7991E550FF, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_188940B6_05F4_9C78_4187_691256DE4A47"
},
{
 "media": "this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5DC0ED_A7F5_A9D6_41AE_46366DB9783D, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC5F5F42_A7CC_58D2_41D9_DDF8532AE26B, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1888B0B6_05F4_9C78_418F_F36B70A7F4A2"
},
{
 "media": "this.panorama_1281485E_0554_8C28_4117_AABDB6019BC0",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5A80ED_A7F5_A9D6_41D3_C23F221B02A9, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_1281485E_0554_8C28_4117_AABDB6019BC0_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC208F41_A7CC_58CE_41D7_C89A49BDED40, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1888E0B6_05F4_9C78_418E_77A4EF708031"
},
{
 "media": "this.panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552",
 "end": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, -1, this.effect_BB5B50EC_A7F5_A9D6_41DE_384D4C4C1CB4, 'showEffect', false)",
 "start": "this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true)",
 "camera": "this.panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10); this.keepComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false); this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, false, -1, this.effect_BC20EF41_A7CC_58CE_4187_270B63CE9C60, 'hideEffect', false)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_188820B6_05F4_9C78_4190_E609D9E242C4"
},
{
 "media": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54",
 "camera": "this.panorama_1D1AE23E_0553_FC68_4188_605472736D54_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196CF0A7_05F4_9C19_4185_5D33968C8D86, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196CF0A7_05F4_9C19_4185_5D33968C8D86"
},
{
 "media": "this.panorama_1DED6488_0553_8428_418E_ED90A16299DE",
 "camera": "this.panorama_1DED6488_0553_8428_418E_ED90A16299DE_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196FB0A7_05F4_9C19_418C_E2FF78DF6C38, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 11, 12)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196FB0A7_05F4_9C19_418C_E2FF78DF6C38"
},
{
 "media": "this.panorama_1D1BDA00_055C_8C18_4184_90EFF8467140",
 "camera": "this.panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196F20A7_05F4_9C19_4193_0722BC18BF59, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 12, 13)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196F20A7_05F4_9C19_4193_0722BC18BF59"
},
{
 "media": "this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF",
 "camera": "this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196E90A7_05F4_9C19_4183_FBFDEBB4D897, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 13, 14)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196E90A7_05F4_9C19_4183_FBFDEBB4D897"
},
{
 "media": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B",
 "camera": "this.panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196E70A7_05F4_9C19_418A_7869E116202F, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 14, 15)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196E70A7_05F4_9C19_418A_7869E116202F"
},
{
 "media": "this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885",
 "camera": "this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196F60A7_05F4_9C19_4182_B6550143E594, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 15, 16)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196F60A7_05F4_9C19_4182_B6550143E594"
},
{
 "media": "this.panorama_1D9CB834_055D_8C78_4188_C5620981969B",
 "camera": "this.panorama_1D9CB834_055D_8C78_4188_C5620981969B_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196ED0A7_05F4_9C19_4160_8D47F8A13315, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 16, 17)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196ED0A7_05F4_9C19_4160_8D47F8A13315"
},
{
 "media": "this.panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF",
 "camera": "this.panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196E40A7_05F4_9C19_4196_3C4191FE5340, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 17, 18)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196E40A7_05F4_9C19_4196_3C4191FE5340"
},
{
 "media": "this.panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4",
 "camera": "this.panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196120A7_05F4_9C19_4174_539680C59DAB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 18, 19)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196120A7_05F4_9C19_4174_539680C59DAB"
},
{
 "media": "this.panorama_1CEDE816_055F_8C38_418E_7A08769A1A13",
 "camera": "this.panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196010A7_05F4_9C19_415B_09FAEE78E77A, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 20, 21)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196010A7_05F4_9C19_415B_09FAEE78E77A"
},
{
 "media": "this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C",
 "camera": "this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196380A7_05F4_9C19_418B_F3F478EAA486, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 21, 22)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196380A7_05F4_9C19_418B_F3F478EAA486"
},
{
 "media": "this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B",
 "camera": "this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196370A7_05F4_9C19_4193_3F4BDD245672, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 22, 23)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196370A7_05F4_9C19_4193_3F4BDD245672"
},
{
 "media": "this.panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579",
 "camera": "this.panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1962C0A7_05F4_9C19_4131_DB661288F3F6, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 23, 24)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1962C0A7_05F4_9C19_4131_DB661288F3F6"
},
{
 "media": "this.panorama_1E4CEDA5_055D_8418_4183_369C273834FC",
 "camera": "this.panorama_1E4CEDA5_055D_8418_4183_369C273834FC_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196240A7_05F4_9C19_413A_424FEB647C8A, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 24, 25)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196240A7_05F4_9C19_413A_424FEB647C8A"
},
{
 "media": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59",
 "camera": "this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196550A7_05F4_9C19_4178_0C33BB4097AB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 26, 27)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196550A7_05F4_9C19_4178_0C33BB4097AB"
},
{
 "media": "this.panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA",
 "camera": "this.panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196420AC_05F4_9C68_4196_5D5FF4089C60, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 27, 28)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196420AC_05F4_9C68_4196_5D5FF4089C60"
},
{
 "media": "this.panorama_1FC6C784_0553_841F_4161_F6B7AE761209",
 "camera": "this.panorama_1FC6C784_0553_841F_4161_F6B7AE761209_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196780AC_05F4_9C68_4174_8484E400492C, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 28, 29)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196780AC_05F4_9C68_4174_8484E400492C"
},
{
 "media": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753",
 "camera": "this.panorama_1FC38A81_0555_8C19_4175_14474F252753_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_196770AC_05F4_9C68_4186_E61FC58D5FEB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 29, 30)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_196770AC_05F4_9C68_4186_E61FC58D5FEB"
},
{
 "media": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F",
 "camera": "this.panorama_1E71347A_0554_84EB_418B_9D281A31772F_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1966C0AC_05F4_9C68_4148_0C6F0C601460, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 30, 31)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1966C0AC_05F4_9C68_4148_0C6F0C601460"
},
{
 "media": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3",
 "camera": "this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_1899A0AC_05F4_9C68_416A_053AFF321300, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 31, 32)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_1899A0AC_05F4_9C68_416A_053AFF321300"
},
{
 "media": "this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C",
 "camera": "this.panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189880AC_05F4_9C68_4175_8FF96F8AA16E, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 33, 34)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189880AC_05F4_9C68_4175_8FF96F8AA16E"
},
{
 "media": "this.panorama_1EC76684_0557_8418_4152_AE2998805982",
 "camera": "this.panorama_1EC76684_0557_8418_4152_AE2998805982_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189870AC_05F4_9C68_4189_F5FD2EC14C19, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 34, 35)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189870AC_05F4_9C68_4189_F5FD2EC14C19"
},
{
 "media": "this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7",
 "camera": "this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189BF0AC_05F4_9C68_4152_1B8A9E53AD32, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 35, 36)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189BF0AC_05F4_9C68_4152_1B8A9E53AD32"
},
{
 "media": "this.panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836",
 "camera": "this.panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189B50AC_05F4_9C68_4182_DE9327DC0127, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 36, 37)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189B50AC_05F4_9C68_4182_DE9327DC0127"
},
{
 "media": "this.panorama_1979EA66_0555_8C1B_4173_7393A6159775",
 "camera": "this.panorama_1979EA66_0555_8C1B_4173_7393A6159775_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189AC0AC_05F4_9C68_4149_95021678A68C, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 37, 38)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189AC0AC_05F4_9C68_4149_95021678A68C"
},
{
 "media": "this.panorama_1959DFF6_0555_83FB_416E_D361C87BCF28",
 "camera": "this.panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189DA0AC_05F4_9C68_416A_A8F69320DD1B, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 38, 39)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189DA0AC_05F4_9C68_416A_A8F69320DD1B"
},
{
 "media": "this.panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF",
 "camera": "this.panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189D10AC_05F4_9C68_416F_478502872C89, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 39, 40)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189D10AC_05F4_9C68_416F_478502872C89"
},
{
 "media": "this.panorama_19FCE6D1_0554_8439_4189_6FB639D5833F",
 "camera": "this.panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189CF0AC_05F4_9C68_4169_2F8CC1176C4F, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 40, 41)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189CF0AC_05F4_9C68_4169_2F8CC1176C4F"
},
{
 "media": "this.panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358",
 "camera": "this.panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189F80AC_05F4_9C68_4175_CCF37C0C70CA, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 42, 43)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189F80AC_05F4_9C68_4175_CCF37C0C70CA"
},
{
 "media": "this.panorama_19A4ED49_0553_8428_4194_8459BC5F3186",
 "camera": "this.panorama_19A4ED49_0553_8428_4194_8459BC5F3186_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189F00AC_05F4_9C68_4181_28A185A75F71, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 43, 44)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189F00AC_05F4_9C68_4181_28A185A75F71"
},
{
 "media": "this.panorama_199039CD_0553_8C28_4183_39FD45DD7E5B",
 "camera": "this.panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189C70AC_05F4_9C68_4172_D9ECE14133FB, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 44, 45)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189C70AC_05F4_9C68_4172_D9ECE14133FB"
},
{
 "media": "this.panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C",
 "camera": "this.panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189FD0AC_05F4_9C68_4181_0F348134DA31, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 45, 46)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189FD0AC_05F4_9C68_4181_0F348134DA31"
},
{
 "media": "this.panorama_2561322E_052C_FC68_4186_201DBEA1664B",
 "end": "this.trigger('tourEnded')",
 "camera": "this.panorama_2561322E_052C_FC68_4186_201DBEA1664B_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_189EB0AC_05F4_9C68_418A_106C394133DD, this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1ABMapPlayer); this.setEndToItemIndex(this.mainPlayList, 46, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_189EB0AC_05F4_9C68_418A_106C394133DD"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1AE23E_0553_FC68_4188_605472736D54, this.camera_195018B0_05F4_8C78_4180_0067B3688950); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1BFA01_055C_8C18_4182_AB99B35116E0",
 "data": {
  "label": "Arrow 02c Right-Up"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.22,
   "image": "this.AnimatedImageResource_260B3E99_0534_8428_4191_FC6E7AA13199",
   "pitch": -29.51,
   "yaw": -123.47,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.22,
   "yaw": -123.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -29.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_1_HS_0_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D1BEA01_055C_8C18_417F_C9AB454D3214",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.94,
   "image": "this.AnimatedImageResource_2608DE99_0534_8428_4148_D089B606B5BB",
   "pitch": -7.88,
   "yaw": -167.42,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.94,
   "yaw": -167.42,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "map": {
  "width": 29,
  "x": 441.03,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 365.6
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "COMEDOR"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E6062C39_FEE3_0CFA_41DC_BB797E9E904A",
 "image": {
  "x": 441,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 547.14,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 364.6
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "SALA"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 27)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E6063C39_FEE3_0CFA_41EF_07E4478308A7",
 "image": {
  "x": 547.1,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 341.9,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 331.65
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "COCINA"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E6060C39_FEE3_0CFA_41A2_BB8A294A34DD",
 "image": {
  "x": 341.9,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 439.1,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 217.88
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "PASILLO 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E6061C39_FEE3_0CFA_41E7_1FFBE0756AF2",
 "image": {
  "x": 439.05,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 586.68,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 215.49
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "DORMITORIO SECUNDARIO 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E606EC39_FEE3_0CFA_41C7_4AD732F2096E",
 "image": {
  "x": 586.65,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 529.43,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 164.63
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "BA\u00d1O DOR SEC 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 34)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E606FC39_FEE3_0CFA_41D7_4E2287FFAB9F",
 "image": {
  "x": 529.4,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 404.55,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 167.22
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "BA\u00d1O VISITA 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 44)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E606CC39_FEE3_0CFA_41EF_51A4232AD450",
 "image": {
  "x": 404.5,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 171.42,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 217.48
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "ESTUDIO"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 37)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E606AC39_FEE3_0CFA_41D1_3B69DFE90684",
 "image": {
  "x": 171.4,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 312.55,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 163.76
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "BA\u00d1O FAMILIAR"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 40)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E6069C39_FEE3_0CFA_41DD_9A5547CDF3F7",
 "image": {
  "x": 312.5,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
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
 "progressBottom": 2,
 "playbackBarHeadShadow": true,
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
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingTop": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipBorderColor": "#FFFFFF",
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
 "toolTipShadowSpread": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "PLANTA 701-2"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CEDD816_055F_8C38_4182_CC28D6C77211",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9,
   "image": "this.AnimatedImageResource_26F0EEA5_0534_8418_4147_FDB8569F7211",
   "pitch": 0.64,
   "yaw": -118.77,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9,
   "yaw": -118.77,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445",
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "99.975%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
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
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
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
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "class": "ViewerArea",
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
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
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
  "name": "PLANTA 604-1"
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B, this.camera_1BB5B23C_05F4_9C68_418C_762E5279E636); this.mainPlayList.set('selectedIndex', 22)",
   "toolTip": "Estar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E4CBDA5_055D_8418_4193_3C4B9C6FB652",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6,
   "image": "this.AnimatedImageResource_26F5BEAA_0534_8468_4181_70A5198C8EA0",
   "pitch": 0.36,
   "yaw": -162.56,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6,
   "yaw": -162.56,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC38A81_0555_8C19_4175_14474F252753, this.camera_1930685A_05F4_8C28_418F_86C9995BF719); this.mainPlayList.set('selectedIndex', 29)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1EB6FBAB_0554_8C68_418B_79F88EFB14CA",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.19,
   "image": "this.AnimatedImageResource_26E23EC2_0534_8418_418A_ADF82DAB88AE",
   "pitch": -3.76,
   "yaw": -127.16,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.19,
   "yaw": -127.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.76,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1EC76684_0557_8418_4152_AE2998805982, this.camera_1936F868_05F4_8CE8_4188_26ABD409873B); this.mainPlayList.set('selectedIndex', 34)",
   "toolTip": "Ba\u00f1o",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1EB6EBAB_0554_8C68_4190_1670B7ABFBFB",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.96,
   "image": "this.AnimatedImageResource_26E25EC3_0534_8418_4184_16E03EAD7340",
   "pitch": -6.45,
   "yaw": -110.23,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.96,
   "yaw": -110.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1C4D4E72_055C_84F8_4170_67647A3A70A2",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.94,
   "image": "this.AnimatedImageResource_26F06EA4_0534_8418_4184_1CF004222AA9",
   "pitch": 4.98,
   "yaw": -125.3,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.94,
   "yaw": -125.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 4.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885, this.camera_187691E6_05F4_9C18_417A_ED287BFAAE56); this.mainPlayList.set('selectedIndex', 15)",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D9C8834_055D_8C78_4175_416B08098C56",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 9,
   "image": "this.AnimatedImageResource_26F0EEA4_0534_8418_4166_D7A3805414E5",
   "pitch": 0.58,
   "yaw": -103.54,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 9,
   "yaw": -103.54,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 0.58,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC38A81_0555_8C19_4175_14474F252753, this.camera_1BD9F25A_05F4_9C28_4170_49226BE7E8D4); this.mainPlayList.set('selectedIndex', 29)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_199029CD_0553_8C28_4181_6FA8967DBD7D",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.57,
   "image": "this.AnimatedImageResource_26E7EEC5_0534_8418_418E_69EF9370179B",
   "pitch": -25.2,
   "yaw": 148.47,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.57,
   "yaw": 148.47,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -25.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E4CEDA5_055D_8418_4183_369C273834FC, this.camera_1B8E5220_05F4_9C18_4193_EB0A8579E884); this.mainPlayList.set('selectedIndex', 24)",
   "toolTip": "Ba\u00f1o de Visita",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CD3BAA9_055C_8C68_4184_A33F6DCA0409",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.81,
   "image": "this.AnimatedImageResource_26F3AEA5_0534_8418_4133_741DE249A4A6",
   "pitch": -11.82,
   "yaw": 108.63,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.81,
   "yaw": 108.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -11.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D1AE23E_0553_FC68_4188_605472736D54, this.camera_186071F6_05F4_9FF8_418A_50D2135A2F7E); this.mainPlayList.set('selectedIndex', 10)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CD38AA9_055C_8C68_4183_9B1807897219",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.79,
   "image": "this.AnimatedImageResource_26F3CEA5_0534_8418_418C_E0F84545F43D",
   "pitch": -2.75,
   "yaw": 1.21,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.79,
   "yaw": 1.21,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.75,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF, this.camera_1B95420F_05F4_9C28_4150_C51318024766); this.mainPlayList.set('selectedIndex', 13)",
   "toolTip": "Terraza",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CD3EAA9_055C_8C68_4178_55ECEB3DB892",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.12,
   "image": "this.AnimatedImageResource_26F36EA6_0534_8418_4177_ED50EEB9F1F9",
   "pitch": -8.41,
   "yaw": -155.74,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.12,
   "yaw": -155.74,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -8.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579, this.camera_1BBB122D_05F4_9C68_418F_D08F7092BF73); this.mainPlayList.set('selectedIndex', 23)",
   "toolTip": "Terraza",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CD3FAA9_055C_8C68_4176_C018E372F3D4",
 "data": {
  "label": "Arrow 02c Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.16,
   "image": "this.AnimatedImageResource_26F2BEA6_0534_8418_416C_ABBB4AAEF9C0",
   "pitch": -6.05,
   "yaw": 68.98,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.16,
   "yaw": 68.98,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -6.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CEDE816_055F_8C38_418E_7A08769A1A13, this.camera_25FE659E_05F4_842B_4170_5B48B32C1F79); this.mainPlayList.set('selectedIndex', 20)",
   "toolTip": "Ba\u00f1o Familiar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA5BAB1_055C_8C78_4192_AA85F182AE0E",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.13,
   "image": "this.AnimatedImageResource_260CCE9B_0534_8428_4186_39742F248D75",
   "pitch": -7.99,
   "yaw": -26.46,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.13,
   "yaw": -26.46,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4, this.camera_25490607_05F4_8418_4192_2D8F6E3DC953); this.mainPlayList.set('selectedIndex', 18)",
   "toolTip": "Dormitorio Secundario 2",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA5AAB1_055C_8C78_414E_CB06860E3E66",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_260C7E9B_0534_842F_4166_2DBDB4F14A67",
   "pitch": -5,
   "yaw": -10.33,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.78,
   "yaw": -10.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_9_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5, this.camera_250CD5CA_05F4_8428_4190_8351F415E7C8); this.mainPlayList.set('selectedIndex', 19)",
   "toolTip": "Estudio",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA59AB1_055C_8C78_4194_67AFB3B52415",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.75,
   "image": "this.AnimatedImageResource_260FBE9C_0534_8428_4194_8CFD29970F79",
   "pitch": -7.88,
   "yaw": -10.43,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.75,
   "yaw": -10.43,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -7.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_10_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF, this.camera_252A95E8_05F4_87E8_418F_17BBB6C2E1C5); this.mainPlayList.set('selectedIndex', 17)",
   "toolTip": "Dormitorio Secundario 1",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA55AB1_055C_8C78_4182_9780CF06A9A2",
 "data": {
  "label": "Arrow 02b Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_260F2E9C_0534_8426_4184_4D1887B8D7E3",
   "pitch": -5.2,
   "yaw": 14.05,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.78,
   "yaw": 14.05,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_11_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B, this.camera_251C05BD_05F4_8468_4188_19FE25717128); this.mainPlayList.set('selectedIndex', 22)",
   "toolTip": "Servicio Higienico Visita",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA54AB1_055C_8C78_4157_3C2D345CAC54",
 "data": {
  "label": "Arrow 02c Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.94,
   "image": "this.AnimatedImageResource_260F4EA2_0534_8418_4184_2E5060C7DB90",
   "pitch": 7.85,
   "yaw": -142.33,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.94,
   "yaw": -142.33,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 7.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_12_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF, this.camera_255B75F2_05F4_87F8_4169_DBA784458365); this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA53AB1_055C_8C78_4181_FF1F82153A40",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.5,
   "image": "this.AnimatedImageResource_260EFEA2_0534_8418_4191_A167FB5C4CA8",
   "pitch": -20.57,
   "yaw": -177.16,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.5,
   "yaw": -177.16,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D833878_055D_8CF7_4188_7DF8A38CB885, this.camera_253AC5D9_05F4_8428_4177_DD0829A7D7DC); this.mainPlayList.set('selectedIndex', 15)",
   "toolTip": "Dormitorio Principal",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA52AB1_055C_8C78_4174_D2D6FB8C5AD6",
 "data": {
  "label": "Arrow 02b Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_260E1EA2_0534_8418_4171_D635E3468BCC",
   "pitch": -2.64,
   "yaw": -174.69,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": -174.69,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_13_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C, this.camera_25EEE5AD_05F4_8468_4186_C296D968C5E0); this.mainPlayList.set('selectedIndex', 21)",
   "toolTip": "Ba\u00f1o Visita",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1DA50AB1_055C_8C78_417A_94B782CCA5CF",
 "data": {
  "label": "Arrow 02b Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3.6,
   "image": "this.AnimatedImageResource_26F1BEA3_0534_8418_4165_F5633084B782",
   "pitch": -2.81,
   "yaw": -170.93,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3.6,
   "yaw": -170.93,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -2.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_14_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_19F2DBBA_0554_8C68_418F_2D86225541C8",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.7,
   "image": "this.AnimatedImageResource_26E4CEC5_0534_8418_4151_B03D77B01F40",
   "pitch": -26.92,
   "yaw": -51.3,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.7,
   "yaw": -51.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1C2F1B8C_055C_8C28_4154_A723F6D49952",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 14.97,
   "image": "this.AnimatedImageResource_26F3BEA4_0534_8418_4193_2FE5FF181ED0",
   "pitch": 3.52,
   "yaw": -71.94,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 14.97,
   "yaw": -71.94,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 3.52,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3, this.camera_1A3EE44E_05F4_8428_418E_1F862C931D4B); this.mainPlayList.set('selectedIndex', 31)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E95B3C0_0555_BC18_4184_C02D164A8B9C",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.85,
   "image": "this.AnimatedImageResource_26E52EC3_0534_8418_4192_016507CDE736",
   "pitch": -10.6,
   "yaw": 97.38,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.85,
   "yaw": 97.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -10.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7, this.camera_25A32553_05F4_8438_412F_E63BA9F3A8F0); this.mainPlayList.set('selectedIndex', 35)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1EC75684_0557_8418_414E_F3CB2D1618D0",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.69,
   "image": "this.AnimatedImageResource_26E28EC2_0534_8418_4181_D7E53ACFB218",
   "pitch": -24.14,
   "yaw": 64.4,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 13.69,
   "yaw": 64.4,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -24.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 26)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FEFB0DC_0553_BC28_4178_5AAFB5953488",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.38,
   "image": "this.AnimatedImageResource_26F72EAD_0534_8468_417A_C570768B8F08",
   "pitch": -26.81,
   "yaw": -149.41,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.38,
   "yaw": -149.41,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -26.81,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_0_0_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E71347A_0554_84EB_418B_9D281A31772F, this.camera_1A8D134B_05F4_9C28_418E_A46FF47204C0); this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FEF80DC_0553_BC28_4162_A644EEBFB2C6",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 8.99,
   "image": "this.AnimatedImageResource_26F6AEAE_0534_8468_4194_FC849FAD8743",
   "pitch": -3.06,
   "yaw": 109.13,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 8.99,
   "yaw": 109.13,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -3.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC6C784_0553_841F_4161_F6B7AE761209, this.camera_1AABD37C_05F4_9CE8_418D_1F8899F5D52B); this.mainPlayList.set('selectedIndex', 28)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FEFE0DC_0553_BC28_4191_1CF8505317EF",
 "data": {
  "label": "Arrow 02 Right"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.85,
   "image": "this.AnimatedImageResource_26F62EAE_0534_8468_4154_9C95D2B5029B",
   "pitch": -18.12,
   "yaw": -149.63,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.85,
   "yaw": -149.63,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -18.12,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_4_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68, this.camera_1ABB435E_05F4_9C28_4171_C77337244727); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FEFF0DC_0553_BC28_417E_88B5CA264EEB",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.48,
   "image": "this.AnimatedImageResource_26F64EAE_0534_8468_418F_EA65742FDF6C",
   "pitch": -16.92,
   "yaw": 173.32,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.48,
   "yaw": 173.32,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -16.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FC38A81_0555_8C19_4175_14474F252753, this.camera_1A9CA336_05F4_9C78_4174_2B6CE2AAC853); this.mainPlayList.set('selectedIndex', 29)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1FEFC0DC_0553_BC28_418E_7CE644116E23",
 "data": {
  "label": "Arrow 02 Left"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_26F98EAE_0534_8468_4195_9F8D5E270E9E",
   "pitch": 1.11,
   "yaw": -99.36,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": -99.36,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.11,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B, this.camera_1B07A2D5_05F4_9C38_4178_9A607CDEF94F); this.mainPlayList.set('selectedIndex', 22)",
   "toolTip": "Estar",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1CBCEAFA_055C_8DE8_4194_8E688567895C",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.78,
   "image": "this.AnimatedImageResource_26F22EA6_0534_8418_4181_76F450392FB1",
   "pitch": -5.82,
   "yaw": -94.3,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.78,
   "yaw": -94.3,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -5.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12A29C71_0555_84F8_4191_5AD65F782312, this.camera_24DF067E_05F4_84E8_4195_9809A3F736A3); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1D6ADC40_0555_8418_414E_17AE3AD26000",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.24,
   "image": "this.AnimatedImageResource_2605BE90_0534_8438_4184_9B66CE8EFEFF",
   "pitch": -20.29,
   "yaw": 87.75,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.24,
   "yaw": 87.75,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -20.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_1_HS_1_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "map": {
  "width": 29,
  "x": 574.78,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 370.92
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "PASILLO 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 30)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E62E4F3F_FEE3_0CF6_41D6_5965EA3F65E8",
 "image": {
  "x": 574.43,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 488.11,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 216.47
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "PASILLO 2"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E37F1816_FEFF_14B4_4195_F50DB180F772",
 "image": {
  "x": 487.83,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 560.15,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 212.65
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "DORMITORIO PRINCIPAL"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 33)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E62DAF3F_FEE3_0CF6_41D4_356ADDA16A2D",
 "image": {
  "x": 559.72,
  "class": "HotspotMapOverlayImage",
  "y": 212.36,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_E62E5F3F_FEE3_0CF6_41AF_75B2E7F58B3C_HS_2.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 24
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 526.84,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 140.13
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "BA\u00d1O PRINCIPAL"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 42)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_DAA06E8B_FFC8_9E47_41D7_B698C18E9F0F",
 "image": {
  "x": 526.84,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 288.86,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 216.11
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "DORMITORIO SECUNDARIO 2"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 36)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E62DBF3F_FEE3_0CF6_41B3_62E4194294F8",
 "image": {
  "x": 288.58,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 411.08,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 370
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "GYM"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 38)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E3F4C8A5_FEE3_F597_41E5_D0C5AE35E6CA",
 "image": {
  "x": 410.74,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 353.31,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 173.33
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "BA\u00d1O FAMILIAR"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 43)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E3E09D3F_FEE5_0CF3_41DA_87FF965E2290",
 "image": {
  "x": 353.02,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 570.53,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
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
  "offsetY": 0,
  "height": 24,
  "y": 275
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "JUEGOS"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 39)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_E31927D4_FEE5_7BB5_41C1_482702391A11",
 "image": {
  "x": 570.24,
  "class": "HotspotMapOverlayImage",
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
  "height": 24
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_12A29C71_0555_84F8_4191_5AD65F782312, this.camera_1B1672C5_05F4_9C18_4177_DA34723786D2); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1285306E_0555_9CEB_4183_E617D1339349",
 "data": {
  "label": "Arrow 02b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 10.3,
   "image": "this.AnimatedImageResource_2605CE90_0534_8438_4149_4A1D9DFFE520",
   "pitch": -30.84,
   "yaw": 177.71,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 10.3,
   "yaw": 177.71,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -30.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_2_0_0_map.gif",
      "width": 26,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1285206E_0555_9CEB_4173_AF260D815276",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 3,
   "image": "this.AnimatedImageResource_26056E90_0534_8438_4180_3309B6F3FA2F",
   "pitch": -1.56,
   "yaw": 178.23,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 3,
   "yaw": 178.23,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -1.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1281485E_0554_8C28_4117_AABDB6019BC0, this.camera_1B1B52B5_05F4_9C78_4184_0A52B4F581F4); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1285106E_0555_9CEB_4165_76EAF2515772",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 5.58,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_4_0.png",
      "width": 133,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -21.66,
   "yaw": -66.9
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 5.58,
   "yaw": -66.9,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -21.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 18
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1D62E8A1_0554_8C18_4194_D2981A9C3552, this.camera_1BEF82A5_05F4_9C18_418F_01753539E395); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1285006E_0555_9CEB_4188_ED838A1C8977",
 "data": {
  "label": "Circle 03b"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 2.75,
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_5_0.png",
      "width": 62,
      "class": "ImageResourceLevel",
      "height": 57
     }
    ]
   },
   "pitch": -12.44,
   "yaw": 76.86
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 2.75,
   "yaw": 76.86,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -12.44,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_5_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59, this.camera_1BF9C286_05F4_9C1B_4145_2D6E98A97060); this.mainPlayList.set('selectedIndex', 26)",
   "toolTip": "Salida",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E71247A_0554_84EB_4177_B4B761DC3A0D",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 7.1,
   "image": "this.AnimatedImageResource_26FB3EB7_0534_8478_418A_CDB8FF0FEAEB",
   "pitch": -9.34,
   "yaw": -24.45,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 7.1,
   "yaw": -24.45,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3, this.camera_1BD2F266_05F4_9C18_4190_D0C41A73225F); this.mainPlayList.set('selectedIndex', 31)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E70C47A_0554_84EB_4181_C0DF89AB2FBF",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 6,
   "image": "this.AnimatedImageResource_26FAAEB7_0534_8478_4187_F00202846639",
   "pitch": 1.06,
   "yaw": 5.12,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 6,
   "yaw": 5.12,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 1.06,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C, this.camera_1BF5B296_05F4_9C38_4182_C60A42C1EE06); this.mainPlayList.set('selectedIndex', 45)",
   "toolTip": "Terraza",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E70F47A_0554_84EB_4188_A70861F6CCDF",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 11.99,
   "image": "this.AnimatedImageResource_26FACEB8_0534_8468_4160_DE22E66F6830",
   "pitch": 2.2,
   "yaw": -81.78,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 11.99,
   "yaw": -81.78,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": 2.2,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_7_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA, this.camera_1BCD7278_05F4_9CE8_4178_8859D1E527C9); this.mainPlayList.set('selectedIndex', 27)",
   "toolTip": "Terraza",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_1E70E47A_0554_84EB_418A_5741F987CA84",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 4.14,
   "image": "this.AnimatedImageResource_26FA5EB8_0534_8468_416C_193CEBC5BC20",
   "pitch": -9.29,
   "yaw": -176.38,
   "distance": 50
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 4.14,
   "yaw": -176.38,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -9.29,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_8_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "map": {
  "width": 29,
  "x": 492.35,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_0_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 178.94
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "COMEDOR 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4DF6C2D_EAB3_0F73_41E6_5F63DCF645B3",
 "image": {
  "x": 492.15,
  "class": "HotspotMapOverlayImage",
  "y": 178.81,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_0.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 608.32,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_1_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 170.49
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "SALA"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4DF4C2D_EAB3_0F73_41EC_A7E6E09DA239",
 "image": {
  "x": 608.19,
  "class": "HotspotMapOverlayImage",
  "y": 170.29,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_1.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 355.42,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_3_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 216.89
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "COCINA"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D8AC2E_EAB3_0F71_41DE_69DCC58572B9",
 "image": {
  "x": 355.29,
  "class": "HotspotMapOverlayImage",
  "y": 216.75,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_3.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 447.75,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_4_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 395.23
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "SHV 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D89C2E_EAB3_0F71_41D8_2E75F1C81BAF",
 "image": {
  "x": 447.62,
  "class": "HotspotMapOverlayImage",
  "y": 395.09,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_4.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 484.7,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_5_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 332.72
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "PASILLO 1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D88C2E_EAB3_0F71_41E5_AC4CFBEC0BD2",
 "image": {
  "x": 484.56,
  "class": "HotspotMapOverlayImage",
  "y": 332.58,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_5.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 317.67,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_6_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 333.45
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "PASILLO 2"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D8FC2E_EAB3_0F71_41CB_806EA1F903ED",
 "image": {
  "x": 317.54,
  "class": "HotspotMapOverlayImage",
  "y": 333.32,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_6.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 285.99,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_7_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 388.3
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "SH"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D8EC2E_EAB3_0F71_41CC_43F72230A425",
 "image": {
  "x": 285.79,
  "class": "HotspotMapOverlayImage",
  "y": 388.1,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_7.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 653.85,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_8_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 334.58
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "DP"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D8DC2E_EAB3_0F71_41C1_2F0B9E20510E",
 "image": {
  "x": 653.72,
  "class": "HotspotMapOverlayImage",
  "y": 334.38,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_8.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 550.6,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_9_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 388.77
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "SHP"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 16)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D8CC2E_EAB3_0F71_41DD_C2CF49EC887C",
 "image": {
  "x": 550.47,
  "class": "HotspotMapOverlayImage",
  "y": 388.64,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_9.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 191.66,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_10_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 339.97
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "DS2"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 18)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D83C2E_EAB3_0F71_41D6_E54B975F9E41",
 "image": {
  "x": 191.52,
  "class": "HotspotMapOverlayImage",
  "y": 339.84,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_10.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "map": {
  "width": 29,
  "x": 220.81,
  "class": "HotspotMapOverlayMap",
  "offsetX": 0,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_11_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "offsetY": 0,
  "height": 24,
  "y": 274.54
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "DS1"
 },
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 17)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "id": "overlay_F4D82C2E_EAB3_0F71_41EC_54236286E1F9",
 "image": {
  "x": 220.61,
  "class": "HotspotMapOverlayImage",
  "y": 274.4,
  "width": 29,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F4DF7C2D_EAB3_0F73_418B_1D8531ADA7C8_HS_11.png",
     "width": 28,
     "class": "ImageResourceLevel",
     "height": 23
    }
   ]
  },
  "height": 24
 }
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3, this.camera_2477E728_05F4_8468_4142_4233AF311FC0); this.mainPlayList.set('selectedIndex', 31)",
   "toolTip": "Pasillo",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_19A4FD49_0553_8428_418D_F563C5352FBA",
 "data": {
  "label": "Circle Generic 03"
 },
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.35,
   "image": "this.AnimatedImageResource_26E47EC5_0534_8418_4155_486205A65834",
   "pitch": -34.55,
   "yaw": -48.27,
   "distance": 100
  }
 ],
 "rollOverDisplay": false,
 "maps": [
  {
   "hfov": 12.35,
   "yaw": -48.27,
   "class": "HotspotPanoramaOverlayMap",
   "pitch": -34.55,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   }
  }
 ],
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_9CD3B025_A9D4_E880_41E2_F7E2F968C434",
  "this.IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E"
 ],
 "id": "Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932",
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
 "class": "Container",
 "propagateClick": true,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
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
  "this.Image_9CD3E025_A9D4_E880_41D4_11D730D4859E",
  "this.Container_9CD3F025_A9D4_E880_41D0_0CEB8EB90ED5",
  "this.Container_9CD30026_A9D4_E880_41C2_588F29082802"
 ],
 "id": "Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F",
 "scrollBarOpacity": 0.5,
 "width": 300,
 "backgroundImageUrl": "skin/Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F.jpg",
 "right": "0%",
 "paddingRight": 40,
 "borderSize": 0,
 "paddingLeft": 40,
 "backgroundOpacity": 0.7,
 "scrollBarWidth": 10,
 "contentOpaque": true,
 "verticalAlign": "top",
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 1,
 "class": "Container",
 "propagateClick": true,
 "height": "100%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
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
 "shadowHorizontalLength": 0,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "shadowVerticalLength": 0,
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
 "class": "Container",
 "propagateClick": false,
 "bottom": "80%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
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
 "shadowHorizontalLength": 0,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
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
 "shadowHorizontalLength": 0,
 "id": "Container_7DABF279_60D0_4587_41BE_BB0754751B70",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
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
  "this.ViewerAreaLabeled_3B00CABF_22CD_CA3F_415F_764A7C5A2749",
  "this.Container_3B00DABF_22CD_CA3F_41A4_282BCBFE84B2"
 ],
 "shadowHorizontalLength": 0,
 "id": "Container_3B00BABF_22CD_CA3F_4196_8059B3DFE268",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
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
  "this.ViewerAreaLabeled_6105C3E2_22D4_DA41_41A1_DC78A633F445",
  "this.Container_6105F3E2_22D4_DA41_4191_9FBF3AEA4258"
 ],
 "shadowHorizontalLength": 0,
 "id": "Container_6105D3E2_22D4_DA41_418C_50644C9E3D5B",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
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
  "this.ViewerAreaLabeled_61059F4E_22D3_4A41_419F_699B0C07765E",
  "this.Container_61058F4E_22D3_4A41_41AB_E291325EA4EE"
 ],
 "shadowHorizontalLength": 0,
 "id": "Container_6105EF4E_22D3_4A41_41B9_2471196AFC02",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
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
  "this.ViewerAreaLabeled_4DDB9132_755E_020B_41DB_701B28BE6C78",
  "this.Container_4DC46133_755E_020A_41C6_9CA46BC30A6D"
 ],
 "shadowHorizontalLength": 0,
 "id": "Container_4DDB8132_755E_020A_41C1_52FFC36C1B4C",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
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
 "class": "Container",
 "propagateClick": false,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "shadowVerticalLength": 0,
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
 "id": "AnimatedImageResource_26089E98_0534_8428_4182_0D797AA7EF8B",
 "levels": [
  {
   "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26081E98_0534_8428_4193_0CDFFF66C4B6",
 "levels": [
  {
   "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_260BAE99_0534_8428_4172_1A7042520BA1",
 "levels": [
  {
   "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_260BFE99_0534_8428_4190_F6A8C9EFCEE0",
 "levels": [
  {
   "url": "media/panorama_1DED6488_0553_8428_418E_ED90A16299DE_1_HS_5_0.png",
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
 "id": "AnimatedImageResource_261E3E88_0534_8428_4176_F1E44E91A21D",
 "levels": [
  {
   "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_261E5E88_0534_8428_4171_982EB8473C09",
 "levels": [
  {
   "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_2601FE88_0534_8428_4177_BB9529DB0427",
 "levels": [
  {
   "url": "media/panorama_125C3BAD_0557_8C68_4194_358C7EAE8279_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26FDCEB8_0534_8468_418D_DB6F4778255D",
 "levels": [
  {
   "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26FD4EB9_0534_8468_4194_A37F5ED24BEE",
 "levels": [
  {
   "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26FC2EB9_0534_8468_418C_2E9558514604",
 "levels": [
  {
   "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26FFAEB9_0534_8468_4194_B8DC7A3222B8",
 "levels": [
  {
   "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26FF2EBA_0534_8468_418B_5E6ADE8B1A54",
 "levels": [
  {
   "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26FE9EBA_0534_8468_417D_E02965B96A0B",
 "levels": [
  {
   "url": "media/panorama_1E2046F2_0557_85FB_4173_97A5318CEFA3_1_HS_9_0.png",
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
 "id": "AnimatedImageResource_26F96EAF_0534_8468_4168_A84680A9D4B6",
 "levels": [
  {
   "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_1_HS_0_0.png",
   "width": 380,
   "class": "ImageResourceLevel",
   "height": 570
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26F88EAF_0534_8468_4190_7C40B6720094",
 "levels": [
  {
   "url": "media/panorama_1FC6C784_0553_841F_4161_F6B7AE761209_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26081E9A_0534_8428_4172_875DCA30BEC3",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_260BBE9A_0534_8428_4188_DCED1A16F8E5",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_260BDE9A_0534_8428_418F_3A5BF885B3C8",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_260B7E9A_0534_8428_4185_CC1091A256AA",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_5_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_260AEE9A_0534_8428_4172_114E6870C2D8",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_6_0.png",
   "width": 536,
   "class": "ImageResourceLevel",
   "height": 804
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_260A0E9A_0534_8428_4190_93EF839450C0",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_7_0.png",
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
 "id": "AnimatedImageResource_260DBE9B_0534_8428_4183_B05E1B4CCFEA",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_8_0.png",
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
 "id": "AnimatedImageResource_260D0E9B_0534_8428_4167_2F66072A34D8",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_9_0.png",
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
 "id": "AnimatedImageResource_260D4E9B_0534_8428_4188_1AC3B8CC66B1",
 "levels": [
  {
   "url": "media/panorama_1DF042CA_055C_FC28_4193_E95B6F40BEEF_1_HS_10_0.png",
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
 "id": "AnimatedImageResource_26004E8E_0534_8428_4187_D85F2197F4FB",
 "levels": [
  {
   "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26039E8E_0534_8428_4191_369D1CF9FED1",
 "levels": [
  {
   "url": "media/panorama_12C47DF7_0554_87F8_4192_5C8A628ACA68_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26F00EA5_0534_8418_4193_44ABD69B253C",
 "levels": [
  {
   "url": "media/panorama_1CFFCFCD_055F_8429_415E_8681CEB7DE7C_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F13EA3_0534_8418_418F_0693F020917A",
 "levels": [
  {
   "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F14EA3_0534_8418_4178_8305C0D34717",
 "levels": [
  {
   "url": "media/panorama_1D833878_055D_8CF7_4188_7DF8A38CB885_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26F83EAF_0534_8468_4159_E06264FB7DDB",
 "levels": [
  {
   "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26FB9EB0_0534_8478_418C_598210D37FB6",
 "levels": [
  {
   "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26FB6EB0_0534_8478_4192_224596226A7C",
 "levels": [
  {
   "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26FA9EB6_0534_8478_4191_761E60208930",
 "levels": [
  {
   "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26FA1EB6_0534_8478_4122_6DFDD9A76160",
 "levels": [
  {
   "url": "media/panorama_1FC38A81_0555_8C19_4175_14474F252753_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26F14EA4_0534_8418_416F_73244262EC21",
 "levels": [
  {
   "url": "media/panorama_1C0EDF7E_055C_84EB_4178_28E7C72291F5_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E4BEC3_0534_8418_4195_A16D56131BFA",
 "levels": [
  {
   "url": "media/panorama_1979EA66_0555_8C1B_4173_7393A6159775_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E3BEC1_0534_8418_4189_4BE04560E2AC",
 "levels": [
  {
   "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E32EC2_0534_8418_4181_3E665DD3C58A",
 "levels": [
  {
   "url": "media/panorama_1EEE3BAD_0557_8C68_4172_8A3DA1CA770C_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26E43EC4_0534_8418_4164_DDB7102AD2FD",
 "levels": [
  {
   "url": "media/panorama_1959DFF6_0555_83FB_416E_D361C87BCF28_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26E52EC4_0534_8418_4191_F08BE3620641",
 "levels": [
  {
   "url": "media/panorama_1934C15C_0554_9C2F_4192_6CF8C16346EF_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26028E8F_0534_8428_4170_F2667A3D6EAE",
 "levels": [
  {
   "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_2602DE8F_0534_8428_4161_702DA0B200AA",
 "levels": [
  {
   "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26026E8F_0534_8428_418E_E26DAE66B3FC",
 "levels": [
  {
   "url": "media/panorama_12A29C71_0555_84F8_4191_5AD65F782312_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26E9CECC_0534_8428_418B_FDC383CEDC12",
 "levels": [
  {
   "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26E97ECD_0534_8428_4182_4116ABE88C73",
 "levels": [
  {
   "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26E8FECD_0534_8428_4191_1F7EBAB6CF24",
 "levels": [
  {
   "url": "media/panorama_2561322E_052C_FC68_4186_201DBEA1664B_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26014E89_0534_8428_4194_FDE2CA2BB064",
 "levels": [
  {
   "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 900
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26009E89_0534_8428_4140_282E72A37406",
 "levels": [
  {
   "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26000E89_0534_8428_417E_086641146A1B",
 "levels": [
  {
   "url": "media/panorama_122A3252_0554_BC3B_4194_9382E6D6E856_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26F5DEAC_0534_8468_4165_5C86B7C2C944",
 "levels": [
  {
   "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26F57EAC_0534_8468_4191_1D98023103B6",
 "levels": [
  {
   "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26F49EAD_0534_8468_418F_28A8695EE7D7",
 "levels": [
  {
   "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26F43EAD_0534_8468_4173_064CCDF9B66B",
 "levels": [
  {
   "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26F44EAD_0534_8468_4181_B55C7C2D1864",
 "levels": [
  {
   "url": "media/panorama_1FB3A408_055C_8417_4190_3CCCC1A9DA59_1_HS_6_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_261FDE87_0534_8418_4194_911F906AAF0A",
 "levels": [
  {
   "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_0_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_261EEE88_0534_8428_4166_B9C7904A2738",
 "levels": [
  {
   "url": "media/panorama_13A2BAA7_0557_8C18_4194_35D348CC784A_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26E54EC4_0534_8418_4191_6BC7CE178474",
 "levels": [
  {
   "url": "media/panorama_19FCE6D1_0554_8439_4189_6FB639D5833F_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E74ECB_0534_8428_4173_8C6D47AC8008",
 "levels": [
  {
   "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_1_HS_0_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26E6FECB_0534_8428_4153_DAA2EE5C69BA",
 "levels": [
  {
   "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_1_HS_1_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26E64ECC_0534_8428_4190_EE0E0467E3C2",
 "levels": [
  {
   "url": "media/panorama_1BBAD9F8_052C_8FF7_415D_35536AD5B85C_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26FE1EBB_0534_8468_4193_DDE70069670B",
 "levels": [
  {
   "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E1EEBB_0534_8468_416B_39D731293207",
 "levels": [
  {
   "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26E11EBB_0534_8468_4183_3545A270978D",
 "levels": [
  {
   "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26E0BEC0_0534_8418_4194_A447110B2354",
 "levels": [
  {
   "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26E00EC1_0534_8418_4168_BF2340A11229",
 "levels": [
  {
   "url": "media/panorama_1E0C3788_0557_8428_4189_01956A218B4B_1_HS_5_0.png",
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
 "id": "AnimatedImageResource_261C4E87_0534_8418_4190_752D01AEB292",
 "levels": [
  {
   "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_2_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_261F8E87_0534_8418_4194_5804FE46D4BD",
 "levels": [
  {
   "url": "media/panorama_1222D37D_0557_7CE9_4184_0374F237A6F6_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26071E91_0534_8438_4184_E93875B7C62D",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26068E92_0534_8438_416B_D4B61B4FA852",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_2606DE92_0534_8438_417C_CAB90B1E1638",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_6_0.png",
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
 "id": "AnimatedImageResource_26061E92_0534_8438_4184_BF613F496B73",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_7_0.png",
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
 "id": "AnimatedImageResource_2609EE92_0534_8438_4193_1B0C310B7079",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_8_0.png",
   "width": 1080,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26092E98_0534_8428_417E_26CB33898190",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_9_0.png",
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
 "id": "AnimatedImageResource_26095E98_0534_8428_4170_F7CCCC7455B2",
 "levels": [
  {
   "url": "media/panorama_1D1AE23E_0553_FC68_4188_605472736D54_1_HS_10_0.png",
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
 "id": "AnimatedImageResource_260B3E99_0534_8428_4191_FC6E7AA13199",
 "levels": [
  {
   "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_2608DE99_0534_8428_4148_D089B606B5BB",
 "levels": [
  {
   "url": "media/panorama_1D1BDA00_055C_8C18_4184_90EFF8467140_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26F0EEA5_0534_8418_4147_FDB8569F7211",
 "levels": [
  {
   "url": "media/panorama_1CEDE816_055F_8C38_418E_7A08769A1A13_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F5BEAA_0534_8468_4181_70A5198C8EA0",
 "levels": [
  {
   "url": "media/panorama_1E4CEDA5_055D_8418_4183_369C273834FC_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E23EC2_0534_8418_418A_ADF82DAB88AE",
 "levels": [
  {
   "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E25EC3_0534_8418_4184_16E03EAD7340",
 "levels": [
  {
   "url": "media/panorama_1EB6ABAB_0554_8C68_4186_C9DBF4F397A7_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26F06EA4_0534_8418_4184_1CF004222AA9",
 "levels": [
  {
   "url": "media/panorama_1C4D6E71_055C_84F8_418F_0D6F411D32AF_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F0EEA4_0534_8418_4166_D7A3805414E5",
 "levels": [
  {
   "url": "media/panorama_1D9CB834_055D_8C78_4188_C5620981969B_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E7EEC5_0534_8418_418E_69EF9370179B",
 "levels": [
  {
   "url": "media/panorama_199039CD_0553_8C28_4183_39FD45DD7E5B_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F3AEA5_0534_8418_4133_741DE249A4A6",
 "levels": [
  {
   "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26F3CEA5_0534_8418_418C_E0F84545F43D",
 "levels": [
  {
   "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26F36EA6_0534_8418_4177_ED50EEB9F1F9",
 "levels": [
  {
   "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_6_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26F2BEA6_0534_8418_416C_ABBB4AAEF9C0",
 "levels": [
  {
   "url": "media/panorama_1CD24AA9_055C_8C68_4191_BC94FFD8707B_1_HS_7_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_260CCE9B_0534_8428_4186_39742F248D75",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_260C7E9B_0534_842F_4166_2DBDB4F14A67",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_9_0.png",
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
 "id": "AnimatedImageResource_260FBE9C_0534_8428_4194_8CFD29970F79",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_10_0.png",
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
 "id": "AnimatedImageResource_260F2E9C_0534_8426_4184_4D1887B8D7E3",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_11_0.png",
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
 "id": "AnimatedImageResource_260F4EA2_0534_8418_4184_2E5060C7DB90",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_12_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_260EFEA2_0534_8418_4191_A167FB5C4CA8",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_260E1EA2_0534_8418_4171_D635E3468BCC",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_13_0.png",
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
 "id": "AnimatedImageResource_26F1BEA3_0534_8418_4165_F5633084B782",
 "levels": [
  {
   "url": "media/panorama_1DA5CAB1_055C_8C78_4192_8D3680361B2B_1_HS_14_0.png",
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
 "id": "AnimatedImageResource_26E4CEC5_0534_8418_4151_B03D77B01F40",
 "levels": [
  {
   "url": "media/panorama_19F2FBBA_0554_8C68_418E_8D4EA62D1358_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F3BEA4_0534_8418_4193_2FE5FF181ED0",
 "levels": [
  {
   "url": "media/panorama_1C2F6B8C_055C_8C28_4155_74EF66BE50D4_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E52EC3_0534_8418_4192_016507CDE736",
 "levels": [
  {
   "url": "media/panorama_1E95A3C0_0555_BC18_4194_DA4706FB5836_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26E28EC2_0534_8418_4181_D7E53ACFB218",
 "levels": [
  {
   "url": "media/panorama_1EC76684_0557_8418_4152_AE2998805982_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F72EAD_0534_8468_417A_C570768B8F08",
 "levels": [
  {
   "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_0_0.png",
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
 "id": "AnimatedImageResource_26F6AEAE_0534_8468_4194_FC849FAD8743",
 "levels": [
  {
   "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_3_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26F62EAE_0534_8468_4154_9C95D2B5029B",
 "levels": [
  {
   "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_4_0.png",
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
 "id": "AnimatedImageResource_26F64EAE_0534_8468_418F_EA65742FDF6C",
 "levels": [
  {
   "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_5_0.png",
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
 "id": "AnimatedImageResource_26F98EAE_0534_8468_4195_9F8D5E270E9E",
 "levels": [
  {
   "url": "media/panorama_1FEFA0DB_0553_BC28_4193_9D00B678ECBA_1_HS_6_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26F22EA6_0534_8418_4181_76F450392FB1",
 "levels": [
  {
   "url": "media/panorama_1CBCCAFA_055C_8DE8_4193_CF6030F5D579_1_HS_1_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_2605BE90_0534_8438_4184_9B66CE8EFEFF",
 "levels": [
  {
   "url": "media/panorama_1D6A8C40_0555_8418_417B_8070C5C48340_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_2605CE90_0534_8438_4149_4A1D9DFFE520",
 "levels": [
  {
   "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_2_0.png",
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
 "id": "AnimatedImageResource_26056E90_0534_8438_4180_3309B6F3FA2F",
 "levels": [
  {
   "url": "media/panorama_1285406D_0555_9CE9_4175_CE9FE2F5A05C_1_HS_3_0.png",
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
 "id": "AnimatedImageResource_26FB3EB7_0534_8478_418A_CDB8FF0FEAEB",
 "levels": [
  {
   "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_1_0.png",
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
 "id": "AnimatedImageResource_26FAAEB7_0534_8478_4187_F00202846639",
 "levels": [
  {
   "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_6_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26FACEB8_0534_8468_4160_DE22E66F6830",
 "levels": [
  {
   "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_7_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26FA5EB8_0534_8468_416C_193CEBC5BC20",
 "levels": [
  {
   "url": "media/panorama_1E71347A_0554_84EB_418B_9D281A31772F_1_HS_8_0.png",
   "width": 800,
   "class": "ImageResourceLevel",
   "height": 1200
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_26E47EC5_0534_8418_4155_486205A65834",
 "levels": [
  {
   "url": "media/panorama_19A4ED49_0553_8428_4194_8459BC5F3186_1_HS_0_0.png",
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
 "id": "Container_9CD3B025_A9D4_E880_41E2_F7E2F968C434",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "id": "IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E",
 "left": 10,
 "maxHeight": 80,
 "horizontalAlign": "center",
 "width": 50,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "top": "40%",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": true,
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E_rollover.png",
 "bottom": "40%",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F, true, 0, this.effect_4B8711AA_571D_FDC6_41C4_8313D8AEEDC7, 'showEffect', false); this.setComponentVisibility(this.Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932, false, 0, this.effect_4D468A42_571D_AF46_41C4_8C8358C32FB0, 'hideEffect', false)",
 "iconURL": "skin/IconButton_9CD38025_A9D4_E880_41D1_CFAE07D5E00E.png",
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
 "id": "Image_9CD3E025_A9D4_E880_41D4_11D730D4859E",
 "left": "0%",
 "maxHeight": 1095,
 "horizontalAlign": "center",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "url": "skin/Image_9CD3E025_A9D4_E880_41D4_11D730D4859E.png",
 "minHeight": 30,
 "top": "0%",
 "verticalAlign": "top",
 "borderRadius": 0,
 "class": "Image",
 "propagateClick": true,
 "click": "this.openLink('https://grupodicon.com.pe/', '_blank')",
 "height": "25%",
 "minWidth": 40,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image Company"
 },
 "scaleMode": "fit_inside",
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Container_9CD3C025_A9D4_E880_41E1_AD77AD58C400",
  "this.HTMLText_9CD32025_A9D4_E880_41A7_906B4F276871",
  "this.HTMLText_E2793939_A975_D883_41E2_0D44CE4FC516",
  "this.IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7"
 ],
 "id": "Container_9CD3F025_A9D4_E880_41D0_0CEB8EB90ED5",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "bottom",
 "height": "40.997%",
 "minHeight": 1,
 "class": "Container",
 "propagateClick": true,
 "bottom": "0.75%",
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-FRAME footer"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
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
 "id": "Container_9CD30026_A9D4_E880_41C2_588F29082802",
 "left": "0%",
 "scrollBarOpacity": 0.15,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 6,
 "contentOpaque": false,
 "top": "29.43%",
 "borderRadius": 0,
 "verticalAlign": "middle",
 "minHeight": 1,
 "class": "Container",
 "propagateClick": true,
 "bottom": "38.68%",
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "-FRAME Menu P"
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
 "url": "https://maps.google.com/maps?output=embed&center=-12.1114542,-76.9821526&z=17&q=Av.+de+los+Precursores+166,+Santiago+de+Surco+15039",
 "minHeight": 1,
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "class": "WebFrame",
 "propagateClick": false,
 "backgroundColorRatios": [
  0
 ],
 "height": "100%",
 "minWidth": 1,
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
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "minHeight": 50,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "class": "IconButton",
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
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
 "class": "Container",
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
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
 "class": "Container",
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "header"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_3B00CABF_22CD_CA3F_415F_764A7C5A2749",
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
 "playbackBarHeadShadowVerticalLength": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBorderColor": "#000000",
 "propagateClick": false,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "99.975%",
 "minWidth": 1,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "progressHeight": 10,
 "progressBottom": 2,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
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
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "class": "ViewerArea",
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "click": "this.setComponentVisibility(this.ViewerAreaLabeled_74D0F5B2_6031_CE81_41D7_F8F2BFB6C1AB, true, 0, null, null, false)",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "paddingTop": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "paddingBottom": 0,
 "toolTipBorderColor": "#767676",
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
 "toolTipShadowSpread": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "PLANTA 303"
 }
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109"
 ],
 "id": "Container_3B00DABF_22CD_CA3F_41A4_282BCBFE84B2",
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
 "class": "Container",
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
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
  "this.IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90"
 ],
 "id": "Container_6105F3E2_22D4_DA41_4191_9FBF3AEA4258",
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
 "class": "Container",
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
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
  "this.IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70"
 ],
 "id": "Container_61058F4E_22D3_4A41_41AB_E291325EA4EE",
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
 "class": "Container",
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
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
  "this.IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B"
 ],
 "id": "Container_4DC46133_755E_020A_41C6_9CA46BC30A6D",
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
 "class": "Container",
 "propagateClick": false,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
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
 "id": "Container_9CD3C025_A9D4_E880_41E1_AD77AD58C400",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#5CA1DE"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "id": "HTMLText_9CD32025_A9D4_E880_41A7_906B4F276871",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": 86,
 "minHeight": 1,
 "class": "HTMLText",
 "propagateClick": true,
 "minWidth": 1,
 "click": "this.openLink('https://grupodicon.com.pe/', '_blank')",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>GRUPO DICON</U></I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>www.guopdicon.com.pe</U></I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>spazio@grupodicon.com.pe</U></I></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#f3a22e;font-size:14px;font-family:'Oswald Regular';\"><I><U>Cel.: 957 733 272</U></I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_E2793939_A975_D883_41E2_0D44CE4FC516",
 "scrollBarOpacity": 0.5,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": 45,
 "minHeight": 1,
 "class": "HTMLText",
 "propagateClick": true,
 "minWidth": 1,
 "click": "this.openLink('https://www.totem3d.com.pe/', '_blank')",
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:14px;font-family:'Oswald Regular';\"><I><U>Desarrollado por Totem 3D</U></I></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText47602"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "maxWidth": 80,
 "id": "IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7",
 "maxHeight": 80,
 "horizontalAlign": "center",
 "width": 42,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "borderRadius": 0,
 "height": 42,
 "transparencyActive": true,
 "mode": "push",
 "class": "IconButton",
 "propagateClick": true,
 "rollOverIconURL": "skin/IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7_rollover.png",
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_9CD39025_A9D4_E880_41E0_7BF4052E6C7F, false, 0, this.effect_618C5950_7067_14DB_41DB_D2CA7B61EE3C, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3A025_A9D4_E880_41B0_4FB63F9B8932, true, 0, this.effect_4C974746_571D_6541_41CE_76A308A87323, 'showEffect', false)",
 "iconURL": "skin/IconButton_9CD33026_A9D4_E880_41AA_1EEECBABBAA7.png",
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
 "id": "Container_9CD31026_A9D4_E880_41E2_04D648024641",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "click": "this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_3E7CF2C4_22DC_BA41_419E_A2775C3F15E4, 'hideEffect', false); if(!this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37.get('visible')){ this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, true, 0, this.effect_5F42DCC8_4F18_5100_41CB_F5BBF9EF1A1D, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_5F42ACC8_4F18_5100_41D2_9FAF67DDCB7B, 'hideEffect', false) }",
 "id": "Button_9CD36026_A9D4_E880_41B0_183896A978CD",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "\u00c1reas Com\u00fanes >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "BT AREAS COM"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 198,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-MENU AC"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD03026_A9D4_E880_41DB_64A7FE1BAD82",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "click": "if(!this.Container_9CD01026_A9D4_E880_41D5_222EAA683898.get('visible')){ this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, true, 0, this.effect_5B21267B_4F08_3100_41A1_F6699BEFB8F1, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_5B21667B_4F08_3100_41C7_3B45A9C1819F, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_4B7BDB89_753A_0606_419D_5F34AC1C5036, 'hideEffect', false)",
 "id": "Button_9CD00026_A9D4_E880_41D1_857DB344AF1E",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Departamento 701 >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "BT DPTO 701"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
 "children": [
  "this.Container_9CD06026_A9D4_E880_41B5_0315CEA5609B",
  "this.Container_9CD07026_A9D4_E880_41A4_E246B962EC85",
  "this.Button_3141E223_2275_75C7_41BE_0A68E3642997",
  "this.Button_30B87DAA_224D_CEC1_41B1_B2FBFF6CFF8A",
  "this.Button_9CD04026_A9D4_E880_41E3_F403655C131D",
  "this.Button_9CD05026_A9D4_E880_41CF_399BA66B2C2B",
  "this.Button_9CD1B026_A9D4_E880_41C5_D6513C9E39C5",
  "this.Button_9CD18026_A9D4_E880_41C7_8D09F066D5A5",
  "this.Button_9CD19026_A9D4_E880_4185_91A690ADE787",
  "this.Button_9CD31027_A9D4_E880_41C5_F1EB4C316B8B",
  "this.Button_9CD36027_A9D4_E880_41CD_7490BCEB0D31",
  "this.Button_E8BB4335_A9CD_A883_41D8_7B15C59E6C5F",
  "this.Button_E8C76929_A9CC_5880_41DD_614FFCEEF598",
  "this.Button_95528198_A9CC_AB81_41BE_6D8F4B17CB8C",
  "this.Button_968F942B_A9CC_A887_41C9_B456228D301A",
  "this.Button_EA8B0EA7_A9CC_D98F_41D2_AFFD875E7B45"
 ],
 "id": "Container_9CD01026_A9D4_E880_41D5_222EAA683898",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-MENU 701"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD37027_A9D4_E880_41E2_426E8728566A",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "click": "if(!this.Container_31C72787_2257_5ACF_41A0_ABDC47157625.get('visible')){ this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, true, 0, this.effect_3FB7420B_22F7_D5C7_4198_CD44E66661AC, 'showEffect', false) } else { this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_3FB7720B_22F7_D5C7_4174_D5879CC918C1, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_358AEAE7_753A_0609_41AD_E70825F2EC00, 'hideEffect', false)",
 "id": "Button_360243EB_225F_7A47_415A_A95B4DA19C34",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Departamento 604 >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "BT DPTO 604"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_31C72787_2257_5ACF_41A0_ABDC47157625",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-MENU 604"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_3663E2CC_2253_BA41_419B_E53DCBB14090",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "horizontalAlign": "left",
 "click": "if(!this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E.get('visible')){ this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, true, 0, this.effect_3F3D415A_22F5_B641_4176_C13E8BC46385, 'showEffect', false) } else { this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_3F3D515A_22F5_B641_41AF_472A74851EFD, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_48ECC6C6_7536_0E0B_41B1_DF981C1ED415, 'hideEffect', false)",
 "id": "Button_317EE473_225C_DE47_41AC_BD4F5B413F22",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Departamento 303 >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "BT DPTO 303"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_36706DA7_224C_CECF_41BB_3353556CEE8E",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-MENU 303"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_36408520_2253_5FC1_41BD_2CAF593C92E8",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "horizontalAlign": "left",
 "click": "if(!this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754.get('visible')){ this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, true, 0, this.effect_4614A88C_7576_021E_41C6_F0C9ED5051FA, 'showEffect', false) } else { this.setComponentVisibility(this.Container_5AAA9085_755A_020E_41B1_B24DD7A8C754, false, 0, this.effect_4614B88C_7576_021E_41D2_418BC89D7577, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_31C72787_2257_5ACF_41A0_ABDC47157625, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_36706DA7_224C_CECF_41BB_3353556CEE8E, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_46498381_7576_0606_41CD_118CDFEBC494, 'hideEffect', false)",
 "id": "Button_4544DB06_755A_060A_41C6_B54CDC3ACBF9",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Departamento 301 >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "BT DPTO 301"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_5AAA9085_755A_020E_41B1_B24DD7A8C754",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-MENU 301"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_451A8030_755E_0207_41D4_C58A86D88DA1",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, this.effect_EE95F0BB_A954_A980_41D2_48DAD5E5964F, 'showEffect', false)",
 "id": "Button_9CD01027_A9D4_E880_41E3_746447337ABD",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ubicaci\u00f3n >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "BT UBICACION"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-Level 4-1"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "horizontalAlign": "left",
 "click": "if(!this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B.get('visible')){ this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, true, 0, this.effect_59CA1A81_4F08_D101_41D2_30683CB5E100, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_59CA3A81_4F08_D101_41D3_0462DF8FB066, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_47C93ED9_547A_F0A1_41BB_B178B1BD72E3, 'hideEffect', false)",
 "id": "Button_9CD35027_A9D4_E880_41E0_F5E34C0E852C",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "SWIMMING POOL >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button 5 - Swimming"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-Level 5-1"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD01028_A9D4_E880_41D3_8BBE44B2275E",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "horizontalAlign": "left",
 "click": "if(!this.Container_9CD04028_A9D4_E880_41E0_25650AB19114.get('visible')){ this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, true, 0, this.effect_5AFDA1C9_4F08_5301_41A5_258F6E1B7A4F, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_5AFD81C9_4F08_5301_41C3_9093DB61A2A7, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_40C6B60E_5466_F3A3_41CA_60FB6F4CFE38, 'hideEffect', false)",
 "id": "Button_9CD06028_A9D4_E880_41D0_4C2E09848B30",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "RESTAURANTS >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button 6 - Restaurants"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD07028_A9D4_E880_41CE_4356F9ED825B",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "data": {
  "name": "line"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "layout": "absolute"
},
{
 "scrollBarMargin": 10,
 "horizontalAlign": "left",
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
 "id": "Container_9CD04028_A9D4_E880_41E0_25650AB19114",
 "scrollBarOpacity": 0,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 7,
 "contentOpaque": false,
 "borderRadius": 0,
 "verticalAlign": "middle",
 "height": 200,
 "minHeight": 1,
 "creationPolicy": "inAdvance",
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 0,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "-Level 6-1"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "layout": "vertical"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "horizontalAlign": "left",
 "click": "if(!this.Container_9CD01026_A9D4_E880_41D5_222EAA683898.get('visible')){ this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, true, 0, this.effect_31B8AD71_225D_4E40_41B2_AE1A588E7B72, 'showEffect', false) } else { this.setComponentVisibility(this.Container_9CD01026_A9D4_E880_41D5_222EAA683898, false, 0, this.effect_31B8DD71_225D_4E40_41A5_240011E92082, 'hideEffect', false) }; this.setComponentVisibility(this.Container_9CD37026_A9D4_E880_41C8_D1D8FE0DEF37, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD3E027_A9D4_E880_41E2_245F58BDB9B2, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD0A027_A9D4_E880_41BD_BEE48D6CE75B, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false); this.setComponentVisibility(this.Container_9CD04028_A9D4_E880_41E0_25650AB19114, false, 0, this.effect_31B87D71_225D_4E40_41BD_D20390538720, 'hideEffect', false)",
 "id": "Button_31B15D9B_225D_4EC7_417F_E22820A51F95",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 50,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "toggle",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Departamento 602 >",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#5CA1DE"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "BT DPTO X"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 0,
 "shadow": false,
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_44418E8E_755A_1E1A_41D2_8AF3852C0DC7",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "height": "36.14%",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
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
 "pressedRollOverIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_pressed_rollover.jpg",
 "pressedIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_7F1D91CE_60D0_469D_41A4_CACD69224F0A_rollover.jpg",
 "height": "36.14%",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, false, 0, null, null, false)",
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
 "maxWidth": 60,
 "id": "IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109",
 "maxHeight": 60,
 "horizontalAlign": "right",
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109_rollover.jpg",
 "height": "36.14%",
 "minWidth": 50,
 "iconURL": "skin/IconButton_3B00FABF_22CD_CA3F_41A7_9C5EDC3D4109.jpg",
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
 "id": "IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90",
 "maxHeight": 60,
 "horizontalAlign": "right",
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90_rollover.jpg",
 "height": "36.14%",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_610403E3_22D4_DA47_41A4_830DC852C065, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_6105E3E2_22D4_DA41_41B1_67425515AC90.jpg",
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
 "id": "IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70",
 "maxHeight": 60,
 "horizontalAlign": "right",
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70_rollover.jpg",
 "height": "36.14%",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_6105BF4F_22D3_4A5F_41B3_150B31A58B70.jpg",
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
 "id": "IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B",
 "maxHeight": 60,
 "horizontalAlign": "right",
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "pressedIconURL": "skin/IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B_pressed.jpg",
 "minHeight": 50,
 "top": 20,
 "verticalAlign": "top",
 "borderRadius": 0,
 "mode": "push",
 "class": "IconButton",
 "transparencyActive": false,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B_rollover.jpg",
 "height": "36.14%",
 "minWidth": 50,
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_4DC44133_755E_020A_41D9_F6B1C0E23E9B.jpg",
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
 "id": "Container_9CD34026_A9D4_E880_41C0_ADF60C34D581",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD35026_A9D4_E880_41E0_043F2006F875",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_189660B6_05F4_9C78_4131_86B6AE7DA294, 40.40816326530612, 11.020408163265309);; this.mainPlayList.set('selectedIndex', 0)",
 "id": "Button_9CD0A026_A9D4_E880_41DA_2A056A8841CA",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Fachada Vista 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Fach V1"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_1889A0B6_05F4_9C78_417E_8FCC22831185, -39.48979591836735, 3.673469387755102);; this.mainPlayList.set('selectedIndex', 1)",
 "id": "Button_9CD08026_A9D4_E880_41C5_FED95C751747",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Fachada Vista 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Fach V2"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_188980B6_05F4_9C78_4149_62A27DDF445E, -129.48979591836735, -46.83673469387755);; this.mainPlayList.set('selectedIndex', 2)",
 "id": "Button_9CD09026_A9D4_E880_41D9_C010E68FE3B4",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Fachada Vista 3",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "pressedLabel": "Reception",
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Fach V3"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_1889C0B6_05F4_9C78_4185_E2D2481349DA, 171.73469387755102, -45);; this.mainPlayList.set('selectedIndex', 3)",
 "id": "Button_9CD0E026_A9D4_E880_4190_6287BB5AC208",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Fachada Vista 4",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Fach V4"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_188900B6_05F4_9C78_4188_87C756B8648E, 0, 0);; this.mainPlayList.set('selectedIndex', 4)",
 "id": "Button_9CD0F026_A9D4_E880_41BB_FCA355718613",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Recepci\u00f3n",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Recep"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_188940B6_05F4_9C78_4187_691256DE4A47, 0, 0);; this.mainPlayList.set('selectedIndex', 6)",
 "id": "Button_9CD0C026_A9D4_E880_41CD_A682DDB9A23F",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Coworking",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Coworking"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_1888B0B6_05F4_9C78_418F_F36B70A7F4A2, 0, 0);; this.mainPlayList.set('selectedIndex', 7)",
 "id": "Button_9CD0D026_A9D4_E880_41E3_8672AE3BD791",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Patio Vista 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Patio 1"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_1888E0B6_05F4_9C78_418E_77A4EF708031, 0, 0);; this.mainPlayList.set('selectedIndex', 8)",
 "id": "Button_9CD02026_A9D4_E880_41A1_C787E34AC5D5",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Patio Vista 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Patio 2"
 },
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
 "click": "this.setPanoramaCameraWithSpot(this.PanoramaPlayListItem_188820B6_05F4_9C78_4190_E609D9E242C4, 0, 0);; this.mainPlayList.set('selectedIndex', 9)",
 "id": "Button_912D519A_A9F5_AB80_41C6_6108114715E5",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Patio Vista 3",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Patio 3"
 },
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
 "id": "Container_9CD06026_A9D4_E880_41B5_0315CEA5609B",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Button_315E7D4C_2274_CE41_41B0_138070189229"
 ],
 "id": "Container_9CD07026_A9D4_E880_41A4_E246B962EC85",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "id": "Button_3141E223_2275_75C7_41BE_0A68E3642997",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta 1er Piso",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 1"
 },
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
 "click": "this.setComponentVisibility(this.Container_7F4F0784_60CF_CA8C_41AE_225DD41A619A, true, 0, null, null, false)",
 "id": "Button_30B87DAA_224D_CEC1_41B1_B2FBFF6CFF8A",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta 2do Piso",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 2"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "id": "Button_9CD04026_A9D4_E880_41E3_F403655C131D",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 11)",
 "id": "Button_9CD05026_A9D4_E880_41CF_399BA66B2C2B",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Sala",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Sala"
 },
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
 "id": "Button_9CD1B026_A9D4_E880_41C5_D6513C9E39C5",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Cocina",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Cocina"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 21)",
 "id": "Button_9CD18026_A9D4_E880_41C7_8D09F066D5A5",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o de Visita 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHV1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 15)",
 "id": "Button_9CD19026_A9D4_E880_4185_91A690ADE787",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm P"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 16)",
 "id": "Button_9CD31027_A9D4_E880_41C5_F1EB4C316B8B",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHP"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 17)",
 "id": "Button_9CD36027_A9D4_E880_41CD_7490BCEB0D31",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 18)",
 "id": "Button_E8BB4335_A9CD_A883_41D8_7B15C59E6C5F",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S2"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 20)",
 "id": "Button_E8C76929_A9CC_5880_41DD_614FFCEEF598",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Familiar",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHF"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 22)",
 "id": "Button_95528198_A9CC_AB81_41BE_6D8F4B17CB8C",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Estar",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Estar"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 24)",
 "id": "Button_968F942B_A9CC_A887_41C9_B456228D301A",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o de Visita 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHV2"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 23)",
 "id": "Button_EA8B0EA7_A9CC_D98F_41D2_AFFD875E7B45",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Terraza",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Terraza"
 },
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
 "id": "Container_36CFA4C8_2257_5E41_41C0_1BE17A92F888",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Button_36CF64C9_2257_5E43_4190_E70C3E8F6988"
 ],
 "id": "Container_36CF44C9_2257_5E43_41C0_1568DA462072",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_610403E3_22D4_DA47_41A4_830DC852C065, true, 0, null, null, false)",
 "id": "Button_31577500_2257_5FC1_41B9_83551C79DC76",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta 1er Piso",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 1"
 },
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
 "click": "this.setComponentVisibility(this.Container_61055F4F_22D3_4A5F_41B0_B336A7C432A2, true, 0, null, null, false)",
 "id": "Button_3153C501_2257_5FC3_41A7_E387491247AD",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta 2do Piso",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 2"
 },
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
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, true, 0, null, null, false)",
 "id": "Button_E8EBA427_FFD8_81CD_41E6_617603032F34",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta 3er Piso",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 3"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 26)",
 "id": "Button_31538501_2257_5FC3_41B3_35696BC8B542",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 27)",
 "id": "Button_3152B512_2257_5FC1_4186_23DFA5AD5D98",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Sala",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Sala"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 28)",
 "id": "Button_3124A534_2257_5FC1_41C0_632A1728AED4",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Cocina",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Cocina"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 35)",
 "id": "Button_311C2576_2257_5E41_4184_ED2B637EFC4C",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 34)",
 "id": "Button_E63073A4_FFF8_86C3_41EF_DE380E045C77",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Principal 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHP1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 44)",
 "id": "Button_313D5545_2257_5E43_41BC_35AE66F68721",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o de Visita",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHV1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 40)",
 "id": "Button_31CE1597_2257_5ECF_4198_A9A6DFA31D4B",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Familiar 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHF"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 37)",
 "id": "Button_E3A5EE60_FFC8_9E42_41C6_3C5B2F7090FD",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Estudio",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Estudio"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 33)",
 "id": "Button_31353555_2257_5E43_415A_73B917A3856E",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm P"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 42)",
 "id": "Button_310E7565_2257_5E43_4199_05FEC1A3139A",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Principal 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHP"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 36)",
 "id": "Button_31E46587_2257_5ECF_41B1_BCAAF47ED3E8",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S2"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 38)",
 "id": "Button_31D2C5A6_2257_5EC1_41B7_2CD05247055D",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Gym",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Gym"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 39)",
 "id": "Button_E07C6918_FFC9_83C3_41E9_B663BA7159F7",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Juegos",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Juegos"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 43)",
 "id": "Button_31B6C5C9_2257_5E43_41B6_668177E164FC",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Familiar 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHF2"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 45)",
 "id": "Button_31993600_2257_5DC1_419A_B92667302B10",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Terraza",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Terraza"
 },
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
 "id": "Container_3620EB18_224C_CBC1_41B7_3F7DC3BF5CE6",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Button_36212B18_224C_CBC1_41AA_A96985F948DA"
 ],
 "id": "Container_3620CB18_224C_CBC1_41B0_3620C822F179",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "id": "Button_36276B29_224C_CBC3_41BF_51A2A8146367",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 26)",
 "id": "Button_36279B2B_224C_CBC7_41B6_504741500C03",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 27)",
 "id": "Button_36289B3C_224C_CBC1_41BC_51C7329F10F9",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Sala",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Sala"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 28)",
 "id": "Button_362FFB5C_224C_CA41_41B4_0C64EB0549C4",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Cocina",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Cocina"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 40)",
 "id": "Button_36159B6C_224C_CA41_4190_8DE108AD8FA8",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Familiar",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SH1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 33)",
 "id": "Button_361D3B7D_224C_CA43_41A2_6D6B22857FC1",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm P"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 34)",
 "id": "Button_36067B8D_224C_CAC3_41BC_3B98161B3A64",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SH2"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 35)",
 "id": "Button_360DFB9D_224C_CAC3_419B_394422BBA5F5",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 36)",
 "id": "Button_36F77BAD_224C_CAC3_41A3_DE0BA661EABA",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S2"
 },
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
 "id": "Container_5A6CCFEE_755A_FE1A_41D8_9AD593DE46F7",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "children": [
  "this.Button_5A6DCFEF_755A_FE1A_41CB_C8B7206FAC1E"
 ],
 "id": "Container_5A6C8FEF_755A_FE1A_41CC_D2D1B4DAC993",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "click": "this.setComponentVisibility(this.Container_4DC45133_755E_020A_41CF_F8920040CCCD, true, 0, null, null, false)",
 "id": "Button_5A916FF6_755A_FE0A_41C1_857A4C5FCD4B",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Planta",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Planta 1"
 },
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
 "id": "Button_5A912FF7_755A_FE0A_41CB_BDC3416970BB",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Sala Comedor",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Sala Comedor"
 },
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
 "id": "Button_5A96DFFD_755A_FDFE_41D5_CFDB04B2DA20",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Sala",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Sala"
 },
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
 "id": "Button_404FDCEC_754A_021F_41B5_3FDD01E5AC62",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor"
 },
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
 "id": "Button_5A948003_755A_020A_41D3_84D25E389367",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Cocina",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Cocina"
 },
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
 "id": "Button_5A952009_755A_0206_41D0_7D29AA6FE8A0",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o de Visita",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SHV"
 },
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
 "id": "Button_5A9BE00F_755A_0219_41D8_772C963525B3",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm P"
 },
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
 "id": "Button_5A99A014_755A_020F_41CA_0EDF54CF3DBD",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Principal",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SH2"
 },
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
 "id": "Button_5A9E601B_755A_023A_41C6_7C549606655F",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 1",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S1"
 },
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
 "id": "Button_4FC70A82_755A_060A_419E_5B870252C28C",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Dormitorio Secundario 2",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Dorm S2"
 },
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
 "id": "Button_5A9C1020_755A_0207_41DB_7AA8184A816C",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Ba\u00f1o Familiar",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt SH1"
 },
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
 "id": "Container_9CD3F027_A9D4_E880_41D4_892075911F85",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD3C027_A9D4_E880_41D5_63EDE88AAF06",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "id": "Button_9CD3D027_A9D4_E880_41D5_F837EB94A381",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 1"
 },
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
 "id": "Button_9CD32027_A9D4_E880_41E0_E10FD94119D0",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 2"
 },
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
 "id": "Button_9CD33027_A9D4_E880_4173_FD48FB97A7AA",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "pressedLabel": "Lorem Ipsum",
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 3"
 },
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
 "id": "Button_9CD30027_A9D4_E880_41CE_7C2088BA98D2",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 4"
 },
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
 "id": "Button_9CD31027_A9D4_E880_41E2_8AFD4FBFA44C",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 5"
 },
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
 "id": "Button_9CD36027_A9D4_E880_41A4_CCE7D3A3F4D5",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 6"
 },
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
 "id": "Button_9CD37027_A9D4_E880_4195_DCD9C59F3EBA",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 7"
 },
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
 "id": "Button_9CD34027_A9D4_E880_41E2_B1AFC0760851",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 8"
 },
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
 "id": "Container_9CD0B028_A9D4_E880_41C6_59030722B1FD",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD08028_A9D4_E880_419B_D4B7D146E006",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "id": "Button_9CD09028_A9D4_E880_41D0_EC0889905F29",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 1"
 },
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
 "id": "Button_9CD0E028_A9D4_E880_41BA_378B02116016",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 2"
 },
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
 "id": "Button_9CD0F028_A9D4_E880_41E4_1C7D6FB9C0ED",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "pressedLabel": "Lorem Ipsum",
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 3"
 },
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
 "id": "Button_9CD0C028_A9D4_E880_41DF_0F4D009D7A77",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 4"
 },
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
 "id": "Button_9CD0D028_A9D4_E880_41C4_1E5FE147A317",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 5"
 },
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
 "id": "Button_9CD02028_A9D4_E880_41D3_059E304AF133",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 6"
 },
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
 "id": "Button_9CD03028_A9D4_E880_41C9_B460A7D99228",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 7"
 },
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
 "id": "Button_9CD00028_A9D4_E880_41D8_B85E81688F45",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 8"
 },
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
 "id": "Container_9CD05028_A9D4_E880_41C7_437DAE4713DD",
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
 "class": "Container",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "id": "Container_9CD1A028_A9D4_E880_4198_49E0DFF905CB",
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
 "class": "Container",
 "propagateClick": true,
 "minWidth": 1,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "scroll",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "line separator"
 },
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "layout": "absolute"
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.3,
 "horizontalAlign": "left",
 "id": "Button_9CD1B028_A9D4_E880_41BB_66F1F0879D95",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
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
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 1"
 },
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
 "id": "Button_9CD18028_A9D4_E880_41D9_30B0C63CD78A",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 23,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 2"
 },
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
 "id": "Button_9CD19028_A9D4_E880_41E1_C01EFCEB3555",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "pressedLabel": "Lorem Ipsum",
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 3"
 },
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
 "id": "Button_9CD1E028_A9D4_E880_41BD_5BA3C12FC7AB",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 4"
 },
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
 "id": "Button_9CD1F028_A9D4_E880_41D6_F9975557DC3D",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 5"
 },
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
 "id": "Button_9CD37028_A9D4_E880_41AB_4B88BE5E1240",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 6"
 },
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
 "id": "Button_9CD34028_A9D4_E880_41E4_5C45CE4FA7B4",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 7"
 },
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
 "id": "Button_9CD35028_A9D4_E880_41DC_5CD4AC7F900A",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "width": "100%",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 36,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Lorem Ipsum",
 "borderColor": "#000000",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Button text 8"
 },
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
 "id": "Button_315E7D4C_2274_CE41_41B0_138070189229",
 "left": "0%",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "rollOverShadow": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "borderColor": "#000000",
 "bottom": "-350%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor Vista 1",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "id": "Button_36CF64C9_2257_5E43_4190_E70C3E8F6988",
 "left": "0%",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "rollOverShadow": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "borderColor": "#000000",
 "bottom": "-350%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor Vista 1",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "id": "Button_36212B18_224C_CBC1_41AA_A96985F948DA",
 "left": "0%",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "rollOverShadow": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "borderColor": "#000000",
 "bottom": "-350%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor Vista 1",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
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
 "click": "this.mainPlayList.set('selectedIndex', 10)",
 "id": "Button_5A6DCFEF_755A_FE1A_41CB_C8B7206FAC1E",
 "left": "0%",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "fontFamily": "Oswald",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "iconHeight": 32,
 "rollOverShadow": false,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 1,
 "layout": "horizontal",
 "borderRadius": 0,
 "shadowColor": "#000000",
 "verticalAlign": "middle",
 "height": 36,
 "iconBeforeLabel": true,
 "mode": "push",
 "class": "Button",
 "propagateClick": true,
 "borderColor": "#000000",
 "bottom": "-350%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "label": "Comedor Vista 1",
 "fontSize": 18,
 "fontStyle": "italic",
 "rollOverBackgroundColor": [
  "#000000"
 ],
 "width": "100%",
 "paddingTop": 0,
 "gap": 5,
 "paddingBottom": 0,
 "data": {
  "name": "Bt Comedor 1"
 },
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "rollOverShadowBlurRadius": 18,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "backgroundColorDirection": "vertical",
 "fontWeight": "normal"
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
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
