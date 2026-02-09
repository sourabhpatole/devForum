const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }
  //   else if (firstName.length < 4 || firstName > 50) {
  //     throw new Error("FirstName  should be 4-50 character");
  //   }
  else if (!validator.isEmail(emailId)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter strong password");
  }
};
const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field),
  );
  return isEditAllowed;
};

const validateForgotPassword = (oldPassword, newPassword) => {
  if (!oldPassword || !newPassword) {
    throw new Error("Old password and new password are required");
  }
  if (oldPassword === newPassword) {
    throw new Error("New password cannot be the same as old password");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("Please enter a strong password");
  }
};

module.exports = {
  validateSignUpData,
  validateProfileEditData,
  validateForgotPassword,
};
