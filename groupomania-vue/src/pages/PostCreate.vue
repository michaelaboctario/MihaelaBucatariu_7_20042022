<template>
  <main class="post-card__container">
    <HeaderItem />
<!--     <PostItem :isReadOnly="false" @publish.once="save"></PostItem> -->
    <section class="post-card__group">
      <PostItem
          v-model:title="title"
          v-model:content="content" 
          :isReadOnly="false" 
          :canDelete="false" 
          @publish.once="save"
          @cancel-edit.once="cancelEdit">
      </PostItem>
    </section>
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
import HeaderItem from '../components/HeaderItem.vue';

export default {
  components: {
    PostItem,
    HeaderItem
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