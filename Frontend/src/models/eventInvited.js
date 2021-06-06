export default class EventInvited {
  constructor(eventInvited) {
    this.event_invited_id = eventInvited.event_invited_id;
    this.inviter_id = eventInvited.inviter_id;
    this.invitee_id = eventInvited.invitee_id;
    this.status_id = eventInvited.status_id;
    this.created_at = eventInvited.created_at;
    this.updated_at = eventInvited.updated_at;
  }
}
