export default class EventReview {
  constructor(eventReview) {
    this.event_review_id = eventReview.event_review_id;
    this.reviewer_id = eventReview.reviewer_id;
    this.rating = eventReview.rating;
    this.comment = eventReview.comment;
    this.status_id = eventReview.status_id;
    this.created_at = eventReview.created_at;
    this.updated_at = eventReview.updated_at;
  }
}