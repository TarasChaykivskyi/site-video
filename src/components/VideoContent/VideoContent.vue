<template>
    <div class="col-9">
        <TopVideoContent />
        <div class="row">
            <div class="col-12">
                <VideoGridRow
                        v-if="gridRow"
                        :currentVideos="currentVideos"
                />
                <VideoGridColumn
                        v-else
                        :currentVideos="currentVideos"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import TopVideoContent from "./TopVideoContent/TopVideoContent";
    import VideoGridRow from "./VideoGridRow/VideoGridRow";
    import VideoGridColumn from "./VideoGridColumn/VideoGridColumn";
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "VideoContent",
        computed: {
            ...mapGetters({
                currentVideos: 'CURRENT_VIDEOS',
                gridRow: 'GRID_COLUMN'
            })
        },
        methods: {
            ...mapActions({
                getAllVideos: 'GET_ALL_VIDEOS'
            })
        },
        components: {
            TopVideoContent,
            VideoGridRow,
            VideoGridColumn
        },
        beforeMount() {
            this.getAllVideos();
        }
    }
</script>

<style scoped>

</style>