<template>
  <!-- <LoginUser /> -->
  <RegisterUser />
</template>

<script>
import RegisterUser from './pages/RegisterUser.vue'
//import LoginUser from './pages/LoginUser.vue'

export default {
  name: 'App',
  components: {
    RegisterUser,
    //LoginUser,
}
}
</script>

<style>
@import "assets/style.css";
</style>
