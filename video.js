const video = document.getElementById('myVideo');
const progress = document.querySelector('.progress');
const timeDisplay = document.querySelector('.time-display');
const volumeSlider = document.querySelector('.volume-slider');
const seekBar = document.querySelector('.seek-bar');
const controls = document.getElementById('controls');

function togglePlay() {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
}

function togglePause() {
    video.pause();
}

function skip(value) {
    video.currentTime += value;
}

function seek(value) {
    const newTime = (value / 100) * video.duration;
    video.currentTime = newTime;
}

function setVolume(value) {
    video.volume = value / 100;
}

function updateProgress() {
    const value = (video.currentTime / video.duration) * 100;
    progress.style.width = value + '%';
    updateDisplayTime();
}

function updateDisplayTime() {
    const currentTime = formatTime(video.currentTime);
    const duration = formatTime(video.duration);
    timeDisplay.textContent = `${currentTime} / ${duration}`;
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleFullscreen() {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

video.addEventListener('timeupdate', updateProgress);
video.addEventListener('ended', () => controls.classList.remove('hidden'));
video.addEventListener('play', () => controls.classList.remove('hidden'));
video.addEventListener('pause', () => controls.classList.remove('hidden'));

seekBar.addEventListener('mousedown', () => controls.classList.add('hidden'));
seekBar.addEventListener('mouseup', () => controls.classList.remove('hidden'));

controls.addEventListener('mouseenter', () => controls.classList.remove('hidden'));
controls.addEventListener('mouseleave', () => controls.classList.add('hidden'));