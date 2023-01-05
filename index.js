import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import cors from "cors";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations.js";
import {
  register,
  login,
  getMe,
  create,
  getAll,
  getOne,
  remove,
  update,
  getLastTags,
} from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://anna:kolchina1997@cluster0.issuusv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database OK"))
  .catch((err) => console.log("Database Error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.post("/auth/login", loginValidation, handleValidationErrors, login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  register
);
app.get("/auth/me", checkAuth, getMe);

app.post("/upload", upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", getLastTags);
app.get("/posts/tags", getLastTags);
app.get("/posts", getAll);
app.get("/posts/:id", getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  create
);
app.delete("/posts/:id", checkAuth, remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  update
);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
