<template>
<main class="col-full"> 
  <section class="post-list">
    <div class="list-title">
      <img src="../assets/logos/icon.png" alt="le logo de groupomania" class="logo-icon">
      <h1>Groupomania - Le réseau social, tous les messages</h1>
    </div>
      <!-- <h2 class="list-title">{{ postslength }}</h2>  -->
    <template v-if="!posts || !posts.length">
      <article >
          <h2>Il n'y a aucun post</h2>
      </article>
    </template>
    <template v-else>
      <article v-for="post in posts" :key="post.id" @click="clickPost(post.id)" class="post" >
        <div>
          <h2>{{ post.postTitle }}</h2>
        </div>
        <div>
          <p>{{ post.postContent }}</p>
        </div>
          <p class="text-faded text-xsmall bloc-comment">
            <!-- De {{ userById(post.userId).username }} -->
            de {{ post.postCreator }}, le {{ post.updatedAt }} 
          </p>
      </article>
    </template>    
  </section>
  <section class="col-full">  
    <div
        v-if="message"
        :class="loadingStatus !== 'failure' ? 'alert-success' : 'alert-error'"
      >
        {{ message }}
      </div>  
  </section>
</main>
  
</template>

<script>

import { mapState} from 'vuex'
export default {
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