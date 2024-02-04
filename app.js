const song = document.getElementById("song");
const playBtn = document.querySelector(".play-inner");
let isPlaying = true;

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
