const uniqid = require("uniqid");
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
process.env.SESSION_SECRET = uniqid();