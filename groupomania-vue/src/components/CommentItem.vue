<template>
  <article class="comment-item">
    <h2>Entrer un commentaire </h2>
    <form @submit.prevent="$emit('publishComment', {content})">
        <div class="comment-item__group">
            <label for="comment-item__content">Commenter:</label>
              <textarea
                :value="comment"
                id="comment-item__content"
                class="comment-item__content"
                name="comment"
                rows="8"
                cols="140"
                @input="$emit('update:comment', $event.target.value)"
                :readonly="isReadOnly"
              >
              </textarea>
        </div>
        <div class="comment-card__btn-group">
          <button class="comment-card__btn-cancel" type="button" @click="$emit('cancelEdit')" name="Cancel">Abandonner</button>
          <button class="comment-card__btn-publish" type="submit" name="Publier">
            Publier
          </button>
        </div>   
    </form>
  </article>
</template>
<script>

export default {
  props: { 'comment': String, 
          'isReadOnly': Boolean },
  emits: ['update:comment', 'publishComment', 'cancelEdit'],
  name: "CommentItem"
}
</script>