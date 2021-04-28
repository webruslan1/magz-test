import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    actions: {
        async fetchCards({ commit }, category) {
            const res = await fetch('https://frontend-test.idaproject.com/api/product?category=' + category)
            const cards = await res.json()
            switch (category) {
                case 1:
                    this.state.category[0].isActive = true;
                    this.state.category[1].isActive = false;
                    this.state.category[2].isActive = false;

                    break;
                case 2:
                    this.state.category[0].isActive = false;
                    this.state.category[1].isActive = true;
                    this.state.category[2].isActive = false;
                    break;
                case 3:
                    this.state.category[0].isActive = false;
                    this.state.category[1].isActive = false;
                    this.state.category[2].isActive = true;
                    break;
            }
            if (this.state.selected == "цене") {
                cards.sort((a, b) => a.price - b.price)
            } else {
                cards.sort((a, b) => b.rating - a.rating)
            }
            commit('updateCards', cards)
        },
        changeSelected({ commit }, newSelected) {
            commit('updateSelected', newSelected)
        },
        changeShowBasket({ commit }, showBasket) {
            commit('updateShowBasket', showBasket)
        },
        changeBaskets({ commit }, baskets) {
            commit('updateBaskets', baskets)
        }
    },
    state: {
        cards: [],
        baskets: [
        ],
        showBasket: false,
        selected: 'цене',
        category: [
            {
                id: 1,
                name: 'Рюкзаки',
                isActive: true
            },
            {
                id: 2,
                name: 'Сумки-мессенджеры',
                isActive: false
            },
            {
                id: 3,
                name: 'Деловые сумки',
                isActive: false
            }
        ],
        options: [
            { text: "По цене", value: "цене" },
            { text: "По популярности", value: "популярности" },
        ]

    },
    mutations: {
        updateCards(state, cards) {
            state.cards = cards
        },
        updateSelected(state, newSelected) {
            state.selected = newSelected
        },
        updateShowBasket(state, showBasket) {
            state.showBasket = showBasket
        },
        updateBaskets(state, baskets) {
            state.baskets = baskets
        }
    },
    getters: {
        allCards(state) {
            return state.cards
        },
        selectedGet(state) {
            return state.selected
        },
        getShowBasket(state) {
            return state.showBasket
        },
        allBaskets(state) {
            return state.baskets
        }
    }
})

export default store;