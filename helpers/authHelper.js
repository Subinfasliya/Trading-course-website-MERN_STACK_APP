const bcrypt = require('bcrypt');


// Password  bcrypting
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword

    } catch (error) {
        console.log(error);

    }
};


//password comparing

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
};

//exports
module.exports = { hashPassword, comparePassword } 