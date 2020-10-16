const bcrypt = require("bcrypt");
//require("dotenv").config(); //you already did it once in server.js. no need to do it again.

module.exports = async (userModel) => {
  try {
    //check if the default user has already been created
    const user = await userModel.findOne();
    //if not, create it.
    if (!user) {
      //hash the password.
      bcrypt.hash(
        process.env.pw,
        parseInt(process.env.salt_rounds),
        async (err, hashedPassword) => {
          if (err) {
            console.log(err);
            return;
          }
          const newUser = await userModel.create({
            password: hashedPassword,
            email: "admin@gmail.com",
          });
          console.log("Root user created successfully");
        }
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};
