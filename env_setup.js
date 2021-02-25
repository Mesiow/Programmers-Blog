const uniqid = require("uniqid");
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
process.env.SESSION_SECRET = uniqid();

module.exports = {
    atlas_pass: process.env.MONGODB_ATLAS_PASS,
    local_db_uri: process.env.LOCAL_DB_URL,
    session_id: process.env.SESSION_SECRET
}