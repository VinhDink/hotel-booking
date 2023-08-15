<template>
  <div class="body">
    <div>
      <div class="box">
        <div class="searching">
          <div>
            <div class="title">
              {{ $t("lookingFor") }}
            </div>
            <div class="text">
              {{ $t("weHaveMore") }}
            </div>
          </div>
          <div class="select-box">
            <select v-model="type" class="select">
              <option value="">{{ $t("roomType") }}</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Single">Single</option>
            </select>
            <select v-model="floor" class="select">
              <option value="">{{ $t("floor") }}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <select v-model="dayPrice" class="select">
              <option value="">{{ $t("price") }}</option>
              <option value="400">400$</option>
              <option value="500">500$</option>
              <option value="600">600$</option>
              <option value="800">800$</option>
            </select>
          </div>
          <router-link :to="{ name: 'home', query: { type: type, floor: floor, dayPrice: dayPrice } }" class="w100">
            <button class="submit-button w-100 margin-top-20">{{ $t("search") }}</button>
          </router-link>
        </div>
        <div class="room-content">
          <div class="header-box">
            <span class="room-name">
              {{ rooms.name }}
            </span>
            <div class="price-reserve">
              <router-link :to="{ name: 'create-booking', params: { id: rooms.id } }">
                <button class="submit-button">{{ $t("reserve") }}</button>
              </router-link>
            </div>
          </div>
          <div class="price">
            <div>
              <span class="price-title">Day price: </span>{{ rooms.day_price }}
              <i class="bi bi-currency-dollar"></i>
              <span class="price-title">- Hour price: </span>{{ rooms.hour_price }}
              <i class="bi bi-currency-dollar"></i>
            </div>
          </div>
          <div class="location">
            <i class="bi bi-geo-alt-fill location-logo"></i>
            <span>123 Main St, Compton, California</span>
          </div>
          <div class="image-box" v-if="deviceWidth > 769">
            <div class="side-image-box">
              <img :src="rooms.image_first" class="side-image" />
              <img :src="rooms.image_second" class="side-image" />
            </div>
            <div class="big-image-box">
              <img :src="rooms.image_third" class="big-image" />
            </div>
          </div>
          <div class="image-box" v-if="deviceWidth < 768">
            <div v-if="roomImg == 1" class="img-container" id="img-container">
              <img :src="rooms.image_first" id="roomImg" class="room-img" />
              <button @click="responsiveImage(2)" class="next-btn"> > </button>
            </div>
            <div v-if="roomImg == 2" class="img-container" id="img-container">
              <button @click="responsiveImage(1)" class="back-btn"> &lt; </button>
              <img :src="rooms.image_second" id="roomImg" class="room-img" />
              <button @click="responsiveImage(3)" class="next-btn"> > </button>
            </div>
            <div v-if="roomImg == 3" class="img-container" id="img-container">
              <img :src="rooms.image_third" id="roomImg" class="room-img" />
              <button @click="responsiveImage(2)" class="back-btn"> &lt; </button>
            </div>
          </div>
        </div>
      </div>
      <div class="description-box">
        <div class="description-detail">
          <i class="bi bi-house"> </i>
          <span>{{ rooms.type }}</span>
        </div>
        <div class="description-detail">
          <i class="bi bi-arrows-angle-expand"></i>
          <span>{{ rooms.size }}</span>
        </div>
        <div v-if="rooms.balcony == 1" class="description-detail">
          <i class="bi bi-shop-window"></i>
          <span>Balcony</span>
        </div>
        <div class="description-detail">
          <i class="bi bi-eye"></i>
          <span>{{ rooms.view }}</span>
        </div>
        <div v-if="rooms.smoking == 1" class="description-detail">
          <i class="bi bi-fire"></i>
          <span>Smoking</span>
        </div>
        <div class="description-detail">
          <i class="bi bi-arrow-up-circle"></i>
          <span>{{ rooms.floor }} floor</span>
        </div>
        <div v-if="rooms.bathtub == 1" class="description-detail">
          <i class="bi bi-droplet"></i>
          <span>Bathtub</span>
        </div>
      </div>
      <div>
        <div class="description-title">
          {{ $t("description") }}
        </div>
        <div class="description-content">
          {{ rooms.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from '../config'
import { useRoute } from 'vue-router'
import router from '../router'

export default {
  name: 'RoomDetail',

  setup() {
    const roomImg = ref(1)
    const rooms = ref('')
    const type = ref('')
    const floor = ref('')
    const dayPrice = ref('')
    const deviceWidth = ref(window.innerWidth)

    console.log(deviceWidth.value)

    /**
     * get the room detail
     * 
     * @returns {object} room detail
     */
    const show = async () => {
      let response = await axios.post('room/room-detail', {
        id: useRoute().params.id
      })
      rooms.value = response.data

      console.log(rooms.value)
    }
    show()

    //send the form data to a function in another component
    const submitForm = () => {
      router.push({
        name: 'home',
        params: {
          type: type.value,
          floor: floor.value,
          dayPrice: dayPrice.value
        }
      })
    }

    /**
     * Clear input fields
     * 
     * @returns {void}
     */
    const clearForm = () => {
      type.value = ''
      floor.value = ''
      dayPrice.value = ''
    }

    const responsiveImage = (index) => {
      if (index == 1) {
        roomImg.value = 1

      } else if (index == 2) {
        roomImg.value = 2

      } else {
        roomImg.value = 3

      }
    }

    return {
      rooms,
      type,
      floor,
      dayPrice,
      show,
      submitForm,
      clearForm,
      deviceWidth,
      roomImg,
      responsiveImage
    }
  },
}
</script>

<style scoped>
@media (min-width: 769px) {

  .body {
    width: 1082px;
    margin: auto;
    margin-bottom: 100px;
  }

  .room-content {
    width: 100%;
  }

  .select-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    gap: 10px;
    margin-bottom: 10px;
  }

  .w100 {
    width: 100%
  }

  .p-label {
    font-size: 10px;
  }

  .select {
    width: 100%;
    height: 30px;
    border-radius: 2px;
    margin-top: 1px;

  }

  .description-box {
    display: flex;
    gap: 10px;
    margin-top: 20px;
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

  .price-title {
    color: rgb(149, 148, 148)
  }

  .description-detail {
    border: 0.5px solid rgb(175, 175, 175);
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    gap: 5px;
  }

  .room-name {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .side-image-box {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 30%;
  }

  .side-image {
    width: 100%;
    height: 50%;
  }

  .search-box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 3px;
  }

  .price-reserve {
    display: flex;
    gap: 30px;
  }
  .box {
    display: flex;
    gap: 5px;
    margin-top: 50px;
  }

  .big-image {
    height: 100%;
    width: 100%;
  }

  .searching {
    background: rgb(258, 187, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    align-items: center;
    width: 30%;
    border-radius: 2px;
  }
  .breadcrumbs {
    display: flex;
    list-style-type: none;
    font-size: 15px;
    gap: 10px;
  }


  .breadcrumbs li * {
    text-decoration: none;
    color: rgb(14, 14, 14);
  }

  .breadcrumbs-arrow {
    color: rgb(199, 199, 199);
  }
  .text {
    width: 100%;
    font-size: 12px;
    margin-top: 20px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .image-box {
    display: flex;
    gap: 5px;
    width: 100%;
    height: 400px;
  }

  .big-image-box {
    width: 70%;
  }

  .location-logo {
    color: rgb(12, 113, 194);
    text-shadow: 3px 3px 3px rgb(12, 113, 194);
    margin-right: 5px;
  }

  .reserve-button:hover {
    background-color: rgb(5, 72, 121);
  }

  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .description-title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .description-content {
    font-size: 15px;
    color: rgb(112, 111, 111);
  }

  .location {
    margin-bottom: 10px;
  }
}

@media (max-width: 768px) {
  .box {
    display: flex;
    flex-direction: column;
  }

  .image-box {
    display: flex;
    width: 100%;
  }

  .price-reserve {
    display: flex;
    gap: 30px;
    margin-right:10px;
  }

  .room-img {
    width: 100%;
    height: 300px;
    z-index: 0;
    position: relative
  }

  .img-container {
    width: 100%;
    height: 300px;
    position: relative;
    background-size: 100% 300px;
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

  .price-title {
    color: rgb(149, 148, 148)
  }


  .next-btn {
    position: absolute;
    background-color: rgb(233, 234, 234);
    font-size: 20px;
    border-radius: 10px;
    border: none;
    padding-top: 1px;
    top: 40%;
    right: 2%;
    z-index: 1;
  }

  .back-btn {
    position: absolute;
    top: 40%;
    left: 2%;
    background-color: rgb(233, 234, 234);
    font-size: 20px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    padding-top: 1px;
    z-index: 1;
  }

  .searching {
    display: flex;
    flex-direction: column;
    background: rgb(258, 187, 0);
    padding: 10px;
    margin-top: 10px;
  }

  .select-box {
    display: flex;
    gap: 5px;
    border-radius: 3px
  }

  .select {
    display: flex;
    flex: 1;
    height: 40px;
    border-radius: 3px;
  }

  .search-button {
    background-color: rgb(12, 113, 194);
    color: white;
    border: none;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 2px;
    width: 100%;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
  }

  .text {
    width: 100%;
    font-size: 18px;
    margin-top: 10px;
  }

  .room-name {
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .header-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .reserve-button {
    background-color: rgb(12, 113, 194);
    color: white;
    border: none;
    border-radius: 2px;
    width: 100px;
    padding: 5px;
  }

  .location {
    margin-bottom: 10px;
  }

  .location-logo {
    color: rgb(12, 113, 194);
    text-shadow: 3px 3px 3px rgb(12, 113, 194);
    margin-right: 5px;
  }

  .description-box {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .description-detail {
    border: 0.5px solid rgb(175, 175, 175);
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 12px;
    padding-bottom: 12px;
    display: flex;
    flex: 1;
    gap: 5px;
  }

  .description-title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .description-content {
    font-size: 15px;
    color: rgb(112, 111, 111);
    margin-bottom: 100px;
  }
}
</style>
