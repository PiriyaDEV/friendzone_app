export default class UserCategory {
  constructor(userCategory) {
    this.user_id = userCategory.user_id;
    this.category_id = userCategory.category_id;
    this.interest = userCategory.interest;
    this.created_at = userCategory.created_at;
    this.updated_at = userCategory.updated_at;
  }
}