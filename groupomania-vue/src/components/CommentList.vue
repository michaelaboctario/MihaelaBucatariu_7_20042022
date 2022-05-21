<template v-if="comments && comments.length">
  <article v-for="comment in comments" :key="comment.id" class="comment-list-item">
      <div class="comment-list__item-details">
        <p class="comment-list-item__content">{{ comment.commentContent }}</p>
        <p class="comment-list-item__author">
          de {{ comment?.user?.firstname }}  {{ comment?.user?.lastname}}, le {{ comment.updatedAt }} 
        </p>
      </div>
      <div class="comment-delete__button">
          <button class="btn-fa-normal" type="button"  name="DeleteComment" @click="$emit('delete-comment', comment.id)">
              <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash' }" class="user-delete__fa-icon"/>
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

