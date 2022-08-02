import commentModal from "./commentModal.js";

const imageModal = {
    data() {
        return {
            imageModal: {},
        };
    },

    props: ["id"],
    mounted() {
        fetch(`/image/${this.id}`)
            .then((results) => results.json())
            .then((imageById) => {
                this.imageModal = imageById[0];
            });
    },

    methods: {
        closeModal() {
            this.$emit("xbtn");
        },
    },
    components: { commentModal },

    template: `
    <div class='imgOverlay'>
        <h3 id="xbtn" @click="closeModal"> close X </h3>
        <p class="arrowL">⌵</p>
        <img class='imageBig' v-bind:src="imageModal.url">
            <p class="arrowR">⌵</p> 
            <p class="titleBig">{{imageModal.title}}</p>
            <p class="descriptionBig">{{imageModal.description}}</p>
        <comment-modal :id="id" v-if="id" ></comment-modal>
    </div>    
        `,
};

export default imageModal;
