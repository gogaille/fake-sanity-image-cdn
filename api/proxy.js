const cloudinary = require("cloudinary").v2;

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
if (!CLOUDINARY_CLOUD_NAME) {
  throw new Error(
    "The CLOUDINARY_CLOUD_NAME environement variable is missing or empty"
  );
}

cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME });

const EXTRACT_INFO_FROM_PATH_REGEX = /([a-zA-Z0-9]+)-([0-9]+)x([0-9]+)\.([a-z]+)$/i;

// TODO: Extract the format from the query to validate it (picsum.photos only support jpg)
export default (req, res) => {
  console.log({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  });

  const {
    query: {
      path: originalPath = "/",
      w: requestedWidth = undefined,
      h: requestedHeight = undefined,
      "max-w": requestedMaxWidth = undefined,
      "max-h": requestedMaxHeight = undefined,
    },
  } = req;

  const infos = EXTRACT_INFO_FROM_PATH_REGEX.exec(originalPath);
  if (!infos) {
    return res.status(503).end("Not a sanity URL");
  }

  const [, photoId, width, height, format] = infos;

  if (!["jpg", "jpeg", "png", "gif", "webp"].includes(format)) {
    return res.status(503).end("Only image could be faked");
  }

  const picsumPhotoUrl = `https://picsum.photos/id/${photoId}/${width}/${height}.${format}`;

  const cloudinaryFetchUrl = cloudinary.url(picsumPhotoUrl, {
    type: "fetch",
    secure: true,
    fetch_format: format,
    width: requestedMaxWidth || requestedWidth || width || undefined,
    height: requestedMaxHeight || requestedHeight || height || undefined,
    crop: "fit",
  });

  console.log({ picsumPhotoUrl, cloudinaryFetchUrl });

  // res.end(JSON.stringify({ picsumPhotoUrl, cloudinaryFetchUrl }, null, 2));

  res.writeHead(302, { Location: cloudinaryFetchUrl });
  res.end();
};
