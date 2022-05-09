<template>  
  <div class="container">
      <div class="flex-container justify-center">    
          <div class="col-7">
              <!-- print form values -->
              <!-- <Form @submit="register" :validation-schema="schema" v-slot="{ values }">               
                  <pre>{{ values }}</pre> -->
              <h1 class="text-center">Groupomania</h1>    
              <Form @submit="handleLogin" :validation-schema="schema">               
                  <h2 class="text-center">Connexion</h2>

                  <div class="input-group">
                      <label for="username">Nom d'utilisateur</label>
                      <Field v-model="form.username" id="username" name="username" type="text" class="form-input" />
                      <ErrorMessage name="username" class="form-error" />
                  </div>

                  <div class="input-group">
                      <label for="password">Mot de passe</label>
                      <Field v-model="form.password" id="password" name="password" type="password" class="form-input" />
                      <ErrorMessage name="password" class="form-error" />
                  </div>
                  
                  <div class="form-actions">
                      <button type="submit" class="btn-blue btn-block">Se connecter</button>
                  </div>

                  <div
                    v-if="message"
                    :class="successful ? 'alert-success' : 'alert-error'"
                  >
                    {{ message }}
                  </div>  
              </Form>
          </div>
      </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
  name: 'LoginUser',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data () {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required('Le nom d\'utilisateur est obligatoire!'),
      password: yup
        .string()
        .required('Le mot de passe est obligatoire!'),
    });
    return {
      successful: false,
      message: '',  
      schema,
      form: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          this.$router.push('/');
        },
        error => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
