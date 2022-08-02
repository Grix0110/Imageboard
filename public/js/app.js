import * as Vue from "./vue.js";
import imageModal from "./components/imageModal.js";

const app = Vue.createApp({
    data() {
        return {
            images: [],
            id: 0,
        };
    },
    methods: {
        onFormSubmit(e) {
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
            console.log("is closing");
            this.id = 0;
        },
    },

    components: { imageModal },
    mounted() {
        fetch("/images")
            .then((result) => result.json())
            .then((imageData) => {
                this.images = imageData;
            });
    },
});
app.mount("#main");
