<template>
  <template v-if="comments && comments.length">
    <div v-for="comment in comments" :key="comment.id" class="comment-content">
        <p>{{ comment.commentContent }}</p>
          <p class="text-faded text-xsmall bloc-comment">
                de {{ comment.user.firstname + ' ' +comment.user.lastname }}, le {{ comment.updatedAt }} 
          </p>
    </div>
  </template>    
</template>

<script>

export default { 
  props: {'comments': Array},
  name: "CommentList"
}
</script>

