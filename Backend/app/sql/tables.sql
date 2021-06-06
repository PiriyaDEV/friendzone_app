-- Friendzone Database Tables --

-- Create Chat Table
CREATE TABLE IF NOT EXISTS Chat(
    chat_id                 VARCHAR(8)      NOT NULL,
    sender_id               VARCHAR(8)      NOT NULL,
    message                 VARCHAR(256)    NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (chat_id),
    UNIQUE      (chat_id)
    );

-- Create Category Table
CREATE TABLE IF NOT EXISTS Category(
    category_id             VARCHAR(4)      NOT NULL,
    category_name           VARCHAR(20)     NOT NULL,
    icon_white              VARCHAR(128)    NULL,
    icon_black              VARCHAR(128)    NULL,
    color_code              VARCHAR(7)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (category_id),
    UNIQUE      (category_id)
    );

-- Create Discount Table
CREATE TABLE IF NOT EXISTS Discount(
    discount_id             VARCHAR(8)      NOT NULL,
    name                    VARCHAR(64)     NOT NULL,
    description             VARCHAR(256)    NULL,
    discount_pic            VARCHAR(128)    NULL,
    redeem_point            INT             NOT NULL,
    limits                  INT             NOT NULL,
    period_start            BIGINT          NOT NULL,
    period_end              BIGINT          NOT NULL,
    expired                 BIGINT          NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (discount_id),
    UNIQUE      (discount_id)
    );

-- Create Event Table
CREATE TABLE IF NOT EXISTS Event(
    event_id                VARCHAR(8)      NOT NULL,
    host_id                 VARCHAR(8)      NULL,
    approver_id             VARCHAR(8)      NULL,
    title                   VARCHAR(64)     NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    location                VARCHAR(128)    NOT NULL,
    event_pic               VARCHAR(128)    NULL,
    start_at                BIGINT          NOT NULL,
    end_at                  BIGINT          NOT NULL,
    max_participant         INT             NOT NULL,
    min_age                 INT             NOT NULL,
    max_age                 INT             NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_id),
    UNIQUE      (event_id)
    );

-- Create EventCategory Table
CREATE TABLE IF NOT EXISTS EventCategory(
    event_id                VARCHAR(8)      NOT NULL,
    category_id             VARCHAR(4)      NOT NULL,
    status                  BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_id, category_id),
    UNIQUE      (event_id, category_id)
    );

-- Create EventGender Table
CREATE TABLE IF NOT EXISTS EventGender(
    event_id                VARCHAR(8)      NOT NULL,
    gender_id               VARCHAR(4)      NOT NULL,
    status                  BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_id, gender_id),
    UNIQUE      (event_id, gender_id)
    );

-- Create EventInvited Table
CREATE TABLE IF NOT EXISTS EventInvited(
    event_invited_id        VARCHAR(8)      NOT NULL,
    inviter_id              VARCHAR(8)      NOT NULL,
    invitee_id              VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_invited_id),
    UNIQUE      (inviter_id, invitee_id)
    );

-- Create EventModerator Table
CREATE TABLE IF NOT EXISTS EventModerator(
    event_moderator_id      VARCHAR(8)      NOT NULL,
    moderator_id            VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_moderator_id),
    UNIQUE      (moderator_id)
    );

-- Create EventParticipant Table
CREATE TABLE IF NOT EXISTS EventParticipant(
    event_participant_id    VARCHAR(8)      NOT NULL,
    event_id                VARCHAR(8)      NOT NULL,
    participant_id          VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_participant_id),
    UNIQUE      (event_id, participant_id)
    );

-- Create EventReview Table
CREATE TABLE IF NOT EXISTS EventReview(
    event_review_id         VARCHAR(8)      NOT NULL,
    reviewer_id             VARCHAR(8)      NOT NULL,
    rating                  INT             NOT NULL,
    comment                 VARCHAR(256)    NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (event_review_id),
    UNIQUE      (reviewer_id)
    );

-- Create Follower Table
CREATE TABLE IF NOT EXISTS Follower(
    follower_id             VARCHAR(8)      NOT NULL,
    following_id            VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    UNIQUE      (follower_id, following_id)
    );

-- Create Gender Table
CREATE TABLE IF NOT EXISTS Gender(
    gender_id               VARCHAR(4)      NOT NULL,
    gender_name             VARCHAR(8)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (gender_id),
    UNIQUE      (gender_id)
    );

