<template>
  <main class="col-full push-top">
    <section class="list-title">
        <img src="../assets/logos/icon.png" alt="le logo de Groupomania" class="logo-icon">
        <h1>Nouveau message</h1>
    </section>
<!--     <PostItem :isReadOnly="false" @publish.once="save"></PostItem> -->
    <PostItem
        v-model:title="title"
        v-model:content="content" 
        :isReadOnly="false" 
        @publish.once="save"
        @cancel-edit.once="cancelEdit">
    </PostItem>
    <section
      v-if="message"
      :class="loadingStatus !== 'failure' ? 'alert-success' : 'alert-error'"
    >
      {{ message }}
    </section> 
  </main>
</template>
<script>

import { mapGetters, mapState } from 'vuex';
import PostItem from '@/components/PostItem.vue';

export default {
  components: {
    PostItem,
},
  data () {
    return {
      successful: false,
      title: '',
      content: '',
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
    save ({title, content}) {
      this.successful = false;
      console.log('newPost', title, content)
      const post = {
          postTitle: title, 
          postContent: content, 
          postCreator: this.authUser.username, 
          userId: this.authUser.id
      }
      console.log('post', post)
      this.$store.dispatch('posts/createPost', {post}).then(
        () => {
          this.successful = true;
          this.$router.push('/posts');
        },
      );
    },
    cancelEdit () {
        console.log('cancel')
        this.$router.push('/posts');
    }
  },
}
</script>