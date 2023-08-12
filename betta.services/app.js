var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const db = require("./database/mongodb.json");
const http = require("http");
const mongoose = require("mongoose");
const io = require("socket.io");
const cors = require("cors");
const axios = require('axios');

// importing routes
// generic module
var blackWordRouter = require("./modules/BlackWord/black-word.router");

// event module
var eventCategoryRouter = require("./modules/EventCategory/event-category.router");
var eventRouter = require("./modules/Event/event.router");
var eventLikeRouter = require("./modules/EventLike/event-like.router");
var eventCommentRouter = require("./modules/EventComment/event-comment.router");
var eventInterestRouter = require("./modules/EventInterest/event-interest.router");
var eventViewRouter = require("./modules/EventView/event-view.router");
var eventMemberRouter = require("./modules/EventMember/event-member.router");
var eventLocationRouter = require("./modules/EventLocation/event-location.router");
var eventImageRouter = require("./modules/EventImage/event-image.router");

// article module
var articleImageRouter = require("./modules/ArticleImage/article-image.router");
var articleRouter = require("./modules/Article/article.router");

// product module
var productCategoryRouter = require("./modules/ProductCategory/product-category.router");
var productRouter = require("./modules/Product/product.router");

// user module
var userRouter = require("./modules/User/user.router");
var donsRouter = require("./modules/Dons/Dons.router");

const enchereRouter = require("./modules/enchere/enchere.router");
const enchereArticleRouter = require("./modules/encherearticle/enchere-article.router");

var roleRouter = require("./modules/Role/role.router");

var forumRouter = require("./modules/forum/forum.router");

var app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json({ limit: "50mb" }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// using routes
// generic module
app.use("/black-word", blackWordRouter);

// event module
app.use("/event-category", eventCategoryRouter);
app.use("/event", eventRouter);
app.use("/event-like", eventLikeRouter);
app.use("/event-comment", eventCommentRouter);
app.use("/event-interest", eventInterestRouter);
app.use("/event-view", eventViewRouter);
app.use("/event-member", eventMemberRouter);
app.use("/event-location", eventLocationRouter);
app.use("/event-image", eventImageRouter);

// article module
app.use("/article-image", articleImageRouter);
app.use("/article", articleRouter);

app.use("/enchere", enchereRouter);
app.use("/enchere-articles", enchereArticleRouter);

// product module
app.use("/product-category", productCategoryRouter);
app.use("/product", productRouter);

// user module
app.use("/user", userRouter);

app.use("/role", roleRouter);
app.use("/dons", donsRouter)

app.use("/forum", forumRouter);

mongoose.set("strictQuery", true);
mongoose
  .connect(db.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected To database!");
  })
  .catch((err) => {
    console.log(err.message);
  });

// response for the index of the app

app.get("/", (req, res) => {
  console.log("the index of the app");
  res.json({ data: "Your data" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

const ioOptions = {
  cors: {
    origin: "http://localhost:4200", // Replace with your Angular app's URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
};

const socket = io(server, ioOptions);

socket.sockets.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", (data) => {
    console.log("Received message:", data);

    // Handle the received message and send a response
    //socket.emit('response', 'Server received your message');
    const responseInterval = setInterval(() => {
      axios.get('http://localhost:3080/forum/list')
      .then(response => {
        // Handle the API response
        socket.emit("response", response.data);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
    }, 3000);

    // setTimeout(() => {
    //   clearInterval(responseInterval);
    // }, 10000);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

socket.sockets.on("connect", () => {
  console.log("Connected to the server");
  socket.emit("message", "Hello server!");
});

socket.sockets.on("response", (data) => {
  console.log("Server responded:", data);
});

server.listen(3080, () => {
  console.log("app is running on port 3080");
});

module.exports = app;
