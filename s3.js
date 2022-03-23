import pkg from "aws-sdk";
const { S3 } = pkg;
import "dotenv/config";

const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_ID,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.REGION,
});

export default s3;
