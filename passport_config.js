const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const User = require("./models/User");

async function getUserByEmail(email){
    return await User.findOne({email: email});
}

async function getUserById(id){
    return await User.findById({id: id});
}

function init(passport){
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
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
    passport.serializeUser(User.serializeUser()); //responsible for encoding data
    passport.deserializeUser(User.deserializeUser()); //responsible for taking data from the session and unencoding it
}
module.exports = init;