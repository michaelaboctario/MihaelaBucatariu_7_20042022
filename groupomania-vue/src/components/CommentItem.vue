<template>
  <article>
    <h2>Entrer commentaire </h2>
    <form @submit.prevent="$emit('publishComment', {content})">
      <div class="comment-group">
          <div class="input-group">
            <label for="comment_content">Commenter:</label>
              <textarea
                :value="comment"
                id="comment_content"
                class="form-input comment-content"
                name="comment"
                rows="8"
                cols="140"
                @input="$emit('update:comment', $event.target.value)"
                :readonly="isReadOnly"
              >
              </textarea>
          </div>
<!-- Commenter avec input au lieu de textarea -->
<!--
          <label for="comment-content">Commenter2:</label>
          <input
                :value="comment"
                type="text"
                id="comment_content2"
                class="form-input"
                name="comment"
                @input="$emit('update:comment', $event.target.value)"
                :readonly="isReadOnly"
            />
        </div> -->
        <div class="btn-group">
          <button class="btn btn-ghost" type="button" @click="$emit('cancelEdit')" name="Cancel">Cancel</button>
          <button class="btn btn-blue" type="submit" name="Publier">
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