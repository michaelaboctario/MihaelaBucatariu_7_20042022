<template>
<div class="flex-container">
    <main class="card__container">
      <SectionTitle title="Modification du message" />
      <section>
        <PostItem
            v-model:title="title"
            v-model:content="content"
            :canComment="true" 
            :canDelete="canDeletePost" 
            :isEditingPost="isEditingPost" 
            :isCreatingComment="isCreatingComment" 
            :isReadOnly="false" 
            @publish.once="save"
            @toggle-creating-comment="toggleCreatingComment"
            @delete-post.once="deletePost"
            @cancel-edit="cancelEdit">
        </PostItem> 
        <CommentList :comments="allComments" @delete-comment="(id) => deleteComment(id)"></CommentList>
            
        <CommentItem v-if="isCreatingComment"
            v-model:comment="comment" 
            :isReadOnly="false" 
            :isCreatingComment="isCreatingComment" 
            @publish-comment="publishComment"
            @cancel-creating-comment="cancelCreatingComment">
        </CommentItem>
        <section v-if="message || messageComments" class="alert-error"
        >
          {{ message }} {{ messageComments }}
        </section> 
      </section>
    </main>
    <FooterItem />
  </div> 
</template>
<script>

import { mapGetters, mapState } from 'vuex';
import SectionTitle from '@/components/SectionTitle.vue';
import PostItem from '@/components/PostItem.vue';
import CommentItem from '@/components/CommentItem.vue';
import CommentList from '@/components/CommentList.vue';
import FooterItem from '@/components/FooterItem.vue';

export default {
  components: {
    SectionTitle,
    FooterItem,
    PostItem,
    CommentItem,
    CommentList,
  },
  data () {
    return {
      isEditingPost: false,
      isCreatingComment: false,
      title: '',
      content: '', 
      comment: '',
      userId: '', 
      allComments: []
    }
  },
  computed: {
    ...mapGetters('auth', ['authUser', 'isAdminUser', 'isModeratorUser']),
    ...mapState({
        message: state => state.posts.message,
        currentItem: state => state.posts.currentItem,
        messageComments: state => state.comments.message,
    }),
    isHisOwnPost() { return this.authUser?.id === this.userId },
    connectedUser() {return `${this.authUser?.firstname} ${this.authUser?.lastname}`},
    postAuthor () {return this.currentItem ? `${this.currentItem.user.firstname} ${this.currentItem.user.lastname}` : ''  },
    canDeletePost() { return this.isModeratorUser || this.isHisOwnPost},
  },
  mounted() {
      this.$store.dispatch('posts/getOnePost', this.$route.params.id).then(
      data => {
        this.title = data.postTitle
        this.content = data.postContent
        this.userId = data.userId
        this.isEditingPost = this.isHisOwnPost
      },
      error => {
        this.message = error.message || error.toString()
        setTimeout(() => this.message = '', 5000);
      }
    );
      this.getAllComment()
  },
  methods: {
    toggleCreatingComment () { 
      this.isCreatingComment = !this.isCreatingComment
      if(this.isCreatingComment)
      {
        this.isEditingPost = false
      }
      else if(this.isHisOwnPost)
      {
        this.isEditingPost = !this.isEditingPost
      }
    },
    save () {
      const post = {
          postTitle: this.title, 
          postContent: this.content,
          userId: this.authUser?.id,
          id: this.$route.params.id,
      }
      this.$store.dispatch('posts/updatePost', {post}).then(
        () => this.$router.push('/posts')
      );
    },
    deletePost () {
      this.$store.dispatch('posts/deletePost',  this.$route.params.id).then(
        () => this.$router.push('/posts')
      );
    },
    cancelEdit () {
        this.$router.push('/posts');
    },
    cancelCreatingComment () {
        this.toggleCreatingComment();
    },
    // for  comment form
    publishComment () {
      const comment = { 
          commentContent: this.comment, 
          userId: this.authUser?.id,
      }
      this.$store.dispatch('comments/createComment', {comment, postId: this.$route.params.id}).then(
        () => {
          this.comment=''
          this.getAllComment()
          this.toggleCreatingComment()
          //this.$router.push('/posts');
        },
      );
    },
    deleteComment (id) {
          console.log("users/deleteComment", id)
          this.$store.dispatch('comments/deleteComment', id).then(
           data =>  {
              console.log('users/deleteComment', data)
              this.getAllComment()
            }           
      );
    },
    getAllComment () {
        this.$store.dispatch('comments/getAllComment', {postId: this.$route.params.id}).then(
        comments => this.allComments = comments
      );
    },
  },
}
</script>