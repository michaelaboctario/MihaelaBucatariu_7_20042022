<template>
  <div class="col-full push-top">
    <h1>
      Création d'un post
    </h1>

    <Form @submit="save">
      <div class="input-group">
        <label for="post_title">Titre:</label>
        <Field
          v-model="title"
          type="text"
          id="post_title"
          class="form-input"
          name="title"
        />
      </div>

      <div class="input-group">
        <label for="post_content">Contenu:</label>
        <textarea
          v-model="text"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        ></textarea>
      </div>

      <div class="btn-group">
        <button class="btn btn-ghost" type="button" @click="cancelEdit" name="Cancel">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publier">
          Publier
        </button>
      </div>
    </Form>
  </div>
</template>
<script>

import { Form, Field } from "vee-validate";
import { mapGetters } from 'vuex';

export default {

  components: {
    Form,
    Field,
  },
  data () {
    return {
      title: '',
      text: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
  },
  methods: {
    save () {
        const post = {
            posttitle: this.title, 
            postcontent: this.text, 
            postcreator: this.authUser.username, 
            userId: this.authUser.id
        }
        this.$store.dispatch('posts/createPost', post)
        this.$router.push('/posts');
    },
    cancelEdit () {
        this.$router.push('/posts');
    }
  },
  //mounted() {
      //console.log("mounted postcreate")
      //console.log(this)
      //console.log(this.authUser)
  //},
}
</script>