var vid, playBtn, seekslider, curTimeText, durTimeText, muteBtn, volumeSlider, fullScreenBtn, progressBar, progressBarContainer, controlsWrapper ;

function initializePlayer(){
//Objuect references 
vid = document.getElementById("video");
playBtn = document.getElementById("play-pause-btn");
seekslider = document.getElementById("seek-slider");
curTimeText =  document.getElementById("current-time-text");
durTimeText =  document.getElementById("duration-time-text");
muteBtn =  document.getElementById("volume-mute-btn");
volumeSlider =  document.getElementById("volume-slider");
fullScreenBtn =  document.getElementById("full-screen-btn");
progressBar = 	document.getElementById("pbar");
progressBarContainer = 	document.getElementById("pbar-container");
controlsWrapper = 	document.getElementById("video-controls-wrapper");
	
// Add event listiner. this will make the code run once its cliked,
playBtn.addEventListener("click",playPause, false);
seekslider.addEventListener("change",vidSeek, false);
vid.addEventListener("timeupdate",seekTimeUpdate, false);
muteBtn.addEventListener("click",vidMute, false);
volumeSlider.addEventListener("change",setVolume, false);
fullScreenBtn.addEventListener("click",toggleFullScreen, false);
progressBarContainer.addEventListener("click", skip, false);

}

window.onload = initializePlayer;

function playPause(){
	if (vid.paused) {
			vid.play();
		playBtn.style.background ="url(icons/pause-icon.png)";
		var update = setInterval(udatePlayer, 30);
	}
	else{		
		vid.pause();
		playBtn.style.background ="url(icons/play-icon.png)";	
		window.clearInterval(update);	
	}
}

function vidSeek() {
	var seekto = vid.duration * (seekslider.value / 100);
	vid.currentTime = seekto;
}

function seekTimeUpdate() {
		var nt = vid.currentTime * (100 / vid.duration);
		seekslider.value = nt;

		var curmins = Math.floor(vid.currentTime / 60);
		var cursecs = Math.floor(vid.currentTime - curmins * 60);
		var durmins = Math.floor(vid.duration / 60);
		var dursecs = Math.floor(vid.duration - durmins * 60);

		if (cursecs < 10) {cursecs = "0"+cursecs}
		if (dursecs < 10) {dursecs = "0"+dursecs}
		if (curmins < 10) {curmins = "0"+curmins}
		if (durmins < 10) {durmins = "0"+durmins}

		curTimeText.innerHTML = curmins+":"+cursecs;
		durTimeText.innerHTML = durmins+":"+dursecs;
}

function vidMute() {
		if (vid.muted) {
			vid.muted = false;
		muteBtn.style.background ="url(icons/volume-on-icon.png)";
		volumeSlider.value= 100;
	}
	else{		
		vid.muted = true;
		muteBtn.style.background ="url(icons/volume-off-icon.png)";	
		volumeSlider.value = 0;	
	}
}

function setVolume(){
	vid.volume = volumeSlider.value / 100;

}

function toggleFullScreen() {

	if (vid.requestFullScreen) {
		vid.requestFullScreen();
	}
		else if(vid.webkitRequestFullScreen) {
		vid.webkitRequestFullScreen();
	}
	else if(vid.mozRequestFullScreen) {
		vid.mozRequestFullScreen();
	}
}

function udatePlayer() {
	var percentage = (vid.currentTime / vid.duration)*100;
	progressBar.style.width = percentage + "%";
	if (vid.ended){
			playBtn.style.background ="url(icons/play-icon.png)";	
	}

}

function skip(ev) {
	var mouseX = ev.pageX - progressBarContainer.offsetLeft;
	var width = window.getComputedStyle(progressBarContainer).getPropertyValue("width");
	width = parseFloat(width.substr(0, width.length - 2));
	vid.currentTime = (mouseX/width) * vid.duration;
	udatePlayer();
		if (vid.ended) {
		window.clearInterval(update);

	}
}









