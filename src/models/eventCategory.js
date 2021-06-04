export default class EventCategory {
  constructor(eventCategory) {
    this.event_id = eventCategory.event_id;
    this.category_id = eventCategory.category_id;
    this.status = eventCategory.status;
    this.created_at = eventCategory.created_at;
    this.updated_at = eventCategory.updated_at;
  }
}
