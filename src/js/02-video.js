// import Vimeo from '@vimeo/player';
import Player from '@vimeo/player';
import { throttle } from 'lodash';
// import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_STORAGE_KEY = 'videoplayer-current-time';
const throttledTimeupdate = throttle(onGetCurrentTime, 1000);
function onGetCurrentTime() {
  player
    .getCurrentTime()
    .then(function (seconds) {
      localStorage.setItem(LOCAL_STORAGE_KEY, seconds);
      console.log(seconds);
    })
    .catch(function (error) {
      console.log(error);
    });
}
player.on('timeupdate', throttledTimeupdate);
const currentTime = localStorage.getItem(LOCAL_STORAGE_KEY);
player
  .setCurrentTime(currentTime)
  .then(function (seconds) {
    seconds = currentTime;
  })
  .catch(function (error) {
    console.log(error);
  });
player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
