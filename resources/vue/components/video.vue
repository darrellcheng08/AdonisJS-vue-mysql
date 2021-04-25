<template>
    <div>
        <video
            autoplay="autoplay"
            ref="video"
            id="video"
            width="100%"
            @play="isPlaying = true"
            @pause="isPlaying = false"
            webkit-playsinline
            playsinline
            controls
        >
            Your browser does not support HTML5 video.
        </video>
        <!-- (PLAY OR PAUSE) BUTTON -->
        <v-flex xs12 lg12 v-if="showPlayButton">
            <v-btn @click.stop="playVideo" color="info" block>{{
                isPlaying ? "Pause" : "Play"
            }}</v-btn>
        </v-flex>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String
        }
    },

    data() {
        return {
            showPlayButton: false,
            isPlaying: false,
            supposedCurrentTime: 0
        };
    },

    watch: {
        async value(val) {
            let vm = this;
            await vm.updateVideoContent(val);
        }
    },

    async mounted() {
        let vm = this;
        if (vm.value) {
            await vm.updateVideoContent(vm.value);
        }
    },

    methods: {
        async updateVideoContent(url) {
            let vm = this;
            // REMOVE EVENT LISTENERS OF VIDEO
            vm.removeEvents();
            // CHECK IF VIDEO HAS A VALUE
            // CREATE VIDEO SOURCE
            var video = document.getElementById("video");
            if (video.getElementsByTagName("source").length > 0) {
                var sources = video.getElementsByTagName("source");
                sources[0].src = url;
                if (video.canPlayType("video/mp4")) {
                    sources[0].type = "video/mp4";
                }
                await video.load();
            } else {
                var source = document.createElement("source");
                source.setAttribute("src", url);
                if (video.canPlayType("video/mp4")) {
                    source.setAttribute("type", "video/mp4");
                }
                await video.appendChild(source);
            }
            // CREATE VIDEO EVENT LISTENERS
            vm.videoEvents(url);
        },

        videoEvents(url) {
            let vm = this;
            // PLAY VIDEO IF THE CURSOR IS FOCUS
            window.addEventListener("focus", vm.autoPlayVideo);
            // PAUSE VIDEO IF THE CURSOR IS UN FOCUS
            window.addEventListener("blur", vm.pauseVideo);
        },

        autoPlayVideo() {
            let vm = this;
            let video = document.getElementById("video");
            if (video) {
                var play = video.play();
                if (play !== undefined) {
                    play.then(_ => {
                        // Autoplay started!
                        video.play();
                    }).catch(error => {
                        // Autoplay was prevented. Show a "Play" button so that user can start playback.
                        vm.showPlayButton = true;
                    });
                }
            }
        },

        playVideo() {
            let vm = this;
            var video = document.getElementById("video");
            if (video.paused) {
                vm.isPlaying = false;
                video.play();
            } else {
                vm.isPlaying = true;
                video.pause();
            }
        },

        pauseVideo() {
            let video = document.getElementById("video");
            if (video) {
                video.pause();
            }
        },

        removeEvents() {
            let vm = this;
            // remove eventlistener for video
            window.removeEventListener("focus", vm.autoPlayVideo);
            window.removeEventListener("blur", vm.pauseVideo);
        }
    }
};
</script>

<style lang="scss" scoped>
video::-webkit-media-controls-timeline {
    display: none !important;
}
</style>
