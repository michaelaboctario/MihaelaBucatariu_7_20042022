<template>  
  <h1 class="text-center">Groupomania</h1>
  <div class="container">

      <div class="flex-container justify-center">
          <div class="col-7">
              <form @submit.prevent="register" class="card card-form">
                  <h2 class="text-center">Register</h2>

                  <div class="input-group">
                      <label for="firstname">Prénom</label>
                      <input v-model="form.firstname" id="firstname" type="text" class="form-input">
                  </div>

                  <div class="input-group">
                      <label for="lastname">Nom</label>
                      <input v-model="form.lastname" id="lastname" type="text" class="form-input">
                  </div>

                  <div class="input-group">
                      <label for="username">Nom d'utilisateur</label>
                      <input v-model="form.username" id="username" type="text" class="form-input">
                  </div>

                  <div class="input-group">
                      <label for="email">Email</label>
                      <input v-model="form.email" id="email" type="email" class="form-input">
                  </div>

                  <div class="input-group">
                      <label for="password">Mot de passe</label>
                      <input v-model="form.password" id="password" type="password" class="form-input">
                  </div>

                  <div class="form-actions">
                      <button type="submit" class="btn-blue btn-block">Register</button>
                  </div>

              </form>
          </div>
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      form: {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    register() {
      console.log("register")
      console.log(this.form)
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", this.form).then(
        data => {
          console.log(data)
          this.message = data.message;
          this.successful = true;
          this.loading = false;
           //this.$router.push('/')
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
