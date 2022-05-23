<template>  
  
  <div class="container">
      <SectionTitle title="Enregistrement nouveau utilisateur"/>
      <div class="flex-container ">
        <Form @submit="register" :validation-schema="schema">               
            <div class="input-group">
                <label for="firstname">Prénom</label>
                <Field v-model="form.firstname" id="firstname" name="firstname" type="text" class="form-input" 
                    placeholder="Entrer le nom" aria-label="nom" />
                <ErrorMessage name="firstname" class="form-error" />
            </div>

            <div class="input-group">
                <label for="lastname">Nom</label>
                <Field v-model="form.lastname" id="lastname" name="lastname" type="text" class="form-input" 
                    placeholder="Entrer le prenom" aria-label="prénom" />
                <ErrorMessage name="lastname" class="form-error" />
            </div>

            <div class="input-group">
                <label for="username">Nom d'utilisateur</label>
                <Field v-model="form.username" id="username" name="username" type="text" class="form-input" 
                      placeholder="Entrer le nom d'utilisateur" aria-label="nom utilisateur" />
                <ErrorMessage name="username" class="form-error" />
            </div>

            <div class="input-group">
                <label for="email">Email</label>
                <Field v-model="form.email" id="email" name="email" type="email" class="form-input" 
                      placeholder="Entrer l'email" aria-label="email" />
                <ErrorMessage name="email" class="form-error" />
            </div>

            <div class="input-group">
                <label for="password">Mot de passe</label>
                <Field v-model="form.password" id="password" name="password" type="password" class="form-input" 
                      placeholder="Entrer le mot de passe" aria-label="mot de passe"/>
                <ErrorMessage name="password" class="form-error" />
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn-default btn-block">S'enregistrer</button>
            </div>

            <div v-if="message" class="alert-error"
            >
              {{ message }}
            </div>  
        </Form>
      </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import SectionTitle from "@/components/SectionTitle.vue";

export default {
  name: "RegisterUser",
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
        .required('Le nom d\'utilisateur est obligatoire!')
        .min(3, 'Il doit contenir minimum 3 caractères!')
        .max(20, 'Il doit contenir maximum 20 caractères!'),
      email: yup
        .string()
        .required('L\'addresse email est obligatoire !')
        .email('L\'addresse email est invalide!')
        .max(40, 'Elle doit contenir maximum 40 caractères!')
        .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Doit être une addresse email valide'),
      password: yup
        .string()
        .required('Le mot de passe est obligatoire!')
        .min(8, 'Il doit contenir minimum 8 caractères!')
        .max(40, 'Il doit contenir maximum 40 caractères!')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/, 'Il doit avoir au moins : 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 symbol.'),
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
      this.$store.dispatch('auth/register', this.form).then(
        data => {
          this.message = data.message;
          this.$router.push('/login');
        },
        error => {
          this.message = error.response?.data?.message || error.toString()
          setTimeout(() => this.message = '', 5000);
        }
      );
    },
  },
}

</script>
