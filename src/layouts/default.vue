<template>
  <div class="min-vh">
    <BookingHeader />
    <router-view />
    <BookingFooter class="footer" />
  </div>
</template>

<script>
import BookingHeader from '@/components/BookingHeader.vue'
import BookingFooter from '@/components/BookingFooter.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: {
    BookingHeader,
    BookingFooter
  }
})
</script>

<style scoped>
.footer {
  margin-top: auto;
}

.min-vh {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
