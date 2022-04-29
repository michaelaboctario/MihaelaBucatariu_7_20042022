<template>

  <header class="header" id="header">
     <nav class="navbar">
      <ul>
        <li v-if="authUser"><router-link to="/">Home</router-link></li>
        <li v-if="authUser">
            <router-link to="/posts/create">
              Créer post
            </router-link> 
            <!-- <router-link
                :to="{name:'PostCreate', params: {idAuthUser: this.authUser.id}}"
                class="btn-green btn-small"
            >Créer post
            </router-link> -->
        </li>
        <li v-if="!authUser"><router-link to="/register">Register</router-link></li>
        <li v-if="!authUser"><router-link to="/login">Login</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
 /*
 mounted() {
   console.log("mounted navbar")
   console.log(this.$store)
   console.log(this.$store.auth)
   console.log(this.authUser)
 },
 */
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
}
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }

.navbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.navbar ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.navbar li {
    padding: 10px 20px;
    text-decoration: none;
    font-size: 18px;
}
</style>
