const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("./models/User");

async function getUserByEmail(email){
    return await User.findOne({email: email});
}

function init(passport){
    const authenticateUser = async (email, password, done) => {
        console.log(email);
        console.log(password);
        const user = await getUserByEmail(email);
        console.log(user);
        if(user === null){
            return done(null, false, {message: "No user with that email"});
        }

        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, {message: "Password incorrect"})
            }
        }catch(e){
            return done(e);
        }
    };

    passport.use(new LocalStrategy({usernameField: 'email'},
    authenticateUser));
    passport.serializeUser((user, done) => {});
    passport.deserializeUser((id, done) => {});
}
module.exports = init;