const uniqid = require("uniqid");
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
process.env.SESSION_SECRET = uniqid();

module.exports = {
    atlas_pass: process.env.MONGODB_ATLAS_PASS,
    local_db_uri: process.env.LOCAL_DB_URL,
    session_id: process.env.SESSION_SECRET,

    aws_user_key: process.env.AWS_IAM_USER_KEY,
    aws_secret_access_key: process.env.AWS_IAM_USER_SECRET,
    aws_bucket_name: process.env.AWS_BUCKET_NAME
}