<template>  
<main class="post-card__container"> 
  <HeaderItem />
   <div class="flex-container">
      <img src="../assets/logos/icon.png" class="logo-full" alt="le logo de Groupomania">
   </div>
</main>
</template>

<script>
import HeaderItem from "@/components/HeaderItem.vue";

export default {
    name: "HomePage",
    components: { HeaderItem }
}

</script>

