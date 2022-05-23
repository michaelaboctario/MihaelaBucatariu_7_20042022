<template>
<div class="flex-container">
    <main class="card__container"> 
      <SectionTitle />
      <div class="post-card__group">
          <div >
              <p class="text-center">Cette page n&rsquo;existe pas</p>
          </div>
        </div>
      </main>
      <FooterItem />  
  </div>
</template>

<script>
import SectionTitle from '@/components/SectionTitle.vue'
import FooterItem from '@/components/FooterItem.vue'

export default {
    name: 'NotFound',
    components: {
      SectionTitle,
      FooterItem,
  },
}

</script>

