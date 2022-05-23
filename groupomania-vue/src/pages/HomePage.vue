<template>  
   <div class="flex-container">
      <SectionTitle />
      <main class="card__container"> 
         <img src="../assets/logos/icon.png" class="logo-full" alt="le logo de Groupomania">
      </main>
      <FooterItem />
   </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
import FooterItem from "@/components/FooterItem.vue";

export default {
    name: "HomePage",
    components: { SectionTitle,
                  FooterItem 
   }
}

</script>

