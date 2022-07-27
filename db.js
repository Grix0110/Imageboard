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

module.exports.getData = () => {
    return db.query(`SELECT * FROM images`);
};