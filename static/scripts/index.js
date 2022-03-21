
let songTracker = new SongTracker();
let isAudioEnabled = false;
let areKeysDisabled = false;
let isSongMenuDisplayed = false;

{
    let keys = document.querySelectorAll(".key");

    for (let index = 0; index < keys.length; index++) {
        keys[index].addEventListener("click", keyButtonClicked)
    }

    document.addEventListener("keydown", function (event) {
        let key = event.key;
        let completeKey = "key__" + key.toLocaleLowerCase();
        playKeySound(completeKey);
    });

    function keyButtonClicked() {
        // let currentKey = event.currentTarget;

        let currentKey = this;
        let keyName = currentKey.classList[1];
        playKeySound(keyName);
    }

    function playKeySound(key) {
        if (isAudioEnabled && !areKeysDisabled && !isSongMenuDisplayed && VALID_KEYS.includes(key)) {
            animateKeyPressed(key);
            startFiveSecondTimer(key);
            let audio = new Audio(AUDIO_FILES[key]);
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

        let muteButton = document.querySelector(".mute-unmute-button");
        let leftBar = document.querySelector(".bar__left-filling");
        let rightBar = document.querySelector(".bar__right-filling");

        leftBar.classList.add("bar-song-completed");
        rightBar.classList.add("bar-song-completed");
        leftBar.style.width = "100%";
        rightBar.style.width = "100%";
        muteButton.disabled = true;
        muteButton.classList.add("disabled-mute");

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
            muteButton.disabled = false;
            muteButton.classList.remove("disabled-mute");
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

    function animateKeyPressed(key) {
        let keyElement = document.querySelector("." + key);

        keyElement.classList.add("key-pressed");

        setTimeout(function() {
            keyElement.classList.remove("key-pressed");
        }, 100);
    }
}

