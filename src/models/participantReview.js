export default class ParticipantReview {
  constructor(participantReview) {
    this.participant_review_id = participantReview.participant_review_id;
    this.reviewer_id = participantReview.reviewer_id;
    this.participant_id = participantReview.participant_id;
    this.rating = participantReview.rating;
    this.comment = participantReview.comment;
    this.status_id = participantReview.status_id;
    this.created_at = participantReview.created_at;
    this.updated_at = participantReview.updated_at;
  }
}