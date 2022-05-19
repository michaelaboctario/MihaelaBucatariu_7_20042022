<template>
<div class="flex-container">
    <main class="user-list__container">
        <SectionTitle />
        <section class="user-list__group">        
            <article v-for="user in users" :key="user.id" class="user-list__item visual-hover">
                <!-- <p class="user-list__image"><img :src="user.imageUrl" alt="image de profil de l'utilisateur"></p> -->
                <div class="user-list__item-details">
                    <p >{{ user.firstname}} {{ user.lastname}}</p>
                    <p class="text-xsmall">--{{ user.role.name}}-- </p>
                </div> 
                <div v-if="canDeleteUser(user)" class="user-delete__button">
                    <button class="btn-fa-normal" type="button"  name="DeleteUser" @click="deleteUser(user)">
                        <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'trash' }" class="user-delete__fa-icon"/>
                    </button>          
                </div> 
            </article>
        </section>
    </main>
    <FooterItem />
</div>
</template>

<script>

import SectionTitle from '@/components/SectionTitle.vue'
import FooterItem from '@/components/FooterItem.vue'
import { mapState, mapGetters } from 'vuex';

export default {
    components: {
        SectionTitle,
        FooterItem
    },
    computed: {
        ...mapGetters('auth', ['authUser', 'isAdminUser']),
        ...mapState({
            users: state => state.users.userItems,
            userslength: state => state.users.userItems.length,
            message: state => state.users.message,
            loadingStatus: state => state.users.loadingStatus,
        }), 
    },
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
    methods: {
        canDeleteUser(user) { return this.isAdminUser && user.roleId === 3; },
        deleteUser (user) {
            this.successful = false
            console.log("deleteUser", user)
            this.$store.dispatch('users/deleteUser',  user.id).then(
                (data) => {
                console.log("users/deleteUser", data)
                this.successful = true;
                //this.$router.push('/posts');
                }
            );
        },
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

.user-list__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user-list__item p {
    display: block;
}

.btn-fa-normal {
    padding: 10px 4px 10px 10px;
    color: #8f1f28;
    /* background-color: blue; */
    border-radius: 50px;
}

.user-delete__fa-icon {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-right: 10px;
    }

</style>