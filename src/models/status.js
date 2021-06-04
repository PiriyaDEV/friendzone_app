export default class Status {
  constructor(status) {
    this.status_id = status.status_id;
    this.status_name = status.status_name;
    this.created_at = status.created_at;
    this.updated_at = status.updated_at;
  }
}
