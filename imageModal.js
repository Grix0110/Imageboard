const imageModal = {
    data() {
        return {};
    },

    props: ['id'],
    mounted() {},

    methods: {
        closeModal: function () {
            this.$emit("close");
        },
    },

    template: `
    <div class='imagemodal'>
        <h1 class='xbutton' @click='closeModal'>X</h1>
        <img class='imageBig'></img>
    </div>    
        `,
};

export default imageModal;
