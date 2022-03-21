
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
