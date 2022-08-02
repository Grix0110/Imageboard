const spicedPg = require("spiced-pg");

let dbUrl;
if (process.env.NODE_ENV === "production") {
    dbUrl = process.env.DATABASE_URL;
} else {
    const {
        DB_NAME,
        DB_PW,
        DB_HOST,
        DB_PORT,
        DB_BASE,
    } = require("./secrets.json");
    dbUrl = `postgres:${DB_NAME}:${DB_PW}@${DB_HOST}:${DB_PORT}/${DB_BASE}`;
}

const db = spicedPg(dbUrl);

module.exports.getImages = () => {
    return db.query(`SELECT * FROM images `);
};

module.exports.getImageById = (id) => {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};

module.exports.insertImage = (url, username, title, description) => {
    return db.query(
        `INSERT INTO images(url, username, title, description) 
        VALUES($1, $2, $3, $4) 
        RETURNING *`,
        [url, username, title, description]
    );
};

module.exports.insertComment = (id, username, comment) => {
    return db.query(
        `INSERT INTO comments(image_id, username, comment)
        VALUES($1, $2, $3)
        RETURNING *`,
        [id, username, comment]
    );
};

module.exports.getComments = (id) => {
    return db.query(`SELECT * FROM comments WHERE image_id = $1`, [id]);
};