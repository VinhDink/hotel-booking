<template>
  <form @submit.prevent="resetPassword()">
    <h2 class="signin-title">{{ $t("resetPassword") }}</h2>
    <div class="success">
      {{ noti }}
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" class="input-field" v-model="email" required>
    </div>
    <div>
      <label for="password">{{ $t("newPassword") }}</label>
      <input type="password" id="password" name="password" class="input-field" v-model="password" required>
    </div>
    <div>
      <label for="confirm-password">{{ $t("confirmNewPassword") }}</label>
      <input type="password" id="confirm-password" name="confirm-password" class="input-field" v-model="confirmPassword"
        required>
    </div>
    <div>
      <input type="hidden" name="token" :value="token">
    </div>
    <button type="submit">{{ $t("resetPassword") }}</button>
  </form>
</template>

<script>
import router from "@/router";
import axios from "../config";
import { ref } from "vue";

export default {
  name: "ResetPasswordView",

  setup() {
    const token = window.location.href.split("/").pop();
    console.log(token);

    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const timer = ref(6)
    const noti = ref('')

    /**
     * Reset password
     * 
     * @returns void
     */
    const resetPassword = async () => {
      try {
        const response = await axios.post("reset-password", {
          token: token,
          email: email.value,
          password: password.value,
          password_confirmation: confirmPassword.value,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        const interval = setInterval(() => {
          timer.value -= 1; // Decrease countdown by 1 every second
          noti.value = "Change password successfully, redirect to login page in " + timer.value + " seconds";
          if (timer.value === 0) {
            clearInterval(interval); // Stop the interval when countdown reaches 0
            router.push('/'); // Redirect after countdown reaches 0
          }
        }, 1000);
      }
    }

    return {
      token,
      email,
      password,
      confirmPassword,
      resetPassword,
      timer,
      noti
    }
  }
}

</script>

<style scoped>
form {
  width: 400px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 0px;
}

h2 {
  text-align: center;
  font-weight: bold;
}

div {
  margin-bottom: 10px;
}

label {
  display: block;
}

button[type="submit"] {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: rgb(12, 113, 194);
  color: white;
  border: none;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: rgb(11, 98, 169);
}
</style>