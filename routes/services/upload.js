const AWS = require("aws-sdk");
const keys = require("../../config/keys");

const s3 = new AWS.S3({
  accessKeyId: keys.s3ID,
  secretAccessKey: keys.s3Key
});

module.exports = s3;
