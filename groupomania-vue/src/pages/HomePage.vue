<template>  
   <div>
      <HeaderItem />
      <main class="post-card__container"> 
         <div class="flex-container">
            <img src="../assets/logos/icon.png" class="logo-full" alt="le logo de Groupomania">
         </div>
      </main>
      <FooterItem />
   </div>
</template>

<script>
import HeaderItem from "@/components/HeaderItem.vue";
import FooterItem from "@/components/FooterItem.vue";

export default {
    name: "HomePage",
    components: { HeaderItem,
                  FooterItem 
   }
}

</script>

