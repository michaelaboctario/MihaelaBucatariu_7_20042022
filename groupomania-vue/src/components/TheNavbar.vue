<template>

  <header class="header" id="header">
     <nav class="navbar" :class="{ responsive: isResponsive }" id="navbar">
      <ul>    
        <li>
          <router-link :to="{name: 'HomePage'}" >
            <div class="img__logo-icon-left">
              <img src="../assets/logos/icon-left-font.png" class="nav-bar__logo-icon-left" alt="le logo de Groupomania">
            </div>
          </router-link>
        </li>
        <li v-if="authUser"><router-link to="/posts">Messages</router-link></li>
        <li v-if="authUser"><router-link to="/posts/create">Publier</router-link></li>     
        <li v-if="authUser"><router-link to="/users">Utilisateurs</router-link></li>  
        <li v-if="authUser"><router-link to="/profile">Profil</router-link></li>        
        <li v-if="!authUser"><router-link to="/register">Enregistrement</router-link></li>
        <li v-if="!authUser"><router-link to="/login">Connexion</router-link></li>
        <li  v-if="authUser">
          <a href="#" @click="logout" aria-label="le lien de deconnexion">
            Déconnexion
          </a>
        </li>
        <li class="li-fa-icon">
          <div class="link__nav-fa-icon">
              <a href="#" @click.prevent="toggleResponsive" class="nav-fa-icon" aria-label="le logo de modification de l'apparence du menu">
                <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'bars' }" />
              </a>
          </div>
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
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    toggleResponsive() {
      this.isResponsive = !this.isResponsive;
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
  height: 80px;
}

.navbar li:not(:first-child) {
  padding: 0 20px;
}

.navbar a {
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 24px;
  line-height: 80px; 
}

.nav-fa-icon {
  text-align: center;
  font-size: 17px;
  float: right;
  padding: 0 20px;
}

.navbar li:hover {
  background-color: rgba(248, 200, 200, 0.3);
}

.navbar li:hover:not(:first-child) {
  padding: 0 20px; 
}

.navbar li.active {
  background-color: #545454;
  color: white;
}

.navbar li.li-fa-icon {
  display: none;
}

.img__logo-icon-left, .link__nav-fa-icon {
  float: none;
}

.nav-bar__logo-icon-left {
    display: block;
    height: 80px;
    width: 200px;
    object-fit: cover;
    filter: opacity(0.9) saturate(8);
}

@media screen and (max-width: 768px) {
    .nav-bar__logo-icon-left {
        height: 60px;
        width: 140px;
        float: left;
    }
    .navbar li {
      height: 60px;
    }
    .navbar a {
      line-height: 60px;
    }
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
