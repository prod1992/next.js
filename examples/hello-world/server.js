const express = require("express");
const morgan = require("morgan");
const next = require("next");

const Twitter = require("twit");
const config = {
  consumer_key: process.env["TWITTER_CONSUMER_KEY"],
  consumer_secret: process.env["TWITTER_CONSUMER_SECRET"],
  access_token: process.env["TWITTER_OAUTH_TOKEN"],
  access_token_secret: process.env["TWITTER_OAUTH_SECRET"]
};

const client = Twitter(config);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(morgan());
    server.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
    });

    server.get("/timeline", (req, res, next) => {
      console.log(req.query);
      client.get(
        "statuses/home_timeline",
        { count: req.params.count },
        function(err, data, response) {
          res.status(200).json(data);
        }
      );
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
