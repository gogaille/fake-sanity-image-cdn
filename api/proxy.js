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
    },
  } = req;

  const infos = EXTRACT_INFO_FROM_PATH_REGEX.exec(originalPath);
  if (!infos) {
    return res.status(503).end("Not a sanity URL");
  }

  const [, photoId, width, height, format] = infos;

  if (!["jpg", "jpeg", "png", "gif"].includes(format)) {
    return res.status(503).end("Only image could be faked");
  }

  const destination = `https://picsum.photos/id/${photoId}/${
    requestedWidth || width
  }/${requestedHeight || height}.${format}`;

  console.log({
    destination,
  });

  res.writeHead(302, { Location: destination });
  res.end();
};
