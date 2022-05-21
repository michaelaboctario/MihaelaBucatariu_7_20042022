  <template>
    <article class="comment-item">
      <form class="comment-item__form" @submit.prevent="$emit('publish-comment', {content})">
          <div class="comment-item__group">
              <label for="comment-item__content">Commenter:</label>
                <textarea
                  :value="comment"
                  id="comment-item__content"
                  class="comment-item__content"
                  name="comment"
                  rows="6"
                  cols="140"
                  @input="$emit('update:comment', $event.target.value)"
                  :readonly="isReadOnly"
                  placeholder="Entrer un commentaire ..." aria-label="texte du commentaire"
                  required
                >
                </textarea>
          </div>
          <div class="form-actions">
            <button class="btn-normal" type="button" @click="$emit('cancel-creating-comment')" name="Cancel">Abandonner</button>
            <button class="btn-default" type="submit" name="Publier">
              Publier
            </button>
          </div>   
      </form>
    </article>
  </template>
<script>

export default {
  props: { 'comment': String, 
          'isReadOnly': Boolean,
          'isCreatingComment': {
              type: Boolean,
              default: true
          },
  },
  emits: ['update:comment', 'publish-comment', 'cancel-creating-comment'],
  name: "CommentItem"
}
</script>
