<template>
  <div class="col-full push-top">
    <p class="text-faded text-xsmall bloc-comment">
      Utilisateur connecté {{ connectedUser }} 
    </p>
    <p class="text-faded text-xsmall bloc-comment">
      Post de {{ postAuthor }} 
    </p>
  </div>
  <div class="col-full push-top">
    <h1>Modification post</h1>
    <!-- <h2>{{ this.$route.params.id }}</h2> -->
    <PostItem
        v-model:title="title"
        v-model:content="content" 
        :isReadOnly="false" 
        @publish.once="save"
        @cancel-edit.once="cancelEdit">
    </PostItem>
<!--     <template v-if="!isHisOwnPost">
    <Form @submit="publish">
      <div class="comment-group">
          <div class="input-group">
            <label for="comment-content">Commenter:</label>
            <textarea
              v-model="comment"
              id="comment_content"
              class="form-input comment-content"
              name="comment"
              rows="4"
              cols="120"       
          ></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-blue" type="submit" name="Publier">
            Publier
          </button>
        </div>
      </div>
    </Form>
    </template>  -->    
    <CommentItem
        v-model:content="comment" 
        :isReadOnly="false" 
        @publishComment.once="publishComment"
        @cancel-edit.once="cancelEdit">
    </CommentItem>
    <div>
      Response
    </div>  
    <div
      v-if="messageComments"
      :class="loadingCommentsStatus !== 'failure' ? 'alert-success' : 'alert-error'"
    >
      {{ messageComments }}
    </div> 
  </div>
</template>
<script>

import { mapGetters, mapState } from 'vuex';
import PostItem from '../components/PostItem.vue';
import CommentItem from '../components/CommentItem.vue';

export default {
  components: {
    PostItem,
    CommentItem,
  },
  data () {
    return {
      successful: false,
      title: '',
      content: '', 
      comment: '',
      userId: ''
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser']),
    ...mapState({
        message: state => state.posts.message,
        loadingStatus: state => state.posts.loadingStatus,
        currentItem: state => state.posts.currentItem,
        messageComments: state => state.comments.message,
        loadingCommentsStatus: state => state.comments.loadingStatus,
    }),
    isHisOwnPost() { return this.authUser.id === this.userId },
    connectedUser() {return `${this.authUser.firstname} ${this.authUser.lastname}`},
    postAuthor () {return this.currentItem ? `${this.currentItem.user.firstname} ${this.currentItem.user.lastname}` : ''  }
    //postId() this.$route.params.id,
  },
  created () {
      console.log("created")
      console.log(this.$route.params.id)
      this.$store.dispatch('posts/getOnePost', this.$route.params.id).then(
      data => {
        console.log("posts/getOnePost", data)
        this.successful = true;
        this.title = data.postTitle;
        this.content = data.postContent;
        this.userId = data.userId;
        //this.$router.push('/posts');
      },
      () => {
        this.successful = false;
      }
    );
  },
  methods: {
    save () {
      this.successful = false;
      const post = {
          postTitle: this.title, 
          postContent: this.content,
          userId: this.authUser.id,
          id: this.$route.params.id,
      }
      this.$store.dispatch('posts/updatePost', {post}).then(
        () => {
          this.successful = true;
          this.$router.push('/posts');
        }
      );
    },
    cancelEdit () {
        this.$router.push('/posts');
    },
    // for  comment form
    publishComment () {
      this.successful = false;
      const comment = { 
          commentContent: this.comment, 
          //postId: this.$route.params.id,
          userId: this.authUser.id,
      }
      console.log('publishComment', comment);
      this.$store.dispatch('comments/createComment', {comment, postId: this.$route.params.id}).then(
        () => {
          this.successful = true;
          this.$router.push('/posts');
        }
      );
    },
  },
}
</script>