<template v-if="comments && comments.length">
  <article v-for="comment in comments" :key="comment.id" class="comment-card">
      <p class="comment-card__content">{{ comment.commentContent }}</p>
      <!-- <p class="comment-card__userinfo text-faded text-xsmall bloc-comment"> -->
      <p class="comment-card__userinfo">
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

