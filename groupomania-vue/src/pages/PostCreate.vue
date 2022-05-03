<template>
  <div class="col-full push-top">
    <div class="list-title">
        <img src="../assets/logos/icon.png" alt="le logo de groupomania" class="logo-icon">
        <h1>Création d'un post</h1>
    </div>

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
          v-model="content"
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
      <div
        v-if="message"
        :class="loadingStatus !== 'failure' ? 'alert-success' : 'alert-error'"
      >
        {{ message }}
      </div> 
    </Form>
  </div>
</template>
<script>

import { Form, Field } from "vee-validate";
import { mapGetters, mapState } from 'vuex';

export default {

  components: {
    Form,
    Field,
  },
  data () {
    return {
      successful: false,
      title: '',
      content: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapState({
        message: state => state.posts.message,
        loadingStatus: state => state.posts.loadingStatus
    }), 
  },
  methods: {
    save () {
      this.successful = false;
      const post = {
          postTitle: this.title, 
          postContent: this.content, 
          postCreator: this.authUser.username, 
          userId: this.authUser.id
      }
      this.$store.dispatch('posts/createPost', post).then(
        () => {
          this.successful = true;
          this.$router.push('/posts');
        },
      );
    },
    cancelEdit () {
        this.$router.push('/posts');
    }
  },
}
</script>