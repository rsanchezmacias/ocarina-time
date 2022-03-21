
/*
Mapping of Nintendo keys to my keys:
    - DOWN: G
    - LEFT: S
    - RIGHT: A
    - UP: F
    - A: D
*/

const MUSIC_PATTERNS = {
    "sariasSong": "GASGAS",
    "timeSong": "ADGADG",
    "preludeOfLight": "FAFASF",
    "requiemOfSpirit": "DGDAGD",
    "songOfStorms": "DGFDGF",
    "sunsSong": "AGFAGF",
    "eponasSong": "FSAFSA",
    "zeldasLullaby": "SFASFA",
    "minuetOfForest": "DFSASA",
    "boleroOfFire": "GDGDAGAG",
    "nocturneOfShadow": "SAADSAG",
    "serenadeOfWater": "DGAAS",
};

const PATTERN_TO_SONG = {
    "GASGAS": "static/notes/songs/sarias_song.mp3",
    "ADGADG": "static/notes/songs/song_of_time.mp3",
    "FAFASF": "static/notes/songs/prelude_of_light.mp3",
    "DGDAGD": "static/notes/songs/requiem_of_spirit.mp3",
    "DGFDGF": "static/notes/songs/song_of_storms.mp3",
    "AGFAGF": "static/notes/songs/suns_song.mp3",
    "FSAFSA": "static/notes/songs/eponas_song.mp3",
    "SFASFA": "static/notes/songs/zeldas_lullaby.mp3",
    "DFSASA": "static/notes/songs/minuet_of_forest.mp3",
    "GDGDAGAG": "static/notes/songs/bolero_of_fire.mp3",
    "SAADSAG": "static/notes/songs/nocturne_of_shadow.mp3",
    "DGAAS": "static/notes/songs/serenade_of_water.mp3",
};

const SONG_DURATION_IN_SEC = {
    "GASGAS": 9,
    "ADGADG": 13,
    "FAFASF": 19,
    "DGDAGD": 24,
    "DGFDGF": 8,
    "AGFAGF": 7,
    "FSAFSA": 10,
    "SFASFA": 13, 
    "DFSASA": 18, 
    "GDGDAGAG": 21,
    "SAADSAG": 23,
    "DGAAS": 20,
};

class SongTracker {
    constructor() {
        this.keysSoFar = [];
    }

    get pattern() {
        return this.keysSoFar.join("");
    }

    get isSongCompleted() {
        /// Return true if a song is completed
        let currentLength = this.pattern.length;

        let onTrack = false;
        let followedSong = null;
        for (const [key, value] of Object.entries(MUSIC_PATTERNS)) {
            console.log(value + " _ " + this.pattern);
            if (value.substring(0, currentLength) === this.pattern) {
                followedSong = key;
                onTrack = true;
                break;
            }
        }

        if (onTrack) {
            console.log(followedSong);
            let patternForFollowedSong = MUSIC_PATTERNS[followedSong];
            if (currentLength === patternForFollowedSong.length) {
                return true;
            }
        }

        return false;
    }

    get songDuration() {
        let duration = SONG_DURATION_IN_SEC[this.pattern];

        if (duration != undefined) {
            return duration;
        } else {
            return -1;
        }
    }

    reset() {
        this.keysSoFar = [];
    }

    addKey(key) {
        this.keysSoFar.push(key);
    }

    playSong() {
        let songFile = PATTERN_TO_SONG[this.pattern];
        let audio = new Audio(songFile);
        audio.play();
        this.reset();
    }
};

let songTracker = new SongTracker();
let isAudioEnabled = false;
let areKeysDisabled = false;
let isSongMenuDisplayed = false;

