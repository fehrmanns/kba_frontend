function define(name, value) {
    Object.defineProperty(exports, name, {
        value,
        enumerable: true,
    });
}

define("storagePolicies", ["DONT_STORE_MEDIA",
    "STORE_MODERATELY_COMPRESSED_MEDIA",
    "STORE_STRONGLY_COMPRESSED_MEDIA",
    "STORE_VERY_STRONGLY_COMPRESSED_MEDIA",
    "STORE_UNMODIFIED_ORIGINAL"]);
define("speakerNumRecognition", ["ALWAYS_ONE_SPEAKER_PER_CHANNEL",
    "ALWAYS_TWO_SPEAKERS_PER_CHANNEL",
    "PRECISE_SPEAKER_COUNT_CHECK",
    "FAST_SPEAKER_COUNT_CHECK",
    "CLUSTERING_SPEAKER_COUNT_CHECK"]);
define("priorities", [0, 4, 9]);
