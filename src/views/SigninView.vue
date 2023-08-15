<template>
  <div>
    <div class="container">
      <div class="input-box">
        <div class="detail-modal" id="import-modal">
          <div class="modal-content">
            <div class="modal-header">
              <span>{{ $t("forgotPassword") }}</span>
              <span class="close" @click="closeModal">&times;</span>
            </div>
            <div class="file-box">
              <div class="success" :class="{ 'active': success }">Please check your email</div>
              <form @submit.prevent="forgotPassword()">
                <input type="email" class="form-control form-control-xlg" placeholder="Enter your email" v-model="email">
                <button type="submit" class="send-button w-100 mt-5">
                  <div class="flex">
                    <div class="lds-ring loading" :class="{ 'hidden': isPending }">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                    <div class="d-flex align-items-center">
                      {{ $t("submit") }}
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
        <h2 class="signin-title">{{ $t("signinOrCreate") }}</h2>
        <div class="">
          <div class="error">
            {{ errors }}
          </div>
          <form @submit.prevent="login">
            <div class="input-label"><label for="">{{ $t("username") }}</label></div>
            <div><input type="text" class="input-field" v-model="username"></div>
            <div class="input-label"><label for="">{{ $t("password") }}</label></div>
            <div><input type="password" class="input-field" v-model="password"></div>
            <button type="submit" class="submit-button w-100 margin-top-20">{{ $t("continue") }}</button>
          </form>
        </div>
        <div class="">
          <router-link to="/register">
            <button class="submit-button w-100 margin-top-20">{{ $t("register") }}</button>
          </router-link>
        </div>
        <div class="forgot-password" @click="openModal()">{{ $t("forgotPassword") }}</div>
        <div class="term">
          <p class="mt-2">{{ $t("condition") }}</p>
        </div>
        <div class="term">
          <p class="mt-2">All rights reserved. Copyright (2006 - 2023) - Booking.com™</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import store from '../store'
import axios from '../config'
import router from '../router'

export default {
  name: 'SigninView',
  setup() {
    const username = ref('')
    const password = ref('')
    const err = ref('')
    const isPending = ref(true);
    const success = ref(true)
    const email = ref('')

    /**
     * Forgot password
     * 
     * @returns {void}
     */
    const forgotPassword = async () => {
      try {
        isPending.value = false
        let response = await axios.post('/forgot-password', {
          email: email.value,
        })
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data.error);
      } finally {
        isPending.value = true
        success.value = false
      }
    }

    /**
     * Login
     * 
     * @returns {void}
     */
    const login = async () => {
      try {
        const response = await axios.post('auth/login', {
          username: username.value,
          password: password.value
        })

        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('isLoggedIn', true)
        
        store.commit('login', true)
        router.push('/')
      } catch (error) {
        err.value = error.response.data.error
      }
    }

    /**
     * Open modal
     * 
     * @returns {void}
     */
    const openModal = () => {
      document.getElementById('import-modal').style.display = 'block'
    }

    /**
     * Close modal
     * 
     * @returns {void}
     */
    const closeModal = () => {
      document.getElementById('import-modal').style.display = 'none'
    }

    return {
      username,
      password,
      login,
      err,
      openModal,
      closeModal,
      forgotPassword,
      isPending,
      success,
      email
    }
  },

  /**
   * Display error
   * 
   * @returns {void}
   */
  computed: {
    errors() {
      return this.err
    }
  },
}
</script>

<style scoped>

.close {
  cursor: pointer;
}

.forgot-password:hover {
  cursor: pointer;
  text-decoration: underline blue;
  color: blue;
}

.forgot-password {
  font-size: 12px;
  margin-top: 30px;
  color: rgb(156, 156, 156);
  display: flex;
  justify-content: center;
}

.detail-modal {
  display: none;
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  border: 1px solid #888;
  max-width: 600px;
  min-height: 300px;
  /* Could be more or less, depending on screen size */
}

.modal-header {
  display: flex;
  color: white;
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  padding: 15px;
  background-color: rgb(33, 73, 141);
}

.send-button {
  background-color: rgb(12, 113, 194);
  color: white;
  border: none;
  border-radius: 2px;
  height: 40px;
}

.file-box {
  width: 80%;
  padding: 30px;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.active {
  visibility: hidden;
}

.success {
  color: rgb(79, 236, 55);
  font-weight: bold;
}

.active {
  display: none;
}

.hidden {
    display: none;
}  

</style>
