export default class UserInterest {
  constructor(userInterest) {
    this.user_id = userInterest.user_id;
    this.event_id = userInterest.event_id;
    this.interest = userInterest.interest;
    this.created_at = userInterest.created_at;
    this.updated_at = userInterest.updated_at;
  }
}