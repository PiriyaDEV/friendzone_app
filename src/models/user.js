export default class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.birthdate = user.birthdate;
    this.gender_id = user.gender_id;
    this.phone = user.phone;
    this.profile_pic = user.profile_pic;
    this.bio = user.bio;
    this.status_id = user.status_id;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}