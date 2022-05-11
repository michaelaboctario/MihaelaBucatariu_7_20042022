<template>  
  
  <div class="container">
      <HeaderItem title="Enregistrement nouveau utilisateur"/>
      <div class="flex-container ">
          <div class="col-7">
              <!-- <h1 class="text-center">Groupomania</h1> -->
              <Form @submit="register" :validation-schema="schema">               
                  <!-- <h2 class="text-center">Enregistrement nouveau utilisateur</h2> -->
                  
                  <div class="input-group">
                      <label for="firstname">Prénom</label>
                      <Field v-model="form.firstname" id="firstname" name="firstname" type="text" class="form-input" />
                      <ErrorMessage name="firstname" class="form-error" />
                  </div>

                  <div class="input-group">
                      <label for="lastname">Nom</label>
                      <Field v-model="form.lastname" id="lastname" name="lastname" type="text" class="form-input" />
                      <ErrorMessage name="lastname" class="form-error" />
                  </div>

                  <div class="input-group">
                      <label for="username">Nom d'utilisateur</label>
                      <Field v-model="form.username" id="username" name="username" type="text" class="form-input" />
                      <ErrorMessage name="username" class="form-error" />
                  </div>

                  <div class="input-group">
                      <label for="email">Email</label>
                      <Field v-model="form.email" id="email" name="email" type="email" class="form-input" />
                      <ErrorMessage name="email" class="form-error" />
                  </div>

                  <div class="input-group">
                      <label for="password">Mot de passe</label>
                      <Field v-model="form.password" id="password" name="password" type="password" class="form-input" />
                      <ErrorMessage name="password" class="form-error" />
                  </div>
                  
                  <div class="form-actions">
                      <button type="submit" class="btn-blue btn-block">S'enregistrer</button>
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
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import HeaderItem from "@/components/HeaderItem.vue";

export default {
  name: "RegisterUser",
  components: {
    Form,
    Field,
    ErrorMessage,
    HeaderItem
},
  data () {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required('Le nom d\'utilisateur est obligatoire!')
        .min(3, 'Il doit contenir minimum 3 caractères!')
        .max(20, 'Il doit contenir maximum 20 caractères!'),
      email: yup
        .string()
        .required('L\'addresse email est obligatoire !')
        .email('L\'addresse email est invalide!')
        .max(50, 'Elle doit contenir maximum 50 caractères!'),
      password: yup
        .string()
        .required('Le mot de passe est obligatoire!')
        .min(8, 'Il doit contenir minimum 8 caractères!')
        .max(40, 'Il doit contenir maximum 40 caractères!'),
      firstname: yup
        .string()
        .required('Le nom de l\'utilisateur est obligatoire!')
        .min(3, 'Il doit contenir minimum 3 caractères!')
        .max(40, 'Il doit contenir maximum 40 caractères!'),
      lastname: yup
        .string()
        .required('Le prénom de l\'utilisateur est obligatoire!')
        .min(3, 'Il doit contenir minimum 3 caractères!')
        .max(40, 'Il doit contenir maximum 40 caractères!'),  
    });
    return {
      successful: false,
      message: '',  
      schema,
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
      this.message = '';
      this.successful = false;
      this.$store.dispatch('auth/register', this.form).then(
        data => {
          //console.log(data)
          this.message = data.message;
          this.successful = true;
          this.$router.push('/login');
        },
        error => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          //console.log(this.message);
        }
      );
    },
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
