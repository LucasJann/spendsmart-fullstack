import path from "path";
import cors from "cors";
import multer, { FileFilterCallback } from "multer";
import express, { Request } from "express";
import mongoose from "mongoose";
import mainRoute from "./routes/main";

const MONGODB_URI =
"mongodb+srv://lucasjanjobs:bqtgpHYWUo41a3nE@cluster0.e2ul92v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    const randomHash = Math.random().toFixed(8);
    cb(null, `${randomHash}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/", mainRoute);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server is running on port 8080");
    });
  })
  .catch((err) => console.error(err));
