<template>
  <div>
    <div class="container">
      <div class="input-box">
        <h2 class="signin-title">{{ $t("create") }}</h2>
        <div class="">
          <div class="success" :class="{ 'hidden': success }">Registered successfully, please verify your email</div>
          <div class="error">
            {{ computedErrors }}
          </div>
          <div class="success">
            {{ computedNoti }}
          </div>
          <form @submit.prevent="register">
            <div class="input-label"><label for="">{{ $t("username") }}</label></div>
            <div><input type="text" class="input-field" v-model="username"></div>
            <div class="input-label"><label for="">Email</label></div>
            <div><input type="text" class="input-field" v-model="email"></div>
            <div class="input-label"><label for="">{{ $t("password") }}</label></div>
            <div><input type="password" class="input-field" v-model="password"></div>
            <div class="input-label"><label for="">{{ $t("confirmPassword") }}</label></div>
            <div><input type="password" class="input-field" v-model="confirm_password"></div>
            <button type="submit" class="button w-100 margin-top-20">
              <div class="flex">
                <div class="lds-ring loading" :class="{ 'hidden': isPending }">
                  <!-- :class="{ 'active': isPending }" -->
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {{ $t("continue") }}
              </div>
            </button>
          </form>
        </div>
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
import { ref, computed } from 'vue'
import axios from '../config'

export default {
  name: 'RegisterView',

  setup() {
    const username = ref('')
    const password = ref('')
    const confirm_password = ref('')
    const email = ref('')
    const errors = ref('')
    const isPending = ref(true)
    const success = ref(true)

    /**
     * Register
     * 
     * @return {void}
     */
    const register = async () => {
      try {
        isPending.value = false;
        const response = await axios.post('register', {
          username: username.value,
          password: password.value,
          confirm_password: confirm_password.value,
          email: email.value,
          role: "guest"
        })
        console.log(response.data)
        success.value = false;
      }
      catch (error) {
        errors.value = error.response.data.message
        console.log(errors.value)
      } finally {
        isPending.value = true;
      }
    }

    /**
     * Computed notification
     * 
     * @returns {string}
     */
    const computedErrors = computed(() => {
      return errors.value
    })

    return {
      username,
      password,
      confirm_password,
      email,
      errors,
      register,
      success,
      isPending,
      computedErrors,
    };
  }

}
</script>

<style scoped>
.active {
  visibility: hidden;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;
}

.button {
  background-color: rgb(12, 113, 194);
  color: white;
  border: none;
  border-radius: 2px;
  height: 40px;
}

.hidden {
  display: none;
}
</style>
