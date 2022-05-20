<template>
<div class="flex-container">
  <main class="post-card__container">
      <SectionTitle />
      <section>
        <PostItem
            v-model:title="title"
            v-model:content="content" 
            :isReadOnly="false" 
            :canDelete="false"
            :canComment="false" 
            @publish.once="save"
            @cancel-edit.once="cancelEdit">
        </PostItem>
      </section>
      <section v-if="message"
        class="alert-error"
      >
        {{ message }}
      </section> 
  </main>
  <FooterItem />
</div>
</template>
<script>

import { mapGetters, mapState } from 'vuex';
import PostItem from '@/components/PostItem.vue';
import SectionTitle from '@/components/SectionTitle.vue';
import FooterItem from '@/components/FooterItem.vue';

export default {
  components: {
    PostItem,
    SectionTitle,
    FooterItem,
},
  data () {
    return {
      title: '',
      content: '',
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapState({
        message: state => state.posts.message,    //le message d'erreur est recupéré du store
    }), 
  },
  methods: {
    save ({title, content}) {
      const post = {
          postTitle: title, 
          postContent: content, 
          postCreator: this.authUser.username, 
          userId: this.authUser.id
      }
      this.$store.dispatch('posts/createPost', {post}).then(
        () => this.$router.push('/posts'),
      );
    },
    cancelEdit () {
        this.$router.push('/posts')
    }
  },
}
</script>