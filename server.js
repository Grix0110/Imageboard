const path = require("path");
const express = require("express");
const db = require("./db");
const app = express();
const { uploader } = require("./middleware");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.get("/images", (req, res) => {
    db.getData()
        .then((results) => {
            res.json(results.rows);
        })
        .catch((err) => console.log("ERROR in get Images: ", err));
});

app.post("/image", uploader.single("photo"), (req, res) => {
    if (req.file) {
        res.json({
            success: true,
            message: "File uploaded. Good job!",
            file: `/${req.file.filename}`,
        });
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
