-- Friendzone Database Foreign Keys --

-- Add Foreign Key To Chat Table
ALTER TABLE Chat
    ADD FOREIGN KEY (sender_id)         REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Discount Table
ALTER TABLE Discount
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Event Table
ALTER TABLE Event
    ADD FOREIGN KEY (host_id)           REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (approver_id)       REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To EventCategory Table
ALTER TABLE EventCategory
    ADD FOREIGN KEY (event_id)          REFERENCES Event(event_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (category_id)       REFERENCES Category(category_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To EventGender Table
ALTER TABLE EventGender
    ADD FOREIGN KEY (event_id)          REFERENCES Event(event_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (gender_id)         REFERENCES Gender(gender_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To EventInvited Table
ALTER TABLE EventInvited
    ADD FOREIGN KEY (inviter_id)        REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (invitee_id)        REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To EventModerator Table
ALTER TABLE EventModerator
    ADD FOREIGN KEY (moderator_id)      REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To EventParticipant Table
ALTER TABLE EventParticipant
    ADD FOREIGN KEY (event_id)          REFERENCES Event(event_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (participant_id)    REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To EventReview Table
ALTER TABLE EventReview
    ADD FOREIGN KEY (reviewer_id)       REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Follower Table
ALTER TABLE Follower
    ADD FOREIGN KEY (follower_id)       REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (following_id)      REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To ParticipantReview Table
ALTER TABLE ParticipantReview
    ADD FOREIGN KEY (reviewer_id)       REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (participant_id)    REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To PointTransaction Table
ALTER TABLE PointTransaction
    ADD FOREIGN KEY (participant_id)    REFERENCES EventParticipant(event_participant_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (user_discount_id)  REFERENCES UserDiscount(user_discount_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To ReportType Table
ALTER TABLE ReportType
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To Report Table
ALTER TABLE Report
    ADD FOREIGN KEY (reporter_id)       REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (report_type_id)    REFERENCES ReportType(report_type_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (event_id)          REFERENCES Event(event_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (suspect_id)        REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (admin_id)          REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To User Table
ALTER TABLE User
    ADD FOREIGN KEY (gender_id)         REFERENCES Gender(gender_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (role_id)           REFERENCES Role(role_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To UserDiscount Table
ALTER TABLE UserDiscount
    ADD FOREIGN KEY (user_id)           REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (discount_id)       REFERENCES Discount(discount_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (status_id)         REFERENCES Status(status_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To UserCategory Table
ALTER TABLE UserCategory
    ADD FOREIGN KEY (user_id)           REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (category_id)       REFERENCES Category(category_id)
        ON UPDATE CASCADE ON DELETE CASCADE;

-- Add Foreign Key To UserInterest Table
ALTER TABLE UserInterest
    ADD FOREIGN KEY (user_id)           REFERENCES User(user_id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    ADD FOREIGN KEY (event_id)          REFERENCES Event(event_id)
        ON UPDATE CASCADE ON DELETE CASCADE;   