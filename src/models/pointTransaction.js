export default class PointTransaction {
  constructor(pointTransaction) {
    this.point_transaction_id = pointTransaction.point_transaction_id;
    this.participant_id = pointTransaction.participant_id;
    this.user_discount_id = pointTransaction.user_discount_id;
    this.description = pointTransaction.description;
    this.amount = pointTransaction.amount;
    this.created_at = pointTransaction.created_at;
    this.updated_at = pointTransaction.updated_at;
  }
}