-- Create ParticipantReview Table
CREATE TABLE IF NOT EXISTS ParticipantReview(
    participant_review_id   VARCHAR(8)      NOT NULL,
    reviewer_id             VARCHAR(8)      NOT NULL,
    participant_id          VARCHAR(8)      NOT NULL,
    rating                  INT             NOT NULL,
    comment                 VARCHAR(256)    NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (participant_review_id),
    UNIQUE      (reviewer_id, participant_id)
    );

-- Create PointTransaction Table
CREATE TABLE IF NOT EXISTS PointTransaction(
    point_transaction_id    VARCHAR(8)      NOT NULL,
    participant_id          VARCHAR(8)      NULL,
    user_discount_id        VARCHAR(8)      NULL,
    description             VARCHAR(64)     NOT NULL,
    amount                  INT             NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (point_transaction_id),
    UNIQUE      (point_transaction_id)
    );

-- Create Role Table
CREATE TABLE IF NOT EXISTS Role(
    role_id                 VARCHAR(4)      NOT NULL,
    role                    VARCHAR(16)     NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (role_id),
    UNIQUE      (role_id)
    );

-- Create ReportType Table
CREATE TABLE IF NOT EXISTS ReportType(
    report_type_id          VARCHAR(4)      NOT NULL,
    type_name               VARCHAR(64)    NOT NULL,
    require_event           BOOLEAN         NOT NULL,
    require_suspect         BOOLEAN         NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (report_type_id),
    UNIQUE      (report_type_id)
    );

-- Create Report Table
CREATE TABLE IF NOT EXISTS Report(
    report_id               VARCHAR(8)      NOT NULL,
    reporter_id             VARCHAR(8)      NOT NULL,
    report_type_id          VARCHAR(4)      NOT NULL,
    title                   VARCHAR(64)     NOT NULL,
    description             VARCHAR(256)    NOT NULL,
    event_id                VARCHAR(8)      NULL,
    suspect_id              VARCHAR(8)      NULL,
    admin_id                VARCHAR(8)      NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (report_id),
    UNIQUE      (report_id)
    );

-- Create Status Table
CREATE TABLE IF NOT EXISTS Status(
    status_id               VARCHAR(4)      NOT NULL,
    status_name             VARCHAR(16)     NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (status_id),
    UNIQUE      (status_id)
    );

-- Create User Table
CREATE TABLE IF NOT EXISTS User(
    user_id                 VARCHAR(8)      NOT NULL,
    username                VARCHAR(16)     NOT NULL,
    password                VARCHAR(64)     NOT NULL,
    email                   VARCHAR(64)     NOT NULL,
    firstname               VARCHAR(64)     NOT NULL,
    lastname                VARCHAR(64)     NOT NULL,
    birthdate               BIGINT          NOT NULL,
    gender_id               VARCHAR(4)      NOT NULL,
    phone                   VARCHAR(10)     NOT NULL,
    profile_pic             VARCHAR(128)    NULL,
    bio                     VARCHAR(150)    NULL,
    role_id                 VARCHAR(4)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_id),
    UNIQUE      (user_id, username, email, phone)
    );

-- Create UserDiscount Table
CREATE TABLE IF NOT EXISTS UserDiscount(
    user_discount_id        VARCHAR(8)      NOT NULL,
    user_id                 VARCHAR(8)      NOT NULL,
    discount_id             VARCHAR(8)      NOT NULL,
    status_id               VARCHAR(4)      NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_discount_id),
    UNIQUE      (user_discount_id)
    );

-- Create UserCategory Table
CREATE TABLE IF NOT EXISTS UserCategory(
    user_id                 VARCHAR(8)      NOT NULL,
    category_id             VARCHAR(4)      NOT NULL,
    interest                BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_id, category_id),
    UNIQUE      (user_id, category_id)
    );

-- Create UserInterest Table
CREATE TABLE IF NOT EXISTS UserInterest(
    user_id                 VARCHAR(8)      NOT NULL,
    event_id                VARCHAR(8)      NOT NULL,
    interest                BOOLEAN         NOT NULL,
    created_at              BIGINT          NOT NULL,
    updated_at              BIGINT          NOT NULL,
    PRIMARY KEY (user_id, event_id),
    UNIQUE      (user_id, event_id)
    );