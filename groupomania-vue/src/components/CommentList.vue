<template v-if="comments && comments.length">
  <article v-for="comment in comments" :key="comment.id" class="comment-list-item">
      <div class="comment-list-item__details">
        <p class="comment-list-item__content">{{ comment.commentContent }}</p>
        <p class="comment-list-item__author">
          de {{ comment?.user?.firstname }}  {{ comment?.user?.lastname}}, le {{ comment.updatedAt }} 
        </p>
      </div>
      <div class="comment-delete__button">
          <button type="button"  name="DeleteComment" @click="$emit('delete-comment', comment.id)">
              <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash' }" class="comment-delete__fa-icon"/>
          </button>          
      </div> 
  </article>
</template>    

<script>
export default { 
  props: {'comments': Array},
  name: "CommentList",
  emits: ['delete-comment'],
 
}
</script>

<style scoped>

/* .comment-list__item {
  display: flex;

} */

/* .comment-list__item-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
} */

/* .user-list__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user-list__item p {
    display: block;
} */

</style>
