const { signUp } = require("./sign-up");
const { signIn } = require("./sign-in");
const { logOut } = require("./logout");
const { refresh } = require("./refresh");
const { getCurrentUser } = require("./current-user");

module.exports = {
  signUp,
  signIn,
  logOut,
  refresh,
  getCurrentUser,
};
