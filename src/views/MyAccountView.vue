<template>
  <div class="container">
    <div class="header">
      <div>
        <h2>{{ $t("personalDetail") }}</h2>
      </div>
    </div>
    <div class="content">
      <div class="infos">
        <div class="info">
          {{ $t("yourId") }}: {{ id }}
        </div>
        <div class="info">
          {{ $t("username") }}: {{ username }}
        </div>
        <div class="info">
          Email: {{ email }}
        </div>
        <div class="info">
          {{ $t("totalBooking") }}: {{ totalBooking }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from '../store';
import axios from '../config'

export default {
  name: 'MyAccountView',

  setup() {
    const username = ref('')
    const email = ref('')
    const id = ref('')
    const totalBooking = ref('')

    /**
     * Get current user
     * 
     * @returns {void}
     */
    const currentUser = async () => {
      let response = await axios.post('auth/me')
      username.value = response.data.username
      email.value = response.data.email
      id.value = response.data.id
      console.log(response.data)
      let response2 = await axios.get('profile/amount/' + id.value)
      totalBooking.value = response2.data
    }

    currentUser()

    console.log(totalBooking.value)

    return {
      username,
      email,
      id,
      store,
      totalBooking
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
    width: 200px;
    height: 200px;
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
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
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

  .infos {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px
  }

  .button-box {
    padding: 10px;
  }

  .menu-option {
    flex: 1 0 0;
    padding: 5px;
    border-radius: 25px;
  }

  .info {
    border-bottom: 1px solid rgb(226, 226, 226);
    margin-top: 30px
  }

}
</style>
