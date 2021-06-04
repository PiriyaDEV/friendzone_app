export default class UserDiscount {
  constructor(userDiscount) {
    this.user_discount_id = userDiscount.user_discount_id;
    this.user_id = userDiscount.user_id;
    this.discount_id = userDiscount.discount_id;
    this.status_id = userDiscount.status_id;
    this.created_at = userDiscount.created_at;
    this.updated_at = userDiscount.updated_at;
  }
}
