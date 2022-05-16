<template>
<div class="flex-container">
    <main class="user-list__container">
        <SectionTitle />
        <section class="user-list__group">        
            <article v-for="user in users" :key="user.id" class="user-list-item visual-hover">
                <!-- <p class="user-list__image"><img :src="user.imageUrl" alt="image de profil de l'utilisateur"></p> -->
                <p>{{ user.firstname}} {{ user.lastname}}</p>
            </article>
        </section>
    </main>
    <FooterItem />
</div>
</template>

<script>

import SectionTitle from '@/components/SectionTitle.vue'
import FooterItem from '@/components/FooterItem.vue'
import { mapState } from 'vuex';

export default {
    components: {
        SectionTitle,
        FooterItem
    },
    computed: mapState({
        users: state => state.users.userItems,
        userslength: state => state.users.userItems.length,
        message: state => state.users.message,
        loadingStatus: state => state.users.loadingStatus
    }), 
    created () {
        this.$store.dispatch('users/getAllUser').then(
        () => {
          this.successful = true;
        },
        () => {
          this.successful = false;
        }
      );
    },
}
</script>

<style scoped>

.main {
    min-width: 380px;
}

.user-list__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 10px 40px;
}

.user-list__group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
}

</style>