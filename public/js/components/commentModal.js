const commentModal = {
    data() {
        return {
            commentModal: [],
            username: "",
            comment: "",
        };
    },
    props: ["id"],
    mounted() {
        fetch(`/comment/${this.id}`)
            .then((results) => results.json())
            .then((comment) => {
                this.commentModal = comment;
            });
    },
    methods: {
        sanitizeTime(createdAt) {
            return new Date(createdAt).toString().slice(0, 24);
        },
        commentPost() {
            const formData = {
                username: this.username,
                comment: this.comment,
                imageId: this.id,
            };
            fetch(`/comment`, {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((result) => result.json())
                .then((data) => {
                    this.commentModal.unshift(data);
                });
        },
    },

    template: `
    <section class="commentContainer">
        <form class="commentForm" 
            action="/comment"
            method="post">
                <input type="text" name="username" v-model="username" placeholder="username" id="commentUser" class="textInput" maxlength="20">
                <input type="text" name="comment" v-model="comment" placeholder="comment" id="comment" class="textInput" maxlength="30">
                <input type="submit" value="post" class="submit-btn" id="commentBtn" @click="commentPost">
        </form>
    </section>
    <div class="commentDisplay">
        <section v-for="comment in commentModal">
            <div class="singleComment">
                <p v-bind:src="this.id">{{comment.username}} replied {{comment.comment}} on {{sanitizeTime(comment.created_at)}}</p>
            </div>
        </section>
    </div>
        `,
};

export default commentModal;
