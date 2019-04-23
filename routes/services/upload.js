const AWS = require("aws-sdk");
const keys = require("../../config/keys");
const router = require("express").Router();
const passport = require("passport");

const s3 = new AWS.S3({
  accessKeyId: keys.s3ID,
  secretAccessKey: keys.s3Key
});

// @route GET api/services/avatar
// @desc Return a S3 bucket signed URL to the client
// @access Private
router.get(
  "/avatar?:filetype",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let uuid = Date.now();

    const key = `public/${req.user.id}/profile-pic/${uuid}.${
      req.query.filetype
    }`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "dev-buck-102",
        ContentType: `image/${req.query.filetype}`,
        Key: key
      },
      (err, url) => res.send({ key, url, baseURL: keys.s3ProfilePicBaseURL })
    );
  }
);

router.get(
  "/blog?:filetype",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let uuid = Date.now();

    const key = `public/${rq.user.id}/blog/${uuid}.${req.query.filetype}`;
    s3.getSignedUrl(
      "putObject",
      {
        Bucket: "dev-buck-102",
        ContentType: `image/${req.query.filetype}`,
        Key: key
      },
      (err, url) => res.send({ key, url, baseURL: keys.s3ProfilePicBaseURL })
    );
  }
);

module.exports = router;
