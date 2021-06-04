export default class Role {
  constructor(role) {
    this.role_id = role.role_id;
    this.role = role.role;
    this.description = role.description;
    this.created_at = role.created_at;
    this.updated_at = role.updated_at;
  }
}
