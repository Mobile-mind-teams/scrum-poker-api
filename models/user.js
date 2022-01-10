class User {
  constructor(user_name, password, role, uid, email, status) {
      this.user_name = user_name;
      this.password = password;
      this.role = role;
      this.uid = uid;
      this.email = email;
      this.status = status;
  }
}

module.exports = User;
