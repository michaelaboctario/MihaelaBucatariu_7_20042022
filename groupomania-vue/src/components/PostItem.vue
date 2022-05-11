<template>
  <article class="post-item">
      <form @submit.prevent="$emit('publish', {title, content})">
        <div class="post-item__group">
          <label for="post-item__title">Titre:</label>
          <input
            :value="title"
            type="text"
            id="post-item__title"
            class="post-item__title"
            name="title"
            @input="$emit('update:title', $event.target.value)"
            :readonly="isReadOnly"
          />
        </div>
        <div class="post-item__group">
          <label for="post-item__content">Contenu:</label>
          <textarea
            :value="content"
            id="post-item__content"
            class="post-item__content"
            name="content"
            rows="8"
            cols="140"
            @input="$emit('update:content', $event.target.value)"
            :readonly="isReadOnly"
          >
          </textarea>
        </div>
        <div class="post-card__btn-group">
          <button class="post-card__btn-cancel" type="button" @click="$emit('cancelEdit')" name="Cancel">Abandonner</button>
           <button class="post-card__btn-comment" type="button"  @click="$emit('comment')" name="Commenter">
            Commenter
          </button>
          <button class="post-card__btn-publish" type="submit" name="Publier">
            Publier
          </button>
        </div>
      </form>
  </article>
</template>
<script>

export default {
  props: {'title': String, 
          'content': String,
          'isReadOnly': Boolean},
  emits: ['update:title', 'update:content', 'publish', 'comment', 'cancelEdit'],
  name: 'PostItem'
}
</script>