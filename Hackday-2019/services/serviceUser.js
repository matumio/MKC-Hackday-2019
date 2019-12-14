const User = require("../models/user");

class ServiceUser {
  /**
   * Handles the various APIs for displaying and managing Notes
   * @param {User} user
   */
  constructor(user) {
    this.user = user;
  }
  
}

module.exports = ServiceUser;