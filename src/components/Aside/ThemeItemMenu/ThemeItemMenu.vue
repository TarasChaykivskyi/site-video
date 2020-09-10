<template>
    <div class="card" style="width: 18rem;">
        <div class="card-header alert-danger">ТЕМИ</div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"
                v-for="(item, index) in categoryTheme"
                :key="index"
                @click="sortVideos([item.theme, item.name])"
            >
                {{ item.name }} <span>({{item.counter}})</span>

                {{  }}
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "ThemeItemMenu",
        computed: {
            ...mapGetters({
                categoryTheme: 'CATEGORY_THEMES'
            })
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