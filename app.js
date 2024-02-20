/** clone from EVONDEV */

const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
// timer
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false; //0:binh thuong; 1:repeat;
const musics1 = [
  "cohuong-up.m4a",
  "YuGang-TruongXuan.m4a",
  "Zhongguo李玉刚华夏温暖入心.mp3",
  "绕ㅡ李玉刚.mp3",
];

const musics = [
  {
    id: 1,
    title: "Cố hương 《故乡》",
    file: "cohuong-up.m4a",
    image:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Trường Xuân",
    file: "YuGang-TruongXuan.m4a",
    image:
      "https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
/**
 * Music
 * id:1
 * title: cohuong
 * file: cohuong.mp3
 * image: unsplash
 */

displayTimer();
// hien thi time chay nhac
// let timer = setInterval(displayTimer, 500);
let timer;
let repeatCount = 0;

playRepeat.addEventListener("click", function () {
  // console.log("isRepeat", isRepeat);
  if (!isRepeat) {
    //false
    playRepeat.style.color = "#ffb86c";
    isRepeat = true;
  } else {
    //true
    // repeatCount = 1;
    playRepeat.removeAttribute("style");
    isRepeat = false;
  }
});

nextBtn.addEventListener("click", function () {
  changeSong(1);
});

prevBtn.addEventListener("click", function () {
  changeSong(-1);
});

// next song when ending
song.addEventListener("ended", handleEndedSong);

function handleEndedSong() {
  repeatCount++;
  if (isRepeat && repeatCount === 1) {
    //handle repeat
    isPlaying = true;
    playPause();
  } else {
    changeSong(1);
  }
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
  init(indexSong);
  // song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
}

playBtn.addEventListener("click", playPause);

function playPause() {
  if (isPlaying) {
    musicThumbnail.classList.add("is-playing");
    song.play();
    isPlaying = false;
    playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
    timer = setInterval(displayTimer, 500);
  } else {
    musicThumbnail.classList.remove("is-playing");
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

// function Initiation - load nhac hien tai
function init(indexSong) {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);
