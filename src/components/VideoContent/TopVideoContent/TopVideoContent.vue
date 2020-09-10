<template>
    <div class="row">
        <div class="col-3">
            <h1>{{ title }}</h1>
        </div>
        <div class="col-4"></div>
        <div class="col-2" style="margin-right: 20px;">
            <input type="text" :value="searchValue" @input="setSearchValue($event.target.value)">
        </div>
        <div class="col-2">
            <button style="margin-right: 20px;" @click="setRowGrid">
                <img :src="gridButtonImage1" alt="gridBtn">
            </button>
            <button @click="setColumnGrid">
                <img :src="gridButtonImage2" alt="gridBtn">
            </button>
        </div>
    </div>
</template>

<script>
    import gridButtonImage1 from "../../../assets/images/grid-icon1.png"
    import gridButtonImage2 from "../../../assets/images/grid-icon2.png"
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "TopVideoContent",
        data() {
            return {
                gridButtonImage1,
                gridButtonImage2
            }
        },
        computed: {
            ...mapGetters({
                title: 'TITLE_PAGE',
                searchValue: 'SEARCH_VALUE'
            })
        },
        methods: {
            ...mapActions({
                setRowGrid: 'SET_ROW_GRID',
                setColumnGrid: 'SET_Column_GRID',
                setSearchValue: 'SET_SEARCH_VALUE'
            }),
        },
        created() {
            if(localStorage.getItem('gridColumn') !== null) {
                this.setColumnGrid();
            }
        },
    }
</script>

<style scoped>

</style>