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
    <Form @submit="save">
      <div class="input-group">
        <label for="post_title">Titre:</label>
        <Field
          v-model="title"
          type="text"
          id="post_title"
          class="form-input"
          name="title"
          :readonly="!isHisOwnPost"
        />
      </div>

      <div class="input-group">
        <label for="post_content">Contenu:</label>
        <textarea
          v-model="content"
          id="post_content"
          class="form-input post-content"
          name="content"
          rows="4"
          cols="120"
          :readonly="!isHisOwnPost"
        ></textarea>
      </div>

      <template v-if="isHisOwnPost">
        <div class="btn-group">
          <button class="btn btn-ghost" type="button" @click="cancelEdit" name="Cancel">Cancel</button>
          <button class="btn btn-blue" type="submit" name="Save">
            OK
          </button>
        </div>
        <div
            v-if="message"
            :class="loadingStatus !== 'failure' ? 'alert-success' : 'alert-error'"
          >
            {{ message }}
        </div> 
      </template>
      <template v-if="!isHisOwnPost">
        <div class="btn-group">
        <button class="btn btn-blue" type="button" name="Comment">
          Commenter
        </button>
      </div>
      </template>
    </Form>
    <template v-if="!isHisOwnPost">
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
    </template>     
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

import { Form, Field } from "vee-validate";
import { mapGetters, mapState } from 'vuex';

export default {

  components: {
    Form,
    Field,
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
  mounted () {
      console.log("created")
      console.log(this.$route.params.id)
      this.$store.dispatch('posts/getOnePost', this.$route.params.id).then(
      data => {
        console.log(data)
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
    publish () {
      this.successful = false;
     
      const comment = { 
          commentContent: this.comment, 
          //postId: this.$route.params.id,
          userId: this.authUser.id,
      }
      console.log("publish", comment);
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