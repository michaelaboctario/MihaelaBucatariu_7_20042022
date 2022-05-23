<template v-if="comments && comments.length">
  <article v-for="comment in comments" :key="comment.id" class="comment-list-item">
      <div class="comment-list-item__details">
        <p class="comment-list-item__content">{{ comment.commentContent }}</p>
        <p class="comment-list-item__author">
          de {{ comment?.user?.firstname }}  {{ comment?.user?.lastname}}, le {{ comment.updatedAt }} 
        </p>
      </div>
      <div class="comment-delete__button" :class="{'comment-delete__button-visible': canDeleteComment(comment)}">
          <button type="button" name="DeleteComment" @click="$emit('delete-comment', comment.id)">
              <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash' }" class="comment-delete__fa-icon"/>
          </button>          
      </div> 
  </article>
</template>    

<script>

import { mapGetters } from 'vuex';

export default { 
  props: {'comments': Array},
  name: "CommentList",
  emits: ['delete-comment'],
  computed: {
    ...mapGetters('auth', ['authUser', 'isModeratorUser']),
  },
  methods: {
      canDeleteComment (comment) {
          return this.isModeratorUser || this.authUser?.id === comment.userId
    },
  }
}
</script>


