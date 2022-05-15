<template>

  <header class="header" id="header">
     <nav class="navbar" :class="{ responsive: isResponsive }" id="navbar">
      <ul>    
        <li class="active"><router-link to="/" >Accueil</router-link></li>
        <li v-if="authUser"><router-link to="/posts">Messages</router-link></li>
        <li v-if="authUser"><router-link to="/posts/create">Publier</router-link></li>     
        <li v-if="authUser"><router-link to="/users">Utilisateurs</router-link></li>      
        <li v-if="!authUser"><router-link to="/register">Enregistrement</router-link></li>
        <li v-if="!authUser"><router-link to="/login">Connexion</router-link></li>
        <li  v-if="authUser">
          <a @click="logout">
            Déconnexion
          </a>
        </li>
        <li class="li-fa-icon">
          <a href="#" @click="toggleResponsive" class="nav-fa-icon">
           <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'bars' }" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isResponsive: false,
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    logout() {
      console.log("logout");
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    toggleResponsive() {
      console.log("toggle responsive");
      this.isResponsive = !this.isResponsive;
      return false;   //return false from onclick event handler to prevent the link being followed and scrolling up to the top of the page.
    },
  },
}
</script>

<style scoped>
.navbar {
  overflow: hidden;
  background-color: #8f1f28;
}

.navbar li {
  float: left;
  display: block;
  padding: 14px 16px;
}

.navbar a {
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
}

.nav-fa-icon {
  text-align: center;
  padding: 14px 16px;
  font-size: 17px;
}

.navbar li:hover {
  background-color: #ddd;
  color: black;
}

.navbar li.active {
  background-color: #545454;
  color: white;
}

.navbar li.li-fa-icon {
  display: none;
}

@media screen and (max-width: 768px) {
  .navbar li:not(:first-child) {
    display: none;
  }
  .navbar li.li-fa-icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 768px) {
  .navbar.responsive {position: relative;}
  .navbar.responsive .li-fa-icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .navbar.responsive li {
    float: none;
    display: block;
    text-align: left;
  }
}

</style>
