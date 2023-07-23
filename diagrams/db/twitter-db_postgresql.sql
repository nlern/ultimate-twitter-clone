CREATE TABLE "user" (
  "id" uuid PRIMARY KEY,
  "username" string,
  "email" string
);

CREATE TABLE "tweet" (
  "id" uuid PRIMARY KEY,
  "text" string,
  "authorId" string,
  "createdAt" datetime,
  "updatedAt" datetime
);

CREATE TABLE "hashtag" (
  "id" uuid PRIMARY KEY,
  "name" string
);

CREATE TABLE "reply" (
  "id" uuid PRIMARY KEY,
  "text" string,
  "userId" string,
  "tweetId" string,
  "replyId" string
);

CREATE TABLE "like" (
  "id" uuid PRIMARY KEY,
  "userId" string,
  "tweetId" string,
  "createdAt" datetime
);

CREATE TABLE "bookmark" (
  "id" uuid PRIMARY KEY,
  "userId" string,
  "tweetId" string,
  "createdAt" datetime
);

CREATE UNIQUE INDEX ON "like" ("userId", "tweetId");

CREATE UNIQUE INDEX ON "bookmark" ("userId", "tweetId");

CREATE TABLE "tweet_hashtag" (
  "tweet_id" uuid,
  "hashtag_id" uuid,
  PRIMARY KEY ("tweet_id", "hashtag_id")
);

ALTER TABLE "tweet_hashtag" ADD FOREIGN KEY ("tweet_id") REFERENCES "tweet" ("id");

ALTER TABLE "tweet_hashtag" ADD FOREIGN KEY ("hashtag_id") REFERENCES "hashtag" ("id");


ALTER TABLE "tweet" ADD FOREIGN KEY ("authorId") REFERENCES "user" ("id");

ALTER TABLE "reply" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "reply" ADD FOREIGN KEY ("tweetId") REFERENCES "tweet" ("id");

CREATE TABLE "reply_reply" (
  "reply_id" uuid,
  "reply_replyId" string,
  PRIMARY KEY ("reply_id", "reply_replyId")
);

ALTER TABLE "reply_reply" ADD FOREIGN KEY ("reply_id") REFERENCES "reply" ("id");

ALTER TABLE "reply_reply" ADD FOREIGN KEY ("reply_replyId") REFERENCES "reply" ("replyId");


ALTER TABLE "like" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "like" ADD FOREIGN KEY ("tweetId") REFERENCES "tweet" ("id");

ALTER TABLE "bookmark" ADD FOREIGN KEY ("userId") REFERENCES "user" ("id");

ALTER TABLE "bookmark" ADD FOREIGN KEY ("tweetId") REFERENCES "tweet" ("id");
