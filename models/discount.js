export default class Discount {
  constructor(discount) {
    this.discount_id = discount.discount_id;
    this.name = discount.name;
    this.description = discount.description;
    this.discount_pic = discount.discount_pic;
    this.redeem_point = discount.redeem_point;
    this.limits = discount.limits;
    this.period_start = discount.period_start;
    this.period_end = discount.period_end;
    this.use_within = discount.use_within;
    this.status_id = discount.status_id;
    this.created_at = discount.created_at;
    this.updated_at = discount.updated_at;
  }
}