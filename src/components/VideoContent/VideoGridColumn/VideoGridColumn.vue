<template>
    <div>
        <div class="card mb-3"
             v-for="(video) in currentVideos"
             :key="video.id"
        >
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img :src="video.covers.main" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{ video.title }}</h5>
                        <template v-if="!video.access">
                            <a href="#" class="btn btn-primary">ДИВИТИСЯ</a>
                        </template>
                        <template v-else>
                            <a href="#" style="background: red" class="btn btn-primary">придбати</a>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoGridColumn",
        props: [
            'currentVideos'
        ]
    }
</script>

<style scoped>

</style>