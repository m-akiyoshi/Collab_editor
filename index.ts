// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { pool } = require("./config");
// const Article = require("./server/models/Article.ts");
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./config";
import Article, { ArticleAttributes } from "./server/models/Article";
import {
  getAllArticles,
  postArticle,
  updateArticle
} from "./server/app/article/Article";

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
// maybe use these unclear
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// const getAll = (request: express.Request, response: express.Response) => {
//   response.json(await getAllArticles());
// };

const post = (request: express.Request, response: express.Response) => {
  const { title, body } = request.body;
  let article: ArticleAttributes;
  console.log("here");
  console.log(request);
  article = {
    title: title,
    body: body,
    views: 0,
    upvotes: 0,
    downvotes: 0,
    edited_at: new Date().toString(),
    topic_id: 0
  };
  return postArticle(article);
};

const getArticle = (request: express.Request, response: express.Response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM articles WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    if (results.rows.length === 1) {
      response.status(200).json(results.rows[0]);
    } else {
      response.status(204).json({
        status: "no content",
        message: `No article with ID ${id} was found.`
      });
    }
  });
};

const update = async (request: express.Request, response: express.Response) => {
  const { title, body } = request.body;
  const article = await Article.findById(request.params.id);
  if (!article) {
    return;
  }
  article.title = title;
  article.body = body;
  return updateArticle(article);

  // pool.query(
  //   "UPDATE articles SET title = $1, body = $2 WHERE id = $3",
  //   [title, body, id],
  //   (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     response.status(200).json({
  //       status: "success",
  //       message: `Article with ID ${id} successfully updated.`
  //     });
  //   }
  // );
};

const deleteArticle = (
  request: express.Request,
  response: express.Response
) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM articles WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json({
      status: "success",
      message: `Article with ID ${id} successfully deleted.`
    });
  });
};

// Put all API endpoints under '/api'
app.get("/api/articles", async (req, res) => {
  res.status(200).json(await getAllArticles());
  // res.json(await getAllArticles());
});
app.post("/api/articles", post);
app.get("/api/articles/:id", getArticle);
app.put("/api/articles/:id", update);
app.delete("/api/articles/:id", deleteArticle);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (request: express.Request, response: express.Response) => {
  response.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`API server listening on ${port}`);
