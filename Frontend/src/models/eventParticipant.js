export default class EventParticipant {
  constructor(eventParticipant) {
    this.event_participant_id = eventParticipant.event_participant_id;
    this.event_id = eventParticipant.event_id;
    this.participant_id = eventParticipant.participant_id;
    this.status_id = eventParticipant.status_id;
    this.created_at = eventParticipant.created_at;
    this.updated_at = eventParticipant.updated_at;
  }
}
