<template>
  <div class="min-vh">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
 
}
</script>

<style scoped>
.min-vh {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
