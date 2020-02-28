DROP TABLE IF EXISTS articles;
ALTER DEFAULT PRIVILEGES GRANT ALL ON TABLES TO api_user;
ALTER DEFAULT PRIVILEGES GRANT ALL ON SEQUENCES TO api_user;
CREATE TABLE articles (
  ID SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  views SMALLINT,
  upvotes SMALLINT,
  downvotes SMALLINT,
  edited_at DATE,
  topic_id INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO articles (title, body, views, upvotes, downvotes, edited_at)
VALUES ('Intro to Programming', 'What you have to know first is setting up the environment', 50, 10, 2, '2001-09-28');