{
    const IMG_WIDTH = 1108;
    const IMG_HEIGHT = 931;
    const IMG_WH_RATIO = IMG_WIDTH / IMG_HEIGHT;
    const IMG_HW_RATIO = IMG_HEIGHT / IMG_WIDTH;

    /*
        1. If the width to height ratio is greater than original, then we need to resize the width 
        2. If the height to width ratio is greater than original, then we need to resize the height
        3. If either one is smaller, then just set it equal to container size  
    */
    const resizeObserver = new ResizeObserver(entries => {
        let ocarinaContainer = document.querySelector(".ocarina__img");
        let yellowContainer = document.querySelector(".yellow-container");
        let dimensions = ocarinaContainer.getBoundingClientRect();
        let currentWidth = dimensions['width'];
        let currentHeight = dimensions['height'];

        let aWidthOverHeight = currentWidth / currentHeight;
        let aHeightOverWidth = currentHeight / currentWidth;

        // Set height and width equal to the actual image
        if (aWidthOverHeight > IMG_WH_RATIO) {
            let yellowContainerWidth = currentHeight * IMG_WH_RATIO;
            yellowContainer.style.width = yellowContainerWidth + "px";
        } else {
            yellowContainer.style.width = currentWidth + "px";
        }

        if (aHeightOverWidth > IMG_HW_RATIO) {
            let yellowContainerHeight = currentWidth * IMG_HW_RATIO;
            yellowContainer.style.height = yellowContainerHeight + "px";
        } else {
            yellowContainer.style.height = currentHeight + "px";
        }

        // Center the container yellow box
        let yellowContainerDimensions = yellowContainer.getBoundingClientRect();
        let yellowWidth = yellowContainerDimensions['width'];
        let yellowHeight = yellowContainerDimensions['height'];

        let horizontalExtraSpace = currentWidth - yellowWidth;
        let verticalExtraSpace = currentHeight - yellowHeight;

        yellowContainer.style.left = (horizontalExtraSpace / 2) + "px";
        yellowContainer.style.top = (verticalExtraSpace / 2) + "px";
    });


    resizeObserver.observe(document.querySelector('.ocarina'));
}

let audioFiles = {
    "key__a": "static/notes/OOT_Notes_Ocarina_A_med.wav",
    "key__s": "static/notes/OOT_Notes_Ocarina_B_med.wav",
    "key__d": "static/notes/OOT_Notes_Ocarina_D_med.wav",
    "key__f": "static/notes/OOT_Notes_Ocarina_D2_med.wav",
    "key__g": "static/notes/OOT_Notes_Ocarina_F_med.wav",
};

