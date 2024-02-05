/** clone from EVONDEV */

const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
// timer
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");

let isPlaying = true;
const musics = [
  "cohuong-up.m4a",
  "YuGang-TruongXuan.m4a",
  "Zhongguo李玉刚华夏温暖入心.mp3",
  "绕ㅡ李玉刚.mp3",
];
let indexSong = 0;

displayTimer();
// hien thi time chay nhac
// let timer = setInterval(displayTimer, 500);
let timer;
song.setAttribute("src", `./music/${musics[indexSong]}`);

nextBtn.addEventListener("click", function () {
  changeSong(1);
});

prevBtn.addEventListener("click", function () {
  changeSong(-1);
});

// next song when ending
song.addEventListener("ended", handleEndedSong);

function handleEndedSong() {
  changeSong(1);
}
//function changeSong
function changeSong(dir) {
  if (dir === 1) {
    // next song
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  } else if (dir === -1) {
    // prev song
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  song.setAttribute("src", `./music/${musics[indexSong]}`);
  playPause();
}

playBtn.addEventListener("click", playPause);

function playPause() {
  if (isPlaying) {
    song.play();
    isPlaying = false;
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    timer = setInterval(displayTimer, 500);
  } else {
    song.pause();
    isPlaying = true;
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
    clearInterval(timer);
  }
}

// timer function
function displayTimer() {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  remainingTime.textContent = formatTimer(currentTime);
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
}

// format number
function formatTimer(number) {
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}

//change rangeBar
rangeBar.addEventListener("change", handleChangeBar);
function handleChangeBar() {
  // rangeBar.value = song.currentTime;
  song.currentTime = rangeBar.value;
}
