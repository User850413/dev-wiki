const express = require("express");
const next = require("next");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const postListFilePath = path.join(__dirname, "../data/post-list.json");

let posts = JSON.parse(fs.readFileSync(postListFilePath, "utf-8"));

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get("/api/posts", (req, res) => {
    // const { tag } = req.query;
    // if (tag) {
    //   const todo = todos.filter((t) => t.tag === tag);
    //   res.send(todo);
    // } else {
    //   res.send(todos);
    // }
    res.send(posts);
  });

  server.get("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((t) => t.id === Number(id));
    if (post) {
      res.send(post);
    } else {
      res.status(404).send({ message: "There is no post with the id!" });
    }
  });

  server.post("/api/posts", (req, res) => {
    const newPost = req.body;
    posts.push(newPost);
    fs.writeFileSync(postListFilePath, JSON.stringify(posts, null, 2));
    res.send(newPost);
  });

  server.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const change = req.body;
    const changedPost = posts.find((t) => t.id === Number(id));
    if (changedPost) {
      Object.keys(change).forEach((prop) => {
        changedPost[prop] = change[prop];
        fs.writeFileSync(postListFilePath, JSON.stringify(posts, null, 2));
      });
      res.send(changedPost);
    }
  });

  server.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const postsCount = posts.length;
    posts = posts.filter((post) => post.id !== Number(id));
    if (posts.length < postsCount) {
      fs.writeFileSync(postListFilePath, JSON.stringify(posts, null, 2));
      res.send(res.send({ message: "deleted." }));
    } else {
      res.status(404).send({ message: "There is no todo with the id!" });
    }
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
});