{
    let keys = document.querySelectorAll(".key");

    for (let index = 0; index < keys.length; index++) {
        keys[index].addEventListener("click", keyButtonClicked)
    }

    function keyButtonClicked() {
        // let currentKey = event.currentTarget;

        let currentKey = this;
        let keyName = currentKey.classList[1];
        playKeySound(keyName);

    }

    document.addEventListener("keydown", function (event) {
        let key = event.key;
        let completeKey = "key__" + key;
        playKeySound(completeKey);
    });

    function playKeySound(key) {
        if (isAudioEnabled && !areKeysDisabled && !isSongMenuDisplayed) {
            startFiveSecondTimer(key);
            let audio = new Audio(audioFiles[key]);
            audio.play();
        }
    }

    function getKeyboardLetterFromKey(key) {
        return key[key.length - 1].toUpperCase();
    }


    let latestTimerId = null;
    function startFiveSecondTimer(key) {

        let isSongCompleted = updateSongTrackerAndCheckIfDone(key);
        if (isSongCompleted) {
            return;
        }

        if (latestTimerId != null) {
            clearInterval(latestTimerId);
        }

        let timerId = setInterval(handleCountdown, 10);
        latestTimerId = timerId;

        let leftBar = document.querySelector(".bar__left-filling");
        let rightBar = document.querySelector(".bar__right-filling");
        let totalTime = 2000;
        let step = (100 / totalTime) * 10;

        leftBar.style.width = "100%";
        rightBar.style.width = "100%";

        function handleCountdown() {
            let currentLeftBarWidth = leftBar.style.width;
            let currentWidth = Number(currentLeftBarWidth.substring(0, currentLeftBarWidth.length - 1));
            let newPercentage = currentWidth - step;

            if (newPercentage > 0) {
                leftBar.style.width = newPercentage + "%";
                rightBar.style.width = newPercentage + "%";
            } else {
                leftBar.style.width = "0%";
                rightBar.style.width = "0%";
                clearInterval(latestTimerId);
                siteToErrorState();
            }
        }
    }

    function updateSongTrackerAndCheckIfDone(key) {
        let keyLetter = getKeyboardLetterFromKey(key);
        songTracker.addKey(keyLetter);
        let isSongCompleted = songTracker.isSongCompleted;

        if (isSongCompleted) {
            handleCompletedSong();
        }

        return isSongCompleted;
    }

    function handleCompletedSong() {
        disableAllKeys(true);
        clearInterval(latestTimerId);
        removeAllClassStateFromBars();

        let leftBar = document.querySelector(".bar__left-filling");
        let rightBar = document.querySelector(".bar__right-filling");

        leftBar.classList.add("bar-song-completed");
        rightBar.classList.add("bar-song-completed");
        leftBar.style.width = "100%";
        rightBar.style.width = "100%";

        let songDuration = songTracker.songDuration;
        let delaySoundEffectTime = 1 * 1000;
        let delaySongTime = 2 * 1000;
        let completedSoundEffectId = setInterval(delaySoundEffect, delaySoundEffectTime);
        let delaySongId = setInterval(delaySong, delaySongTime);        
        let clearUIId = setInterval(clearUIAfterSongCompletion, delaySongTime + (songDuration * 1000));

        function delaySoundEffect() {
            clearInterval(completedSoundEffectId);
            let completedEffect = new Audio("static/notes/OOT_Get_SmallItem.wav");
            completedEffect.play();
        }

        function delaySong() {
            clearInterval(delaySongId);
            songTracker.playSong();
        }

        function clearUIAfterSongCompletion() {
            clearInterval(clearUIId);
            removeAllClassStateFromBars();
            leftBar.classList.add("bar-no-error");
            rightBar.classList.add("bar-no-error");
            leftBar.style.width = "0%";
            rightBar.style.width = "0%";
            disableAllKeys(false);
        }
    }

    function siteToErrorState() {
        disableAllKeys(true);
        songTracker.reset();

        let leftBar = document.querySelector(".bar__left-filling");
        let rightBar = document.querySelector(".bar__right-filling");

        removeAllClassStateFromBars();
        leftBar.classList.add("bar-error");
        rightBar.classList.add("bar-error");

        leftBar.style.width = "100%";
        rightBar.style.width = "100%";

        let disabledIntervalId = setInterval(handleErrorTimeout, 1000);

        function handleErrorTimeout() {
            disableAllKeys(false);
            removeAllClassStateFromBars();
            leftBar.classList.add("bar-no-error");
            rightBar.classList.add("bar-no-error");

            leftBar.style.width = "0%";
            rightBar.style.width = "0%";

            clearInterval(disabledIntervalId);
        }
    }

    function removeAllClassStateFromBars() {
        let leftBar = document.querySelector(".bar__left-filling");
        let rightBar = document.querySelector(".bar__right-filling");

        leftBar.classList.remove("bar-no-error");
        leftBar.classList.remove("bar-error");
        leftBar.classList.remove("bar-song-completed");

        rightBar.classList.remove("bar-no-error");
        rightBar.classList.remove("bar-error");
        rightBar.classList.remove("bar-song-completed");
    }

    function disableAllKeys(shouldDisable) {
        areKeysDisabled = shouldDisable;
        let keys = document.querySelectorAll(".key");

        for (let index = 0; index < keys.length; index++) {
            keys[index].disabled = shouldDisable;
        }
    }
}


{
    let muteBtn = document.querySelector(".mute-unmute-button");

    muteBtn.addEventListener("click", function () {
        let muteBtnClasses = muteBtn.classList;

        if (muteBtnClasses.contains("unmute")) {
            muteBtn.classList.remove("unmute");
            muteBtn.classList.add("mute");
            muteBtn.style.backgroundImage = "url('static/images/muted_100.png')";
            isAudioEnabled = false;
        } else {
            muteBtn.classList.remove("mute");
            muteBtn.classList.add("unmute");
            muteBtn.style.backgroundImage = "url('static/images/unmuted_100.png')";
            isAudioEnabled = true;
        }
    });
}

{
    let songsPopup = document.querySelector(".song-guide-button");
    let popupButton = document.querySelector(".popup__button");
    let backgroundDimmer = document.querySelector(".main__background-dimmer");
    
    songsPopup.addEventListener("click", togglePopup);
    popupButton.addEventListener("click", togglePopup);
    backgroundDimmer.addEventListener("click", togglePopup);

    function togglePopup() {
        let popup = document.querySelector(".popup");
        let backgroundDimmer = document.querySelector(".main__background-dimmer");
        let popupClasses = popup.classList;

        if (popupClasses.contains("is-hidden")) {
            popup.classList.remove("is-hidden");
            backgroundDimmer.classList.remove("is-hidden");
            isSongMenuDisplayed = true;
        } else {
            popup.classList.add("is-hidden");
            backgroundDimmer.classList.add("is-hidden");
            isSongMenuDisplayed = false;
        }
    }
}
