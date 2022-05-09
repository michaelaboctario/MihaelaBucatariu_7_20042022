<template>
  <main class="col-full push-top">
    <section>
      <p class="text-faded text-xsmall bloc-comment">
        Utilisateur connecté {{ connectedUser }} 
      </p>
      <p class="text-faded text-xsmall bloc-comment">
        Post de {{ postAuthor }} 
      </p>
    </section>
    <section>
      <h1>Modification du message</h1>
      <!-- <h2>{{ this.$route.params.id }}</h2> -->
      <PostItem
          v-model:title="title"
          v-model:content="content" 
          :isReadOnly="false" 
          @publish.once="save"
          @cancel-edit.once="cancelEdit">
      </PostItem> 
      <CommentList :comments="allComments"></CommentList>
      <CommentItem
          v-model:comment="comment" 
          :isReadOnly="false" 
          @publishComment="publishComment"
          @cancel-edit.once="cancelEdit">
      </CommentItem>
      <div>
        Response
      </div>  
      <section
        v-if="messageComments"
        :class="loadingCommentsStatus !== 'failure' ? 'alert-success' : 'alert-error'"
      >
        {{ messageComments }}
      </section> 
    </section>
  </main>
</template>
<script>

import { mapGetters, mapState } from 'vuex';
import PostItem from '../components/PostItem.vue';
import CommentItem from '@/components/CommentItem.vue';
import CommentList from '@/components/CommentList.vue';

export default {
  components: {
    PostItem,
    CommentItem,
    CommentList,
  },
  data () {
    return {
      successful: false,
      title: '',
      content: '', 
      comment: '',
      userId: '', 
      allComments: []
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
     this.getAllComment();
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
      console.log('publishComment', comment)
      this.comment=''
      this.$store.dispatch('comments/createComment', {comment, postId: this.$route.params.id}).then(
        () => {
          this.successful = true
          this.getAllComment()
          //this.$router.push('/posts');
        }
      );
    },
    getAllComment () {
        //getAllComment ({ commit }, {postId}) {
        this.$store.dispatch('comments/getAllComment', {postId: this.$route.params.id}).then(
        (comments) => {
          this.successful = true
          this.allComments = comments
          //this.$router.push('/posts');
        },
        () => {
          this.successful = false;
        }
      );
    },
  },
}
</script>