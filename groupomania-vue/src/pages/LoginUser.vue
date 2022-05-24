<template>  
  <main class="flex-container"> 
    <SectionTitle title="Connexion utilisateur"/>
        <Form @submit="handleLogin" :validation-schema="schema">               
            <div class="input-group">
                <label for="username">Nom d'utilisateur</label>
                <Field v-model="form.username" id="username" name="username" type="text" class="form-input" 
                        placeholder="Entrer le nom d'utilisateur" aria-label="nom d'utilisateur" />
                <ErrorMessage name="username" class="form-error" />
            </div>

            <div class="input-group">
                <label for="password">Mot de passe</label>
                <Field v-model="form.password" id="password" name="password" type="password" class="form-input" 
                        placeholder="Entrer le mot de passe" aria-label="mot de passe" />
                <ErrorMessage name="password" class="form-error" />
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn-default btn-block">Se connecter</button>
            </div>

            <div
              v-if="message" class="alert-error"
            >
              {{ message }}
            </div>  
        </Form>
   </main>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import SectionTitle from '@/components/SectionTitle.vue';

export default {
  name: 'LoginUser',
  components: {
    Form,
    Field,
    ErrorMessage,
    SectionTitle
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
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          this.$router.push('/');
        },
        error => {
          this.message = error.response?.data?.message || error.toString()
          setTimeout(() => this.message = '', 5000);
        }
      )
    },
  },
}

</script>
