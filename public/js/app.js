import * as Vue from "./vue.js";

const app = Vue.createApp({
    data() {
        return {
            images: [],
            message: "Please upload a file",
        };
    },
    methods: {
        onFormSubmit(e) {
            const form = e.currentTarget;
            const fileInput = form.querySelector("input[type=file]");
            console.log(fileInput.files);
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
                .then((data)=>{
                    this.message = data.message;

                    if(data.file){
                        this.images.push(data.file);
                    }
                });
        },
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
