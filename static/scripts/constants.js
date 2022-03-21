
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

let AUDIO_FILES = {
    "key__a": "static/notes/OOT_Notes_Ocarina_A_med.wav",
    "key__s": "static/notes/OOT_Notes_Ocarina_B_med.wav",
    "key__d": "static/notes/OOT_Notes_Ocarina_D_med.wav",
    "key__f": "static/notes/OOT_Notes_Ocarina_D2_med.wav",
    "key__g": "static/notes/OOT_Notes_Ocarina_F_med.wav",
};
