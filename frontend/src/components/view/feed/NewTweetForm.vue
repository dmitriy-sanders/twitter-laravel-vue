<template>
    <div class="modal-card" @keyup.ctrl.exact.enter="save">
        <header class="modal-card-head">
            <p class="modal-card-title">Add Tweet</p>
        </header>

        <section class="modal-card-body">
            <div class="error has-text-danger" v-if="errorMessage">{{ errorMessage }}</div>

            <b-field label="Text">
                <b-input
                    type="textarea"
                    v-model="text"
                />
            </b-field>

            <b-field class="file">
                <b-upload v-model="image">
                    <a class="button is-primary">
                        <b-icon pack="fa" icon="upload" />
                        <span>Upload image</span>
                    </a>
                </b-upload>
                <span class="file-name" v-if="image">
                    {{ image.name }}
                </span>
            </b-field>
        </section>

        <footer class="modal-card-foot">
            <b-button type="is-primary" :disabled="!text.trim()" @click="save">
                Save
            </b-button>
        </footer>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'NewTweetForm',

    data: () => ({
        text: '',
        image: null,
        errorMessage: ''
    }),

    methods: {
        ...mapActions('tweet', [
            'addTweet',
            'uploadTweetImage'
        ]),

        async save() {
            try {
                const tweet = await this.addTweet(this.text);

                if (this.image === null) {
                    this.$parent.close();
                    return;
                }

                await this.uploadTweetImage({
                    id: tweet.id,
                    imageFile: this.image
                });

                this.$parent.close();
            } catch (error) {
                this.showErrorMessage(error.message);
            }
        },

        showErrorMessage(msg) {
            this.errorMessage = msg;
        }
    }
};
</script>

<style scoped>
.error {
    padding: 10px 0;
}
</style>
