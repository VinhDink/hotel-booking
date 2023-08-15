<template>
  <div>
    <div class="body">
      <div class="welcome-bar">
        <div>
          <h1>{{ $t('welcome') }}</h1>
        </div>
        <div>
          <h2>{{ $t('intro') }}</h2>
        </div>
      </div>
      <div class="search-bar">
        <div class="h-55px">
          <form @submit.prevent="show" id="description-filter">
            <div class="select-bar">
              <div class="select-option">
                <div class="option">
                  <select class="select" name="type" id="type" v-model="type" @change="setSearch('type')">
                    <option value="" disabled selected>{{ $t('roomType') }}</option>
                    <option value="Double">Double</option>
                    <option value="Triple">Triple</option>
                    <option value="Single">Single</option>
                  </select>
                </div>
                <div class="option">
                  <select class="select" name="floor" id="floor" v-model="floor" @change="setSearch('floor')">
                    <option value="" disabled selected>{{ $t('floor') }}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div class="option">
                  <select class="select" name="price" id="price" v-model="dayPrice" @change="setSearch('dayPrice')">
                    <option value="" disabled selected>{{ $t('price') }}</option>
                    <option value="400">400$</option>
                    <option value="500">500$</option>
                    <option value="600">600$</option>
                    <option value="800">800$</option>
                  </select>
                </div>
              </div>
              <button @click="clear()" class="submit-button">{{ $t('clear') }}</button>
              <button type="submit" class="submit-button">
                {{ $t('search') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="">
      <div class="box">
        <div class="advertisement">
        </div>
        <div class="container">
          <div class="result-box">
            <h2>{{ rooms.length }} {{ $t('resultFound') }}</h2>
            <div>
              <span class="error">{{ err }}</span>
              <form @submit.prevent="filterByDate" class="filter-by-date">
                <div>{{ $t('filterByDate') }}:</div>
                <div class="date-input">
                  <div class="date-input-box">
                    <label for="arrive_date" class="info-detail">{{ $t('arriveDate') }}</label>
                    <input type="date" name="arrive_date" class="date-input-field" v-model="arrive_date" required>
                  </div>
                  <div class="date-input-box">
                    <label for="leave_date" class="info-detail">{{ $t('leaveDate') }}</label>
                    <input type="date" name="leave_date" class="date-input-field" v-model="leave_date" required>
                  </div>
                  <button type="submit" class="filter-button">{{ $t('filter') }}</button>
                </div>
              </form>
            </div>
          </div>
          <div class="room-content">
            <div v-for="room in roomPerPage(currentPage)" :key="room.id" class="room-box">
              <div class="room-info">
                <div>
                  <img :src="room.image_first" class="img">
                </div>
                <div class="room-description">
                  <div class="room-name">
                    <router-link :to="{ name: 'room-detail', params: { id: room.id } }">
                      {{ room.name }}
                    </router-link>
                    <div class="rating">
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                      <i class="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <div class="price">
                    <div>
                      <span class="price-title">Day price: </span>{{ room.day_price }}
                      <i class="bi bi-currency-dollar"></i>
                      <span class="price-title">- Hour price: </span>{{ room.hour_price }}
                      <i class="bi bi-currency-dollar"></i>
                    </div>
                  </div>
                  <div class="location">
                    <i class="bi bi-geo-alt-fill location-logo"></i>
                    <span>123 Main St, Compton, California</span>
                  </div>
                  <div class="room-specific">
                    <div><span class="info-title">{{ $t('view') }}: </span><span class="info-detail">{{ room.view
                    }}</span></div>
                    <div><span class="info-title">{{ $t('size') }}: </span><span class="info-detail">{{ room.size
                    }}</span>
                    </div>
                    <div><span class="info-title">{{ $t('type') }}: </span> <span class="info-detail">{{ room.type
                    }}</span></div>
                    <div><span class="info-title">{{ $t('hourPrice') }}: </span><span class="info-detail"> {{
                      room.hour_price
                    }}</span></div>
                    <div><span class="info-title">{{ $t('dayPrice') }}: </span><span class="info-detail">{{ room.day_price
                    }}</span>
                    </div>
                    <div><span class="info-title">{{ $t('floor') }}: </span><span class="info-detail">{{ room.floor
                    }}</span></div>
                  </div>
                </div>
              </div>
              <div class="button-container">
                <div class="button-box">
                  <router-link :to="{ name: 'room-detail', params: { id: room.id } }">
                    <button class="button">
                      {{ $t('bookNow') }}
                    </button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="paginate-box">
            <vue-awesome-paginate :total-items="rooms.length" v-model="currentPage" :items-per-page="5"
              :show-ending-buttons="true" :hide-prev-next="true" :max-pages-shown="4" @click="handlePageClick" />
          </div>
        </div>
        <div class="advertisement-2">
        </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from '../store'
import axios from '../config'
import { useRoute } from 'vue-router'

export default {
  name: 'HomeView',
  data() {
    return {
      languages: {
        en: { nativeName: 'English' },
        vn: { nativeName: 'Tiếng Việt' },
      }
    }
  },

  setup() {
    const type = ref(store.state.type)
    const floor = ref(store.state.floor)
    const dayPrice = ref(store.state.dayPrice)
    const arrive_date = ref('')
    const leave_date = ref('')
    const rooms = ref('')
    const currentPage = ref(store.state.page)
    const err = ref('')

    if (useRoute().query.type || useRoute().query.floor || useRoute().query.dayPrice) {
      type.value = useRoute().query.type
      floor.value = useRoute().query.floor
      dayPrice.value = useRoute().query.dayPrice
    }

    /**
     * Store search input in vuex
     * 
     * @param {string} search
     * 
     * @return {void}
     */
    const setSearch = (search) => {
      switch (search) {
        case 'type':
          store.commit('setType', type.value)
          break;
        case 'floor':
          store.commit('setFloor', floor.value)
          break;
        case 'dayPrice':
          store.commit('setDayPrice', dayPrice.value)
          break;
        default:
          break;
      }
    }

    /**
     * Show rooms
     * 
     * @return {void}
     */
    const show = async () => {
      let response = await axios.post('filter-room', {
        type: type.value,
        floor: floor.value,
        day_price: dayPrice.value
      })
      rooms.value = response.data
    }
    show()

    const roomIds = ref([])
    /**
     * Filter by date
     * 
     * @return {void}
     */
    const filterByDate = async () => {
      try {
        rooms.value.forEach(element => {
          roomIds.value.push(element.id)
        });
        let response = await axios.post('filter-by-date', {
          arrive_date: arrive_date.value,
          leave_date: leave_date.value,
          roomIds: roomIds.value
        })

        rooms.value = response.data
        err.value = ''
      }
      catch (error) {
        err.value = error.response.data.message
      }
    }

    /**
     * Clear search input
     * 
     * @return {void}
     */
    const clear = () => {
      store.commit('setType', '')
      store.commit('setFloor', '')
      store.commit('setDayPrice', '')

      type.value = ''
      floor.value = ''
      dayPrice.value = ''
    }

    /**
     * Handle page click
     * 
     * @return {void}
     */
    const handlePageClick = () => {
      store.commit('setPage', currentPage.value)
    }

    return {
      type,
      floor,
      clear,
      dayPrice,
      filterByDate,
      rooms,
      arrive_date,
      leave_date,
      handlePageClick,
      show,
      currentPage,
      setSearch,
      err
    }
  },

  /**
   * Divide rooms into pages
   * 
   * @param {array} page
   */
  methods: {
    roomPerPage(page) {
      let start = (page * 5) - 5;
      let end = (page * 5);
      const newRooms = this.rooms.slice(start, end);
      return newRooms;
    }
  },

}
</script>

<style scoped>
.result-box {
  padding: 10px;
  background-color: rgb(254, 187, 0);
  border-radius: 5px;
}

.room-box {
  margin-top: 30px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  background-color: rgb(241, 241, 241);
  box-shadow: 8px 8px 8px rgb(214, 214, 214);
}


@media (min-width: 769px) {

  .advertisement-img {
    object-fit: cover;
    width: 100%;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 1100px;
    gap: 20px;
  }

  .filter-by-date {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .date-input {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .date-input-field {
    height: 30px;
    margin-left: 20px;
    margin-right: 20px;
    border: 0.5px solid rgb(195, 195, 195);
    padding: 5px;
    border-radius: 3px;
  }

  .filter-button {
    background-color: rgb(12, 113, 194);
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 2px;
    color: white;
    border: none;
  }

  .price-title {
    color: rgb(149, 148, 148)
  }

  .paginate-box {
    display: flex;
    justify-content: center;
  }

  .location-logo {
    color: rgb(12, 113, 194);
    text-shadow: 3px 3px 3px rgb(12, 113, 194);
    margin-right: 5px;
  }

  .location {
    font-size: 10px;

  }

  .rating {
    display: flex;
    flex-direction: row-reverse;
    color: rgb(237, 237, 33);
    gap: 10px;
    font-size: 20px;
    width: 100%
  }

  .advertisement {
    border: 1px solid rgb(0, 0, 0);
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-contenT: center;
    min-height: 1000px;
    background-image: url('../assets/ad.png');
    background-size: contain;
  }

  .advertisement-2 {
    border: 1px solid rgb(0, 0, 0);
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-contenT: center;
    min-height: 1000px;
    background-image: url('../assets/ad.png');
    background-size: contain;
  }

  .advertisement2 {
    border: 1px solid rgb(0, 0, 0);
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-contenT: center;
    min-height: 1000px;
  }

  .select-option {
    display: flex;
    flex: 1;
    gap: 2px;
  }

  .room-specific {
    margin-top: 30px;
    border-left: 1px solid rgb(226, 226, 226);
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  }

  .room-name {
    font-size: 30px;
    color: rgb(65, 65, 219);
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
  }

  .room-name:hover {
    color: rgb(80, 80, 84);
  }

  .option {
    flex: 1;
    border-radius: 0px
  }

  .body {
    height: 250px;
    background-image: url("src/assets/back_ground.jpg");
    background-size: contain;
  }

  .welcome-bar {
    margin-left: 165px;
    margin-right: 165px;
    color: rgb(255, 255, 255);
    text-shadow: 5px 5px rgb(0, 0, 0);
    font-weight: bold;
    padding-top: 80px;
  }

  .price {
    font-size: 13px;
    color: rgb(39, 249, 11);
    font-weight: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
  }

  .form-select {
    width: 100%;
    height: 100%;
  }

  .welcome-text {
    margin-top: 64px;
  }

  .search-bar {
    margin-top: 10px;
    margin-left: 170px;
    margin-right: 170px;
    padding-top: 37px;
    height: 100px;
  }

  .select-bar {
    display: flex;
    background: rgb(254, 187, 0);
    padding: 3px;
    gap: 3px;
    border-radius: 3px;
  }

  .info-title {
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

  .info-detail {
    color: rgb(149, 148, 148)
  }

  .room-description {
    padding: 5px;
    gap: 10px;
    flex: 1;
  }

  .h-55px {
    height: 55px;
  }

  .box {
    display: flex;
    justify-content: center;
    margin-top: 100px;
  }

  .room-info {
    display: flex;
    gap: 10px;
  }

  .img {
    height: 200px;
    width: 200px;
  }

  .button {
    min-width: 130px;
    min-height: 40px;
    padding: 10px;
    background-color: rgb(12, 113, 194);
    border: none;
    color: white;
    border-radius: 5px;
  }

  .button:hover {
    background-color: rgb(61, 61, 108);
  }
}

.button-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-container {
  display: flex;
  justify-content: end;
}


@media (max-width: 425px) {

  .filter-by-date {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  .paginate-box {
    display: flex;
    justify-content: center;
  }

  .date-input {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .date-input-field {
    height: 30px;
    margin-left: 20px;
    margin-right: 20px;
    border: 0.5px solid rgb(195, 195, 195);
    padding: 5px;
    border-radius: 3px;
  }

  .filter-button {
    background-color: rgb(12, 113, 194);
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 2px;
    color: white;
    border: none;
    margin-top: 10px;
  }

  .body {
    height: 250px;
    background-image: url("src/assets/back_ground.jpg");
    background-size: contain;
  }

  .room-specific {
    margin-top: 10px;
    border-left: 1px solid rgb(226, 226, 226);
    padding-left: 10px;
  }

  .room-name {
    font-size: 30px;
    color: rgb(65, 65, 219);
    font-weight: bold;
  }

  .square-border {
    border-radius: 3px
  }

  .welcome-bar {
    margin-left: 20px;
    margin-right: 20px;
    color: white;
    padding-top: 80px;
  }

  .welcome-text {
    margin-top: 64px;
  }

  .search-bar {
    margin-top: 10px;
    margin-left: 20px;
    margin-right: 20px;
    padding-top: 37px;
    height: 100px;
  }

  .select-bar {
    width: 100%;
    height: 100%;
    background: rgb(254, 187, 0);
    padding-top: 3px;
    padding-right: 3px;
    padding-left: 3px;
    padding-bottom: 3px;
    gap: 10px;
    border-radius: 3px;
  }

  .h-55px {
    height: 55px;
  }

  .box {
    margin-top: 193px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .room-detail {
    text-align: start;
    margin-top: 40px;
    font-size: 15px;
  }

  .button {
    width: 130px;
    height: 40px;
    background-color: rgb(12, 113, 194);
    border: none;
    color: white;
    border-radius: 5px;
  }

  .form-select {
    width: 100%;
    height: 30px;
  }


  .info-title {
    font-size: 20px;
    color: black;
    font-weight: bold;
  }

  .info-detail {
    color: rgb(149, 148, 148)
  }

  .button-box {
    display: flex;
    flex-direction: column;
  }

  .select-bar {
    display: flex;
    flex-direction: column;
  }

  .img {
    height: 100px;
    width: 250px;
  }

  .advertisement {
    border: 1px solid rgb(0, 0, 0);
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 250px;
    background-image: url('../assets/ad.png');
    background-size: contain;
  }

  .advertisement-2 {
    border: 1px solid rgb(0, 0, 0);
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 30px;
    background-image: url('../assets/ad.png');
    background-size: contain;
  }

  .advertisement2 {
    border: 1px solid rgb(0, 0, 0);
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 50px;
    background-image: url('../assets/ad.png');
    background-size: contain;
  }

  .select-option {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }


  .location-logo {
    color: rgb(12, 113, 194);
    text-shadow: 3px 3px 3px rgb(12, 113, 194);
    margin-right: 5px;
  }

  .location {
    font-size: 10px;

  }

  .price-title {
    color: rgb(149, 148, 148)
  }

  .rating {
    display: flex;
    margin-bottom: 10px;
    color: rgb(237, 237, 33);
    gap: 10px;
    font-size: 20px;
    width: 100%
  }

  .price {
    font-size: 13px;
    color: rgb(39, 249, 11);
    font-weight: normal;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
  }

  .date-input-box {
    display: flex;
    justify-content: space-between;
  }

}
</style>
