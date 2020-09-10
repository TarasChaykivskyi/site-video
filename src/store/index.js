import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        titlePage: 'усі відео',
        gridColumn: true,
        allVideos: [],
        currentVideos: [],
        categoryVideos: categoryVideos(),
        categoryTheme: categoryTheme(),
        searchValue: ''
    },
    getters: {
        GRID_COLUMN(state) {
            return state.gridColumn;
        },
        ALL_VIDEOS(state) {
            return state.allVideos;
        },
        CATEGORY_VIDEOS(state) {
            return state.categoryVideos
        },
        CATEGORY_THEMES(state) {
            return state.categoryTheme
        },
        CURRENT_VIDEOS(state) {
            return state.currentVideos;
        },
        TITLE_PAGE(state) {
            return state.titlePage;
        },
        SEARCH_VALUE(state) {
            return state.searchValue;
        }
    },
    mutations: {
        setRowGrid(state) {
            state.gridColumn = true;
            localStorage.removeItem('gridColumn');
        },
        setColumnGrid(state) {
            state.gridColumn = false;
            localStorage.setItem('gridColumn', 1);
        },
        setAllVideos(state, videos) {
            state.allVideos = videos;
            state.currentVideos = state.allVideos;
        },
        sortVideos(state, arr){
            let theme = arr[0]
            let title = arr[1]

            state.titlePage = title;
            state.currentVideos = [];

            if(theme === 'all_theme') {
                state.currentVideos = state.allVideos;
            }else if(theme === 'sale'){
                state.allVideos.filter(function (item) {
                    if(item.options.sale) {
                        state.currentVideos.push(item)
                    }
                })
            }else if(theme === 'popular'){
                state.allVideos.filter(function (item) {
                    if(item.options.popular) {
                        state.currentVideos.push(item)
                    }
                })
            }else if(theme === 'news'){
                state.allVideos.filter(function (item) {
                    let date = new Date(item.date);
                    if(date.getMonth() === 7) {
                        state.currentVideos.push(item)
                    }
                })
            }else {
                state.allVideos.filter(function (item) {
                    if(item.theme === theme) {
                        state.currentVideos.push(item);
                    }
                })
            }
        },
        setSearchValue(state, val) {
            val = val.toLowerCase();
            state.currentVideos = [];

            if(val !== '') {
                state.searchValue = val;
                state.allVideos.filter(function (item) {
                    if(item.title.indexOf(state.searchValue)) {
                        if(item.title.toLowerCase().indexOf(val) !== -1) {
                            state.currentVideos.push(item);
                        }
                    }
                })
            }else {
                state.currentVideos = state.allVideos;
            }
        },
        setCountVideo(state) {
            for(let item of state.allVideos) {
                if(item.options.popular) {
                    state.categoryVideos[1].counter++
                }
                if(item.options.sale) {
                    state.categoryVideos[0].counter++
                }
                if(new Date(item.date).getMonth() === 7) {
                    state.categoryVideos[2].counter++
                }
            }
        },
        setCountTheme(state) {
            for(let item of state.allVideos) {
                for(let category of state.categoryTheme) {
                    if(item.theme === category.theme) {
                        category.counter++;
                    }
                }
            }
            state.categoryTheme[0].counter = state.allVideos.length;
        }
    },
    actions: {
        SET_ROW_GRID({commit}) {
            commit('setRowGrid')
        },
        SET_Column_GRID({commit}) {
            commit('setColumnGrid')
        },
        GET_ALL_VIDEOS({commit}) {
            return axios.get('http://localhost:3000/videos')
                .then(response => {
                    commit('setAllVideos', response.data);
                    commit('setCountVideo');
                    commit('setCountTheme');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        SORT_VIDEOS({commit}, theme) {
            commit('sortVideos', theme)
        },
        SET_SEARCH_VALUE({commit}, val) {
            commit('setSearchValue', val);
        }
    }
})


function categoryVideos() {
    return [
        {
            name: "Акція",
            theme: 'sale',
            counter: 0
        },
        {
            name: "Популярнi",
            theme: 'popular',
            counter: 0
        },
        {
            name: "Новинки",
            theme: 'news',
            counter: 0
        }
    ]
}

function categoryTheme() {
    return [
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
    ]
}