<template>
  <!-- <LoginUser /> -->
  <!-- <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/register">Register</router-link>
    <router-link to="/login">Login</router-link>
  </div> -->
  <TheNavbar />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';

export default {
    name: "App",
    components: { TheNavbar }
}
</script>

<style>
@import "assets/style.css";
</style>
