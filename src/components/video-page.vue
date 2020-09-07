<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <div class="card mb-5" style="width: 18rem;">
                        <div class="card-header alert-danger">
                            ВІДЕО
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" @click="sortBySale">Акція<span> ({{ counterVideos.sale }})</span></li>
                            <li class="list-group-item" @click="sortByPopular">Популярнi<span> ({{ counterVideos.popular }})</span></li>
                            <li class="list-group-item" @click="sortByNews">Новинки<span> ({{ counterVideos.news }})</span></li>
                        </ul>
                    </div>
                    <div class="card" style="width: 18rem;">
                        <div class="card-header alert-danger">
                            ТЕМИ
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"
                                v-for="(item, index) in categoryTheme"
                                :key="index"
                                @click="sortByTheme(item, categoryTheme[index].name)"
                            >
                                {{ item.name }} <span>({{item.counter}})</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-9">
                    <div class="row">
                        <div class="col-3">
                            <h1>{{ title }}</h1>
                        </div>
                        <div class="col-4"></div>
                        <div class="col-5">
                            <button style="margin-right: 20px;" @click="setRowGrid">
                                <img :src="gridButtonImage1" alt="gridBtn">
                            </button>
                            <button @click="setColumnGrid">
                                <img :src="gridButtonImage2" alt="gridBtn">
                            </button>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div v-if="gridColumn">
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
                            </div>
                            <div v-else>
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
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import gridButtonImage1 from '../assets/images/grid-icon1.png'
    import gridButtonImage2 from '../assets/images/grid-icon2.png'
    // import kvPagination from '../components/kv-pagination'

    export default {
        name: "video-page",
        data() {
            return {
                gridColumn: true,
                gridButtonImage1,
                gridButtonImage2,
                allVideos: [],
                errorGetVideos: false,
                categoryTheme: [
                    {
                        name: "Всі теми",
                        theme: 'all_theme',
                        counter: 0
                    },
                    {
                        name: "Акцизний податок",
                        theme: 'excise_tax',
                        counter: 0
                    },
                    {
                        name: "Валюта",
                        theme: 'currency',
                        counter: 0
                    },
                    {
                        name: "Виробництво і собівартість",
                        theme: 'production',
                        counter: 0
                    },
                    {
                        name: "Відпустки",
                        theme: 'vacation',
                        counter: 0
                    },
                    {
                        name: "Відрядження",
                        theme: 'business_trips',
                        counter: 0
                    }
                ],
                currentVideos: [],
                title: 'усі відео',
                counterVideos: {
                    sale: 0,
                    popular: 0,
                    news: 0,
                }
            }
        },
        watch: {

        },
        computed: {

        },
        methods: {
            setCountVideo() {
                let _self = this;

                this.allVideos.map(function (item) {
                    if(item.options.popular) {
                        _self.counterVideos.popular++;
                    }
                    if(item.options.sale) {
                        _self.counterVideos.sale++;
                    }
                    if(new Date(item.date).getMonth() === 7) {
                        _self.counterVideos.news++;
                    }
                })

                this.setCountTheme();
            },
            setCountTheme() {
                let _self = this;

                this.allVideos.map(function (item) {
                    for (let key of _self.categoryTheme ) {
                        if(item.theme === key.theme) {
                            key.counter++;
                        }
                    }
                })

                this.categoryTheme[0].counter = this.allVideos.length;
            },
            setRowGrid() {
                this.gridColumn = true;
                localStorage.removeItem('gridColumn');
            },
            setColumnGrid() {
                this.gridColumn = false;
                localStorage.setItem('gridColumn', 1);
            },
            sortBySale() {
                var _self = this;
                this.resetVideos();

                this.allVideos.filter(function (item) {
                    if(item.options.sale) {
                        _self.currentVideos.push(item)
                    }
                })
            },
            sortByPopular() {
                var _self = this;
                this.resetVideos();

                this.allVideos.filter(function (item) {
                    if(item.options.popular) {
                        _self.currentVideos.push(item)
                    }
                })
            },
            sortByNews() {
                var _self = this;
                this.resetVideos();

                this.allVideos.filter(function (item) {
                    let date = new Date(item.date);
                    if(date.getMonth() === 7) {
                        _self.currentVideos.push(item)
                    }
                })
            },
            sortByTheme(video, title) {
                var _self = this;
                this.resetVideos();
                this.title = title;

                if(video.theme === 'all_theme') {
                    this.currentVideos = this.allVideos;
                }else {
                    this.allVideos.filter(function (item) {
                        if(item.theme === video.theme) {
                            _self.currentVideos.push(item);
                        }
                    })
                }
            },
            resetVideos() {
                this.currentVideos = [];
            }
        },
        components: {
            // kvPagination
        },
        created() {
            if(localStorage.getItem('gridColumn') !== null) {
                this.gridColumn = false;
            }
        },
        mounted() {
            axios.get('http://localhost:3000/videos')
                .then(response => {
                    this.allVideos = response.data;
                    this.currentVideos = this.allVideos;
                    this.setCountVideo();
                })
                .catch(error => {
                    console.log(error);
                    this.errorGetVideos = true;
                })
            }
        }
</script>

<style scoped>
    .active-page-paginate {
        background: #232323;
        color: #ffffff;
    }
</style>