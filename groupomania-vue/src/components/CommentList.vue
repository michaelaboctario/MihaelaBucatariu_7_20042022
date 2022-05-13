<template v-if="comments && comments.length">
  <article v-for="comment in comments" :key="comment.id" class="comment-list-item">
      <p class="comment-list-item__content">{{ comment.commentContent }}</p>
      <!-- <p class="comment-card__userinfo text-faded text-xsmall bloc-comment"> -->
      <p class="comment-list-item__author">
        de {{ comment.user.firstname }}  {{ comment.user.lastname}}, le {{ comment.updatedAt }} 
      </p>
  </article>
</template>    

<script>
export default { 
  props: {'comments': Array},
  name: "CommentList"
}
</script>

