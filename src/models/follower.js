export default class Follower {
  constructor(follower) {
    this.follower_id = follower.follower_id;
    this.following_id = follower.following_id;
    this.status_id = follower.status_id;
    this.created_at = follower.created_at;
    this.updated_at = follower.updated_at;
  }
}
