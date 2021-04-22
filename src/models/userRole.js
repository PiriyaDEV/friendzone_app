export default class UserRole {
  constructor(userRole) {
    this.user_id = userRole.user_id;
    this.role_id = userRole.role_id;
    this.status_id = userRole.status_id;
    this.created_at = userRole.created_at;
    this.updated_at = userRole.updated_at;
  }
}