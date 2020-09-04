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
                            <li class="list-group-item" @click="sortBySale">Акція</li>
                            <li class="list-group-item" @click="sortByPopular">Популярнi</li>
                            <li class="list-group-item" @click="sortByNews">Новинки</li>
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
                                {{ item.name }} <span>( {{ item.counter }} )</span>
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
                            <button style="margin-right: 20px;">1</button>
                            <button>2</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="card-columns">
                                <div class="card"
                                     style="width: 98%; margin: 0 1% 20px;"
                                     v-for="(video) in currentVideos"
                                     :key="video.id"
                                >
                                    <img :src="video.covers.main" class="card-img-top" alt="...">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "video-page",
        data() {
            return {
                allVideos: [],
                errorGetVideos: false,
                categoryTheme: [
                    {
                        name: "Всі теми",
                        theme: 'all_theme'
                    },
                    {
                        name: "Акцизний податок",
                        theme: 'excise_tax'
                    },
                    {
                        name: "Валюта",
                        theme: 'currency'
                    },
                    {
                        name: "Виробництво і собівартість",
                        theme: 'production'
                    },
                    {
                        name: "Відпустки",
                        theme: 'vacation'
                    },
                    {
                        name: "Відрядження",
                        theme: 'business_trips'
                    }
                ],
                currentVideos: [],
                title: 'усі відео'
            }
        },
        methods: {
            setCounterTheme() {

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
        mounted() {
            axios.get('http://localhost:3000/videos')
                .then(response => {
                    this.allVideos = response.data;
                    this.currentVideos = this.allVideos;
                })
                .catch(error => {
                    console.log(error);
                    this.errorGetVideos = true;
                })
            }
        }
</script>

<style scoped>

</style>