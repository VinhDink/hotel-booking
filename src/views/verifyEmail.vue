<template>
  <div class="body">
    <div class="content">
      <div class="text">
        <div class="icon">
          <i class="bi bi-envelope-check-fill"></i>
        </div>
        <h1>Email verification</h1>
        <div>{{ noti }} </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import router from '@/router'

export default {
  name: 'VerifyEmail',

  setup() {
    const timer = ref(6); // Countdown timer
    const noti = ref()

    /**
     * Countdown timer
     * 
     * @param {number} timer - Countdown timer
     * 
     * @returns {number} - Countdown timer
     */
    const interval = setInterval(() => {
      timer.value -= 1; // Decrease countdown by 1 every second
      noti.value = "You have been verified, redirect to login page in " + timer.value + " seconds";
      if (timer.value === 0) {
        clearInterval(interval); // Stop the interval when countdown reaches 0
        router.push('/signin'); // Redirect after countdown reaches 0
      }
    }, 1000);

    return {
      noti,
      timer
    }
  }
}
</script>

<style scoped>
.body {
  background-color: rgb(240, 240, 240);
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 3px;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.icon {
  font-size: 100px;
  color: #93e4c1;
}

h1 {
  font-size: 50px;
  font-weight: bold;
}

.text {
  margin-top: 100px;
  padding: 100px;
  text-align: center;
  background-color: white;

}
</style>