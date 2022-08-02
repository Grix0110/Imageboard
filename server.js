const path = require("path");
const express = require("express");
const db = require("./db");
const app = express();
const { uploader } = require("./middleware");
const s3 = require("./s3");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.get("/images", (req, res) => {
    db.getImages()
        .then((results) => {
            res.json(results.rows.reverse());
        })
        .catch((err) => console.log("ERROR in get Images: ", err));
});

app.get("/image/:id", (req, res) => {
    let id = req.params.id;
    db.getImageById(id)
        .then((result) => {
            res.json(result.rows);
        })
        .catch((err) => {
            console.log("ERROR in get Image: ", err);
        });
});

app.get("/comment/:id", (req, res) => {
    let id = req.params.id;
    // console.log(id);
    db.getComments(id)
        .then((input) => {
            res.json(input.rows);
        })
        .catch((err) => {
            console.log("ERROR in get Comments", err);
        });
});

app.post("/comment", (req, res) => {
    let data = req.body;
    // console.log(data);
    db.insertComment(data.imageId, data.username, data.comment)
        .then((input) => {
            return res.json(input.rows[0]);
        })
        .catch((err) => {
            console.log("ERROR in insert Comments: ", err);
        });
});

app.post("/image", uploader.single("photo"), s3.upload, (req, res) => {
    let photo = `https://s3.amazonaws.com/spicedling/${req.file.filename}`;
    let data = req.body;
    if (req.file) {
        db.insertImage(photo, data.username, data.title, data.description).then(
            (input) => {
                res.json(input.rows[0]);
            }
        );
    } else {
        res.json({
            success: false,
            message: "File upload failed",
        });
    }
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(8080, () => console.log(`I'm listening.`));
