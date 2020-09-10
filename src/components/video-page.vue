<template>
    <div class="container">
        <div class="row">
            <Aside />
            <VideoContent />
        </div>
    </div>
</template>
<script>
    import Aside from "./Aside/Aside";
    import VideoContent from "./VideoContent/VideoContent";

    export default {
        name: "video-page",
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {

        },
        components: {
            VideoContent,
            Aside
        },
        created() {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>