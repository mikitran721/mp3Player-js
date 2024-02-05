/** clone from EVONDEV */

const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
let isPlaying = true;
const musics = [
  "cohuong-up.m4a",
  "YuGang-TruongXuan.m4a",
  "Zhongguo李玉刚华夏温暖入心.mp3",
  "绕ㅡ李玉刚.mp3",
];
let indexSong = 0;

song.setAttribute("src", `./music/${musics[indexSong]}`);

nextBtn.addEventListener("click", function () {
  changeSong(1);
});

prevBtn.addEventListener("click", function () {
  changeSong(-1);
});

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
  } else {
    song.pause();
    isPlaying = true;
    playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
  }
}
