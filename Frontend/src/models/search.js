class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.bio = user.bio;
    this.Follower = user.Follower;
    this.Following = user.Following;
    this.status_id = user.status_id;
  }
}

class Event {
  constructor(event) {
    this.event_id = event.event_id;
    this.host_id = event.host_id;
    this.approver_id = event.approver_id;
    this.title = event.title;
    this.description = event.description;
    this.location = event.location;
    this.event_pic = event.event_pic;
    this.start_at = event.start_at;
    this.end_at = event.end_at;
    this.max_participant = event.max_participant;
    this.min_age = event.min_age;
    this.max_age = event.max_age;
    this.status_id = event.status_id;
    this.username = event.username;
    this.user_id = event.user_id;
    this.joined = event.joined;
    this.interested = event.interested;
  }
}

export default { User, Event };
