import axios from "axios";
import { PassThrough } from "stream";
import s3 from "../s3.js";

// interface CopyFileEvent {
//   fileUrl: string;
//   fileName: string;
//   bucket?: string; // Destination S3 bucket.
// }

const uploadFromStream = (fileResponse, fileName, bucket) => {
  const passThrough = new PassThrough();
  const promise = s3
    .upload({
      Bucket: bucket,
      Key: fileName,
      ContentType: fileResponse.headers["content-type"],
      ContentLength: parseInt(fileResponse.headers["content-length"]),
      Body: passThrough,
    })
    .promise();

  return { passThrough, promise };
};

const downloadFile = async (fileUrl) => {
  try {
    return axios.get(fileUrl, {
      responseType: "stream",
    });
  } catch (e) {
    console.log("There was an error", e);
  }
};

// Returns the location of file
export const handler = async (event) => {
  const responseStream = await downloadFile(event.fileUrl);

  const { passThrough, promise } = uploadFromStream(
    responseStream,
    event.fileName,
    event.bucket || "test-bucket"
  );

  responseStream.data.pipe(passThrough);

  return promise
    .then((result) => {
      return result.Location;
    })
    .catch((e) => {
      console.log("Something went wrong", e);
      throw e;
    });
};
