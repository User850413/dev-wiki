const express = require("express");
const next = require("next");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const datasFilePath = path.join(__dirname, "../data/data.json");

let datas = JSON.parse(fs.readFileSync(datasFilePath, "utf-8"));

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get("/api/datas", (req, res) => {
    // const { tag } = req.query;
    // if (tag) {
    //   const todo = todos.filter((t) => t.tag === tag);
    //   res.send(todo);
    // } else {
    //   res.send(todos);
    // }
    res.send(datas);
  });

  server.get("/api/datas/:id", (req, res) => {
    const { id } = req.params;
    const data = datas.find((t) => t.id === Number(id));
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "There is no todo with the id!" });
    }
  });

  server.post("/api/datas", (req, res) => {
    const newData = req.body;
    datas.push(newData);
    fs.writeFileSync(datasFilePath, JSON.stringify(datas, null, 2));
    res.send(newData);
  });

  server.put("/api/datas/:id", (req, res) => {
    const { id } = req.params;
    const change = req.body;
    const changedTodo = datas.find((t) => t.id === Number(id));
    if (changedTodo) {
      Object.keys(change).forEach((prop) => {
        changedTodo[prop] = change[prop];
        fs.writeFileSync(datasFilePath, JSON.stringify(datas, null, 2));
      });
      res.send(changedTodo);
    }
  });

  server.delete("/api/datas/:id", (req, res) => {
    const { id } = req.params;
    const todosCount = datas.length;
    datas = datas.filter((todo) => todo.id !== Number(id));
    if (datas.length < todosCount) {
      fs.writeFileSync(datasFilePath, JSON.stringify(datas, null, 2));
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
