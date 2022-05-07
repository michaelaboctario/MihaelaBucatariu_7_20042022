<template>
    <form @submit.prevent="$emit('publish', {title, content})">
      <div class="input-group">
        <label for="post_title">Titre:</label>
        <input
          :value="title"
          type="text"
          id="post_title"
          class="form-input"
          name="title"
          @input="$emit('update:title', $event.target.value)"
          :readonly="isReadOnly"
        />
      </div>
      <div class="input-group">
        <label for="post_content">Contenu:</label>
        <textarea
          :value="content"
          id="post_content"
          class="form-input post-content"
          name="content"
          rows="8"
          cols="140"
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
    </form>
</template>
<script>

export default {
  props: ['title', 'content', 'isReadOnly'],
  emits: ['update:title', 'update:content', 'publish', 'cancelEdit'],
  name: 'PostItem'
}
</script>