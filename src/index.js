const express = require("express");
const Blockchain = require("./blockchain");

const app = express();
const blockchain = new Blockchain();

app.use(express.json());

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/mine", (req, res) => {
  const { data } = req.body;
  p2pServer.syncChain();
  const block = blockchain.addBlock(data);
  res.redirect("/blocks");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const P2PServer = require("./p2p-server");
const p2pServer = new P2PServer(blockchain);

p2pServer.listen();
