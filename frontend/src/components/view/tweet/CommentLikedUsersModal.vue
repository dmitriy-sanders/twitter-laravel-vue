<template>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Users Liked</p>
        </header>

        <section class="modal-card-body">
            <article v-if="ifNoLikedUsers">
                <h2>There is no users who liked your comment :(</h2>
            </article>
            <article
                v-else
                class="media"
                v-for="likedUser in getLikedUsers"
                :key="likedUser.id">
                <router-link
                    v-if="likedUser.avatar"
                    :to="{ name: 'user-page', params: { id: likedUser.id } }"
                >
                    <figure class="media-left">
                        <img
                            class="is-rounded fit image is-64x64"
                            :src="likedUser.avatar"
                            alt="Author avatar"
                        >
                    </figure>
                </router-link>

                <router-link
                    v-else
                    :to="{ name: 'user-page', params: { id: likedUser.id } }"
                >
                    <figure class="media-left">
                        <DefaultAvatar class="image is-64x64 fit is-rounded" :user="likedUser" />
                    </figure>
                </router-link>

                <div class="media-content">
                    <div class="content">
                        <strong class="name">
                            {{ likedUser.firstName }} {{ likedUser.lastName }}
                        </strong><br>
                        <small class="nickname">@{{ likedUser.nickname }}</small>
                    </div>
                </div>
            </article>

        </section>
        <footer class="modal-card-foot">
            <b-button type="is-primary" outlined @click="$parent.close()">
                Close
            </b-button>
        </footer>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultAvatar from '../../common/DefaultAvatar.vue';

export default {
    name: 'CommentLikedUsersModal',
    components: {
        DefaultAvatar
    },
    computed: {
        ...mapGetters([
            'getLikedUsers'
        ]),
        ifNoLikedUsers() {
            return this.getLikedUsers.length === 0;
        }
    }
};
</script>

<style scoped>
    .is-rounded {
        border-radius: 50%;
    }
</style>
