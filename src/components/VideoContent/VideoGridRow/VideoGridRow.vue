<template>
    <div class="card-columns" >
        <div class="card"
             style="width: 98%; margin: 0 1% 20px;"
             v-for="(video) in currentVideos"
             :key="video.id"
        >
            <img :src="video.covers.main" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title" v-html="video.title"></h5>
                <template v-if="!video.access">
                    <a href="#" class="btn btn-primary">ДИВИТИСЯ</a>
                </template>
                <template v-else>
                    <a href="#" style="background: red" class="btn btn-primary">придбати</a>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoGridRow",
        props: [
            'currentVideos'
        ]
    }
</script>

<style scoped>

</style>