import "dotenv/config";
import { getSignedUrl } from "aws-cloudfront-sign";

export function getFileLink(filename) {
  return new Promise(function (resolve, reject) {
    var options = {
      keypairId: process.env.CLOUDFRONT_ACCESS_KEY_ID,
      privateKeyPath: process.env.CLOUDFRONT_PRIVATE_KEY_PATH,
    };
    var signedUrl = getSignedUrl(
      process.env.CLOUDFRONT_URL + "/" + filename,
      options
    );
    resolve(signedUrl);
  });
}
