<template>
  <div class="body">
    <div class="contact">
      <h3>{{ $t('contact') }}</h3>
      <ul class="list-unstyled">
        <li>123 Main St</li>
        <li>Anytown, USA 12345</li>
        <li>Phone: (123) 456-7890</li>
        <li>Email: info@example.com</li>
      </ul>
    </div>
    <div class="connect">
      <h3>{{ $t('connect') }}</h3>
      <ul class="list">
        <li><a href="#"><i class="bi bi-facebook"></i></a></li>
        <li><a href="#"> <i class="bi bi-twitter"></i></a></li>
        <li><a href="#"> <i class="bi bi-instagram"></i></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookingFooter',
}
</script>

<style scoped>
.body {
  display: flex;
  background-color: #003580;
  color: #fff;
  padding: 20px;
  justify-content: space-evenly;
}

.contact {
  align-items: center;
}

.connect {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
