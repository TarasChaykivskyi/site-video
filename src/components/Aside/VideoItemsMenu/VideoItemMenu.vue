<template>
    <div class="card mb-5" style="width: 18rem;">
        <div class="card-header alert-danger">ВІДЕО</div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"
                v-for="(item, index) in categoryVideos"
                :key="index"
                @click="sortVideos([item.theme, item.name])"
            >
                {{ item.name }} <span>({{item.counter}})</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "VideoItemMenu",
        computed: {
            ...mapGetters({
                categoryVideos: 'CATEGORY_VIDEOS'
            }),
        },
        methods: {
            ...mapActions({
                sortVideos: 'SORT_VIDEOS'
            })
        }
    }
</script>

<style scoped>

</style>