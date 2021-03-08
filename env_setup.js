const uniqid = require("uniqid");
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
process.env.SESSION_SECRET = uniqid();

module.exports = {
    atlas_pass: process.env.MONGODB_ATLAS_PASS,
    local_db_uri: process.env.LOCAL_DB_URL,
    session_id: process.env.SESSION_SECRET,

    aws_user_key: process.env.AWS_ACCESS_KEY_ID,
    aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
    aws_bucket_name: process.env.S3_BUCKET_NAME
}