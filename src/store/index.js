import { createStore } from 'vuex'

const storeConfig = {
  state: {
    isLoggedIn: localStorage.getItem('isLoggedIn'),
    page: 1,
    type: '',
    floor: '',
    dayPrice: '',
  },

  mutations: {
    setPage(state, page) {
      state.page = page
    },
    setSearch(state, search) {
      state.search = search
    },
    setType(state, type) {
      state.type = type
    },
    setFloor(state, floor) {
      state.floor = floor
    },
    setDayPrice(state, dayPrice) {
      state.dayPrice = dayPrice
    },
    login(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
    }
  },
}

const store = createStore(storeConfig)

export default store
