import * as Vue from "./vue.js";
import imageModal from "./imageModal.js";

const app = Vue.createApp({
    data() {
        return {
            images: [],
            showModal: 0,
            selectedImage: this.images.id
        };
    },
    methods: {
        onFormSubmit(e) {
            e.preventDefault();

            const form = e.currentTarget;
            const fileInput = form.querySelector("input[type=file]");

            if (fileInput.files < 1) {
                alert("You must add a file!");
                return;
            }
            const formData = new FormData(form);
            fetch("/image", {
                method: "post",
                body: formData,
            })
                .then((result) => result.json())
                .then((data) => {
                    this.images.unshift(data);
                })
                .catch((err) => console.log("ERROR in FormSubmit: ", err));
        },

        closeModal() {
            console.log("closeModal is running");
        },

        showModal(id) {
            console.log("showModal should work", id);
        },
    },

    components: {
        imageModal: imageModal,
    },
    mounted() {
        fetch("/images")
            .then((result) => result.json())
            .then((imageData) => {
                this.images = imageData;
            });
    },
});
app.mount("#main");
