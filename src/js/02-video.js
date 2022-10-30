import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
    // console.log(iframe);

const player = new Vimeo.Player(iframe);
const STORAGE_KEY = "videoplayer-current-time";

    player.on('play', function() {
        console.log('played the video!');
    });

    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });

const onPlay = throttle((data) => {
    localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000)
player.on('timeupdate', onPlay);
    
player.setCurrentTime(STORAGE_KEY).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
    }
});

player.on("loaded", function () {
        if (localStorage.getItem(STORAGE_KEY)) {
            player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
        }
    });






