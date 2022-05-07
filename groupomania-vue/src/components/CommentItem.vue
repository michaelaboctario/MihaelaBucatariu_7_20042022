<template>
    <form @submit.prevent="$emit('publishComment', {content})">
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
              @input="$emit('update:content', $event.target.value)"
              :readonly="isReadOnly"       
          ></textarea>
        </div>
        <div class="btn-group">
          <button class="btn btn-ghost" type="button" @click="$emit('cancelEdit')" name="Cancel">Cancel</button>
          <button class="btn btn-blue" type="submit" name="Publier">
            Publier
          </button>
        </div>
      </div>
    </form>
</template>
<script>

export default {
  props: ['content', 'isReadOnly'],
  emits: ['update:content', 'publishComment', 'cancelEdit'],
  name: "CommentItem"
}
</script>