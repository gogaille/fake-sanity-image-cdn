# fake-sanity-image-cdn

## What is it?

A proxy to use [Sanity](https://www.sanity.io/) <code>@sanity/image-url</code> helper with
fake image. Usefull in tests or storybook.

It uses [Cloudinary](https://cloudinary.com/) to apply image transformations on the fly.

## How to use it?

Use this proxy service as the `baseUrl` when you create the
imageUrlBuilder instanse:

```js
import imageUrlBuilder from "@sanity/image-url";

const myConfiguredSanityClient = {
  /* ... */
};

const builder = imageUrlBuilder(myConfiguredSanityClient).withOptions({
  baseUrl: "https://fake-sanity-image-cdn.vercel.app/proxy/",
});

console.log(builder.image("...").url());
```

## Limitations

For now this project target on not breaking layout where the proxified image is used.

This means only the image width (with the document `width`, and the query parameter `w` and `max-w`) and image height (with the document `height`, and the query parameter `h` and `max-h`) are preserved.

## Local environment

### Instal

```bash
# Install dependencies
$ yarn install

## Pull localy the dev environment from vercel (for @gogaille team)
$ yarn vercel login
$ yarn vercel env pull
# OR
## Create a `.env` file at the repository root with your Cloudinary cloud name
$ echo "CLOUDINARY_CLOUD_NAME=\"foo\"" > .env
```

### Work

```bash
$ vercel dev
```
