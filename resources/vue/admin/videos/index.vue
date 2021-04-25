<template>
    <div>
        <loading v-model="show_loading"></loading>
        <v-row justify="center">
            <v-col cols="6" xs="12" md="8" sm="12" lg="6">
                <v-card class="mb-3">
                    <v-card-text class="pa-3">
                        <v-btn color="primary" class="mb-3" @click="pickVideo"
                            >Upload a video</v-btn
                        >
                        <!-- ALERT -->
                        <v-alert
                            dismissible
                            prominent
                            :value="true"
                            type="warning"
                        >
                            <ul>
                                <li>Max file size: 30MB</li>
                                <li>File Extension: MP4</li>
                            </ul>
                        </v-alert>
                        <!-- FILE NAME -->
                        <div class="py-2">
                            <strong>File Name:</strong> {{ filename }}
                        </div>
                        <!-- MY VIDEO COMPONENTS -->
                        <my-video v-model="video_url"></my-video>
                        <!-- ERROR MESSAGE -->
                        <span class="py-2 error--text">{{ errorText }}</span>
                        <input
                            type="file"
                            style="display: none"
                            @change="videoPicked"
                            ref="video"
                            accept="video/*"
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import video from "@components/video";
import loading from "@components/Loading.vue";

export default {
    components: {
        loading,
        "my-video": video
    },

    data: () => ({
        show_loading: false,
        errorText: "",
        video_url: "/videos/sample-mp4-file.mp4",
        filename: "sample-mp4-file.mp4",
        form: {}
    }),

    created() {
        if (this.$cookie.get("active_video_url")) {
            this.video_url = this.$cookie.get("active_video_url");
        }
    },

    methods: {
        pickVideo() {
            this.$refs.video.click();
        },

        async videoPicked(e) {
            let vm = this;
            vm.show_loading = true;
            const files = e.target.files;
            const format = files[0].type.split("/");
            vm.filename = files[0].name;

            if (files.length == 0) {
                vm.video_url = null;
                return;
            }
            // check file type must be a video
            if (files[0].type.substr(0, 5) != "video") {
                vm.video_url = null;
                vm.errorText = "File must be a video";
                vm.show_loading = false;
                return;
            }
            // check file size
            if (files[0].size >= 30000000) {
                vm.video_url = null;
                vm.errorText = "File size exceeds our maximum file size (30MB)";
                vm.show_loading = false;
                return;
            }

            vm.errorText = "";
            vm.video_url = await vm.upload(files[0]);
        },

        async upload(file) {
            let vm = this;
            console.log(file);
            const form_data = new FormData();
            form_data.append("file", file);
            const { data } = await axios.post("/video/save", form_data);
            if (data[0] != "error") {
                vm.show_loading = false;
                vm.$cookie.set("active_video_url", data, 1); // expired 1 day
                return data;
            } else {
                vm.errorText = data[1];
                vm.show_loading = false;
            }
        }
    }
};
</script>
