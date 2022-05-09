<template>

  <header class="header" id="header">
     <nav class="navbar">
      <ul>
        <li>
          <!-- <router-link :to="{name: 'HomePage'}" class="logo">
            <img src="../assets/logos/icon.svg">
          </router-link> -->
          <router-link :to="{name: 'HomePage'}" >
            <img src="../assets/logos/icon-left-font.png" class="logo-icon-left" alt="le logo de Groupomania">
          </router-link>
        </li>
        <li v-if="authUser"><router-link to="/posts">Tous les messages</router-link></li>
        <li v-if="authUser"><router-link to="/posts/create">Nouveau message</router-link></li>        
        <li v-if="!authUser"><router-link to="/register">Enregistrement</router-link></li>
        <li v-if="!authUser"><router-link to="/login">Connexion</router-link></li>
        <li  v-if="authUser">
          <a @click="logout">
            Déconnexion
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
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
