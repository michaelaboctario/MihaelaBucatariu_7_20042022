<template>
  <div class="col-full">
    <div class="post-list">
      <div class="list-title">
        <img src="../assets/logos/icon.png" alt="le logo de groupomania" class="logo-icon">
        <h1>Posts</h1>
      </div>
      <!-- <h2 class="list-title">{{ postslength }}</h2>  -->
      <template v-if="!posts || !posts.length">
        <div >
            <h2>Il n'y a aucun post</h2>
        </div>
      </template>
      <template v-else>
        <div v-for="post in posts" :key="post.id" @click="clickPost(post.id)" class="post" >
        <div>
          <h2>{{ post.posttitle }}</h2>
        </div>
        <div>
          <p>{{ post.postcontent }}</p>
        </div>
         <p class="text-faded text-xsmall bloc-comment">
            <!-- De {{ userById(post.userId).username }} -->
            de {{ post.postcreator }}, le {{ post.updatedAt }} 
         </p>
      </div>
      </template>    
    </div>
    <div
        v-if="message"
        :class="loadingStatus !== 'failure' ? 'alert-success' : 'alert-error'"
      >
        {{ message }}
      </div>  
  </div>
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