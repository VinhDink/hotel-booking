<template>
  <div class="body">
    <div class="booking_box">
      <div class="title">
        {{ $t('bookYourRoom') }}
      </div>
      <div>
        <form @submit.prevent="addBooking" class="form_box">
          <div class="error">
            {{ errorValue }}
          </div>
          <div class="success">
            {{ computedNoti }}
          </div>
          <div>
            <label for="guest_name">{{ $t('guestName') }}</label><br>
            <input type="text" v-model="guest_name" id="guest_name" name="guest_name" class="input-field">
          </div>
          <div>
            <label for="guest_number">{{ $t('guestNumber') }}</label><br>
            <input type="tel" v-model="guest_number" id="guest_number" name="guest_number" class="input-field">
          </div>
          <div class="date_input_box">
            <div class="date_input_container">
              <label for="arrive_date">{{ $t('arriveDate') }}</label><br>
              <input type="date" id="arrive_date" v-model="arrive_date" name="arrive_date" class="date_input">
            </div>
            <div class="date_input_container">
              <label for="leave_date">{{ $t('leaveDate') }}</label><br>
              <input type="date" id="leave_date" v-model="leave_date" name="leave_date" class="date_input">
            </div>
          </div>
          <div>
            <button type="submit" class="button">
              <div class="flex">
                <div class="lds-ring loading" :class="{ 'hidden': isPending }">
                  <!-- :class="{ 'active': isPending }" -->
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {{ $t('submit') }}
              </div></button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent,computed } from 'vue'
import axios from '../config'
import router from '@/router'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'CreateBookingView',
  layout: 'default',

  setup() {
    const route = useRoute()
    const guest_name = ref('')
    const guest_number = ref('')
    const arrive_date = ref('')
    const leave_date = ref('')
    const id = route.params.id
    const deviceWidth = ref(window.innerWidth)
    const err = ref('')
    const timer = ref(6)
    const noti = ref('')
    const isPending = ref(true)

    /**
     * Add booking
     * 
     * @return {void}
     */
    const addBooking = async () => {
      try {
        isPending.value = false
        const currentUser = await axios.post('/auth/me')
        await axios.post('booking/create-booking', {
          guest_name: guest_name.value,
          guest_number: guest_number.value,
          arrive_date: arrive_date.value,
          room_id: id,
          guest_id: currentUser.data.id,
          leave_date: leave_date.value
        })
        isPending.value = true
        err.value=''
        const interval = setInterval(() => {
          timer.value -= 1; // Decrease countdown by 1 every second
          noti.value = "Create booking successfully! Redirecting to home page in " + timer.value + " seconds";
          if (timer.value === 0) {
            clearInterval(interval); // Stop the interval when countdown reaches 0
            router.push('/'); // Redirect after countdown reaches 0
          }
        }, 1000);
      } catch (error) {
        err.value = error.response.data.message
        isPending.value = true
      } 
    }

    /**
     * Compute notification
     * 
     * @return {string}
     */
    const computedNoti = computed(() => {
      return noti.value
    })

    return {
      guest_name,
      guest_number,
      arrive_date,
      id,
      leave_date,
      addBooking,
      deviceWidth,
      err,
      computedNoti,
      isPending
    }
  },

  computed: {
    errorValue() {
      return this.err;
    }
  }
})
</script>

<style scoped>

.hidden {
    display: none;
  }
  
@media (min-width: 769px) {
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .date_input_box {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .date_input_container {
    width: 100%;
  }

  .hidden {
    display: none;
  }

  .booking_box {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 100px;
    box-shadow: 3px 3px 3px 3px rgb(248, 246, 246);
    width: 450px;
    background-color: rgb(248, 246, 246);
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    color: white;
    background-color: rgb(3, 53, 128);
    padding: 20px;
  }

  .form_box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .input-field {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    padding: 10px;
    font-size: 16px;
    border: none;
    background-color: rgb(227, 227, 227)
  }

  .date_input {
    width: 100%;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #ccc;
    height: 40px;
    border: none;
    padding: 10px;
    background-color: rgb(227, 227, 227)
  }

  .button {
    width: 100%;
    background-color: rgb(258, 187, 0);
    border: none;
    border-radius: 3px;
    height:30px
  }
}

@media (max-width:768px) {
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .date_input_box {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .date_input_container {
    width: 100%;
  }

  .booking_box {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 100px;
    box-shadow: 3px 3px 3px 3px rgb(248, 246, 246);
    width: 100%;
    background-color: rgb(248, 246, 246);
  }

  .title {
    font-size: 30px;
    font-weight: bold;
    color: white;
    background-color: rgb(3, 53, 128);
    padding: 20px;
  }

  .form_box {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .input-field {
    width: 100%;
    height: 40px;
    border-radius: 3px;
    padding: 10px;
    font-size: 16px;
    border: none;
    background-color: rgb(227, 227, 227)
  }

  .date_input {
    width: 100%;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #ccc;
    height: 40px;
    border: none;
    padding: 10px;
    background-color: rgb(227, 227, 227)
  }

  .button {
    width: 100%;
    background-color: rgb(258, 187, 0);
    border: none;
    border-radius: 3px;
    height: 30px;
  }
}
</style>
