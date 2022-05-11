<template>
  <div class="post-card__group-title">
      <div class="post-card__group-headings">
          <img src="../assets/logos/icon.png" alt="le logo de Groupomania" class="post-card__logo-icon">
          <h1 class="post-card__first_header">Groupomania</h1>
      </div>
      <h2 class="post-card__second-header">{{ title ? title : 'Le réseau social de notre entreprise'}}</h2>
    </div>  
</template>
<script>

export default {
  props: {'title': String, 
  },
  name: 'HeaderItem',
}
</script>