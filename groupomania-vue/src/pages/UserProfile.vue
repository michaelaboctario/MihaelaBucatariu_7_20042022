<template>
<div class="flex-container">
  <main class="post-card__container">
      <SectionTitle title="Mon compte utilisateur"/>
       
        <Form @submit="save" :validation-schema="schema"> 
            <div class="input-group__image">
                <div class="profile__image">
                <!-- <img :src="userProfile.imageUrl" alt="Photo de profil"> -->
                    <img src="../assets/logos/user-profile.png" alt="Photo de profil"> 
                </div>
                                <!-- Modification de l'image -->
                <div class="select__image">
                    <label for="choose-image">
                        <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'pen' }" class="profile-fa-icon"/>
                    </label>
                    <input type="file" name="choose-image" id="choose-image" class="" accept=".png, .jpg, .jpeg" aria-label="Choisir une image de profil" @change="updateImage"/>
                </div> 
            </div>      

            <div class="input-group">
                <label for="firstname">Prénom</label>
                <Field v-model="form.firstname" id="firstname" name="firstname" type="text" class="form-input" required/>
                <ErrorMessage name="firstname" class="form-error" />
            </div>

            <div class="input-group">
                <label for="lastname">Nom</label>
                <Field v-model="form.lastname" id="lastname" name="lastname" type="text" class="form-input" required/>
                <ErrorMessage name="lastname" class="form-error" />
            </div>

            <div class="input-group">
                <label for="email">Email</label>
                <Field v-model="form.email" id="email" name="email" type="email" class="form-input" readonly/>
                <ErrorMessage name="email" class="form-error" />
            </div>
            
            <div class="form-actions">
                <button type="submit" class="btn-default btn-block">Enregistrer</button>
            </div>

            <div
                v-if="message"
                :class="successful ? 'alert-success' : 'alert-error'"
                >
                {{ message }}
            </div>  
        </Form>
    </main>
    <FooterItem />
 </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue';
import FooterItem from '@/components/FooterItem.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapGetters, mapState } from 'vuex';

export default {
  name: "UserProfile",  
  components: {
    Form,
    Field,
    ErrorMessage,  
    SectionTitle,
    FooterItem,
  },
  data () {
    const schema = yup.object().shape({
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
      schema,
      form: {
        firstname: '',
        lastname: '',
        email: '',
      }
    }
  },
 
  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapState({
        currentUser: state => state.users.userCurrentItem,
        message: state => state.users.message,
        loadingStatus: state => state.users.loadingStatus,
    }),
    connectedUser() { return this.authUser.id },     
  },
  mounted() {
      console.log("mounted")
      console.log(this.connectedUser)
      this.$store.dispatch('users/getOneUser', this.connectedUser).then(
      data => {
        console.log("'users/getOneUser", data)
        this.successful = true
        this.form.firstname = data.firstname
        this.form.lastname = data.lastname
        this.form.email = data.email
      },
      () => {
        this.successful = false
      }
    );
  },
  methods: {
    save () {
      this.successful = false
      const user = { ...this.currentUser, 
          firstname: this.form.firstname, 
          lastname: this.form.lastname, 
      }
      this.$store.dispatch('users/updateUser', {user}).then(
        () => {
          this.successful = true;
          this.$router.push('/users');
        }
      );
    },
  },
}
</script>

<style scoped>
    .input-group__image, 
    .select__image {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .profile__image img {
        width: 110px;
        height: 110px;
       /*  width: 110px;
        height: 110px; */
    }
    .profile-fa-icon {
        display: inline-block;
        width: 28px;
        height: 28px;
        margin-right: 10px;
       /*  width: 110px;
        height: 110px; */
    }


</style>