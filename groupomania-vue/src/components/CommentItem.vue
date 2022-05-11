<template>
  <article class="comment-card__item">
    <h2>Entrer commentaire </h2>
    <form @submit.prevent="$emit('publishComment', {content})">
      <div class="comment__item-group">
          <div class="comment__input-group">
            <label for="comment-form__input-comment">Commenter:</label>
              <textarea
                :value="comment"
                id="comment-form__input-comment"
                class="comment-form__input-comment"
                name="comment"
                rows="8"
                cols="140"
                @input="$emit('update:comment', $event.target.value)"
                :readonly="isReadOnly"
              >
              </textarea>
          </div>
        <div class="comment-card__btn-group">
          <button class="comment-card__btn-cancel" type="button" @click="$emit('cancelEdit')" name="Cancel">Cancel</button>
          <button class="comment-card__btn-publish" type="submit" name="Publier">
            Publier
          </button>
        </div>
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