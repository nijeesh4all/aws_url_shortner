import { s3, cloudfront } from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as fs from "fs";

const assets_bucket = new s3.Bucket("static", {
  website: {
    indexDocument: "index.html",
  }
});

// remove public bucket restrictions

const exampleBucketPublicAccessBlock = new s3.BucketPublicAccessBlock("static-public-acess-rules", {
    bucket: assets_bucket.id,
    blockPublicAcls: false,
    blockPublicPolicy: false,
    ignorePublicAcls: false,
    restrictPublicBuckets: false,
});


const policy_json = (arn: string) => {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [arn + "/*"],
      },
    ],
  });
};

const bucket_public_access_polciy = new s3.BucketPolicy("public-access", {
  bucket: assets_bucket.bucket,
  policy: assets_bucket.arn.apply(policy_json),
});



for (const file of fs.readdirSync(__dirname + "/www")) {
  new s3.BucketObject(file, {
    bucket: assets_bucket.id,
    key: file,
    source: __dirname + `/www/${file}`,
  });
}

export default assets_bucket;
