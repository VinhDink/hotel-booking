<template>
  <div class="container">
    <div class="header">
      <div>
        <h2>{{ $t("personalDetail") }}</h2>
      </div>
    </div>
    <div class="content">
      <div class="table-responsive">
        <table class="table table-striped ">
          <thead>
            <tr>
              <th>{{ $t("roomId") }}</th>
              <th>{{ $t("bookedDate") }}</th>
              <th>{{ $t("arriveDate") }}</th>
              <th>{{ $t("status") }}</th>
              <th>{{ $t("name") }}</th>
              <th>{{ $t("number") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in booking" :key="book.id">
              <td>{{ book.room_id }}</td>
              <td>{{ book.created_at }}</td>
              <td>{{ book.arrive_date }}</td>
              <td>{{ book.checked }}</td>
              <td>{{ book.guest_name }}</td>
              <td>{{ book.guest_number }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../config'
import { ref } from 'vue'
import store from '../store';

export default {
  name: 'MyBookingView',

  setup() {
    const booking = ref('')

    /**
     * Get booking of current user
     * 
     * @returns {void}
     */
    const getBooking = async () => {
      const currentUser = await axios.post('auth/me')
      console.log(currentUser.data.id)
      let response = await axios.get('profile/get-booking/' + currentUser.data.id)
      booking.value = response.data
    }
    getBooking()

    return {
      booking,
      getBooking,
      store
    }
  },
}
</script>

<style scoped>
@media (min-width:769px) {
  .container {
    display: flex;
    flex-direction: column;
    width: 1100px;
  }

  .button-box {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  .active-route {
    background-color: #e2e2e2;
    user-select: scale(1.1);
  }

  .content {
    display: flex;
    margin-top: 30px;
  }

  .info {
    border-bottom: 1px solid rgb(226, 226, 226);
    margin-top: 30px
  }

  .infos {
    flex: 1
  }

  .menu {
    border: 1px solid rgb(226, 226, 226);
    border-radius: 25px;
    margin-right: 50px;
    position: relative;
    height: 200px;
    width: 200px;
  }

  .logout {
    position: absolute;
    bottom: 10px;
    background-color: #ff0000;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .logout:hover {
    background-color: #990000;
  }

  .menu-option {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid rgb(226, 226, 226);
    color: black;
  }

  .router-link {
    text-decoration: none;
    color: black;
  }

  .menu-option:hover {
    color: #003580;
    user-select: scale(1.1);
  }
}

@media (max-width: 768px) {

  .table {
    border: 2px rgb(222, 222, 222) solid;
    border-radius: 13px;
    padding: 5px;
    white-space: nowrap;
  }

  th {
    padding: 10px
  }

  td {
    padding: 10px
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .menu {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .router-link {
    text-decoration: none;
    color: black;
    padding-left: 10px;
  }

  .logout {
    background-color: #ff0000;
    color: #ffffff;
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }

  .active-route {
    background-color: #e2e2e2;
    user-select: scale(1.1);
  }

  .logout:hover {
    background-color: #990000;
  }

  .button-box {
    padding: 10px;
  }

  .menu-option {
    flex: 1 0 0;
    padding: 5px;
    border-radius: 25px;
  }

}
</style>
