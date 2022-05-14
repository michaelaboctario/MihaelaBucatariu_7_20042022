<template>
  <HeaderItem />
  <main class="post-card__container"> 
    <section class="post-card__group">
      <template v-if="!posts || !posts.length">
        <article >
          <h3 class="post-card__message">Il n&rsquo;y a aucun message</h3>
        </article>
      </template>
      <template v-else>
        <article v-for="post in posts" :key="post.id" @click="clickPost(post.id)" class="post-item visual-hover" >
            <h3 class="post-item__title">{{ post.postTitle }}</h3>
            <p class="post-item__content">{{ post.postContent }}</p>
            <p class="post-item__author">
              <!-- De {{ userById(post.userId).username }} -->
              de {{ post.postCreator }}, le {{ post.updatedAt }} 
            </p>
        </article>
      </template>    
    </section>
    <section class="post-card__error-message">  
      <div
          v-if="message"
          :class="loadingStatus !== 'failure' ? 'alert-success' : 'alert-error'"
        >
          {{ message }}
        </div>  
    </section>
</main>
  <FooterItem />
</template>

<script>

import { mapState} from 'vuex'
import HeaderItem from '@/components/HeaderItem.vue'
import FooterItem from '@/components/FooterItem.vue'

export default {
    components: {
    HeaderItem,
    FooterItem
},
    computed: mapState({
        posts: state => state.posts.items,
        postslength: state => state.posts.items.length,
        message: state => state.posts.message,
        loadingStatus: state => state.posts.loadingStatus
    }), 
    created () {
        this.$store.dispatch('posts/getAllPost').then(
        () => {
          this.successful = true;
          //this.$router.push('/posts');
        },
        () => {
          this.successful = false;
        }
      );
    },
    methods: {
        clickPost(postid) {
            //this.$router.push('/post');
            console.log(postid)
            this.$router.push({ name: 'PostEdit', params: { id: postid } })
        }
    },
}
</script>
<style scoped>

</style>