import express from "express";
import { handler } from "./helpers/file_upload_s3.js";

import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/upload", async (req, res) => {
  const url =
    "https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300";
  const fileName = new Date().getMilliseconds().toString();
  const bucket = process.env.BUCKET;
  const response = await handler({ fileUrl: url, fileName, bucket });

  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    response,
  });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
