<template>
  <div class="col-full">
    <div class="post-list">
      <div class="list-title">
        <h1>Posts</h1>
      </div>
      <!-- <h2 class="list-title">{{ posts.length }}</h2> -->
      <!-- <div v-for="post in postsL" :key="post.id" class="posts">
            <p>{{ post.posttitle }}</p>
            <p>{{ post.postcontent }}</p>
      </div> -->
      <div v-if="!posts.length">
        <h2>Il n'y a aucun post</h2>
      </div>
      <div v-for="post in posts" :key="post.id" class="post">
        <div>
          <h2>{{ post.posttitle }}</h2>
        </div>
        <div>
          <p>{{ post.postcontent }}</p>
        </div>
         <p class="text-faded text-xsmall bloc-comment">
            <!-- De {{ userById(post.userId).username }} -->
            De {{ post.postcreator }}
          </p>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState} from 'vuex'
export default {
/*    
  methods: {
    postById (postId) {
      return this.posts.find(p => p.id === postId)
    },
    userById (userId) {
      return this.users.find(p => p.id === userId)
    }
  }
*/
    computed: mapState({
        posts: state => state.posts.items
    }),
    /* computed: {
        posts: function() {
            console.log("posts")
            console.log(this.$store.state.posts.items)
            return this.$store.state.posts.items
        },
    }, */
    created () {
        this.$store.dispatch('posts/getAllPost')
    },
}
</script>

<style scoped>

</style>