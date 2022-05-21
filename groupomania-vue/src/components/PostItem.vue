<template>
  <article class="post-item" v-bind:class="{visualHover: hasHover}">
      <form class="post-item__form" @submit.prevent="$emit('publish', {title, content})">
        <div class="post-item__group">
          <label for="post-item__title">Titre:</label>
          <input
            :value="title"
            type="text"
            id="post-item__title"
            class="post-item__title"
            name="title"
            @input="$emit('update:title', $event.target.value)"
            :readonly="!isEditingPost"
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
            :readonly="!isEditingPost"
          >
          </textarea>
        </div>
        <div class="form-actions">
          <template v-if="isEditingPost">
              <button class="btn-normal" type="button" @click="$emit('cancelEdit')" name="Cancel">Abandonner</button>
              <button v-if="canDelete" class="btn-normal" type="button" @click="$emit('deletePost')" name="Supprimer">Supprimer</button>
              <button v-if="canComment" :class="[isEditingPost ? 'btn-normal' : 'btn-default']" type="button"  @click="$emit('toggleCreatingComment')" name="Commenter">Commenter</button>
              <button class="btn-default" type="submit" name="Publier">Publier</button> 
          </template>
          <!-- <template v-if="isCreatingComment">
              <button class="btn-normal" type="button" @click="$emit('cancelEdit')" name="Cancel">Abandonner</button>
              <button class="btn-default" type="submit" name="Publier">Publier</button> 
          </template> -->
        </div>
      </form>
  </article>
</template>
<script>

export default {
  props: {'title': String, 
          'content': String,
          'isReadOnly': Boolean,
          'isEditingPost': {
              type: Boolean,
              default: true
          },
          'isCreatingComment': {
              type: Boolean,
              default: false
          },
          'canDelete': {
              type: Boolean,
              default: true
          },
          'canComment': {
              type: Boolean,
              default: true
          },
          'hasHover': Boolean},
  emits: ['update:title', 'update:content', 'publish', 'comment', 'toggleCreatingComment', 'deletePost', 'cancelEdit'],
  name: 'PostItem'
}
</script>